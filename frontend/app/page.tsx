import Image from "next/image";
import { useEffect } from "react";
import ProductSummary from "./detailPage/productSummary";
import Link from "next/link";

const prendaTest = {
  name: "BLAZER BÁSICA",
  price: "51,95",
  description:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellendus maxime voluptatibus ratione libero fugiat, earum laborum voluptate amet non! Itaque sunt nam quas placeat aliquam. Nulla rem ad doloremque autem.",
  colors: ["white", "black", "orange", "gray"],
  sizes: ["S", "M", "L", "XL"],
};
//<ProductSummary name={prendaTest.name} price={prendaTest.price} desc={prendaTest.description} colors={prendaTest.colors} sizes={prendaTest.sizes} />
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="relative flex gap-y-5 flex-col place-items-center ">
        <Link href="/productsList">
          <p className="text-5xl  font-bold border border-black hover:scale-110 rounded p-4 transition duration-500">
            LINK A PRODUCTS LIST
          </p>
        </Link>
        <Link href="/detailPage">
          <p className="text-5xl font-bold border border-black hover:scale-110 rounded p-4 transition duration-500">
            LINK A DETAIL PAGE
          </p>
        </Link>
        <Link href="/basketPage">
          <p className="text-5xl font-bold border border-black hover:scale-110 rounded p-4 transition duration-500">
            LINK A BASKET PAGE
          </p>
        </Link>
       
      </div>
    </main>
  );
}