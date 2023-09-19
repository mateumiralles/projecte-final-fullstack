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
