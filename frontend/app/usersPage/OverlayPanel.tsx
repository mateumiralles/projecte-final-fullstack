type OverlayPanelProps = {
  position: Number;
  title: String;
  text: String;
  button: String;
  bool: Boolean;
  toggleFunction: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function OverlayPanel({
  position,
  title,
  text,
  button,
  bool,
  toggleFunction,
}: OverlayPanelProps) {
  return (
    <div
      className={`absolute top-0 h-full w-1/2 bg-black transition duration-500 ease-in-out ${
        position === 1 ? "right-0 translate-x-0" : "-translate-x-1/4"
      } ${bool !== true && position === 1 ? "translate-x-1/4" : null}  ${
        bool !== true && position === 2 ? "translate-x-0" : null
      }`}
    >
      <div className="h-full flex flex-col justify-evenly items-center">
        <p className="font-bold text-2xl text-white text-center">{title}</p>
        <p className="w-1/2 text-lg text-white text-center">{text}</p>
        <button
          className="w-1/2 border rounded border-white text-white font-bold text-lg p-1 hover:scale-95 transition duration-200"
          onClick={() => toggleFunction(!bool)}
        >
          {button}
        </button>
      </div>
    </div>
  );
}
