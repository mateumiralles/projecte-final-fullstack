"use client";

import React from "react";
import SignUpContainer from "./SignUpContainer";
import LogInContainer from "./LogInContainer";
import OverlayContainer from "./Overlay";

export function UserCont(props: any) {
  const [signIn, toggle] = React.useState(true);

  return (
    <div className="flex flex-col w-full  items-center">
      
      <div className="bg-white rounded-lg relative overflow-hidden w-2/3 h-96">
        <OverlayContainer bool={signIn} a={toggle}></OverlayContainer>
        <SignUpContainer bool={signIn}></SignUpContainer>
        <LogInContainer bool={signIn}></LogInContainer>
      </div>

      
    </div>
  );
}
