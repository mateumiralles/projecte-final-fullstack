import InputUserForm from "./InputUserForm";

export default function SignUpCard1() {
  return (
    <div className="mb-4 flex flex-col gap-4 ">
      <InputUserForm id={"name"} type={"name"} placeholder={"Name"} />
      <InputUserForm id={"surname"} type={"text"} placeholder={"Surname"} />
      <InputUserForm id={"email"} type={"email"} placeholder={"Email"} />
    </div>
  );
}
