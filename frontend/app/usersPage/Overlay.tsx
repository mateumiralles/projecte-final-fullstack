type OverlayProps = {
  bool: Boolean;
  a: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OverlayContainer({ bool, a }: OverlayProps) {
  return (
    <div
      className={`absolute top-0 left-1/2  w-full h-full  transition  duration-500 ease-in-out z-20 ${
        bool !== true ? "-translate-x-full" : null
      }`}
    >
      <div
        className={`bg-yellow-400 relative -left-full h-full w-full transition translate-x-0 duration-500 ease-in-out ${
          bool !== true ? "translate-x-1/2" : null
        }`}
      >
        {/* -- LEFT OVERLAY PANEL -- */}
        <div className={`-translate-x-1/4 ${bool !== true ? "translate-x-0" : null}`}>
          <p>Welcome Back!</p>
          <button
            className="border border-black hover:bg-red-400 "
            onClick={() => a(!bool)}
          >
            LOS APARATOS
          </button>
        </div>
       
        {/* -- RIGHT OVERLAY PANEL -- */}
        <div className={`right-0 translate-x-0 ${bool !== true ? "translate-x-1/4" : null}`}>
          <p>Welcome Back!</p>
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
