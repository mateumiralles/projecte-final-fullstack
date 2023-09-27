import Link from "next/link";

type PopupProps = {
  message: string | undefined;
  type: number;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
};

export default function PopupConfirm({
  message,
  type,
  visible,
  setVisible,
}: PopupProps) {
  return (
    <>
      {visible ? (
        <div className="fixed  bottom-4 left-[50%] z-30 flex w-[500px] translate-x-[-50%] flex-row justify-between rounded border border-black bg-white p-5">
          <p className={`${type === 2 ? "text-red-600 text-center w-full" : ""}`}>{message}</p>
          <Link
            href={
              type === 0 ? "/basketPage" : type === 1 ? "/wishlistPage" : ""
            }
          >
            <p className="underline transition hover:scale-95">
              {type === 0 ? "Go to cart" : type === 1 ? "Go To Wishlist" : ""}
            </p>
          </Link>
          <p
            onClick={() => setVisible(false)}
            className="cursor-pointer font-bold transition hover:scale-90"
          >
            X
          </p>
        </div>
      ) : null}
    </>
  );
}
