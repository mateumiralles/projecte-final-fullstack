import Link from "next/link";

interface NavbarTileProps {
    title: string;
    link: string;
  }

export default function NavbarTile({ title, link }:NavbarTileProps) {
  return (
    <Link href={link}>
    <p className="text-l  invisible group-hover:visible mx-5 ">
      {title}
    </p></Link>
  );
}
