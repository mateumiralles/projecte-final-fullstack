
type PopUpFormWindowProps = {
  bool: boolean;
  setBool: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
};

export default function PopUpFormWindow({
  bool,
  setBool,
  content,
}: PopUpFormWindowProps) {
  return (
    <div
    style={{backgroundColor:"rgba(0, 0, 0, 0.7)"}}
     className={`${bool ? "block":"hidden"} absolute w-full h-full z-20 top-0 cursor-pointer`}
    onClick={() => setBool(false)}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative left-[50%] top-[50%] h-[50%] w-[60%] translate-x-[-50%] translate-y-[-50%] rounded border border-black bg-gray-300 cursor-auto"
      >
        {content}

        <p onClick={() => setBool(false)}>X</p>
      </div>
    </div>
  );
}
