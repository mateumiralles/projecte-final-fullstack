import InputUserForm from "./InputUserForm";

type SignUpCard1 = {
  name: string;
  setName: React.Dispatch<React.SetStateAction<any>>
  surname: string;
  setSurname: React.Dispatch<React.SetStateAction<any>>
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<any>>;
};

export default function SignUpCard1({
  name,
  setName,
  surname,
  setSurname,
  email,
  setEmail
}: SignUpCard1) {



  return (
    <div className="mb-4 w-full flex flex-col gap-4 ">
      <InputUserForm id={"name"} type={"name"} placeholder={"Name"} param={name} setParam={setName} />
      <InputUserForm id={"surname"} type={"text"} placeholder={"Surname"} param={surname} setParam={setSurname}/>
      <InputUserForm id={"email"} type={"email"} placeholder={"Email"} param={email} setParam={setEmail}/>
    </div>
  );
}
