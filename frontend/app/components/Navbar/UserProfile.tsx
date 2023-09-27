import Link from "next/link";
export default function UserProfile(props: {
  setProfile: React.Dispatch<React.SetStateAction<any>>;
  logout: (id: number) => Promise<void>;
  user: any;
}) {
  return (
    <div className="absolute right-0 top-full flex w-96 cursor-default flex-col rounded border border-black bg-white">
      <h1 className="my-5 text-lg font-bold">Hi, {props.user.name}</h1>
      <div className="flex flex-col h-full gap-5 mb-5">
      <Link href="/ordersPage">
        <p
          className="mx-5 flex cursor-pointer items-center justify-center rounded border border-black hover:bg-black p-4 hover:text-white transition duration-300 ease-in-out hover:scale-95"
          title="Go to previous orders"
        >
          Order history
        </p>
      </Link>
      <Link href="/wishlistPage">
        <p
          className="mx-5 flex cursor-pointer items-center justify-center rounded border border-black hover:bg-black p-4 hover:text-white transition duration-300 ease-in-out hover:scale-95"
          title="Go to wishlist"
        >
          Wishlist
        </p>
      </Link>
      </div>
      <div
        className="group mt-auto cursor-pointer rounded border-t border-black p-5 font-bold transition  duration-300 ease-in-out hover:bg-red-500 hover:text-white"
        onClick={() => props.logout(props.user.id)}
      >
        <p className="transition duration-200 ease-in-out group-hover:scale-110">
          Log Out
        </p>
      </div>
    </div>
  );
}
