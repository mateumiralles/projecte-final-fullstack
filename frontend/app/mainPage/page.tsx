"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "../components/productCard";
import blanco1 from "../public/blanco1.jpg";
import Navbar from "../components/Navbar/Navbar";

export default function MainPage() {
  const options = {
    method: "GET",
    url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
    params: {
      country: "es",
      lang: "es",
      currentpage: "0",
      pagesize: "30",
      categories: "men_all",
      concepts: "H&M MAN",
    },
    headers: {
      "X-RapidAPI-Key": "ca39b364a4msh5747570dc5634fbp18b7aejsn66c9149fcf5d",
      "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  const getList = async () => {
    try {
      const response = await axios.request(options);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const [list, setList] = useState<any>();

  useEffect(() => {
    const fetchData = async () => {
      const storedList = localStorage.getItem("list");
      if (storedList == null) {
        try {
          const response = await getList();
          setList(response);
          localStorage.setItem("list", JSON.stringify(response));
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
        <div className="mt-8 grid grid-cols-4 mx-12 gap-x-4 gap-y-10 ">
          {list.results.map((p: any, index: number) => (
            <div className="w-full flex justify-center" key={index}>
              <ProductCard
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
