import axios from "axios";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import templateImg from "../../public/background.webp";

export default function SlidingProducts() {
  const [slider1, setSlider1] = useState<
    Array<{ src: string[]; href: string }>
  >([]);

  const [slider2, setSlider2] = useState<
    Array<{ src: string[]; href: string }>
  >([]);

  const phrase =
    "Unleash your inner fashionista and discover hidden gems among our curated selection of random products below!";

  const phraseRef = useRef(null);
  const sl1 = useRef(null);
  const sl2 = useRef(null);

  function obtenerNumerosAleatorios(
    numerosDisponibles: number[],
    cantidad: number,
    productsResult: any,
  ) {
    if (cantidad > numerosDisponibles.length) {
      throw new Error(
        "La cantidad deseada es mayor que la longitud del array.",
      );
    }

    // Copia del array original para no modificarlo
    const availableProducts = [...numerosDisponibles];

    const products = [];

    for (let i = 0; i < cantidad; i++) {
      const indiceAleatorio = Math.floor(
        Math.random() * availableProducts.length,
      );
      const randomProduct = availableProducts.splice(indiceAleatorio, 1)[0];

      products.push(productsResult[randomProduct]);
    }
    return products;
  }

  const getProducts = async () => {
    setSlider1([]);
    setSlider2([]);
    try {
      const products = await axios.get(`http://localhost:3333/api/products/`);
      console.log(products.data);
      if (products.status === 200) {
        const productsAvailable = Array.from(
          { length: products.data.length - 1 },
          (_, i) => i + 1,
        );
        const randomProducts = obtenerNumerosAleatorios(
          productsAvailable,
          8,
          products.data,
        );
        console.log(randomProducts);
        for (let i = 0; i < randomProducts.length; i++) {
          let productCode = randomProducts[i].code.slice(0, -3);
          if (i % 2 === 0) {
            setSlider1((prevSlider) => [
              ...prevSlider,
              {
                src: [
                  randomProducts[i].galleryDetails[0],
                  randomProducts[i].galleryDetails[1],
                ],
                href: `detailPage?productId=${randomProducts[i].code}&productParent=${productCode}`,
              },
            ]);
          } else {
            setSlider2((prevSlider) => [
              ...prevSlider,
              {
                src: [
                  randomProducts[i].galleryDetails[0],
                  randomProducts[i].galleryDetails[1],
                ],
                href: `detailPage?productId=${randomProducts[i].code}&productParent=${productCode}`,
              },
            ]);
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    gsap.from(phraseRef.current, {
      scrollTrigger: {
        trigger: phraseRef.current,
        start: "200px bottom",
        end: "bottom+=1000px bottom",
        scrub: true,
      },
      top: "-100px",
      opacity: 0,
    });

    gsap.from(sl1.current, {
      scrollTrigger: {
        trigger: sl1.current,
        start: "0px bottom",
        end: "bottom+=400px bottom",
        scrub: true,
      },
      left: "300px",
    });

    gsap.from(sl2.current, {
      scrollTrigger: {
        trigger: sl2.current,
        start: "0px bottom",
        end: "bottom+=400px bottom",
        scrub: true,
      },
      right: "300px",
    });
  }, []);

  return (
    <div className="relative mt-14 flex flex-col gap-10 overflow-hidden bg-black p-44">
      <Image
        className="object-cover opacity-20"
        src={templateImg}
        alt="Denim Background"
        layout="fill"
      />
      <div className="flex h-full w-full" ref={phraseRef}>
        <p className="my-40 ml-96 text-4xl font-bold text-white">{phrase}</p>
      </div>

      <div className="relative flex w-full gap-7" ref={sl1}>
        {slider1.map((product, i) => {
          return (
            <div
              key={`s2_${i}`}
              className="trasition flex h-80 w-1/4 items-center justify-center rounded bg-gray-300 duration-200 ease-in-out hover:scale-95"
            >
              <div className="relative h-4/5 w-4/5">
                <Link href={product.href}>
                  <Image
                    className="object-cover"
                    src={product.src[0]}
                    alt="image"
                    fill={true}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative  flex w-full gap-7" ref={sl2}>
        {slider2.map((product, i) => {
          return (
            <div
              key={`s2_${i}`}
              className="trasition flex h-80 w-1/4 items-center justify-center rounded bg-gray-300 duration-200 ease-in-out hover:scale-95"
            >
              <div className="relative h-4/5 w-4/5">
                <Link href={product.href}>
                  <Image
                    className="object-cover"
                    src={product.src[0]}
                    alt="image"
                    fill={true}
                  />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
