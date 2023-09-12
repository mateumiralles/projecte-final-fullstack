"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image }) => {
  return (
    <Link href="/">
      <div
        className="hover:border w-full p-4 rounded hover:border-black hover:scale-95 justify-center transition duration-500"
   
      >
        <Image
          src={image}
          width={500}
          height={500}
          alt=""
        />
        <div className="flex flex-col justify-stretch">
          <p className="w-full text-gray-500 text-m mb-1 ">{title}</p>
          <p className="w-full">{price}€</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
