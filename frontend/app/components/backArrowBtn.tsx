import Image from "next/image";

type BackArrowBtnProps = {
  func: React.Dispatch<React.SetStateAction<any>>;
  type: string;
};

export default function BackArrowBtn({ func, type }: BackArrowBtnProps) {
  return (
    <button
      type="button"
      className={`relative -left-10 flex h-7 w-7 items-center justify-center  rounded-full transition duration-200 hover:scale-125 hover:border hover:border-black`}
      onClick={() => func(type === "signUp" ? false : -1)}
    >
      <Image
        src="/left-arrow.svg"
        alt=""
        className=""
        width={20}
        height={20}
        priority
      />
    </button>
  );
}
