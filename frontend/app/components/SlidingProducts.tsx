import { useState, useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import templateImg from "../../public/background.webp";

export default function SlidingProducts() {
  const slider1 = [
    {
      src: templateImg,
    },
    {
      src: templateImg,
    },
    {
      src: templateImg,
    },
    {
      src: templateImg,
    },
  ];

  const slider2 = [
    {
      src: templateImg,
    },
    {
      src: templateImg,
    },
    {
      src: templateImg,
    },
    {
      src: templateImg,
    },
  ];

const phrase = "Unleash your inner fashionista and discover hidden gems among our curated selection of random products below!";

  const phraseRef = useRef(null);
  const sl1 = useRef(null);
  const sl2 = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(phraseRef.current, {
        scrollTrigger: {
          trigger: phraseRef.current,
          start: "200px bottom",
          end: "bottom+=1000px bottom",
          scrub: true,
        },
        top: "-100px",
        opacity: 0,
      });

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
    <div className="p-44 mt-14 flex flex-col gap-10 overflow-hidden bg-[#001a33]" >
        <div className="flex h-full w-full" ref={phraseRef}>
          <p className="ml-96 my-40 text-4xl font-bold text-white">
         {phrase}
          </p>
        </div>
   
      <div className="relative  flex w-full gap-7" ref={sl1}>
        {slider1.map((product, i) => {
          return (
            <div
              key={`s2_${i}`}
              style={{ backgroundColor: '#D6DBDC' }}
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
              style={{ backgroundColor: '#D6DBDC' }}
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
