"use client";
import React from "react";
import SignUpContainer from "./SignUpContainer";
import LogInContainer from "./LogInContainer";
import OverlayContainer from "./Overlay";

export default function userPage() {
  const [signIn, toggle] = React.useState(true);

  return (
    <main className="flex flex-row content-center justify-center gap-2">
      <div className="flex w-full flex-col  items-center">
        <div className="relative -top-20 h-screen w-full overflow-hidden rounded-lg bg-white">
          <OverlayContainer
            bool={signIn}
            toggleFunction={toggle}
          ></OverlayContainer>
          <SignUpContainer bool={signIn}></SignUpContainer>
          <LogInContainer bool={signIn}></LogInContainer>
        </div>
      </div>
    </main>
  );
}
