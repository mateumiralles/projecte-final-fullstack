import InputUserForm from "./InputUserForm";

type LogUpContainerProps = {
  bool: Boolean;
};

export default function LogInContainer({ bool }: LogUpContainerProps) {
  return (
    <div
      className={`absolute top-0 h-full left-0 transition ease-in-out duration-500 w-1/2   z-10 ${
        bool !== true ? "translate-x-full opacity-100" : null
      }`}
    >
      <form
        // onSubmit={handleLogin}
        className="w-2/3 h-full mx-auto bg-white p-8 shadow-none flex flex-col justify-center"
      >
        <p className="text-2xl text-center font-bold mb-4">LOG IN</p>
        <div className="mb-4">
          <label htmlFor="email" className="block  font-bold mb-2">
            ENTER YOUR EMAIL
          </label>
          <InputUserForm id={"email"} type={"email"} placeholder={""} />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block  font-bold mb-2">
            PASSWORD
          </label>
          <InputUserForm id={"password"} type={"password"} placeholder={""} />
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
