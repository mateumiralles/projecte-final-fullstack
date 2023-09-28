import { useLayoutEffect, useRef } from "react";
import { ProductGeneral } from "../classes";
import ProductBasketCard from "./components/productBasketCard";

import gsap from "gsap";

export default function SummaryPage(props: {
  products: ProductGeneral[];
  productosCantidadTotal: number;
  precioFinal: number;
  purchaseSteps: number;
  setPurchaseSteps: React.Dispatch<React.SetStateAction<any>>;
  setProducts: React.Dispatch<React.SetStateAction<any>>;
}) {
  const box = useRef(null);
  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(box.current, { opacity: 1, duration: 1.5, y: 0 });
    });
  }, []);

  return (
    <>
      <div
        ref={box}
        id="summaryBasket0"
        className="mb-20 mt-2 grid w-8/12 -translate-y-10 grid-cols-4 gap-10 opacity-0"
      >
        {props.products.map((product, index) => (
          <div className="flex w-full justify-center" key={index}>
            <ProductBasketCard
              product={product}
              index={index}
              products={props.products}
              setProducts={props.setProducts}
            />
          </div>
        ))}
      </div>
      <div className="w-4/12"></div>
    </>
  );
}
