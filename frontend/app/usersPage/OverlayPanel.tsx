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
      <div className="flex h-full flex-col items-center justify-evenly">
        <p className="text-center text-4xl font-bold text-white">{title}</p>
        <p className="w-1/2 text-center text-lg text-white">{text}</p>
        <button
          className="w-1/2 rounded border bg-white p-1 text-lg font-bold transition duration-200 hover:scale-95"
          onClick={() => toggleFunction(!bool)}
        >
          {button}
        </button>
      </div>
    </div>
  );
}
