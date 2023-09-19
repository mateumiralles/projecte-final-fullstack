"use client";
import {
  WheelEvent,
  WheelEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import ProductSummary from "./productSummary";
import axios from "axios";
import Image from "next/image";
import { Article, ProductGeneral } from "../classes";
import Navbar from "../components/Navbar/Navbar";
import { cursorTo } from "readline";
import ProductCard from "../productsList/productCard";

export default function detailPage() {
  const [product, setProduct] = useState<any>();
  const [productDetails, setProductDetails] = useState<Article>(new Article());
  const [productSizeAndColors, setProductSizeAndColors] = useState<Array<any>>(
    [],
  );
  const [productToAdd, setProductToAdd] = useState<ProductGeneral>(
    new ProductGeneral(),
  );
  const [currentIndex, setCurrentIndex] = useState(1);
  const [seeMoreDetail, setSeeMoreDetail] = useState(false);
  const options = {
    method: "GET",
    url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail",
    params: {
      lang: "es",
      country: "es",
      productcode: "1183573002",
    },
    headers: {
      "X-RapidAPI-Key": "ca39b364a4msh5747570dc5634fbp18b7aejsn66c9149fcf5d",
      "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
    },
  };

  const styleWithRequest = (code: string) => {
    const styleWithRequest = {
      method: "GET",
      url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail",
      params: {
        lang: "es",
        country: "es",
        productcode: code,
      },
      headers: {
        "X-RapidAPI-Key": "ca39b364a4msh5747570dc5634fbp18b7aejsn66c9149fcf5d",
        "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
      },
    };
    return getProduct(styleWithRequest);
  };

  console.log(productToAdd);

  const getProduct = async (fetchType: any) => {
    try {
      const response = await axios.request(fetchType);
      return response.data;
    } catch (error) {
      return error;
    }
  };

  const getProductDetails = (): Article => {
    let productInstance = null;

    product.product.articlesList.forEach((element: any) => {
      if (element.code === product.product.code) {
        productInstance = new Article(element);
      }
    });

    return productInstance ?? new Article();
  };

  const updateColor = (colorRgb: string, colorName: string) => {
    console.log(colorName);
    product.product.articlesList.forEach((element: Article) => {
      if (element.color.rgbColor === colorRgb) {
        setProductDetails(element);
        setProductToAdd((prevProduct) => ({
          ...prevProduct,
          colorRgb: colorRgb,
          colorName: colorName,
        }));
      }
    });
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
  };

  useEffect(() => {
    const fetchData = async () => {
      const storedProduct = localStorage.getItem("product");
      if (storedProduct == null) {
        try {
          const response = await getProduct(options);
          setProduct(response);
          localStorage.setItem("product", JSON.stringify(response));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        setProduct(JSON.parse(storedProduct));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (product !== undefined) {
      setProductDetails(getProductDetails());
      setProductSizeAndColors(getProductSizeAndColors());
    }
  }, [product]);
  useEffect(() => {
    if (productSizeAndColors.length !== 0) {
      setProductToAdd((prevProduct) => ({
        ...prevProduct,
        code: productDetails.code,
        name: productDetails.name,
        price: productDetails.whitePrice.price,
        currency: productDetails.whitePrice.currency,
        img: productDetails.galleryDetails[0].baseUrl,
        colorRgb: productDetails.color.rgbColor,
        colorName: productDetails.color.text,
      }));
    }
    const images = document.getElementById("images");
    const imageAndScroll = document.getElementById("imageAndScroll")!;
    const productDetail = document.getElementById("productSummary");
    const productInfo = document.getElementById("productInfo")!;
    if (imageAndScroll)
      imageAndScroll.style.height = `${productDetail?.clientHeight}px`;
    if (productInfo)
      productInfo.style.maxHeight = `${productDetail?.clientHeight}px`;
    if (images)
      images.addEventListener("wheel", (e) => handleScroll(e, images), {
        passive: false,
      });

    return () => {
      if (images) {
        images.removeEventListener("wheel", (e) => handleScroll(e, images));
      }
    };
  }, [productSizeAndColors]);

  let isScrollActive = false;
  let currentIndexRealTime: number = 0;

  const handleScroll = (event: globalThis.WheelEvent, images: HTMLElement) => {
    event.preventDefault();
    console.log("Current index: " + currentIndex);
    console.log("Current Index real time: " + currentIndexRealTime);
    if (isScrollActive) {
      return; // Evitar el scroll mientras se está desplazando
    }
    isScrollActive = true;
    if (event.deltaY > 0) {
      currentIndexRealTime =
        (currentIndexRealTime + 1) % productDetails.galleryDetails.length;
      setCurrentIndex(currentIndexRealTime + 1);
    } else if (event.deltaY < 0) {
      currentIndexRealTime =
        (currentIndexRealTime - 1 + productDetails.galleryDetails.length) %
        productDetails.galleryDetails.length;
      setCurrentIndex(currentIndexRealTime + 1);
    }
    const scrollY: number = currentIndexRealTime * (images?.clientHeight || 0);

    images?.scrollTo({ top: scrollY, behavior: "smooth" });
    setTimeout(() => {
      isScrollActive = false;
    }, 500);
  };

  useEffect(() => {
    const productInfo = document.getElementById("productInfo")!;
    if (productInfo) {
      if (seeMoreDetail) {
        productInfo.scrollTo({ top: 0, behavior: "smooth" });
        productInfo.style.height = `${productInfo.clientHeight / 2}px`;
      } else {
        //console.log(productInfo.scrollTop);
        productInfo.style.height = `${productInfo.clientHeight * 2}px`;
      }
    }
  }, [seeMoreDetail]);

  return (
    <>
      <main className="flex flex-row items-start justify-center gap-5 p-20">
        {productSizeAndColors.length == 0 ? (
          <h1>Loading...</h1>
        ) : product.responseStatusCode === "ok" ? (
          <>
            <div
              id="productInfo"
              className="no-scrollbar max-w-xs self-end overflow-y-auto rounded border border-black p-7 transition-all duration-300"
            >
              <h3 className="text-lg">COMPOSICIÓN, CUIDADOS Y ORIGEN</h3>
              <div>
                <p className="mb-5 mt-5 text-base">COMPOSICIÓN</p>
                <div className="mb-2">
                  {productDetails.compositions.map((element, index) =>
                    element.materials.map((material, index) => (
                      <div>
                        <p key={index} className="inline-block text-sm">
                          {material.percentage}%
                        </p>
                        &nbsp;
                        <p className="inline-block text-sm">{material.name}</p>
                      </div>
                    )),
                  )}
                </div>
                {productDetails.materialDetails.map((materialDesc, index) => (
                  <div className="mb-2" key={index}>
                    <p className="text-sm font-bold">{materialDesc.name}:</p>
                    <p className="text-sm">{materialDesc.description}</p>
                  </div>
                ))}
              </div>
              <p className="mb-5 mt-5 text-base">CUIDADOS</p>
              <p className="mb-2 text-sm">
                Cuidar de tus prendas es cuidar del medioambiente
              </p>
              <p className="mb-3 text-sm">
                Los lavados a bajas temperaturas y los programas de centrifugado
                suaves son más delicados con las prendas, ayudando a mantener el
                color, la forma y la estructura del tejido.
              </p>
              <ul>
                {productDetails.careInstructions.map((care, index) => (
                  <li className="text-sm" key={index}>
                    {care}
                  </li>
                ))}
              </ul>
              <p className="mb-5 mt-5 text-base">ORIGEN</p>
              <p className="mb-5 text-sm">
                Hecho en {productDetails.articleCountryOfProduction}
              </p>
              <p
                className="underline hover:cursor-pointer"
                onClick={() => setSeeMoreDetail(!seeMoreDetail)}
              >
                {seeMoreDetail ? "Ver más" : "Ver menos"}
              </p>
            </div>
            <div
              id="imageAndScroll"
              className="relative aspect-[5001/7501] rounded"
            >
              <div
                id="scrollLine"
                style={{
                  height: `${
                    (currentIndex / productDetails.galleryDetails.length) * 100
                  }%`,
                  transition: "0.4s ease-in-out",
                }}
                className="absolute right-0 top-[0] z-10 w-[2px] bg-black"
              ></div>
              <div
                id="images"
                className="no-scrollbar relative h-[100%] w-[100%] overflow-y-auto"
              >
                {productDetails.galleryDetails.map((img, index) => (
                  <img key={index} src={img.baseUrl} />
                ))}
              </div>
            </div>
            <div
              id="productSummary"
              className="max-w-[35%] rounded border border-black"
            >
              <ProductSummary
                name={productDetails.name}
                price={productDetails.whitePrice}
                color={productDetails.color}
                desc={productDetails.description}
                colors={productSizeAndColors[1]}
                sizes={productSizeAndColors[0]}
                productToAdd={productToAdd}
                setProductToAdd={setProductToAdd}
                changeColor={updateColor}
              />
            </div>
          </>
        ) : (
          <p>Algo ha salido mal!</p>
        )}
      </main>
      {/* <section>
                {productDetails.styleWith.map((product, index) => (
                     product.code
                ))}
            </section> */}
    </>
  );
}
