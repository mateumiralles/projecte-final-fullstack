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
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      className={`${
        bool ? "block" : "hidden"
      } absolute top-0 left-0 z-20 h-full w-full cursor-pointer`}
      onClick={() => setBool(false)}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative left-[50%] top-[50%] h-[60%] w-[70%] translate-x-[-50%] translate-y-[-50%] cursor-auto rounded border border-black bg-gray-300"
      >
        {content}
      </div>
    </div>
  );
}
