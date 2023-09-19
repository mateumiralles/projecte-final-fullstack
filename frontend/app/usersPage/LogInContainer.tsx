import InputUserForm from "./InputUserForm";

type LogUpContainerProps = {
  bool: Boolean;
};

export default function LogInContainer({ bool }: LogUpContainerProps) {
  return (
    <div
      className={`absolute left-0 top-0 z-10 h-full w-1/2 transition duration-500   ease-in-out ${
        bool !== true ? "translate-x-full opacity-100" : null
      }`}
    >
      <form
        // onSubmit={handleLogin}
        className="mx-auto flex h-full w-2/3 flex-col items-center justify-evenly  bg-white p-8 shadow-none"
      >
        <p className="text-center text-4xl font-bold">Log In</p>
        <div className="w-full">
          <div className="mb-4 w-full">
            <label htmlFor="email" className=" block font-bold">
              E-mail
            </label>
            <InputUserForm id={"email"} type={"email"} placeholder={""} />
          </div>
          <div className=" w-full">
            <label htmlFor="password" className="block font-bold">
              Password
            </label>
            <InputUserForm id={"password"} type={"password"} placeholder={""} />
          </div>
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
