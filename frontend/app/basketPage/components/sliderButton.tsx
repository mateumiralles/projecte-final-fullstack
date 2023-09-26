type SliderButtonProps = {
    func: React.Dispatch<React.SetStateAction<boolean>>;
    text: string;
};

export default function SliderButton({func, text}:SliderButtonProps) {
  return (
    <div
      onClick={() => func(true)}
      className="my-5 flex cursor-pointer items-center justify-center rounded border border-black bg-black p-4 text-white transition duration-300 ease-in-out hover:scale-95"
    >
      {text}
    </div>
  );
}
