import { ProductGeneral } from "../classes"
import ProductInfo from "./productInfo"


export default function SummaryPage(props: {products: ProductGeneral[], productosCantidadTotal: number, precioFinal: number, purchaseSteps: number, setPurchaseSteps: React.Dispatch<React.SetStateAction<any>>, setProducts: React.Dispatch<React.SetStateAction<any>>}){
    return(
            <>
                <div id="summaryBasket0" className="flex-grow-[2]">
                    {props.products.map((product, index) => (
                        <ProductInfo
                        key={index}
                        product={product}
                        index={index}
                        products={props.products}
                        setProducts={props.setProducts}
                        />
                    ))}
                </div>
        </>
    )
}

