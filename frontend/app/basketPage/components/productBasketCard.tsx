"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ProductGeneral } from "../../classes";

export default function ProductBasketCard(props: {
  product: ProductGeneral;
  index: number;
  products: ProductGeneral[];
  setProducts: React.Dispatch<React.SetStateAction<any>>;
}) {
  const { push } = useRouter();
  const [isAnimating, setIsAnimating] = useState(false);
  const product = document.getElementById("product")!;
  const deleteProductAnim = {
    transform: isAnimating
      ? `translateX(${-(product.clientWidth + 100)}px)`
      : "translateX(0)",
    transition: "all 0.3s ease-in-out",
  };

  const deleteProduct = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    try {
      const deleteProduct = await axios.delete(
        `http://localhost:3333/api/users/${user.id}/cart/delete/${props.product.id}`,
      );
      console.log(deleteProduct);
      if (deleteProduct.status === 204) {
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
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const addOrSubtract = async (subtract: boolean) => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (!subtract) {
      try {
        const changeProduct = await axios.put(
          `http://localhost:3333/api/users/${user.id}/cart/modify/${props.product.id}`,
          { quantity: props.product.ammount + 1 },
        );
        console.log(changeProduct);
        if (changeProduct.status === 200) {
          props.setProducts((productos: ProductGeneral[]) => {
            const updatedProductos = [...productos];

            updatedProductos[props.index].ammount++;

            return updatedProductos;
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    } else {
      if (props.products[props.index].ammount !== 1) {
        try {
          const changeProduct = await axios.put(
            `http://localhost:3333/api/users/${user.id}/cart/modify/${props.product.id}`,
            { quantity: props.product.ammount - 1 },
          );
          if (changeProduct.status === 200) {
            props.setProducts((productos: ProductGeneral[]) => {
              const updatedProductos = [...productos];

              updatedProductos[props.index].ammount--;

              return updatedProductos;
            });
          }
        } catch (error: any) {
          console.log(error);
        }
      }
    }
  };
  return (
    <div
      key={props.index}
      id="product"
      className={`flex w-full cursor-pointer flex-col rounded border p-4 transition duration-300 hover:border-black ${deleteProductAnim} hover:scale-95`}
      onClick={() => {
        let nuevaCadena = props.product.code!.slice(0, -3);
        push(
          `/detailPage?productId=${props.product.code}&productParent=${nuevaCadena}`,
        );
      }}
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
            className="ml-2 flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-black transition duration-150 ease-in-out hover:scale-95 hover:border-red-500 hover:bg-red-500 hover:text-white"
            onClick={(e) => {
              e.stopPropagation();
              deleteProduct();
            }}
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
              {Number(props.product.price!.toFixed(2)) *
                ((props.product?.ammount as number) ?? 0)}{" "}
              {"€"}
            </p>
          </div>
          <div className="flex flex-row items-center">
            <div
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-black transition duration-150 ease-in-out hover:scale-95 hover:bg-black hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                addOrSubtract(true);
              }}
            >
              <p className="pb-1 font-bold">-</p>
            </div>
            <div className="px-2">
              <p className="select-none text-lg">{props.product.ammount}</p>
            </div>
            <div
              className="flex h-5 w-5 cursor-pointer items-center justify-center rounded border border-black transition duration-150 ease-in-out hover:scale-95 hover:bg-black hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                addOrSubtract(false);
              }}
            >
              <p className="pb-1 font-bold">+</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
