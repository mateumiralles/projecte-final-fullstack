import axios from "axios";
import { useState } from "react";

type PopUpFormWindowProps = {
  bool: boolean;
  setBool: React.Dispatch<React.SetStateAction<boolean>>;
  content: React.ReactNode;
};

export default function PopUpFormWindow({
  bool,
  setBool,
  content,
}: PopUpFormWindowProps) {
  return (
    <div
      style={bool ? { display: "block" } : { display: "none" }}
      className="absolute left-[50%] top-[50%] z-10 h-[50%] w-[50%] translate-x-[-50%] translate-y-[-50%] rounded border border-black bg-white"
    >
      {content}

      <p onClick={() => setBool(false)}>X</p>
    </div>
  );
}
