"use client"
import { useState, useEffect } from "react";


type ImagesScrollProp = {
    imagesProp: any[];
  };

export default function ImagesScroll({ imagesProp }: ImagesScrollProp){
    const [currentIndex, setCurrentIndex] = useState(1);
    const [loadedImages, setLoadedImages] = useState<number[]>([]);
    
    const handleImageLoad = (index: number) => {
        // Marca la imagen como cargada correctamente.
        setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
    };
    
    let isScrollActive = false;
    let currentIndexRealTime: number = 0;
    const handleScroll = (event: globalThis.WheelEvent, images: HTMLElement) => {
        event.preventDefault();
        if (isScrollActive) {
            return; // Evitar el scroll mientras se está desplazando
        }
        isScrollActive = true;
        if (event.deltaY > 0) {
            currentIndexRealTime =
            (currentIndexRealTime + 1) % imagesProp.length;
            setCurrentIndex(currentIndexRealTime + 1);
        } else if (event.deltaY < 0) {
            currentIndexRealTime =
            (currentIndexRealTime - 1 + imagesProp.length) %
            imagesProp.length;
            setCurrentIndex(currentIndexRealTime + 1);
        }
        const scrollY: number = currentIndexRealTime * (images?.clientHeight || 0);

        images?.scrollTo({ top: scrollY, behavior: "smooth" });
        setTimeout(() => {
            isScrollActive = false;
        }, 500);
    };

    useEffect(() => {
        const images = document.getElementById("images");
        if (images)
          images.addEventListener("wheel", (e) => handleScroll(e, images), {
            passive: false,
          });
    
        return () => {
          if (images) {
            images.removeEventListener("wheel", (e) => handleScroll(e, images));
          }
        };
    }, [imagesProp])

    return(
        <div
        id="imageAndScroll"
        className="relative aspect-[5001/7501] rounded overflow-hidden"
      >
        <div
          id="scrollLine"
          style={{
            height: `${
              (currentIndex / loadedImages.length) * 100
            }%`,
            transition: "0.4s ease-in-out",
          }}
          className="absolute right-0 top-[0] z-10 w-[2px] bg-black"
        ></div>
        <div
          id="images"
          className="no-scrollbar relative h-[100%] w-[100%] overflow-y-auto"
        >
          {imagesProp?.map((img: string, index: number) => (
            <img key={index} src={img} onLoad={() => handleImageLoad(index)} onError={() => console.log("TREMENDO BUG")} style={{ display: loadedImages.includes(index) ? 'block' : 'none' }}/>
          ))}
        </div>
      </div>
    )
}