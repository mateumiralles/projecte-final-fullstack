"use client";
import Link from "next/link";
import NavbarIconButton from "./NavbarIconButton";
import NavbarTile from "./NavbarTile";
import UserProfile from "./UserProfile";
import { useState } from "react";

export default function Navbar() {
  const user = localStorage.getItem("user");
  const [profile, setProfile] = useState<boolean>(false);
  const [numBasket, setBasket] = useState(2);

  return (
    <div className="group flex flex-row items-center pt-4 transition duration-300  hover:-translate-y-3  hover:bg-slate-100 hover:opacity-90">
      <div className="lg:px8 flex h-16 flex-1 items-center px-4 sm:px-6 ">
        <Link href="/mainPage" className="mx-4 flex gap-x-2 lg:ml-0">
          <p className="text-xl font-bold">DRIPPIN'POPE</p>
        </Link>

        <NavbarTile title="Sneakers" link="/Sneakers" />
        <NavbarTile title="Sweatshirt" link="/Sweatshirts" />
        <NavbarTile title="Trousers" link="/Trousers" />
      </div>
      <div className="flex-4 mr-14 flex flex-row gap-5 ">
        {user ? (
          <button onClick={() => setProfile(!profile)}>
            <NavbarIconButton svgName="/userIcon.svg" />
            {profile ? <UserProfile setProfile={setProfile} /> : null}
          </button>
        ) : (
          <Link href="/usersPage">
            <NavbarIconButton svgName="/userIcon.svg" />
          </Link>
        )}
        {numBasket === 0 ? (
          <Link href="/basketPage">
            <NavbarIconButton svgName="/shoppingBagIcon.svg" />
          </Link>
        ) : (
          <Link href="/basketPage">
            <div className="relative flex h-7 w-7  flex-col rounded-full">
              <NavbarIconButton
                svgName="/shoppingBagIcon.svg"
                numIndicator={
                  <div className="absolute right-0 top-1/2 z-30 flex h-4 w-4 items-center justify-center rounded-xl bg-red-500 p-1 text-xs font-bold text-white">
                    {numBasket}
                  </div>
                }
              />
            </div>
          </Link>
        )}
      </div>
    </div>
  );
}
