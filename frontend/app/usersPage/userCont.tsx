"use client";

import React from "react";
import SignUpContainer from "./SignUpContainer";
import LogInContainer from "./LogInContainer";
import OverlayContainer from "./Overlay";

export function UserCont(props: any) {
  const [signIn, toggle] = React.useState(true);

  return (
    <div className="flex flex-col w-full gap-8">
      
      <div className="bg-white rounded-lg relative overflow-hidden w-1/2 h-80">
        <OverlayContainer bool={signIn} a={toggle}></OverlayContainer>
        <SignUpContainer bool={signIn}></SignUpContainer>
        <LogInContainer bool={signIn}></LogInContainer>
      </div>

      <button
        className="border border-black hover:bg-red-400 z-50"
        onClick={() => toggle(!signIn)}
      >
        TOGGLE BOOL
      </button>
    </div>
  );
}
