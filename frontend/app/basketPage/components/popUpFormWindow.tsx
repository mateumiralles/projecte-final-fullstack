import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

type PopUpFormWindowProps = {
  bool: boolean;
  setBool: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
};

export default function PopUpFormWindow({
  bool,
  setBool,
  content,
}: PopUpFormWindowProps) {
  const window = useRef(null);
  const box = useRef(null);
  useLayoutEffect(() => {
    if (bool) {
      gsap.context(() => {
        gsap.to(window.current, {
          opacity: 1,
          duration: 0.3,
          ease: "power1.in",
        });
        gsap.to(box.current, { opacity: 1, duration: 0.3, ease: "power1.in" });
      });
    } else {
      gsap.context(() => {
        gsap.to(window.current, { opacity: 0 });
        gsap.to(box.current, { opacity: 0 });
      });
    }
  }, [bool]);
  return (
    <div
      ref={window}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      className={`${
        bool ? "block" : "hidden"
      } absolute left-0 top-0 z-30 h-full w-full cursor-pointer `}
      onClick={() => setBool(false)}
    >
      <div
        ref={box}
        onClick={(e) => e.stopPropagation()}
        className="relative left-[50%] top-[50%] h-[60%] w-[70%] translate-x-[-50%] translate-y-[-50%] cursor-auto rounded border border-black bg-gray-300 opacity-0"
      >
        {content}
      </div>
    </div>
  );
}
