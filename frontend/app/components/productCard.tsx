"use client";

// components/ProductCard.tsx
import React, { useState } from "react";
import Image from "next/image";
import blanco2 from "../../public/blanco1.jpg";
import blanco1 from "../../public/blanco2.jpg";
import Link from "next/link";

interface ProductCardProps {
  title: string;
  price: number;
  image: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ title, price, image }) => {
  const [cardImg, setCardImg] = useState(blanco1);

  return (
    <Link href="/">
      <div
        className="hover:border w-full p-4 rounded hover:border-black hover:scale-95 justify-center transition duration-500"
        onMouseEnter={() => setCardImg(blanco2)}
        onMouseLeave={() => setCardImg(blanco1)}
      >
        <Image
          src={cardImg}
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
