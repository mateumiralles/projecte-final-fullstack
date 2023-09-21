import InputUserForm from "./InputUserForm";
type SignUpCard2 = {
  pass: string;
  setPass: React.Dispatch<React.SetStateAction<any>>
  pass2: string;
  setPass2: React.Dispatch<React.SetStateAction<any>>
};


export default function SignUpCard1({
  pass,
  setPass,
  pass2,
  setPass2,
}: SignUpCard2) {

  return (
    <div className="mb-4 flex flex-col gap-4 w-full">
      <p className="text-center text-lg">
        Introduce a valid password to end the registration
      </p>
      <InputUserForm
        id={"password"}
        type={"pasword"}
        placeholder={"Password"}
        param={pass}
        setParam={setPass}
      />
      <InputUserForm
        id={"password2"}
        type={"pasword"}
        placeholder={"Confrim Password"}
        param={pass2}
        setParam={setPass2}
      />
    </div>
  );
}
