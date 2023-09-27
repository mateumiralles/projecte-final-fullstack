type SummaryBasketPanelProps = {
  products: ProductGeneral[];
  productosCantidadTotal: number;
  precioFinal: number;
  purchaseSteps: number;
  setPurchaseSteps: React.Dispatch<React.SetStateAction<any>>;
};

import { ProductGeneral } from "../../classes";

export default function SummaryBasketPanel({
  products,
  productosCantidadTotal,
  precioFinal,
  purchaseSteps,
  setPurchaseSteps,
}: SummaryBasketPanelProps) {
  return (
    <div className="fixed right-0 top-0 flex h-[100vh] w-3/12  justify-center border-l border-black bg-gray-100">
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
            onClick={() => setPurchaseSteps(purchaseSteps + 1)}
            className="mt-4 flex cursor-pointer items-center justify-center rounded border  border-black p-4 transition duration-300 ease-in-out hover:bg-black hover:text-white"
          >
            <p className="font-bold">
              {purchaseSteps == -1
                ? "Continue to checkout"
                : purchaseSteps === 0
                ? "Make an order"
                : "IDK"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
