import { useState, useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ProductGeneral } from "../../classes";


type SummaryBasketPanelProps = {
  selectedPaymentMethod: number | undefined;
  products: ProductGeneral[];
  productosCantidadTotal: number;
  precioFinal: number;
  purchaseSteps: number;
  setPurchaseSteps: React.Dispatch<React.SetStateAction<any>>;
  setPopWarning: React.Dispatch<React.SetStateAction<any>>;
  setWarningMsg:React.Dispatch<React.SetStateAction<any>>
};


export default function SummaryBasketPanel({
  selectedPaymentMethod,
  products,
  productosCantidadTotal,
  precioFinal,
  purchaseSteps,
  setPurchaseSteps,
  setPopWarning,
   setWarningMsg,
}: SummaryBasketPanelProps) {

  const panel = useRef(null);
  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(panel.current, { opacity: 1, duration: 1.5,  x:0 });
    });
  }, []);

  const manageStepPurchase = () => {
    if(purchaseSteps===0 && selectedPaymentMethod===undefined){
      setWarningMsg("You don't have a selected payment method.");
      setPopWarning(true);
    }
    else {
      setPurchaseSteps(purchaseSteps + 1)
    }
  }
  return (
    <div className="fixed right-0 top-0 flex h-[100vh] w-3/12  justify-center border-l border-black bg-gray-100 opacity-0 translate-x-20"  ref={panel}>
      <div
        id="totalPriceBasket0"
        className="relative top-24 mb-20 flex h-5/6 w-10/12 flex-col justify-between"
      >
        <div className="flex flex-col">
          <p className="mb-6 text-lg font-semibold">Summary of your delivery</p>
          <div className="h-[55vh] overflow-y-auto">
            {products.map((product, i) => {
              return (
                <div key={i} className="mt-2 flex flex-row justify-between">
                  <p>{product.name}</p>
                  <p>x{product.ammount}</p>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <div className="w-full">
            <p>
              {productosCantidadTotal}{" "}
              {productosCantidadTotal > 1 ? "pieces" : "piece"}{" "}
            </p>
          </div>
          <div className="flex w-full flex-row justify-between ">
            <p className="font-bold">TOTAL:</p>
            <p className="font-bold">{precioFinal}€</p>
          </div>
          <div
            onClick={manageStepPurchase}
            className="mt-4 flex cursor-pointer items-center justify-center rounded border  border-black p-4 transition duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            <p className="font-bold">
              {purchaseSteps === -1
                ? "Continue to checkout"
                : "Make the order"
                }
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
