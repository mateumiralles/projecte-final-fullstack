import Link from "next/link";

type PopupProps = {
  message: string | undefined;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<any>>;
};

export default function PopupWarning({
  message,
  visible,
  setVisible,
}: PopupProps) {
  return (
    <>
      {visible ? (
        <div className="fixed bottom-4 left-[50%] z-30 flex w-[500px] translate-x-[-50%] flex-row justify-between rounded border border-black bg-white p-5">
          <p className="text-red-500">{message}</p>
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
