import Link from "next/link";

type PopupProps = {
    message: string | undefined,
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<any>>;
  };

export default function PopupWarning({ message, visible, setVisible }: PopupProps){
    return (
        <>
        {visible ?
            <div className="absolute left-[50%] bottom-4 translate-x-[-50%] border border-black rounded flex flex-row p-5 w-[500px] justify-between">
                <p className="text-red-500">{message}</p>
                <p onClick={() => setVisible(false)} className="font-bold cursor-pointer hover:scale-90 transition">X</p>
        </div>
        : null}
        </>
    )
}