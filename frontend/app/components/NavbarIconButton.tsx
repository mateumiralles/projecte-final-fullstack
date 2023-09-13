import Image from 'next/image'

interface svgProps {
    svgName: string;
    
  }

export default function NavbarIconButton({svgName}:svgProps) {
  return (
    <button className="group w-7 h-7 flex items-center justify-center rounded-full  hover:border  hover:border-black hover:scale-150 transition duration-200">
      <Image
              src={svgName}
              
              alt="Vercel Logo"
              className="dark:invert"
              width={20}
              height={20}
              priority
            />
     
    </button>
  );
}
