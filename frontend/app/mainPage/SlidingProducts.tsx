import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import templateImg from "../../public/background.webp";

export default function SlidingProducts() {
  const slider1 = [
    {
      color: "#e3e3e3",
      src: templateImg,
    },
    {
      color: "#21242b",
      src: templateImg,
    },
    {
      color: "#e3e5e7",
      src: templateImg,
    },
    {
      color: "#d6d7dc",
      src: templateImg,
    },
  ];

  const slider2 = [
    {
      color: "#d4e3ec",
      src: templateImg,
    },
    {
      color: "#e5e0e1",
      src: templateImg,
    },
    {
      color: "#e1dad6",
      src: templateImg,
    },
    {
      color: "#d7d4cf",
      src: templateImg,
    },
  ];

  const sl1 = useRef(null);
  const sl2 = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(sl1.current, {
      scrollTrigger: {
        trigger: sl1.current,
        start: "0px bottom",
        end: "bottom+=400px bottom",
        scrub: true,
      },
      left: "300px",
    });

    gsap.from(sl2.current, {
      scrollTrigger: {
        trigger: sl2.current,
        start: "0px bottom",
        end: "bottom+=400px bottom",
        scrub: true,
      },
      right: "300px",
    });
  });

  return (
    <div className="my-96 flex flex-col gap-10 overflow-hidden">
   
      <div className="relative  flex w-full gap-7" ref={sl1}>
        {slider1.map((product, i) => {
          return (
            <div
              key={`s2_${i}`}
              style={{ backgroundColor: product.color }}
              className="flex h-80 w-1/4 items-center justify-center"
            >
              <div className="relative h-4/5 w-4/5">
                <Image
                  className="object-cover"
                  src={product.src}
                  alt="image"
                  fill={true}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative  flex w-full gap-7" ref={sl2}>
        {slider2.map((product, i) => {
          return (
            <div
              key={`s2_${i}`}
              style={{ backgroundColor: product.color }}
              className="flex h-80 w-1/4 items-center justify-center"
            >
              <div className="relative h-4/5 w-4/5">
                <Image
                  className="object-cover"
                  src={product.src}
                  alt="image"
                  fill={true}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
