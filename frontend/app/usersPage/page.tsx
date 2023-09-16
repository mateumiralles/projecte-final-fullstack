"use client";
import React from "react";
import SignUpContainer from "./SignUpContainer";
import LogInContainer from "./LogInContainer";
import OverlayContainer from "./Overlay";

export default function userPage() {
  const [signIn, toggle] = React.useState(true);

  return (
    <main className="flex flex-row gap-2 content-center justify-center">
      <div className="flex flex-col w-full  items-center">
        <div className="bg-white rounded-lg relative overflow-hidden w-1/2 h-96">
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
