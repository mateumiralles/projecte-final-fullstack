"use client";

import Image from "next/image";
import { useState } from "react";
import SignUpCard1 from "./SignUpCard1";
import SignUpCard2 from "./SignUpCard2";

type SignUpContainerProps = {
  bool: Boolean;
};

export default function SignUpContainer(props: SignUpContainerProps) {
  const [signUpToggle, setSignUpToggle] = useState(false);

  return (
    <div
      className={`absolute top-0 h-full left-0 transition ease-in-out duration-500 w-1/2   z-10 ${
        props.bool !== true ? "translate-x-full opacity-100 z-20" : "opacity-0"
      }`}
    >
      <form
        // onSubmit={handleSignUp}
        className="w-2/3 h-full mx-auto bg-white p-8 shadow-none flex flex-col justify-center"
      >
        {signUpToggle === false ?  <p className="text-2xl text-center font-bold mb-4 ">SIGN UP</p> : (
          <div className="flex flex-row">
            <button
              type="button"
              className={`w-7 h-7 flex items-center justify-center rounded-full  hover:border  hover:border-black hover:scale-150 transition duration-200 relative -left-10`}
              onClick={() => {
                setSignUpToggle(!signUpToggle);
              }}
            >
              <Image
                src="/left-arrow.svg"
                alt=""
                className=""
                width={20}
                height={20}
                priority
              />
            </button>
            <p className="text-2xl text-center w-full font-bold mb-4 mr-6">SIGN UP</p>
          </div>
        )}

        <div className="mb-4"></div>
        {signUpToggle === false ? <SignUpCard1 /> : <SignUpCard2 />}

        <button
          type="button"
          className="w-full text-white bg-black font-bold hover:scale-95 py-2 px-4 border border-black rounded transition duration-200"
          onClick={() => {
            setSignUpToggle(!signUpToggle);
          }}
        >
          NEXT!
        </button>
      </form>
    </div>
  );
}
