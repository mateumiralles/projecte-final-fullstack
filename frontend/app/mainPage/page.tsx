import React from "react";
import ProductCard from "../components/productCard";
import blanco1 from "../public/blanco1.jpg";
import Navbar from "../components/Navbar";

export default function MainPage() {
  const products: any = [
    { title: "Camiseta manga larga estructura otomán", price: 10, image: "blanco1" },
    { title: "Camiseta bordado Different Time Realities", price: 8, image: "blanco1" },
    { title: "Camiseta manga corta print", price: 10, image: "blanco1" },
    { title: "Camiseta oversize manga corta", price: 12, image: "blanco1" },
   
    { title: "Camiseta manga larga estructura otomán", price: 10, image: "blanco1" },
    { title: "Camiseta bordado Different Time Realities", price: 8, image: "blanco1" },
    { title: "Camiseta manga corta print", price: 10, image: "blanco1" },
    { title: "Camiseta oversize manga corta", price: 12, image: "blanco1" },
   
    { title: "Camiseta manga larga estructura otomán", price: 10, image: "blanco1" },
    { title: "Camiseta bordado Different Time Realities", price: 8, image: "blanco1" },
    { title: "Camiseta manga corta print", price: 10, image: "blanco1" },
    { title: "Camiseta oversize manga corta", price: 12, image: "blanco1" },

  ];

  return (
    <div className=" flex flex-col">
        <Navbar></Navbar>
      <div className="mt-8 grid grid-cols-4 mx-12 gap-x-4 gap-y-10 ">
        {products.map((product: any, index: number) => (
          <div className="w-full flex justify-center" key={index}>
            <ProductCard {...product} />
          </div>
        ))}
      </div>
    </div>
  );
}
