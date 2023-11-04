"use client";
import axios from "axios";
import gsap from "gsap";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ProductSummary } from "../classes";
import ProductCard from "../productsList/productCard";

export default function WishListPage() {
  const [wishlist, setWishlist] = useState<ProductSummary[]>([]);

  const box = useRef(null);
  useLayoutEffect(() => {
    gsap.context(() => {
      gsap.to(box.current, { opacity: 1, duration: 1.5, y: 0 });
    });
  }, []);

  const getWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    try {
      const wishlist = await axios.get(
        `http://localhost:3333/api/users/${user.id}/wishList`,
      );
      console.log(wishlist);
      if (wishlist.status === 200) {
        wishlist.data.WishListItem.forEach(async (item: any) => {
          try {
            const itemSummary = await axios.get(
              `http://localhost:3333/api/productSummaries/${item.productSummaryCode}`,
            );
            if (itemSummary.status === 200) {
              const product = itemSummary.data;
              setWishlist((prevWishlist) => [...prevWishlist, product]);
            }
          } catch (error) {
            console.log(error);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getWishlist();
  }, []);

  return (
    <main
      onClick={() => {
        wishlist.forEach((item) => {
          console.log(item);
        });
      }}
    >
      <div
        className="mx-12 mt-8 grid -translate-y-10 grid-cols-5 gap-x-4 gap-y-10 opacity-0"
        ref={box}
      >
        {wishlist.map((product, i) => {
          return (
            <div className="flex w-full justify-center" key={i}>
              <ProductCard
                code={product.code!}
                title={product.name!}
                price={product.price!}
                image={product.img!}
              />
            </div>
          );
        })}
      </div>
    </main>
  );
}
