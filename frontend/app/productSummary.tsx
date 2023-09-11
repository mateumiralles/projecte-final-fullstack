import { FaRegBookmark } from "react-icons/fa";

export default function ProductSummary(props: { name: string; price: any, color: any, desc: string, colors: Array<any> | null, sizes: Array<any> | null }) {

    return (
        <div className=" max-w-[35%]">
            <div className="border-t border-l border-r border-black p-8 flex flex-col justify-between h-[80%]">
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
            <div className="border-t border-l border-r border-black p-8 flex flex-col justify-between">
                <div>
                    <div className="flex flex-row">
                    <p>Color: {props.color.text} </p><p>&nbsp;|&nbsp;</p><p>{props.color.code}</p>
                    </div>
                    <div className="flex flex-row mt-6 mb-6">
                    {props.colors?.map((element, index) => (
                        <div className={`bg-${element.rgbColor} w-5 h-5 ${index===0 ? `mr-2` : index===props.colors?.length ? `ml-2` : `ml-2 mr-2`}`} key={index}></div>
                        ))}
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-3 w-full">
                        {props.sizes?.map((element, index) => (
                            <div key={index} className="border border-black flex justify-center p-2 hover:cursor-pointer hover:bg-gray-500 transition-all text-sm">{element.size.name}</div>
                        ))}
                    </div>
                    <div className="flex flex-row mt-3">
                        <p className="text-[13px]">ENCUENTRA TU TALLA</p><p className="text-[13px]">&nbsp;|&nbsp;</p><p className="text-[13px]">GUÍA DE MEDIDAS</p>
                    </div>
                </div>
            </div>
            <div className="border border-black flex items-center justify-center p-2 hover:cursor-pointer hover:text-gray-600 transition-all">
                <p>AÑADIR</p>
            </div>
        </div>
    )
}