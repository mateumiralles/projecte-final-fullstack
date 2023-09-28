import gsap from "gsap";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";

export default function UserProfile(props: {
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  logout: (id: number) => Promise<void>;
  user: any;
}) {
  const box = useRef(null);
  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(box.current, { opacity: 1, duration: 1, y: 0 });
    });
  }, []);

  return (
    <div
      className="absolute right-0 top-full flex w-96 translate-y-5 cursor-default flex-col rounded border border-black bg-white opacity-0"
      ref={box}
    >
      <h1 className="my-5 text-2xl font-bold">Hi, {props.user.name}</h1>
      <div className="mb-5 flex h-full flex-col gap-5">
        <Link href="/ordersPage">
          <p
            className="mx-5 flex cursor-pointer items-center justify-center rounded border border-black p-4 transition duration-300 ease-in-out hover:scale-95 hover:bg-black hover:text-white"
            title="Go to previous orders"
          >
            Order history
          </p>
        </Link>
        <Link href="/wishlistPage">
          <p
            className="mx-5 flex cursor-pointer items-center justify-center rounded border border-black p-4 transition duration-300 ease-in-out hover:scale-95 hover:bg-black hover:text-white"
            title="Go to wishlist"
          >
            Wishlist
          </p>
        </Link>
      </div>
      <div
        className="group cursor-pointer rounded border-t border-black  transition  duration-200 ease-in-out hover:bg-red-500 "
        onClick={() => props.logout(props.user.id)}
      >
        <p className="p-5 text-lg font-bold transition duration-200  hover:scale-90 hover:text-white">
          Log Out
        </p>
      </div>
    </div>
  );
}
