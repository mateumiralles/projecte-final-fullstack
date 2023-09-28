import gsap from "gsap";
import {useLayoutEffect, useRef } from "react";
import ProductCard from "./productCard";



export default function ProductsGrid(props:{list:any[]}){
    const box = useRef(null);
  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(box.current, { opacity: 1, duration: 1.5,  y:0 });
    });
  }, []);
    return(
    <div className="mx-12 mt-8 grid grid-cols-5 gap-x-4 gap-y-10 opacity-0 -translate-y-10" ref={box}>
            {props.list.map((p: any, index: number) => (
              <div className="flex w-full justify-center" key={index}>
                <ProductCard
                  code={p.code}
                  title={p.name}
                  price={p.price.value}
                  image={p.galleryImages[0].url}
                />
              </div>
            ))}
          </div>)
}