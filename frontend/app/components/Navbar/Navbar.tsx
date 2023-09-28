"use client";
import axios from "axios";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import NavbarIconButton from "./NavbarIconButton";
import NavbarTile from "./NavbarTile";
import UserProfile from "./UserProfile";
export default function Navbar() {
  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [profile, setProfile] = useState<boolean>(false);
  const [numBasket, setBasket] = useState(0);
  const [user, setUser] = useState();

  const Logout = async (id: number) => {
    try {
      const logout = await axios.post(
        `http://localhost:3333/api/users/${id}/logout`,
      );
      if (logout.status === 200) {
        localStorage.removeItem("user");
        setProfile(false);
        replace("/");
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const getUser = async () => {
    const userLocal = JSON.parse(localStorage.getItem("user")!);
    if (userLocal) {
      setUser(userLocal);
      try {
        const obtainUser = await axios.get(
          `http://localhost:3333/api/users/${userLocal.id}`,
        );
        if (obtainUser.status === 200) {
          if (obtainUser.data.token === null) {
            Logout(obtainUser.data.id);
          } else {
            try {
              const userCart = await axios.get(
                `http://localhost:3333/api/users/${obtainUser.data.id}/cart`,
              );
              if (userCart.status === 200) {
                setBasket(userCart.data.CartItem.length);
              }
            } catch (error: any) {
              console.log(error);
            }
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    } else {
      setUser(undefined);
      setBasket(0);
    }
  };

  useEffect(() => {
    setProfile(false);
    getUser();
  }, [pathname, searchParams]);

  return (
    <div className="group flex flex-row items-center pt-4 transition duration-300  hover:-translate-y-3  hover:bg-slate-100 hover:opacity-90">
      <div className="lg:px8 flex h-16 flex-1 items-center px-4 sm:px-6 ">
        <Link href="/" className="mx-4 flex gap-x-2 lg:ml-0">
          <p className="text-xl font-bold">DRIPPIN'POPE</p>
        </Link>

        <NavbarTile title="Woman" category="ladies" />
        <NavbarTile title="Man" category="men" />
        <NavbarTile title="Kids" category="kids" />
        <NavbarTile title="Outlet" category="outlet" />
      </div>
      <div className="flex-4 mr-14 flex flex-row gap-5 ">
        {user ? (
          <button onClick={() => setProfile(!profile)}>
            <NavbarIconButton svgName="/userIcon.svg" />
            {profile ? (
              <UserProfile
                setProfile={setProfile}
                logout={Logout}
                user={user}
              />
            ) : null}
          </button>
        ) : (
          <Link href="/usersPage">
            <NavbarIconButton svgName="/userIcon.svg" />
          </Link>
        )}
        {numBasket === 0 ? (
          <Link href={user ? "/basketPage" : "/usersPage"}>
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
