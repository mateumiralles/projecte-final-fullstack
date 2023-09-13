import { SetStateAction } from "react";
import { FaRegBookmark } from "react-icons/fa";
import config from "@/tailwind.config";
import { ProductGeneral } from "../classes";
export default function ProductSummary(props: { name: string; price: any, color: any, desc: string, colors: Array<any> | null, sizes: Array<any>, productToAdd: ProductGeneral,   setProductToAdd: React.Dispatch<React.SetStateAction<any>>;
}) {

    const updateProduct = (size: string | undefined) => {
        props.setProductToAdd((prevProduct: any) => ({
            ...prevProduct, // Mantén las propiedades existentes
            size: size
        }));
    }

    return (
        <div>
            <div className=" p-8 flex flex-col justify-between h-[80%]">
                <div className="flex flex-row justify-between items-center mb-8">
                    <div>
                        <p className="text-sm">{props.name}</p>
                        <div>
                        <p className="text-sm inline">{props.price.price}</p>
                        <p className="text-sm inline"> {props.price.currency}</p>
                        </div>
                    </div>
                    <div className="hover:cursor-pointer">
                        <FaRegBookmark />
                    </div>
                </div>
                 <p className="text-sm">{props.desc}</p>
                <div>
                    <p className="mt-6 mb-6 text-[13px]">VER DISPONIBILIDAD EN TIENDA</p>
                    <p className="mt-6 text-[13px]">ENVÍOS, CAMBIOS Y DEVOLUCIONES</p>
                </div>
            </div>
            <div className="border-t  border-black p-8 flex flex-col justify-between">
                <div>
                    <div className="flex flex-row">
                    <p>Color: {props.color.text} </p><p>&nbsp;|&nbsp;</p><p>{props.color.code}</p>
                    </div>
                    <div className="flex flex-row mt-6 mb-6">
                    {props.colors?.map((element, index) => (
                        <div style={{backgroundColor: element.rgbColor}} className={`w-5 h-5 ${index===0 ? `mr-2` : index===props.colors?.length ? `ml-2` : `ml-2 mr-2`}`} key={index}></div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className={`grid grid-cols ${props.sizes?.length>6 ? `grid-cols-3` : `grid-cols-2`} gap-3 w-full`}>
                        {props.sizes?.map((element, index) => (
                            <div key={index} onClick={() => props.productToAdd.size===element.size.name ? updateProduct(undefined) : updateProduct(element.size.name)} className={`${props.productToAdd.size===element.size.name ? `selectedSize` : ``} border border-black flex justify-center p-2 hover:cursor-pointer text-sm rounded hover:scale-95 transition duration-100`}>{element.size.name}</div>
                        ))}
                    </div>
                    <div className="flex flex-row mt-3">
                        <p className="text-[13px]">ENCUENTRA TU TALLA</p><p className="text-[13px]">&nbsp;|&nbsp;</p><p className="text-[13px]">GUÍA DE MEDIDAS</p>
                    </div>
                </div>
            </div>
            <div className={`${props.productToAdd.size!==undefined ? `selectedSize` : null} border-t border-black flex items-center justify-center p-2 hover:cursor-pointer hover:text-gray-600 transition-all`}>
                <p>AÑADIR</p>
            </div>
        </div>
    )
}