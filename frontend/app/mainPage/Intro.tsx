"use client";

import React, { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import background2 from "../../public/background.webp";
import intro1 from "../../public/intro.jpg";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Index() {
  const background = useRef(null);
  const introImage = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: document.documentElement,
        start: "top",
        end: "+=400px",
        scrub: true,
        markers: true,
      },
    });

    timeline
      .from(background.current, { clipPath: "inset(6%)" })
      .to(introImage.current, { height: "200px" }, 0);
  }, []);

  return (
    <div className="relative -top-20 flex w-full justify-center">
      <div
        className="absolute h-[140vh] w-full brightness-[30%]	"
        ref={background}
      >
        <Image
          src={background2}
          fill={true}
          alt="background image"
          priority={true}
        />
      </div>
      <div className="relative mt-52 flex justify-center">
        <div
          ref={introImage}
          data-scroll
          data-scroll-speed="0.3"
          className="absolute h-[50vh] w-1/2 brightness-90"
        >
          <Image
            src={intro1}
            alt="intro image"
            fill={true}
            priority={true}
            className="object-cover object-top"
          />
        </div>
        <h1
          className="z-30 mt-36 whitespace-nowrap text-center text-[100px] font-bold text-white"
          data-scroll
          data-scroll-speed="0.7"
        >
          PULL N' BEAR
        </h1>
      </div>
    </div>
  );
}
