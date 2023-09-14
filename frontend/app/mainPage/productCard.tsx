"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type ProductCardProps = {
  title: string;
  price: number;
  image: string;
};

export default function ProductCard({ title, price, image }: ProductCardProps) {
  return (
    <Link href="/detailPage">
      <div className="hover:border w-full p-4 rounded hover:border-black hover:scale-95 justify-center transition duration-500">
        <Image src={image} width={500} height={500} alt="" />
        <div className="flex flex-col mt-2">
          <p className="w-full text-gray-500 text-m mb-1 text-center">
            {title}
          </p>
          <p className="w-full text-center">{price}€</p>
        </div>
      </div>
    </Link>
  );
}
