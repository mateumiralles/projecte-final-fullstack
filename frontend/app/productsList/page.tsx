"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ProductCard from "./productCard";
import { useRouter } from "next/navigation";
import ReactLoading from 'react-loading';
import ProductsGrid from "./productsGrid";

export default function ProductsList() {
  const [list, setList] = useState<any[]>([]);
  const [moreItems, setMoreItems] = useState<boolean>(false);
  const [category, setCategory] = useState<string>("");
  const [page, setPage] = useState<number>(0);
  const {refresh} = useRouter();
  
  const getList = async (category: string, pagesize: string = "30", currentPage: string = "0") => {
    console.log(currentPage);
    let options = {
      method: "GET",
      url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list",
      params: {
        country: "es",
        lang: "en",
        currentpage: currentPage,
        pagesize: pagesize,
        categories: category,
      },
      headers: {
        "X-RapidAPI-Key": "ca39b364a4msh5747570dc5634fbp18b7aejsn66c9149fcf5d",
        "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
      },
    };
  
    try {
      const response = await axios.request(options);
      console.log(response.data);
      return response.data.results; 
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {

    function handleScroll() {
      const scrollHeight = document.documentElement.scrollHeight;
      const clientHeight = window.innerHeight;
      const currentScrollPercentage = (window.scrollY / (scrollHeight - clientHeight)) * 100;
      if(page<=5){
        if (currentScrollPercentage >= 60 && !moreItems) {
          setMoreItems(true);
          setPage(page+1);
          getList(category, "30", page.toString())
          .then((response) => {
            if(response.length!=0) setList([...list, ...response]);
            setMoreItems(false);
          })
          .catch((error) => {
            console.error('Error en la solicitud a la API:', error);
            setMoreItems(false);
          });
        }
      }
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [moreItems]); 

  const fetchData = async (category: string = "") => {
    if(category!==""){
      try {
        const response = await getList(category);
        setList(response);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
  }

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = url.searchParams;
    let category = params.get('category')!
    setCategory(category);
    fetchData(category);
  }, []);

  return (
      <>
      {list===null || list.length===0 ? (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[90svw] h-[90svh] flex justify-center items-center">
            <ReactLoading type="bubbles" color="#000000" height={200} width={200} />
        </div>
      ) : (
        <div className="relative flex flex-col">
          <ProductsGrid list={list}/>
          {moreItems 
          ? 
          <div className="w-full flex justify-center items-center">
            <ReactLoading type="bubbles" color="#000000" height={70} width={70} />
          </div>
          : null  
          }
        </div>
      )}
      </>
  );
}
