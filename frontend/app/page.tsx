"use client";

import { useEffect } from "react";
import Description from "./components/Description";
import Intro from "./components/Intro";
import SlidingProducts from "./components/SlidingProducts";
import CategorySelector from "./components/categorySelector";

export default function Home() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  return (
    <main>
      <Intro />
      <Description />
      <CategorySelector />
      <SlidingProducts />
    </main>
  );
}
