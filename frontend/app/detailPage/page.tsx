"use client";
import {
  WheelEvent,
  WheelEventHandler,
  useEffect,
  useRef,
  useState,
} from "react";
import ProductSummary from "./productSummary";
import axios, { AxiosError } from "axios";
import { Article, ProductData, ProductGeneral } from "../classes";
import { ProductSummary as ProductSummaryClass } from "../classes";
import { useRouter } from "next/navigation";

export default function detailPage() {
  const [product, setProduct] = useState<ProductData>();
  const [productToAdd, setProductToAdd] = useState<ProductGeneral>(
    new ProductGeneral(),
  );
  const [currentIndex, setCurrentIndex] = useState(1);
  const [seeMoreDetail, setSeeMoreDetail] = useState(false);

  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  const handleImageLoad = (index: number) => {
    // Marca la imagen como cargada correctamente.
    setLoadedImages((prevLoadedImages) => [...prevLoadedImages, index]);
  };

  const setProductToClass = (product: any, productId: string, local: boolean = false) => {
    let newProduct: ProductData = {
      code: product.code,
      name: product.name,
      description: product.description,
      color: product.color,
      whitePrice: product.whitePrice,
      articlesList: [],
      galleryDetails: [],
      careInstructions: [],
      compositions: [],
      materialDetails: [],
      variantsList: [],
      colors: [],
      articleCountryOfProduction: product.articleCountryOfProduction || product.countryOfProduction || product.productCountryOfProduction,
      categoryId: product.categoryId,
    };
    product.articlesList.forEach((article: any) => {
      let newArticle: {
        code: string; // Reemplaza 'string' con el tipo correcto de article.code
        galleryDetails: string[]; // Reemplaza 'any' con el tipo correcto de article.galleryDetails
        color: any; // Reemplaza 'string' con el tipo correcto de article.color
        variantsList: string[]; // Especifica que newArticle.variantsList es un array de strings
      } = {
        code: article.code,
        galleryDetails: [],
        color: article.color,
        variantsList: [],
      };

      let sizesOfArticle: any[] = [];
      let imagesOfArticle: any[] = [];
      if(local) article.variantsList.forEach((size: any) => sizesOfArticle.push(size));
      else article.variantsList.forEach((size: any) => sizesOfArticle.push(size.size.name));
      article.galleryDetails.forEach((image: any) => {if(image!=null) imagesOfArticle.push(image.baseUrl)})
      
      newArticle.variantsList = sizesOfArticle;
      newArticle.galleryDetails = imagesOfArticle;

      newProduct.articlesList.push(newArticle);

      let color = {rgbColor: article.color.rgbColor, name: article.color.text, code: article.color.code}
      newProduct.colors.push(color);
      if(article.code==productId){
        let sizes: any[] = [];
        let images: any[] = [];
        article.galleryDetails.forEach((image: any) => {
          images.push(image.baseUrl)
        });
        if(local) article.variantsList.forEach((variant: any) => {
          sizes.push(variant);
        })
        else article.variantsList.forEach((variant: any) => {
          sizes.push(variant.size.name);
        })

        newProduct.galleryDetails=images;
        newProduct.variantsList=sizes;
        newProduct.careInstructions=article.careInstructions;
        newProduct.compositions = article.compositions;
        newProduct.materialDetails=article.materialDetails;
      }
    });
    console.log(newProduct);
    return newProduct as ProductData;
  }

  const uploadProductToDB = async (newProduct: ProductData) => {
    try{
      let productSummary: ProductSummaryClass = {
        img: newProduct.galleryDetails[0],
        code: newProduct.code,
        currency: newProduct.whitePrice.currency,
        price: newProduct.whitePrice.price,
        name: newProduct.name,
      }


      const uploadProduct = await axios.post("http://localhost:3333/api/products", newProduct);
      const uploadSummary = await axios.post("http://localhost:3333/api/productSummaries", productSummary);
      console.log("UPLOAD PRODUCT",uploadProduct);
      console.log("UPLOAD SUMMARY", uploadSummary);
    }catch(error){
      console.log("ERROR ON UPLOAD PRODUCT",error);
    }
  }

  const getProduct = async (productParentMain: string, productId: string) => {
    let options = {
      method: "GET",
      url: "https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/detail",
      params: {
        lang: "es",
        country: "es",
        productcode: `${productParentMain}`,
      },
      headers: {
        "X-RapidAPI-Key": "ca39b364a4msh5747570dc5634fbp18b7aejsn66c9149fcf5d",
        "X-RapidAPI-Host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
      },
    };
    try {
      const localResponse = await axios.get(`http://localhost:3333/api/products/${productParentMain}`);
      return [localResponse, false];
    } catch (error: any) {
      if(error.response.status===404){
        try{
          const response = await axios.request(options);
          if(response.data.responseStatusCode==="not-found"){
            getProduct(productId, "");
          }
          else if(response.data.responseStatusCode==="ok"){
            return [response.data, true];
          }
          else{
            return null;
          }
        } catch (error) {
          return null;
        }
      }
    }
  };


  const {push, refresh} = useRouter();
  const addProductToBasket = async () => {
      const valores = Object.values(productToAdd);
      if(valores.every(valor => valor !== undefined)){
        if(localStorage.getItem('user')){
          const user = JSON.parse(localStorage.getItem('user')!);

          try {
            const localResponse = await axios.get(`http://localhost:3333/api/users/${user.id}/cart`);
            try{
              console.log(localResponse);
              console.log(productToAdd);
              const cartResponse = await axios.post(`http://localhost:3333/api/users/${user.id}/cart/add`, {
                cartId: localResponse.data.id,
                img: productToAdd.img,
                productSummaryCode: productToAdd.code,
                quantity: productToAdd.ammount,
                size: productToAdd.size,
                colorRgb: productToAdd.colorRgb,
              });
              
              console.log(cartResponse);
              if(cartResponse.status===201){
                alert("Añadido a la cesta. vete a la cesta.")
              }
            } catch (error: any){
              console.log(error);
            }
          } catch (error: any) {
            console.log(error);
          }
        }
        else{
          console.log("Not logged-in");
          push("/usersPage");
          refresh();
        }
      }
    }

  const updateColor = (colorName: string) => {
    product?.articlesList.forEach((article: any, index: number) => {
      if(article.color.text===colorName){
        const updatedProduct = {
          ...product, // Copiar todas las propiedades existentes
          color: article.color,
          galleryDetails: article.galleryDetails, // Sobrescribir propiedad1 con un nuevo valor
          variantsList: article.variantsList, // Sobrescribir propiedad2 con un nuevo valor
        };
        setProduct(updatedProduct);
      }
    })
  };


  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = url.searchParams;
    let productId = params.get('productId')!;
    let productParent = params.get('productParent')!;
    const fetchData = async () => {
      try {
        console.log(productParent+"001");
        const response = await getProduct(productParent+"001", productId);
        console.log(response);
        if (response !== null) {
          if (Array.isArray(response)) {
            if(response[1]){
              let product = setProductToClass(response[0].product, productId);
              uploadProductToDB(product);
              setProduct(product);
            }
            else {
              console.log(response[0].data);
              setProductToClass(response[0].data, productId, true);
              setProduct(response[0].data);
            }
          } 
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    // console.log(productToAdd);
    // console.log(loadedImages);
  }, [productToAdd]);

  useEffect(() => {
    if (product) {
      setProductToAdd((prevProduct) => ({
        ...prevProduct,
        code: product.code,
        name: product.name,
        price: product.whitePrice.price,
        currency: product.whitePrice.currency,
        img: product.galleryDetails[0],
        colorRgb: product.color.rgbColor,
        colorName: product.color.text,
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
  }, [product]);

  let isScrollActive = false;
  let currentIndexRealTime: number = 0;

  const handleScroll = (event: globalThis.WheelEvent, images: HTMLElement) => {
    event.preventDefault();
    if (isScrollActive) {
      return; // Evitar el scroll mientras se está desplazando
    }
    isScrollActive = true;
    if (event.deltaY > 0) {
      currentIndexRealTime =
        (currentIndexRealTime + 1) % product!.galleryDetails.length;
      setCurrentIndex(currentIndexRealTime + 1);
    } else if (event.deltaY < 0) {
      currentIndexRealTime =
        (currentIndexRealTime - 1 + product!.galleryDetails.length) %
        product!.galleryDetails.length;
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
        productInfo.style.height = `${productInfo.clientHeight * 2}px`;
      }
    }
  }, [seeMoreDetail]);

  return (
    <>
      <main className="flex flex-row items-start justify-center gap-5 p-20">
        {!product ? (
          <h1>Loading...</h1>
        ) : (
          <>
            <div
              id="productInfo"
              className="no-scrollbar max-w-xs self-end overflow-y-auto rounded border border-black p-7 transition-all duration-300"
            >
              <h3 className="text-lg">COMPOSICIÓN, CUIDADOS Y ORIGEN</h3>
              <div>
                <p className="mb-5 mt-5 text-base">COMPOSICIÓN</p>
                <div className="mb-2">
                  {product.compositions?.map((element, index) =>
                    element.materials.map((material: any, index: number) => (
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
                {product.materialDetails?.map((materialDesc, index) => (
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
                {product.careInstructions?.map((care, index) => (
                  <li className="text-sm" key={index}>
                    {care}
                  </li>
                ))}
              </ul>
              <p className="mb-5 mt-5 text-base">ORIGEN</p>
              <p className="mb-5 text-sm">
                Hecho en {product.articleCountryOfProduction}
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
                    (currentIndex / loadedImages.length) * 100
                  }%`,
                  transition: "0.4s ease-in-out",
                }}
                className="absolute right-0 top-[0] z-10 w-[2px] bg-black"
              ></div>
              <div
                id="images"
                className="no-scrollbar relative h-[100%] w-[100%] overflow-y-auto"
              >
                {product.galleryDetails?.map((img, index) => (
                  <img key={index} src={img} onLoad={() => handleImageLoad(index)} onError={() => console.log("TREMENDO BUG PAUIEK")} style={{ display: loadedImages.includes(index) ? 'block' : 'none' }}/>
                ))}
              </div>
            </div>
            <div
              id="productSummary"
              className="max-w-[35%] rounded border border-black"
            >
              <ProductSummary
                name={product.name}
                price={product.whitePrice}
                color={product.color}
                desc={product.description}
                colors={product.colors}
                sizes={product.variantsList!}
                productToAdd={productToAdd}
                setProductToAdd={setProductToAdd}
                changeColor={updateColor}
                addProductToBasket={addProductToBasket}
              />
            </div>
          </>
        )}
      </main>
    </>
  );
}
