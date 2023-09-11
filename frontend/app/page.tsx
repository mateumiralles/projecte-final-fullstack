"use client"
import { useEffect, useState } from 'react';
import ProductSummary from "./productSummary";
import axios from "axios";
import Image from "next/image";
import { Article } from './classes';

export default function detailPage() {
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

    const [product, setProduct] = useState<any>();
    const [productDetails, setProductDetails] = useState<Article>(new Article);
    const [productSizeAndColors, setProductSizeAndColors] = useState<Array<any>>([]);

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
            try {
                const response = await getProduct();
                setProduct(response);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData(); // Llama a la función de solicitud cuando el componente se monta
    }, []); // 

    useEffect(() => {
        if(product!==undefined){
            setProductDetails(getProductDetails());
            setProductSizeAndColors(getProductSizeAndColors());
        }
    }, [product])

    return (
        <main className="flex min-h-screen flex-row items-center justify-center p-24 gap-5">
            {productSizeAndColors.length == 0 ? <h1>Loading...</h1> :

                product.responseStatusCode === "ok" ?
                    <>
                        <div className="w-[25%]">
                            <img src={productDetails.galleryDetails[0].baseUrl} />
                        </div>
                        <ProductSummary name={product.product.name} price={product.product.whitePrice} color={product.product.color} desc={product.product.description} colors={productSizeAndColors[1]} sizes={productSizeAndColors[0]} />
                    </>
                    : <p>Algo ha salido mal!</p>
            }
        </main>
    );
}