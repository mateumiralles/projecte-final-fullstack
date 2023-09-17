'use client';
import React, { useLayoutEffect, useRef } from 'react'
import styles from './style.module.css';
import Image from 'next/image';
import background2 from "../../public/background.webp";
import intro1 from "../../public/intro.jpg";


export default function Index() {

    const background = useRef(null);
    const introImage = useRef(null);

   
    return (
        <div className="relative w-full flex justify-center -top-20">
            <div className="w-full h-[140vh] absolute brightness-[30%]	" ref={background}>
                <Image 
                    src={background2}
                    fill={true}
                    alt="background image"
                    priority={true}
                />
            </div>
            <div className="flex justify-center relative mt-52">
                    <div ref={introImage} data-scroll data-scroll-speed="0.3" className="brightness-90 w-1/2 h-[50vh] absolute">
                        <Image
                            src={intro1}
                            alt="intro image"
                            fill={true} 
                            priority={true}
                        />
                    </div>
                    <h1 className='text-white text-[100px] z-30 text-center whitespace-nowrap font-bold mt-36'data-scroll data-scroll-speed="0.7">PULL N' BEAR</h1>
             </div>
        </div>
    )
}