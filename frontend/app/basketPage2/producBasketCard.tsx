"use client";
import { useState } from "react";
import { ProductGeneral } from "../classes";

export default function ProductInfo(props: {
  product: ProductGeneral;
  index: number;
  products: ProductGeneral[];
  setProducts: React.Dispatch<React.SetStateAction<any>>;
}) {
  
  const [isAnimating, setIsAnimating] = useState(false);
  const product = document.getElementById("product")!;

  const deleteProductAnim = isAnimating
    ? "opacity-0 translate-y-5 transition ease-in-out duration-700"
    : "";

  const deleteProduct = () => {
    setIsAnimating(true);
    const nuevoArray = props.products.filter(
      (_, index3) => index3 !== props.index,
    );
    setTimeout(() => {
      props.setProducts((productos: ProductGeneral[]) => {
        return nuevoArray;
      });
      setIsAnimating(false);
    }, 500);
  };

  const addOrSubtract = (subtract: boolean) => {
    if (!subtract) {
      props.setProducts((productos: ProductGeneral[]) => {
        const updatedProductos = [...productos];
        console.log(updatedProductos[props.index]);

        updatedProductos[props.index].ammount++;
        console.log(updatedProductos[props.index].ammount);

        return updatedProductos;
      });
    } else {
      if (props.products[props.index].ammount > 1) {
        props.setProducts((productos: ProductGeneral[]) => {
          const updatedProductos = [...productos];
          console.log(updatedProductos[props.index]);

          updatedProductos[props.index].ammount--;
          console.log(updatedProductos[props.index].ammount);

          return updatedProductos;
        });
      }
      return props.products;
    }
  };
  return (
    <div
      key={props.index}
      id="product"
      className={`flex w-full flex-col rounded border p-4 transition duration-300 hover:border-black ${deleteProductAnim}`}
    >
      {props.product.img == undefined ? (
        <div className="h-full w-full rounded bg-white"></div>
      ) : (
        <img src={props.product.img} className="h-full rounded" />
      )}
      <div className="mt-2 flex flex-col">
        <div className="flex flex-row items-center justify-between">
          <div className=" flex h-8 w-full flex-row overflow-hidden">
            <p className="text-xl text-gray-500">{props.product.name}</p>
          </div>

          <div
            className="ml-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-black transition duration-150 ease-in-out hover:scale-95 hover:bg-black hover:text-white"
            onClick={() => deleteProduct()}
          >
            <p className="pb-1 font-bold">x</p>
          </div>
        </div>
        <div className="flex flex-row items-center">
          <div
            style={{ backgroundColor: `${props.product.colorRgb}` }} // NOSE PER QUE NO VA EL BG-[${...}] D'ABAIX
            className={`mr-2 h-4 w-4 bg-[${props.product.colorRgb}] rounded border border-black `}
          ></div>
          <p className="text-lg"> | {props.product.size} </p>
        </div>
        <div className="mt-1 flex flex-row justify-between">
          <div>
            <p className="text-xl">
              {props.product.price! * props.product.ammount}{" "}
              {props.product.currency}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <div
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-black transition duration-150 ease-in-out hover:scale-95 hover:bg-black hover:text-white"
              onClick={() => addOrSubtract(true)}
            >
              <p className="pb-1 font-bold">-</p>
            </div>
            <div className="px-2">
              <p className="select-none text-lg">{props.product.ammount}</p>
            </div>
            <div
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-black transition duration-150 ease-in-out hover:scale-95 hover:bg-black hover:text-white"
              onClick={() => addOrSubtract(false)}
            >
              <p className="pb-1 font-bold">+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
