  "use client";
  import Image from "next/image";
  import { useState, useEffect } from "react";
  import SignUpCard1 from "./SignUpCard1";
  import SignUpCard2 from "./SignUpCard2";
  import { useRouter } from 'next/navigation';
  import axios from "axios";

  type SignUpContainerProps = {
    bool: Boolean;
  };

  export default function SignUpContainer(props: SignUpContainerProps) {
    const [signUpToggle, setSignUpToggle] = useState(false);

    const [name, setName] = useState<string>("");
    const [surname, setSurname] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [pass, setPass] = useState<string>("");
    const [pass2, setPass2] = useState<string>("");
    const [registerError, setRegisterError] = useState<boolean>(false);
    const [errorMsg, setErrorMsg] = useState<string>("");
    const { push } = useRouter();
    const { refresh } = useRouter();

    const checkErrors1 = () => {
      if(name=="") {setErrorMsg("You must fill the name input"); setRegisterError(true); return true;}
      else if(name.length<=1) {setErrorMsg("Your name is too short"); setRegisterError(true); return true;}
      else if(surname=="") {setErrorMsg("You must fill the surname input"); setRegisterError(true); return true;}
      else if(email=="") {setErrorMsg("You must fill the email input"); setRegisterError(true); return true;}
      else if(!email.includes("@")) {setErrorMsg("You must set the email in the correct format"); setRegisterError(true); return true;}
      else{
        setSignUpToggle(true);
        setRegisterError(false);
      }
    }

    const checkErrors2 = () => {
        if(pass=="") {setErrorMsg("You must fill the password input"); setRegisterError(true); return true;}
        else if(pass.length<6) {setErrorMsg("Your password must be longer than 6 characters"); setRegisterError(true); return true;}
        else if(pass!==pass2) {setErrorMsg("Both passwords must be the same"); setRegisterError(true); return true;}
        
        return false;
    }

    const OnRegister = async () => {
      if(!checkErrors2()){
        setRegisterError(false);
        try {
          const respuesta = await axios.post("http://localhost:3333/api/users/", {name: name, lastName: surname, email: email, password: pass});
          console.log(respuesta);
          if(respuesta.statusText=="Created"){
            localStorage.setItem('user', JSON.stringify(respuesta.data));
            push('/mainPage');
            refresh();
          }
        } catch (error: any) {  
          if(error.response.data.message=="Account already exists") setErrorMsg("This email is already registered");
          if(error.response.data.message==="Incorrect email or password") setErrorMsg("Account not found. Recheck your entries");
          setRegisterError(true);
          console.log(error.response.data.message);
        }
      }
    }

    useEffect(() => {
      if(registerError) setRegisterError(false)
    }, [email, pass, pass2, name, surname])


    return (
      <div
        className={`absolute left-0 top-0 z-10 h-full w-1/2 transition duration-500   ease-in-out ${
          props.bool !== true ? "z-20 translate-x-full opacity-100" : "opacity-0"
        }`}
      >
        <form
          onSubmit={(e) => {e.preventDefault(); OnRegister()}}
          className="mx-auto flex h-full w-2/3 flex-col items-center justify-evenly bg-white p-8 shadow-none"
        >
          {signUpToggle === false ? (
            <p className="text-center text-4xl font-bold">Sign Up</p>
          ) : (
            <div className="flex flex-row items-baseline">
              <button
                type="button"
                className={`relative -left-10 flex h-7 w-9 items-center justify-center  rounded-full transition duration-200 hover:scale-150 hover:border hover:border-black`}
                onClick={() => {
                  setSignUpToggle(!signUpToggle);
                }}
              >
                <Image
                  src="/left-arrow.svg"
                  alt=""
                  className=""
                  width={20}
                  height={20}
                  priority
                />
              </button>
              <p className="mb-4 mr-6 w-full  text-center text-4xl font-bold">
                Sign Up
              </p>
            </div>
          )}

          {signUpToggle === false ? <SignUpCard1 
          name={name}
          setName={setName}
          surname={surname}
          setSurname={setSurname}
          email={email}
          setEmail={setEmail}

          /> : <SignUpCard2 
          pass={pass}
          setPass={setPass}
          pass2={pass2}
          setPass2={setPass2}
          />}
          {registerError ? <p className="text-red-500">{errorMsg}</p> : null}
          {!signUpToggle ? 
          <button
            className="w-full rounded border border-black bg-black px-4 py-2 font-bold text-white transition duration-200 hover:scale-95"
            onClick={() => {checkErrors1()}}
          >
            NEXT
          </button> 
          :
          <button
            type="submit"
            className="w-full rounded border border-black bg-black px-4 py-2 font-bold text-white transition duration-200 hover:scale-95"
          >
            REGISTER
          </button>
          }

        </form>
      </div>
    );
  }
