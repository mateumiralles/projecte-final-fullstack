"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";

export default function ProductsList() {

  const getList = async (category: string) => {
    let options = {
      method: "GET",
      url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
      params: {
        country: "es",
        lang: "es",
        currentpage: "0",
        pagesize: "30",
        categories: category,
      },
      headers: {
        "X-RapidAPI-Key": "ca39b364a4msh5747570dc5634fbp18b7aejsn66c9149fcf5d",
        "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
      },
    };
  
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const [list, setList] = useState<any>();

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = url.searchParams;
    let category = params.get('category')!;
    console.log(category);
    const fetchData = async () => {
      const storedList = localStorage.getItem("list");
      if (storedList == null) {
        try {
          const response = await getList(category);
          setList(response);
          //localStorage.setItem("list", JSON.stringify(response));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setList(JSON.parse(storedList));
      }
    };

    fetchData();
  }, []);
  console.log(list);
  return (
    <div className=" flex flex-col">
      {list === undefined ? (
        <p>Loading</p>
      ) : (
        <div className="mx-12 mt-8 grid grid-cols-4 gap-x-4 gap-y-10 ">
          {list.results.map((p: any, index: number) => (
            <div className="flex w-full justify-center" key={index}>
              <ProductCard
                code={p.code}
                title={p.name}
                price={p.price.value}
                image={p.galleryImages[0].url}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
