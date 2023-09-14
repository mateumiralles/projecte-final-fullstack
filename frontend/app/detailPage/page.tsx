"use client"
import { WheelEvent, WheelEventHandler, useEffect, useRef, useState } from 'react';
import ProductSummary from "./productSummary";
import axios from "axios";
import Image from "next/image";
import { Article, ProductGeneral } from '../classes';
import Navbar from '../components/Navbar/Navbar';
import { cursorTo } from 'readline';

export default function detailPage() {
    const [product, setProduct] = useState<any>();
    const [productDetails, setProductDetails] = useState<Article>(new Article);
    const [productSizeAndColors, setProductSizeAndColors] = useState<Array<any>>([]);
    const [productToAdd, setProductToAdd] = useState<ProductGeneral>(new ProductGeneral);
    const [currentIndex, setCurrentIndex] = useState(1);
    const options = {
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail',
        params: {
            lang: 'es',
            country: 'es',
            productcode: '1208692001'
        },
        headers: {
            'X-RapidAPI-Key': 'ca39b364a4msh5747570dc5634fbp18b7aejsn66c9149fcf5d',
            'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
    };

    const getProduct = async () => {
        try {
            const response = await axios.request(options);
            return response.data;
        } catch (error) {
            return error;
        }
    }

    const getProductDetails = (): Article => {
        let productInstance = null;

        product.product.articlesList.forEach((element: any) => {
            if (element.code === product.product.code) {
                productInstance = new Article(element);
            }
        });

        return productInstance ?? new Article();
    };

    const getProductSizeAndColors = () => {
        var sizes = null;
        var colors: any[] = [];
        product.product.articlesList.forEach((element: any) => {
            if (element.code === product.product.code) {
                sizes = element.variantsList;
            }
            if (element.inStore) {
                colors.push(element.color);
            }
        });
        return [sizes, colors];
    }

    useEffect(() => {
        const fetchData = async () => {
            const storedProduct = localStorage.getItem('product');
            if(storedProduct==null){
                try {
                    const response = await getProduct();
                    setProduct(response);
                    localStorage.setItem('product', JSON.stringify(response))
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            }
            else{
                setProduct(JSON.parse(storedProduct));
            }
        };

        fetchData();
    }, []); 

    useEffect(() => {
        if(product!==undefined){
            setProductDetails(getProductDetails());
            setProductSizeAndColors(getProductSizeAndColors());
        }
    }, [product]);
   
    useEffect(() => {
        if(productSizeAndColors.length!==0){
            setProductToAdd((prevProduct) => ({
                ...prevProduct, // Mantén las propiedades existentes
                code: productDetails.code,
                name: productDetails.name,
                price: productDetails.whitePrice.price,
                currency: productDetails.whitePrice.currency,
                img: productDetails.galleryDetails[0].baseUrl,
                colorRgb: productDetails.color.rgbColor,
                colorName: productDetails.color.text,
            }));
        }
        const images = document.getElementById('images');
        const imageAndScroll = document.getElementById('imageAndScroll')!;
        const productDetail = document.getElementById('productSummary');

        if(imageAndScroll){
            imageAndScroll.style.height=`${productDetail?.clientHeight}px`;
        }
        if (images) {
            images.addEventListener('wheel', (e) => handleScroll(e, images), { passive: false });
          }
      
          return () => {
            if (images) {
              images.removeEventListener('wheel', (e) => handleScroll(e, images));
            }
          };
    }, [productSizeAndColors])

    let isScrollActive = false;
    let currentIndexRealTime: number = 0;
    const handleScroll = (event: globalThis.WheelEvent, images: HTMLElement) => {
        event.preventDefault();
        console.log("Current index: "+currentIndex);
        console.log("Current Index real time: "+currentIndexRealTime);
        if (isScrollActive) {
            return; // Evitar el scroll mientras se está desplazando
        }
        isScrollActive=true;
        if(event.deltaY>0){
            currentIndexRealTime = (currentIndexRealTime + 1) % productDetails.galleryDetails.length;
            setCurrentIndex(currentIndexRealTime+1);
        } else if (event.deltaY<0){
            currentIndexRealTime = (currentIndexRealTime - 1 + productDetails.galleryDetails.length) % productDetails.galleryDetails.length;
            setCurrentIndex(currentIndexRealTime+1);
        }
        const scrollY: number = currentIndexRealTime * (images?.clientHeight || 0);

        images?.scrollTo({top: scrollY, behavior: 'smooth'});
        setTimeout(() => {
            isScrollActive=false;
          }, 500);
    }


    return (
        <>
            <main className="flex min-h-screen flex-row items-center justify-center p-24 gap-5">
                {productSizeAndColors.length == 0 ? <h1>Loading...</h1> :

                    product.responseStatusCode === "ok" ?
                        <>
                            <div id="imageAndScroll" className='relative aspect-[5001/7501] rounded'>
                                <div id="scrollLine" style={{height: `${(currentIndex/productDetails.galleryDetails.length)*100}%`, transition: "0.4s ease-in-out"}} className='absolute z-10 right-0 top-[0] w-[2px] bg-black'></div>
                                <div id="images" className="w-[100%] h-[100%] overflow-y-auto no-scrollbar relative">

                                    {productDetails.galleryDetails.map((img, index) => (
                                        <img key={index} src={img.baseUrl} />
                                    ))}
                                </div>
                            </div>
                            <div id="productSummary" className='max-w-[35%] border border-black rounded'>
                                <ProductSummary name={productDetails.name} price={productDetails.whitePrice} color={productDetails.color} desc={productDetails.description} colors={productSizeAndColors[1]} sizes={productSizeAndColors[0]} productToAdd={productToAdd} setProductToAdd={setProductToAdd} />
                            </div>
                        </>
                        : <p>Algo ha salido mal!</p>
                }
            </main>
        </>
    );
}