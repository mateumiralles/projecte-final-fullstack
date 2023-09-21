"use client"
import axios, { AxiosResponse } from "axios";
import InputUserForm from "./InputUserForm";
import { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';


type LogUpContainerProps = {
  bool: Boolean;
};

export default function LogInContainer({ bool }: LogUpContainerProps) {

"javi.gauxachs@gmail.com";
"holaquetaaaal";
  const [email, setEmail] = useState<string>("");
  const [pass, setPass] = useState<string>("");
  const [loginError, setLoginError] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const { push } = useRouter();

  const checkErrors = () => {
      if(email=="") {setErrorMsg("You must fill the email input"); setLoginError(true); return true;};
      if(pass=="") {setErrorMsg("You must fill the password input"); setLoginError(true); return true;};
      if(!email.includes("@")) {setErrorMsg("You must set the email in the correct format"); setLoginError(true); return true;};
      if(pass.length<6) {setErrorMsg("Your password must be longer than 6 characters"); setLoginError(true); return true;};

      return false;
  }

  const OnLogin = async () => {
    if(!checkErrors()){
      try {
        const respuesta = await axios.post("http://localhost:3333/api/users/login", {email: email, password: pass});
        if(respuesta.data.message=="Login successful"){
          localStorage.setItem('user', JSON.stringify(respuesta.data.user));
          push('/mainPage');
        }
      } catch (error: any) {  

        if(error.response.data.message==="Incorrect email or password") setErrorMsg("Account not found. Recheck your entries");
        setLoginError(true);
        console.log(error.response.data.message);
      }
    }
  }

  useEffect(() => {
    if(loginError) setLoginError(false)
  }, [email, pass])

  return (
    <div
      className={`absolute left-0 top-0 z-10 h-full w-1/2 transition duration-500   ease-in-out ${
        bool !== true ? "translate-x-full opacity-100" : null
      }`}
    >
      <form
        onSubmit={(e) => {e.preventDefault(); OnLogin()}}
        className="mx-auto flex h-full w-2/3 flex-col items-center justify-evenly  bg-white p-8 shadow-none"
      >
        <p className="text-center text-4xl font-bold">Log In</p>
        <div className="w-full">
          <div className="mb-4 w-full">
            <label htmlFor="email" className=" block font-bold">
              E-mail
            </label>
            <InputUserForm id={"email"} type={"email"} placeholder={""} param={email} setParam={setEmail} />
          </div>
          <div className=" w-full">
            <label htmlFor="password" className="block font-bold">
              Password
            </label>
            <InputUserForm id={"password"} type={"password"} placeholder={""} param={pass} setParam={setPass}/>
          </div>
          {loginError ? <p className="text-red-500">{errorMsg}</p> : null}
          </div>
        <button
          type="submit"
          className="w-full rounded border border-black bg-black px-4 py-2 font-bold text-white transition duration-200 hover:scale-95"
        >
          NEXT!
        </button>
      </form>
    </div>
  );
}
