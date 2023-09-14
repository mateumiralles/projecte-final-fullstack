export default function basketPage() {
  return (
    <main className="flex flex-row gap-2 justify-center content-center">
      <div className="w-full min-h-screen flex flex-col justify-center">
        <form
          // onSubmit={handleLogin}
          className="max-w-sm mx-auto bg-white p-8 shadow-md rounded border border-black"
        >
          <p className="text-2xl text-center font-bold mb-4">LOG IN</p>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block  font-bold mb-2"
            >
              ENTER YOUR USERNAME
            </label>
            <input
              type="email"
              id="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-gray-400 rounded focus:outline-none focus:border-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block  font-bold mb-2"
            >
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border bg-slate-50 border-gray-400 rounded focus:outline-none focus:border-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-black font-bold hover:scale-95 py-2 px-4 border border-black rounded transition duration-300"
          >
            NEXT!
          </button>
        </form>
      </div>
      <div className="w-full min-h-screen flex flex-col justify-center">
        <form
          // onSubmit={handleLogin}
          className="max-w-sm mx-auto bg-white p-8 shadow-md rounded border border-black"
        >
          <p className="text-2xl text-center font-bold mb-4">LOG IN</p>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block  font-bold mb-2"
            >
              ENTER YOUR USERNAME
            </label>
            <input
              type="email"
              id="email"
              // value={email}
              // onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-slate-50 border border-gray-400 rounded focus:outline-none focus:border-black"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block  font-bold mb-2"
            >
              PASSWORD
            </label>
            <input
              type="password"
              id="password"
              // value={password}
              // onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 border bg-slate-50 border-gray-400 rounded focus:outline-none focus:border-black"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full text-white bg-black font-bold hover:scale-95 py-2 px-4 border border-black rounded transition duration-300"
          >
            NEXT!
          </button>
        </form>
      </div>
    </main>
  );
}
