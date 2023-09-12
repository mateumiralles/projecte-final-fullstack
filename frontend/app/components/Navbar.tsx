import Link from "next/link";
import NavbarTile from "./NavbarTile";

export default function Navbar() {
  return (
    <div className="group flex flex-row items-center pt-4 hover:bg-slate-100 transition  hover:-translate-y-3  duration-300 sticky top-0 z-10">
      <div className="px-4 sm:px-6 lg:px8 flex h-16 items-center ">
        <Link href="/mainPage" className="ml-4 flex lg:ml-0 gap-x-2">
          <p className="font-bold text-xl">PULLANDBEAR</p>
        </Link>
      </div> 
      <NavbarTile title="Sneakers" link="/Sneakers"/>
      <NavbarTile title="Sweatshirt" link="/Sweatshirts"/>
      <NavbarTile title="Trousers" link="/Trousers"/>
      
      
      
    </div>
  );
}
