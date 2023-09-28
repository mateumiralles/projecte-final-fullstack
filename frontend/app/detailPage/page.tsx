"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import {
  ProductData,
  ProductGeneral,
  ProductSummary as ProductSummaryClass,
} from "../classes";
import ImagesScroll from "./imagesScroll";
import PopupConfirm from "./popupConfirm";
import ProductInfo from "./productInfo";
import ProductSummary from "./productSummary";

export default function detailPage() {
  const [product, setProduct] = useState<ProductData>();
  const [productToAdd, setProductToAdd] = useState<ProductGeneral>(
    new ProductGeneral(),
  );
  const [toAddToDB, setToAddToDB] = useState<boolean>(false);
  const [isInWhislist, setIsInWhislist] = useState<boolean>(false);
  const [popupVisible, setPopupVisible] = useState(false);
  const [popupType, setPopupType] = useState(0);
  const [popupMessage, setPopupMessage] = useState<string>();
  const [loadedImages, setLoadedImages] = useState<number[]>([]);

  const setProductToClass = (
    product: any,
    productId: string,
    local: boolean = false,
  ) => {
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
      articleCountryOfProduction:
        product.articleCountryOfProduction ||
        product.countryOfProduction ||
        product.productCountryOfProduction,
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
      if (local)
        article.variantsList.forEach((size: any) => sizesOfArticle.push(size));
      else
        article.variantsList.forEach((size: any) =>
          sizesOfArticle.push(size.size.name),
        );
      article.galleryDetails.forEach((image: any) => {
        if (image != null) imagesOfArticle.push(image.baseUrl);
      });

      newArticle.variantsList = sizesOfArticle;
      newArticle.galleryDetails = imagesOfArticle;

      newProduct.articlesList.push(newArticle);

      let color = {
        rgbColor: article.color.rgbColor,
        name: article.color.text,
        code: article.color.code,
      };
      newProduct.colors.push(color);
      if (article.code == productId) {
        let sizes: any[] = [];
        let images: any[] = [];
        article.galleryDetails.forEach((image: any) => {
          images.push(image.baseUrl);
        });
        if (local)
          article.variantsList.forEach((variant: any) => {
            sizes.push(variant);
          });
        else
          article.variantsList.forEach((variant: any) => {
            sizes.push(variant.size.name);
          });

        newProduct.galleryDetails = images;
        newProduct.variantsList = sizes;
        newProduct.careInstructions = article.careInstructions;
        newProduct.compositions = article.compositions;
        newProduct.materialDetails = article.materialDetails;
      }
    });
    console.log(newProduct);
    return newProduct as ProductData;
  };

  console.log(loadedImages);

  const uploadProductToDB = async (newProduct: ProductData) => {
    try {
      let productSummary: ProductSummaryClass = {
        img: newProduct.galleryDetails[loadedImages[0]],
        code: newProduct.code,
        currency: newProduct.whitePrice.currency,
        price: newProduct.whitePrice.price,
        name: newProduct.name,
      };

      const uploadProduct = await axios.post(
        "http://localhost:3333/api/products",
        newProduct,
      );
      const uploadSummary = await axios.post(
        "http://localhost:3333/api/productSummaries",
        productSummary,
      );
      console.log("UPLOAD PRODUCT", uploadProduct);
      console.log("UPLOAD SUMMARY", uploadSummary);
    } catch (error) {
      console.log("ERROR ON UPLOAD PRODUCT", error);
    }
  };

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
      const localResponse = await axios.get(
        `http://localhost:3333/api/products/${productParentMain}`,
      );
      return [localResponse, false];
    } catch (error: any) {
      if (error.response.status === 404) {
        try {
          const response = await axios.request(options);
          console.log(response.data.responseStatusCode == "not-found");
          if (response.data.responseStatusCode == "not-found") {
            getProduct(productId, "");
          } else if (response.data.responseStatusCode == "ok") {
            return [response.data, true];
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      }
    }
  };

  const addProductToWishList = async () => {
    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user")!);
      try {
        const getWishlist = await axios.get(
          `http://localhost:3333/api/users/${user.id}/wishList`,
        );
        let foundMatchingItem = false;
        getWishlist.data.WishListItem.forEach(async (wishlistElement: any) => {
          if (wishlistElement.productSummaryCode === productToAdd.code) {
            try {
              const removeFromWishlist = await axios.delete(
                `http://localhost:3333/api/users/${user.id}/wishList/delete/${wishlistElement.id}`,
              );
              console.log(removeFromWishlist);
              if (removeFromWishlist.status === 204) {
                setIsInWhislist(false);
                foundMatchingItem = true;
                return;
              }
            } catch (error) {
              console.log(error);
            }
          }
        });
        if (foundMatchingItem) {
          setPopupMessage("Product already in the wishlist");
          setPopupType(2);
          setPopupVisible(true);
          return;
        }
        if (!foundMatchingItem) {
          try {
            const toWishlist = await axios.post(
              `http://localhost:3333/api/users/${user.id}/wishList/add`,
              {
                wishListId: getWishlist.data.id,
                productSummaryCode: productToAdd.code,
              },
            );
            console.log(toWishlist);
            setIsInWhislist(true);
            if (toWishlist.status === 200) {
              setPopupMessage("Product succesfully added to your wishlist!");
              setPopupType(1);
              setPopupVisible(true);
            }
          } catch (error: any) {
            console.log(error);
          }
        }
      } catch (error: any) {
        console.log(error);
      }
    }
  };

  const { push, refresh } = useRouter();
  const addProductToBasket = async () => {
    const valores = Object.values(productToAdd);
    if (valores.every((valor) => valor !== undefined)) {
      if (localStorage.getItem("user")) {
        const user = JSON.parse(localStorage.getItem("user")!);
        try {
          const localResponse = await axios.get(
            `http://localhost:3333/api/users/${user.id}/cart`,
          );
          try {
            console.log(localResponse);
            console.log(productToAdd);
            let foundMatchingItem = false;
            localResponse.data.CartItem.forEach((cartItem: any) => {
              if (cartItem.productSummaryCode === productToAdd.code) {
                foundMatchingItem = true;
                return;
              }
            });
            if (foundMatchingItem) {
              setPopupMessage("Product already in the cart");
              setPopupType(2);
              setPopupVisible(true);
              return;
            }
            const cartResponse = await axios.post(
              `http://localhost:3333/api/users/${user.id}/cart/add`,
              {
                cartId: localResponse.data.id,
                img: productToAdd.img,
                productSummaryCode: productToAdd.code,
                quantity: productToAdd.ammount,
                size: productToAdd.size,
                colorRgb: productToAdd.colorRgb,
              },
            );

            if (cartResponse.status === 201) {
              setPopupVisible(true);
              setPopupMessage("Product succesfully added to your cart!");
              setPopupType(0);
            }
          } catch (error: any) {
            console.log(error);
          }
        } catch (error: any) {
          console.log(error);
        }
      } else {
        console.log("Not logged-in");
        push("/usersPage");
        refresh();
      }
    }
  };

  const updateColor = (colorName: string) => {
    product?.articlesList.forEach((article: any, index: number) => {
      if (article.color.text === colorName) {
        const updatedProduct = {
          ...product, // Copiar todas las propiedades existentes
          color: article.color,
          galleryDetails: article.galleryDetails, // Sobrescribir propiedad1 con un nuevo valor
          variantsList: article.variantsList, // Sobrescribir propiedad2 con un nuevo valor
        };
        setProduct(updatedProduct);
      }
    });
  };

  const getIfWishlist = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    try {
      const wishlist = await axios.get(
        `http://localhost:3333/api/users/${user.id}/wishList`,
      );
      if (wishlist.status === 200) {
        wishlist.data.WishListItem.forEach((item: any) => {
          if (item.productSummaryCode === product?.code) {
            setIsInWhislist(true);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (popupType) {
      setTimeout(() => {
        setPopupVisible(false);
      }, 5000);
    }
  }, [popupVisible]);

  useEffect(() => {
    const currentUrl = window.location.href;
    const url = new URL(currentUrl);
    const params = url.searchParams;
    let productId = params.get("productId")!;
    let productParent = params.get("productParent")!;
    const fetchData = async () => {
      try {
        console.log(productParent + "001");
        const response = await getProduct(productParent + "001", productId);
        console.log(response);
        if (response !== null) {
          if (Array.isArray(response)) {
            if (response[1]) {
              let product = setProductToClass(response[0].product, productId);
              setToAddToDB(true);
              //uploadProductToDB(product);
              setProduct(product);
            } else {
              console.log(response[0].data);
              setProductToClass(response[0].data, productId, true);
              setProduct(response[0].data);
            }
          } else if (response === undefined) {
            try {
              const response2 = await getProduct(productId, "");
              if (response2 !== null) {
                if (Array.isArray(response2)) {
                  if (response2[1]) {
                    let product = setProductToClass(
                      response2[0].product,
                      productId,
                    );
                    setToAddToDB(true);
                    //uploadProductToDB(product);
                    setProduct(product);
                  } else {
                    console.log(response2[0].data);
                    setProductToClass(response2[0].data, productId, true);
                    setProduct(response2[0].data);
                  }
                }
              }
            } catch (error: any) {
              console.log(error);
            }
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  console.log("to add to db ", toAddToDB);

  useEffect(() => {
    if (loadedImages.length === 1 && toAddToDB) {
      console.log('El array cambió de longitud 0 a 1');
      uploadProductToDB(product!);
    }
  }, [loadedImages, toAddToDB]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    getIfWishlist();
    const imageAndScroll = document.getElementById("imageAndScroll")!;
    const productDetail = document.getElementById("productSummary");
    const productInfo = document.getElementById("productInfo")!;
    if (imageAndScroll)
      imageAndScroll.style.height = `${productDetail?.clientHeight}px`;
    if (productInfo)
      productInfo.style.maxHeight = `${productDetail?.clientHeight}px`;
  }, [product]);

  return (
    <>
      {!product ? (
        <div className="flex h-[90svh] w-[99svw] items-center justify-center">
          <ReactLoading
            type="bubbles"
            color="#000000"
            height={200}
            width={200}
          />
        </div>
      ) : (
        <main className="mt-5 flex flex-row items-center justify-center gap-5 px-20 pb-20 align-middle">
          <PopupConfirm
            message={popupMessage}
            type={popupType}
            visible={popupVisible}
            setVisible={setPopupVisible}
          />
          <ProductInfo product={product} />
          <ImagesScroll loadedImages={loadedImages} setLoadedImages={setLoadedImages} imagesProp={product.galleryDetails} />
          <div id="productSummary" className="max-w-[35%]">
            <ProductSummary
              name={product.name}
              price={product.whitePrice}
              color={product.color}
              desc={product.description}
              colors={product.colors}
              sizes={product.variantsList!}
              productToAdd={productToAdd}
              setProductToAdd={setProductToAdd}
              isInWhislist={isInWhislist}
              setIsInWhislist={setIsInWhislist}
              changeColor={updateColor}
              addProductToBasket={addProductToBasket}
              addProductToWishlist={addProductToWishList}
            />
          </div>
        </main>
      )}
    </>
  );
}
