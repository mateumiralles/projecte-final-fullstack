import InputUserForm from "./InputUserForm";

export default function SignUpCard1() {
  return (
    <div className="mb-4 flex flex-col gap-4 ">
      <p className="text-lg text-center">Introduce a valid password to end the registration</p>
      <InputUserForm id={"password"} type={"pasword"} placeholder={"Password"} />
      <InputUserForm id={"password2"} type={"pasword"} placeholder={"Confrim Password"} />
    </div>
  );
}
