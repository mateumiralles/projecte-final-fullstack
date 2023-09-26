import Link from "next/link";

type PopupProps = {
    message: string | undefined,
    type: number;
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<any>>;
  };

export default function PopupConfirm({ message, type, visible, setVisible }: PopupProps){
    return (
        <>
        {visible ?
            <div className="absolute left-[50%] bottom-4 translate-x-[-50%] border border-black rounded flex flex-row p-5 w-[500px] justify-between">
            
                <p className={`${type===2 ? "text-red-600" : ""}`}>{message}</p>
                <Link href={type===0 ? "/basketPage" : type===1 ? "/wishlistPage" : ""}>
                <p className="underline hover:scale-95 transition">{type===0 ? "Go to cart" : type===1 ? "Go To Wishlist" : ""}</p>
                </Link>
                <p onClick={() => setVisible(false)} className="font-bold cursor-pointer hover:scale-90 transition">X</p>
        </div>
        : null}
        </>
    )
}