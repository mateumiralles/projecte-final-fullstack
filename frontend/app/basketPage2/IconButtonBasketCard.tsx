type IconButtonBasketCardProps = {
  func: void;
  char: string;
};

export default function IconButtonBasketCard({
  func,
  char
}: IconButtonBasketCardProps) {
  return (
    <div
      className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-black transition duration-150 ease-in-out hover:scale-95 hover:bg-black hover:text-white"
      onClick={() => func}
    >
      <p className="pb-1 font-bold">{char}</p>
    </div>
  );
}
