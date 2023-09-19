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
        className="mx-auto flex h-full w-2/3 flex-col justify-center bg-white p-8 shadow-none"
      >
        <p className="mb-4 text-center text-2xl font-bold">LOG IN</p>
        <div className="mb-4">
          <label htmlFor="email" className="mb-2  block font-bold">
            ENTER YOUR EMAIL
          </label>
          <InputUserForm id={"email"} type={"email"} placeholder={""} />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="mb-2  block font-bold">
            PASSWORD
          </label>
          <InputUserForm id={"password"} type={"password"} placeholder={""} />
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
