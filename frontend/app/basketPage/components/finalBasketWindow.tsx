import gsap from "gsap";
import { useLayoutEffect, useRef } from "react";

export default function FinalBasketWindow() {
  const window = useRef(null);
  const text1 = useRef(null);
  const text2 = useRef(null);
  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(window.current, { opacity: 1, duration: 2 });
    });
    gsap.context(() => {
      gsap.to(text1.current, { opacity: 1, y: -100, duration: 3 });
    });
    setTimeout(() => {
      gsap.context(() => {
        gsap.to(text2.current, { opacity: 1, y: -100, duration: 3 });
      });
    }, 1000);
    setTimeout(() => {
      gsap.to(window.current, { opacity: 0, duration: 5 });
      gsap.to(text1.current, { opacity: 0, y: +100, duration: 3 });
      gsap.to(text2.current, { opacity: 0, y: +100, duration: 3 });
    }, 5000);
  }, []);
  return (
    <div
      className="oncli absolute top-0 z-50 h-full w-full bg-black bg-opacity-90 text-white opacity-0"
      ref={window}
    >
      <div className="flex h-full w-full flex-col items-center justify-center gap-5 p-36 ">
        <p className="text-center text-4xl opacity-0" ref={text1}>
          Your order is being processed...
        </p>
        <p className="text-center text-4xl opacity-0" ref={text2}>
          Thank you trusting in <b>Drippin&apos; Pope</b>!
        </p>
      </div>
    </div>
  );
}
