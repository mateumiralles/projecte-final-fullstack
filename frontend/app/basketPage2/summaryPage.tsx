import { ProductGeneral } from "../classes";
import ProductInfo from "./producBasketCard";

export default function SummaryPage(props: {
  products: ProductGeneral[];
  productosCantidadTotal: number;
  precioFinal: number;
  purchaseSteps: number;
  setPurchaseSteps: React.Dispatch<React.SetStateAction<any>>;
  setProducts: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <div id="products" className="flex w-full flex-row">
      <div
        id="summaryBasket0"
        className="my-20 ml-20 grid w-8/12 grid-cols-4 gap-10"
      >
        {props.products.map((product, index) => (
          <div className="flex w-full justify-center" key={index}>
            <ProductInfo
              product={product}
              index={index}
              products={props.products}
              setProducts={props.setProducts}
            />
          </div>
        ))}
      </div>
      <div className="fixed right-0 top-0 flex h-[100vh] w-3/12  justify-center border-l border-black bg-gray-100">
        <div
          id="totalPriceBasket0"
          className="relative top-24 mb-20 flex h-5/6 w-10/12 flex-col justify-between"
        >
          <div className="flex flex-col">
            <p className="mb-6 text-lg font-semibold">
              Summary of your delivery
            </p>
            <div className="h-[55vh] overflow-y-auto">
              {props.products.map((product, i) => {
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
                {props.productosCantidadTotal}{" "}
                {props.productosCantidadTotal > 1 ? "pieces" : "piece"}{" "}
              </p>
            </div>
            <div className="flex w-full flex-row justify-between ">
              <p className="font-bold">TOTAL:</p>
              <p className="font-bold">{props.precioFinal}€</p>
            </div>
            <div
              onClick={() => props.setPurchaseSteps(props.purchaseSteps + 1)}
              className="mt-4 flex cursor-pointer items-center justify-center rounded border  border-black p-4 transition hover:bg-black hover:text-white ease-in-out duration-300"
            >
              <p className="font-bold">NEXT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
