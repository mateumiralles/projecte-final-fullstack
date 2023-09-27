import { ScriptProps } from "next/script";
import React, { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Description() {
  const textLines = [
    "Welcome to our site,",  
    "Where fashion meets convenience,",
    "and your wardrobe dreams come to life.",
    "Designed to empower you with style and confidence."
   
  ];

  return (
    <div className="relative z-20 ml-[10vw] mt-[40vh] text-4xl text-white">
      {textLines.map((line, i) => {
        return <AnimatedText key={i}>{line}</AnimatedText>;
      })}
    </div>
  );
}

function AnimatedText({ children }: ScriptProps) {
  const text = useRef(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(text.current, {
      scrollTrigger: {
        trigger: text.current,
        start: "0px bottom",
        end: "bottom+=400px bottom",
        scrub: true,
      },
      left: "-200px",
      opacity: 0,
    });
  });

  return (
    <p className="relative uppercase" ref={text}>
      {children}
    </p>
  );
}
