"useClient";

import React from "react";
import handleSlidersExpand from "./handleSlidersExpandFunction";

type ProcessPurchaseSliderProps = {
  type: string;
  title: string;
  content: React.ReactNode;

};

export default function ProcessPurchaseSlider({
  type,
  title,
  content
}: ProcessPurchaseSliderProps) {
  return (
    <div className="overflow-hidden rounded border border-black px-5 transition ease-in-out hover:bg-gray-300">
      <div
        className="my-5 flex flex-row justify-between border-b border-black pb-1 hover:cursor-pointer"
        onClick={() => {
          handleSlidersExpand(type);
        }}
      >
        <h1 className="text-lg font-bold">{title}</h1>
        <p>\/</p>
      </div>
      <div
        id={`expand${type}`}
        className="transition-max-height duration-300 ease-in-out"
      ><div>{content}</div>
        
        
      </div>
    </div>
  );
}
