"use client";

import { useEffect, useState } from "react";
import { ProductData } from "../classes";

type ProductInfoProps = {
  product: ProductData;
};
export default function ProductInfo({ product }: ProductInfoProps) {
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
      <h3 className="text-lg">COMPOSITION, CARE AND ORIGIN</h3>
      <div>
        <p className="mb-5 mt-5 text-base">COMPOSITION</p>
        <div className="mb-2">
          {product.compositions?.map((element, index) =>
            element.materials.map((material: any, index: number) => (
              <div key={index} >
                <p className="inline-block text-sm">
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
      <p className="mb-5 mt-5 text-base">CARE</p>
      <p className="mb-2 text-sm">
        Taking care of your clothes is taking care of the environment{" "}
      </p>
      <p className="mb-3 text-sm">
        Washing at low temperatures and gentle spin programs are more delicate
        with clothes, helping to maintain color, shape and structure of the
        fabric.
      </p>
      <ul>
        {product.careInstructions?.map((care, index) => (
          <li className="text-sm" key={index}>
            {care}
          </li>
        ))}
      </ul>
      <p className="mb-5 mt-5 text-base">ORIGIN</p>
      <p className="mb-5 text-sm">
        Made in {product.articleCountryOfProduction}
      </p>
      <p
        className="underline hover:cursor-pointer"
        onClick={() => setSeeMoreDetail(!seeMoreDetail)}
      >
        {seeMoreDetail ? "Show more" : "Show less"}
      </p>
    </div>
  );
}
