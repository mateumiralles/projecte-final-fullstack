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
      <div className="relative flex flex-col place-items-center gap-y-5 ">
        <Link href="/productsList">
          <p className="rounded  border border-black p-4 text-5xl font-bold transition duration-500 hover:scale-110">
            LINK A PRODUCTS LIST
          </p>
        </Link>
        <Link href="/detailPage">
          <p className="rounded border border-black p-4 text-5xl font-bold transition duration-500 hover:scale-110">
            LINK A DETAIL PAGE
          </p>
        </Link>
        <Link href="/basketPage2">
          <p className="rounded border border-black p-4 text-5xl font-bold transition duration-500 hover:scale-110">
            LINK A BASKET PAGE
          </p>
        </Link>
        <Link href="/mainPage">
          <p className="rounded border border-black p-4 text-5xl font-bold transition duration-500 hover:scale-110">
            LINK A MAIN PAGE
          </p>
        </Link>
      </div>
    </main>
  );
}
