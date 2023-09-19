import Link from "next/link";

type NavbarTileProps = {
  title: string;
  link: string;
};

export default function NavbarTile({ title, link }: NavbarTileProps) {
  return (
    <Link href={link}>
      <p className="text-l  invisible mx-5 group-hover:visible ">{title}</p>
    </Link>
  );
}
