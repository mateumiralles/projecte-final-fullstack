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
      className={`absolute left-0 top-0 z-10 h-full w-1/2 transition duration-500   ease-in-out ${
        props.bool !== true ? "z-20 translate-x-full opacity-100" : "opacity-0"
      }`}
    >
      <form
        // onSubmit={handleSignUp}
        className="mx-auto flex h-full w-2/3 flex-col items-center justify-evenly bg-white p-8 shadow-none"
      >
        {signUpToggle === false ? (
          <p className="text-center text-4xl font-bold">Sign Up</p>
        ) : (
          <div className="flex flex-row items-baseline">
            <button
              type="button"
              className={`relative -left-10 flex h-7 w-9 items-center justify-center  rounded-full transition duration-200 hover:scale-150 hover:border hover:border-black`}
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
            <p className="mb-4 mr-6 w-full  text-center text-4xl font-bold">
              Sign Up
            </p>
          </div>
        )}

        {signUpToggle === false ? <SignUpCard1 /> : <SignUpCard2 />}

        <button
          type="button"
          className="w-full rounded border border-black bg-black px-4 py-2 font-bold text-white transition duration-200 hover:scale-95"
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
