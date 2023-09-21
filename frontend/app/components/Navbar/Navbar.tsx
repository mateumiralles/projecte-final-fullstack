"use client"
import Link from "next/link";
import NavbarIconButton from "./NavbarIconButton";
import NavbarTile from "./NavbarTile";
import UserProfile from "./UserProfile";
import { useState } from "react";

export default function Navbar() {
  const user = localStorage.getItem('user');
  const [profile, setProfile] = useState<boolean>(false);
  

  return (
    <div className="group flex flex-row items-center pt-4 transition duration-300  hover:-translate-y-3  hover:bg-slate-100">
      <div className="lg:px8 flex h-16 flex-1 items-center px-4 sm:px-6 ">
        <Link href="/" className="mx-4 flex gap-x-2 lg:ml-0">
          <p className="text-xl font-bold">PULLANDBEAR</p>
        </Link>

        <NavbarTile title="Sneakers" link="/Sneakers" />
        <NavbarTile title="Sweatshirt" link="/Sweatshirts" />
        <NavbarTile title="Trousers" link="/Trousers" />
      </div>
      <div className="flex-4 mr-14 flex flex-row gap-5 ">
        <Link href="/basketPage">
          <NavbarIconButton svgName="/shoppingBagIcon.svg" />
        </Link>
        {user ? 
        <button onClick={() => setProfile(!profile)}>
          <NavbarIconButton svgName="/userIcon.svg" /> 
          {profile ? <UserProfile
            setProfile={setProfile}
          />: null}
        </button>
        : 
        <Link href="/usersPage">          
          <NavbarIconButton svgName="/userIcon.svg" />
        </Link>} 

      </div>
    </div>
  );
}
