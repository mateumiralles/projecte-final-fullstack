import { SetStateAction } from "react";
import { FaRegBookmark } from "react-icons/fa";
import config from "@/tailwind.config";
import { ProductGeneral } from "../classes";
export default function ProductSummary(props: {
  name: string;
  price: any;
  color: any;
  desc: string;
  colors: Array<any> | null;
  sizes: Array<any>;
  productToAdd: ProductGeneral;
  setProductToAdd: React.Dispatch<React.SetStateAction<any>>;
  changeColor: (colorRgb: string, colorName: string) => void;
}) {
  const updateProduct = (size: string | undefined) => {
    props.setProductToAdd((prevProduct: any) => ({
      ...prevProduct, // Mantén las propiedades existentes
      size: size,
    }));
  };

  return (
    <div>
      <div className=" flex h-[80%] flex-col justify-between p-8">
        <div className="mb-8 flex flex-row items-center justify-between">
          <div>
            <p className="text-sm">{props.name}</p>
            <div>
              <p className="inline text-sm">{props.price.price}</p>
              <p className="inline text-sm"> {props.price.currency}</p>
            </div>
          </div>
          <div className="hover:cursor-pointer">
            <FaRegBookmark />
          </div>
        </div>
        <p className="text-sm">{props.desc}</p>
        <div>
          <p className="mb-6 mt-6 text-[13px]">VER DISPONIBILIDAD EN TIENDA</p>
          <p className="mt-6 text-[13px]">ENVÍOS, CAMBIOS Y DEVOLUCIONES</p>
        </div>
      </div>
      <div className="flex  flex-col justify-between border-t border-black p-8">
        <div>
          <div className="flex flex-row">
            <p>Color: {props.color.text} </p>
            <p>&nbsp;|&nbsp;</p>
            <p>{props.color.code}</p>
          </div>
          <div className="mb-6 mt-6 flex flex-row">
            {props.colors?.map((element, index) => (
              <div
                onClick={() =>
                  props.changeColor(element.rgbColor, element.text)
                }
                style={{ backgroundColor: element.rgbColor }}
                className={`h-5 w-5 ${
                  index === 0
                    ? `mr-2`
                    : index === props.colors?.length
                    ? `ml-2`
                    : `ml-2 mr-2`
                } hover: cursor-pointer`}
                key={index}
              ></div>
            ))}
          </div>
        </div>
        <div>
          <div
            className={`grid-cols grid ${
              props.sizes?.length > 6 ? `grid-cols-3` : `grid-cols-2`
            } w-full gap-3`}
          >
            {props.sizes?.map((element, index) => (
              <div
                key={index}
                onClick={() =>
                  props.productToAdd.size === element.size.name
                    ? updateProduct(undefined)
                    : updateProduct(element.size.name)
                }
                className={`${
                  props.productToAdd.size === element.size.name
                    ? `selectedSize`
                    : ``
                } flex justify-center rounded border border-black p-2 text-sm transition duration-100 hover:scale-95 hover:cursor-pointer`}
              >
                {element.size.name}
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-row">
            <p className="text-[13px]">ENCUENTRA TU TALLA</p>
            <p className="text-[13px]">&nbsp;|&nbsp;</p>
            <p className="text-[13px]">GUÍA DE MEDIDAS</p>
          </div>
        </div>
      </div>
      <div
        className={`${
          props.productToAdd.size !== undefined ? `selectedSize` : null
        } flex items-center justify-center border-t border-black p-2 transition-all hover:cursor-pointer hover:text-gray-600`}
      >
        <p>AÑADIR</p>
      </div>
    </div>
  );
}
