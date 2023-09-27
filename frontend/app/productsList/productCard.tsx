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

  const partes = code.split("_group_");
  let codigoAntesDelGroup;
  let codigoDespuesDelGroup;
  let codigoEnteroSinGroup;

  if (partes.length === 2) {
    codigoAntesDelGroup = partes[0];
    codigoDespuesDelGroup = partes[1];
    codigoEnteroSinGroup = codigoAntesDelGroup + codigoDespuesDelGroup;
  } else {
    codigoAntesDelGroup = code.slice(0, -3); // Obtener los primeros caracteres
    codigoDespuesDelGroup = code.slice(-3);  
    codigoEnteroSinGroup = code;
    console.log("No se encontró un formato válido en el string.");
  }
  return (
  <Link href={`/detailPage?productId=${codigoEnteroSinGroup}&productParent=${codigoAntesDelGroup}`}>
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
