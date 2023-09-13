"use client"
import { WheelEvent, WheelEventHandler, useEffect, useRef, useState } from 'react';
import ProductSummary from "./productSummary";
import axios from "axios";
import Image from "next/image";
import { Article, ProductGeneral } from '../classes';
import Navbar from '../components/Navbar/Navbar';
import { cursorTo } from 'readline';

export default function detailPage() {
    const galleryRef = useRef<HTMLDivElement | null>(null);
    const [currentImage, setCurrentImage] = useState(0);
    const [product, setProduct] = useState<any>();
    const [productDetails, setProductDetails] = useState<Article>(new Article);
    const [productSizeAndColors, setProductSizeAndColors] = useState<Array<any>>([]);
    const [productToAdd, setProductToAdd] = useState<ProductGeneral>(new ProductGeneral);
    const [imageScrolling, setImageScrolling] = useState(false);

    const options = {
        method: 'GET',
        url: 'https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail',
        params: {
            lang: 'es',
            country: 'es',
            productcode: '0839915011'
        },
        headers: {
            'X-RapidAPI-Key': 'ca39b364a4msh5747570dc5634fbp18b7aejsn66c9149fcf5d',
            'X-RapidAPI-Host': 'apidojo-hm-hennes-mauritz-v1.p.rapidapi.com'
        }
    };

    const scrollToNextImage = () => {
        const container = galleryRef.current;
        if (container) {
            setCurrentImage((prevImage) => {
            const nextImage = prevImage + 1;
            if (nextImage < productDetails.galleryDetails.length) {
                const nextImageElement = container.children[nextImage] as HTMLElement;
                if (nextImageElement) {
                container.scrollTo({
                    top: 0,
                    left: nextImageElement.offsetLeft,
                    behavior: 'smooth',
                });
                }
                return nextImage;
            } else {
                return prevImage;
            }
            });
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
        
        const handleScroll = () => {
            const container = galleryRef.current;
            if (container && container.scrollLeft + container.clientWidth >= container.scrollWidth) {
              scrollToNextImage();
            }
          };
      
          galleryRef.current?.addEventListener('scroll', handleScroll);
          return () => {
            galleryRef.current?.removeEventListener('scroll', handleScroll);
        };
    }, []); 



    useEffect(() => {
        if(product!==undefined){
            setProductDetails(getProductDetails());
            setProductSizeAndColors(getProductSizeAndColors());
        }
    }, [product]);


    let currentIndex: number = 0;
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
        console.log(images);
        if (images) {
            images.addEventListener('wheel', (e) => handleScroll(e, images), { passive: false });
          }
      
          return () => {
            if (images) {
              images.removeEventListener('wheel', (e) => handleScroll(e, images));
            }
          };
    }, [productSizeAndColors])


      
    const handleScroll = (event: globalThis.WheelEvent, images: HTMLElement) => {
        if (imageScrolling) {
            return; // Evitar el scroll mientras se está desplazando
        }
        console.log(currentIndex);
        event.preventDefault();
        if(event.deltaY>0){
            currentIndex = (currentIndex + 1) % productDetails.galleryDetails.length;
        } else if (event.deltaY<0){
            currentIndex = (currentIndex - 1 + productDetails.galleryDetails.length) % productDetails.galleryDetails.length;
        }
        const scrollY: number = currentIndex * (images?.clientHeight || 0);
        setImageScrolling(true);
        images?.scrollTo({top: scrollY, behavior: 'smooth'});
        setTimeout(() => {
            setImageScrolling(false);
          }, 500);
    }


    return (
        <>
            <main className="flex min-h-screen flex-row items-center justify-center p-24 gap-5">
                {productSizeAndColors.length == 0 ? <h1>Loading...</h1> :

                    product.responseStatusCode === "ok" ?
                        <>
                                <div id="images" className="w-[25%] h-[616px] overflow-x-auto" ref={galleryRef}>
                                {productDetails.galleryDetails.map((img, index) => (
                                    <img key={index} src={img.baseUrl} />
                                ))}
                            </div>
                            <ProductSummary name={productDetails.name} price={productDetails.whitePrice} color={productDetails.color} desc={productDetails.description} colors={productSizeAndColors[1]} sizes={productSizeAndColors[0]} productToAdd={productToAdd} setProductToAdd={setProductToAdd} />
                        </>
                        : <p>Algo ha salido mal!</p>
                }
            </main>
        </>
    );
}