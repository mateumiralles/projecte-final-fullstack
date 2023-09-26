"useClient";

import React from "react";
import Image from "next/image";

type ProcessPurchaseSliderProps = {
  type: string;
  title: string;
  content: React.ReactNode;
};

export default function ProcessPurchaseSlider({
  type,
  title,
  content,
}: ProcessPurchaseSliderProps) {
  const handleSlidersExpand = (type: string) => {
    let contentHeight;

    const expandSlider = document.getElementById(`expand${type}`)!;
    const arrowImg = document.getElementById(`arrow${type}`)!;
    contentHeight = expandSlider.scrollHeight + "px";
    console.log(expandSlider.style.maxHeight != "");
    if (expandSlider.style.maxHeight === contentHeight) {
      expandSlider.style.maxHeight = "0px";
      arrowImg.style.rotate = "180deg";
    } else {
      expandSlider.style.maxHeight = contentHeight;
      arrowImg.style.rotate = "0deg";
    }
  };

  return (
    <div className="overflow-hidden rounded border border-black  ">
      <div
        className="flex  flex-row justify-between border-b border-black py-5 px-5 transition ease-in-out hover:cursor-pointer hover:bg-gray-300 "
        onClick={() => {
          handleSlidersExpand(type);
        }}
      >
        <h1 className="text-lg font-bold">{title}</h1>
        <Image
          id={`arrow${type}`}
          src={"/sliderArrow.svg"}
          alt=""
          width={20}
          height={20}
          priority
        />
      </div>
      <div
        id={`expand${type}`}
        className="transition-max-height px-5 duration-300 ease-in-out "
      >
        <div>{content}</div>
      </div>
    </div>
  );
}
