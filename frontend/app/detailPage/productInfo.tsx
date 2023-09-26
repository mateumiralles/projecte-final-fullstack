"use client"

import { ProductData } from "../classes";
import { useState, useEffect } from "react";


type ProductInfoProps = {
    product: ProductData;
  };
export default function ProductInfo({ product }: ProductInfoProps){

    const [seeMoreDetail, setSeeMoreDetail] = useState(false);

    useEffect(() => {
        const productInfo = document.getElementById("productInfo")!;
        if (productInfo) {
          if (seeMoreDetail) {
            productInfo.scrollTo({ top: 0, behavior: "smooth" });
            productInfo.style.height = `${productInfo.clientHeight / 2}px`;
          } else {
            productInfo.style.height = `${productInfo.clientHeight * 2}px`;
          }
        }
      }, [seeMoreDetail]);

    return (
        <div
        id="productInfo"
        className="no-scrollbar max-w-xs self-end overflow-y-auto rounded border border-black p-7 transition-all duration-300"
      >
        <h3 className="text-lg">COMPOSICIÓN, CUIDADOS Y ORIGEN</h3>
        <div>
          <p className="mb-5 mt-5 text-base">COMPOSICIÓN</p>
          <div className="mb-2">
            {product.compositions?.map((element, index) =>
              element.materials.map((material: any, index: number) => (
                <div>
                  <p key={index} className="inline-block text-sm">
                    {material.percentage}%
                  </p>
                  &nbsp;
                  <p className="inline-block text-sm">{material.name}</p>
                </div>
              )),
            )}
          </div>
          {product.materialDetails?.map((materialDesc, index) => (
            <div className="mb-2" key={index}>
              <p className="text-sm font-bold">{materialDesc.name}:</p>
              <p className="text-sm">{materialDesc.description}</p>
            </div>
          ))}
        </div>
        <p className="mb-5 mt-5 text-base">CUIDADOS</p>
        <p className="mb-2 text-sm">
          Cuidar de tus prendas es cuidar del medioambiente
        </p>
        <p className="mb-3 text-sm">
          Los lavados a bajas temperaturas y los programas de centrifugado
          suaves son más delicados con las prendas, ayudando a mantener el
          color, la forma y la estructura del tejido.
        </p>
        <ul>
          {product.careInstructions?.map((care, index) => (
            <li className="text-sm" key={index}>
              {care}
            </li>
          ))}
        </ul>
        <p className="mb-5 mt-5 text-base">ORIGEN</p>
        <p className="mb-5 text-sm">
          Hecho en {product.articleCountryOfProduction}
        </p>
        <p
          className="underline hover:cursor-pointer"
          onClick={() => setSeeMoreDetail(!seeMoreDetail)}
        >
          {seeMoreDetail ? "Ver más" : "Ver menos"}
        </p>
      </div>
    )
}