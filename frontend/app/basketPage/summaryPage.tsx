import { ProductGeneral } from "../classes"
import ProductInfo from "./productInfo"


export default function SummaryPage(props: {products: ProductGeneral[], productosCantidadTotal: number, precioFinal: number, purchaseSteps: number, setPurchaseSteps: React.Dispatch<React.SetStateAction<any>>, setProducts: React.Dispatch<React.SetStateAction<any>>}){
    return(
        <div
        id="summaryBasket0"
        className="mb-20 mt-2 grid w-8/12 grid-cols-4 gap-10"
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
    )
}

