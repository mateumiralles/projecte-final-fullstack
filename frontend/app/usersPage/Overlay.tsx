type OverlayProps = {
  bool: Boolean;
  a: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OverlayContainer({ bool, a }: OverlayProps) {
  return (
    <div
      className={`absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition  duration-500 ease-in-out z-20 ${
        bool !== true ? "-translate-x-full bg-black color-white" : null
      }`}
    >
      <div
        className={`bg-gray-400 relative -left-full h-full w-[200%] transition translate-x-0 duration-500 ease-in-out ${
          bool !== true ? "translate-x-1/2 bg-black color-white" : null
        }`}
      >

        <div></div>
        {/* -- LEFT OVERLAY PANEL -- */}
        <div className={`absolute flex flex-col top-0 h-full w-1/2 transition duration-500 ease-in-out -translate-x-1/4 ${bool !== true ? "translate-x-0" : null}`}>
          <p>Welcome Back!</p>
          <button
            className="border border-black hover:bg-red-400 "
            onClick={() => a(!bool)}
          >
            LOS APARATOS
          </button>
        </div>
       
        {/* -- RIGHT OVERLAY PANEL -- */}
        <div className={`absolute flex flex-col top-0 h-full w-1/2 transition duration-500 ease-in-out right-0 translate-x-0 ${bool !== true ? "translate-x-1/4" : null}`}>
          <p>JOIN US!</p>
          <button
            className="border border-black hover:bg-red-400 "
            onClick={() => a(!bool)}
          >
            LOS APARATOS
          </button>
        </div>

      </div>
    </div>
  );
}
