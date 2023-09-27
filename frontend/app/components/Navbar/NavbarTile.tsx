import Link from "next/link";

type NavbarTileProps = {
  title: string;
  category: string;
};

export default function NavbarTile({ title, category }: NavbarTileProps) {
  return (
    <Link href={`/productsList?category=${category}`}>
      <p className="text-l  invisible mx-5 group-hover:visible ">{title}</p>
    </Link>
  );
}
