import Image from "next/image";

type svgProps = {
  svgName: string;
};

export default function NavbarIconButton({ svgName }: svgProps) {
  return (
    <button className="group flex h-7 w-7 items-center justify-center rounded-full  transition  duration-200 hover:scale-150 hover:border hover:border-black">
      <Image
        src={svgName}
        alt=""
        className=""
        width={20}
        height={20}
        priority
      />
    </button>
  );
}
