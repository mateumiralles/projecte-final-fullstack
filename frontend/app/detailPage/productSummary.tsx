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
  sizes: Array<string>;
  productToAdd: ProductGeneral;
  setProductToAdd: React.Dispatch<React.SetStateAction<any>>;
  changeColor: (colorName: string) => void;
  addProductToBasket: () => void;
}) {
  const updateProduct = (size: string | undefined) => {
    props.setProductToAdd((prevProduct: any) => ({
      ...prevProduct, // Mantén las propiedades existentes
      size: size,
    }));
  };

  return (
    <div>
      <div className="flex h-[80%] min-h-[300px] flex-col justify-around  p-8">
        <div className="mb-8 flex h-2/6 flex-row items-center justify-between">
          <div>
            <p className="text-sm">{props.name}</p>
            <div>
              <p className="inline text-sm">{props.price.price}</p>
              <p className="inline text-sm"> {props.price.currency}</p>
            </div>
          </div>
          <div className="cursor-pointer">
            <FaRegBookmark />
          </div>
        </div>

        <p className="text-sm">{props.desc}</p>
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
                onClick={() => {
                  updateProduct(undefined), props.changeColor(element.name);
                }}
                style={{ backgroundColor: element.rgbColor }}
                className={`h-5 w-5 rounded border border-black hover:-scale-90 ${
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
              props.sizes?.length > 6
                ? props.sizes?.length > 9
                  ? "grid-cols-4"
                  : `grid-cols-3`
                : `grid-cols-2`
            } w-full gap-3`}
          >
            {props.sizes?.map((element, index) => (
              <div
                key={index}
                onClick={() =>
                  props.productToAdd.size === element
                    ? updateProduct(undefined)
                    : updateProduct(element)
                }
                className={`${
                  props.productToAdd.size === element ? `selectedSize` : ``
                } flex cursor-pointer justify-center rounded border border-black p-2 text-sm transition duration-100 hover:scale-95`}
              >
                {element}
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        onClick={props.addProductToBasket}
        className={`${
          props.productToAdd.size !== undefined
            ? `selectedSize cursor-pointer`
            : "cursor-default"
        } group flex items-center justify-center border-t border-black p-2 transition-all `}
      >
        <p
          className={`${
            props.productToAdd.size !== undefined
              ? "transition ease-in-out group-hover:scale-90"
              : null
          }`}
        >
          AÑADIR
        </p>
      </div>
    </div>
  );
}
