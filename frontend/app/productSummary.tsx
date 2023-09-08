import { FaRegBookmark } from "react-icons/fa";

export default function ProductSummary(props: { name: string; price: string, desc: string, colors: Array<string>, sizes: Array<string> }) {
    
    return (
        <div className=" max-w-[35%]">
            <div className="border-t border-l border-r p-8 flex flex-col justify-between h-[80%]">
                <div className="flex flex-row justify-between items-center mb-8">
                    <div>
                        <p className="text-sm">{props.name}</p>
                        <p className="text-sm">{props.price}</p>
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
            <div className="border-t border-l border-r p-8 flex flex-col justify-between">
                <div>
                    <div className="flex flex-row">
                    <p>Color: Blanco roto </p><p>&nbsp;|&nbsp;</p><p>1716/342</p>
                    </div>
                    <div className="flex flex-row mt-6 mb-6">
                        <div className="bg-gray-200 w-5 h-5 mr-2"></div>
                        <div className="bg-gray-950 w-5 h-5 ml-2 mr-2"></div>
                        <div className="bg-orange-300 w-5 h-5 ml-2 mr-2"></div>
                        <div className="bg-gray-600 w-5 h-5 ml-2"></div>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-2 gap-3 w-full">
                        {props.sizes.map((element, index) => (
                            <div key={index} className="border flex justify-center p-2 hover:cursor-pointer hover:bg-gray-500 transition-all text-sm">{element}</div>
                        ))}
                    </div>
                    <div className="flex flex-row mt-3">
                        <p className="text-[13px]">ENCUENTRA TU TALLA</p><p className="text-[13px]">&nbsp;|&nbsp;</p><p className="text-[13px]">GUÍA DE MEDIDAS</p>
                    </div>
                </div>
            </div>
            <div className="border flex items-center justify-center p-2 hover:cursor-pointer hover:text-gray-600 transition-all">
                <p>AÑADIR</p>
            </div>
        </div>
    )
}