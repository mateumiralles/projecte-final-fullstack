import { ProductGeneral } from "../classes";
import ProductInfo from "./producBasketCard";
import SummaryBasketPanel from "./sumaryBasketPanel";

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
      <SummaryBasketPanel precioFinal={props.precioFinal} productosCantidadTotal={props.productosCantidadTotal} products={props.products} purchaseSteps={props.purchaseSteps} setPurchaseSteps={props.setPurchaseSteps}/>
    </div>
  );
}
