import { ProductGeneral } from "../classes"
import ProductInfo from "./productInfo"


export default function SummaryPage(props: {products: ProductGeneral[], productosCantidadTotal: number, precioFinal: number, purchaseSteps: number, setPurchaseSteps: React.Dispatch<React.SetStateAction<any>>, setProducts: React.Dispatch<React.SetStateAction<any>>}){
    return(
        <div id="products" className="flex w-[90%] flex-row justify-center">
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
            <div className="mt-2 flex flex-[2] justify-center">
            <div id="totalPriceBasket0" className="fixed w-[25%] rounded border border-black">
                <p className="p-4">HOLAAAA</p>
                <div className="flex w-full flex-row justify-between p-4">
                <p>{props.productosCantidadTotal} artículos</p>
                <p>{props.precioFinal}€</p>
                </div>
                <div className="flex w-full flex-row justify-between p-4">
                <p className="font-bold">TOTAL:</p>
                <p className="font-bold">{props.precioFinal}€</p>
                </div>
                <div onClick={() => props.setPurchaseSteps(props.purchaseSteps+1)} className="flex bg-black items-center justify-center border-t border-black p-4 transition-all hover:cursor-pointer hover:text-gray-600">
                <p className="text-white">TRAMITAR PEDIDO</p>
                </div>
            </div>
            </div>
        </div>
    )
}

