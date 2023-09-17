"use client";

import InputUserForm from "./InputUserForm";

type SignUpContainerProps = {
  bool: Boolean;
};

export default function SignUpContainer(props: SignUpContainerProps) {
  return (
    <div
      className={`absolute top-0 h-full left-0 transition ease-in-out duration-500 w-1/2   z-10 ${
        props.bool !== true ? "translate-x-full opacity-100 z-20" : "opacity-0"
      }`}
    >
      <form
        // onSubmit={handleSignUp}
        className="w-2/3 h-full mx-auto bg-white p-8 shadow-none flex flex-col justify-center"
      >
        <p className="text-2xl text-center font-bold mb-4">SIGN UP</p>
        <div className="mb-4"></div>
        <div className="mb-4 flex flex-col gap-4">
          <InputUserForm id={"name"} type={"name"} placeholder={"Name"} />
          <InputUserForm id={"surname"} type={"text"} placeholder={"Surname"} />
          <InputUserForm id={"email"} type={"email"} placeholder={"Email"} />
        </div>
        <button
          type="submit"
          className="w-full text-white bg-black font-bold hover:scale-95 py-2 px-4 border border-black rounded transition duration-200"
        >
          NEXT!
        </button>
      </form>
    </div>
  );
}
