"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  code: string;
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ code, title, price, image }: ProductCardProps) {

  let nuevaCadena = code.replace("_group_", "");
  return (
  <Link href={`/detailPage?productId=${nuevaCadena}`}>
      <div className="w-full justify-center rounded p-4 transition duration-500 hover:scale-95 hover:border hover:border-black">
        <Image src={image} width={500} height={500} alt="" />
        <div className="mt-2 flex flex-col">
          <p className="text-m mb-1 w-full text-center text-gray-500">
            {title}
          </p>
          <p className="w-full text-center">{price}€</p>
        </div>
      </div>
    </Link>
  );
}
