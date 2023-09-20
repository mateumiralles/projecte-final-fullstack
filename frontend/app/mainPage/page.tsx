"use client";

import { useEffect } from "react";
import Intro from "./Intro";
import Description from "./Description";
import CategorySelector from "./categorySelector";

export default function mainPage() {
  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import("locomotive-scroll")).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);
  return (
    <main>
      <Intro />
      <Description/>
      <CategorySelector/>
    </main>
  );
}
