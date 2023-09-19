import InputUserForm from "./InputUserForm";

export default function SignUpCard1() {
  return (
    <div className="mb-4 flex flex-col gap-4 w-full">
      <p className="text-center text-lg">
        Introduce a valid password to end the registration
      </p>
      <InputUserForm
        id={"password"}
        type={"pasword"}
        placeholder={"Password"}
      />
      <InputUserForm
        id={"password2"}
        type={"pasword"}
        placeholder={"Confrim Password"}
      />
    </div>
  );
}
