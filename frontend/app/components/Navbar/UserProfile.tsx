import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
export default function UserProfile(props: {setProfile: React.Dispatch<React.SetStateAction<any>>, logout: (id: number) => Promise<void>, user: any}){


    return(
        <div className="absolute right-0 top-full w-96 bg-white flex flex-col rounded border border-black cursor-default">
            <h1 className="mt-5 text-lg font-bold">
                Hi, {props.user.name}
            </h1>
            <Link href="/ordersPage">
            <div className="p-5 flex flex-row justify-between cursor-pointer">
                <p>Your orders</p>
                <p>Icon</p>
            </div>
            </Link>
            <Link href="/wishlistPage">
                <div className="p-5 flex flex-row justify-between cursor-pointer">
                    <p>Your wishlist</p>
                    <p>Icon</p>
                </div>
            </Link>
            <button className="mt-auto p-5 hover:text-red-500 border-t border-black cursor-pointer" onClick={() => props.logout(props.user.id)}>CERRAR SESIÓN</button>
        </div>
    )
}