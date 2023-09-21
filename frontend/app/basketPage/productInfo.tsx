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
  const deleteProductAnim = {
    transform: isAnimating
      ? `translateX(${-(product.clientWidth + 100)}px)`
      : "translateX(0)",
    transition: "all 0.3s ease-in-out",
  };

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

        updatedProductos[props.index].ammount++;

        return updatedProductos;
      });
    } else {
      if (props.products[props.index].ammount !== 1) {
        props.setProducts((productos: ProductGeneral[]) => {
          const updatedProductos = [...productos];

          updatedProductos[props.index].ammount--;

          return updatedProductos;
        });
      }
    }
  };
  return (
    <div
      style={deleteProductAnim}
      key={props.index}
      id="product"
      className="product mb-2 mt-2 flex h-60 flex-row rounded border border-black p-4 transition-all"
    >
      {props.product.img == undefined ? (
        <div className="mr-4 aspect-[5001/7501] h-full rounded-md bg-white"></div>
      ) : (
        <img src={props.product.img} className="mr-4 h-full rounded-md" />
      )}
      <div className="flex flex-1 flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xl">{props.product.name}</p>
            <p className="text-2xl font-extrabold">
              {props.product.price} {props.product.currency}
            </p>
          </div>
          <div
            className="hover: cursor-pointer"
            onClick={() => deleteProduct()}
          >
            <p>Borrar</p>
          </div>
        </div>
        <div>
          <p className="inline-block">{props.product.colorName}</p>
          <div
            style={{ backgroundColor: `${props.product.colorRgb}` }}
            className="inline-block h-4 w-4"
          ></div>
        </div>
        <div className="flex flex-row self-end">
          <div
            className="hover: cursor-pointer rounded-s bg-black p-3"
            onClick={() => addOrSubtract(true)}
          >
            <p className="text-white font-bold text-lg select-none">-</p>
          </div>
          <div className="w-9 text-center m-auto border-t border-b border-black h-full flex justify-center items-center">
            <p className="text-lg select-none">{props.product.ammount}</p>
          </div>
          <div
            className="hover: cursor-pointer rounded-e bg-black p-3"
            onClick={() => addOrSubtract(false)}
          >
            <p className="text-white font-bold text-lg select-none">+</p>
          </div>
        </div>
      </div>
    </div>
  );
}
