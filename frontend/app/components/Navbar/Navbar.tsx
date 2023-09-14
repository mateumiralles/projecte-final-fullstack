import Link from "next/link";
import NavbarIconButton from "./NavbarIconButton";
import NavbarTile from "./NavbarTile";
export default function Navbar() {
  return (
    <div className="group flex flex-row items-center pt-4 hover:bg-slate-100 transition  hover:-translate-y-3  duration-300">
      <div className="flex-1 px-4 sm:px-6 lg:px8 flex h-16 items-center ">
        <Link href="/" className="mx-4 flex lg:ml-0 gap-x-2">
          <p className="font-bold text-xl">PULLANDBEAR</p>
        </Link>

        <NavbarTile title="Sneakers" link="/Sneakers" />
        <NavbarTile title="Sweatshirt" link="/Sweatshirts" />
        <NavbarTile title="Trousers" link="/Trousers" />
      </div>
      <div className="flex-4 flex flex-row mr-14 gap-5 ">
        <Link href="/basketPage">
          <NavbarIconButton svgName="/shoppingBagIcon.svg" />
        </Link>
        <Link href="/usersPage">
          <NavbarIconButton svgName="/userIcon.svg" />
        </Link>
      </div>
    </div>
  );
}
