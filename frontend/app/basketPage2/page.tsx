"use client";
import { ProductGeneral } from "../classes";
import { useState, useEffect } from "react";
import ProductInfo from "./producBasketCard";
import SummaryPage from "./summaryPage";
import ProcessPurchase from "./processPurhcase";

export default function basketPage() {
  const makeNewProduct = (
    code: string,
    price: number,
    currency: string,
    name: string,
    colorRgb: string,
    colorName: string,
    size: string,
    ammount: number,
    img?: string,
  ) => {
    const product = new ProductGeneral();
    if (img) product.img = img;
    product.code = code;
    product.price = price;
    product.currency = currency;
    product.name = name;
    product.colorRgb = colorRgb;
    product.colorName = colorName;
    product.size = size;
    product.ammount = ammount;
    return product;
  };

  let productosCantidadTotal = 0;
  let precioFinal = 0;
  const [purchaseSteps, setPurchaseSteps] = useState(-1);
  const [products, setProducts] = useState([
    makeNewProduct(
      "1",
      10.0,
      "EUR",
      "Camisalol",
      "#FF5733",
      "naranja mandarina",
      "M",
      2,
      "https://image.hm.com/assets/hm/28/08/280826e3a79f9bdd531d9981caa8e522a755e9a1.jpg",
    ),
    makeNewProduct(
      "2",
      25.42,
      "EUR",
      "sudadera admin fit",
      "#F3F039",
      "amarillo fosforito",
      "M",
      1,
    ),
    makeNewProduct(
      "3",
      12.99,
      "EUR",
      "camisa estampado",
      "#504F17",
      "granate terremoto",
      "L",
      1,
    ),
    makeNewProduct(
      "4",
      16.99,
      "EUR",
      "camisa estampado pero de lujo",
      "#4177D7",
      "azul fantasioso",
      "M",
      1,
      "	https://image.hm.com/assets/hm/aa/63/aa6321d7fd4f71c538a13cbbe74c1a859444a1a6.jpg",
    ),
    makeNewProduct(
      "5",
      35.2,
      "USD",
      "sudadera high chance lacoste",
      "#21CEA2",
      "aqua marina d'or",
      "S",
      2,
    ),
    makeNewProduct(
      "6",
      60.8,
      "EUR",
      "Zapatillas Nikey air force",
      "#C51766",
      "purpura rosa",
      "36",
      1,
    ),
    makeNewProduct(
      "1",
      10.0,
      "EUR",
      "Camisalol",
      "#FF5733",
      "naranja mandarina",
      "M",
      2,
      "https://image.hm.com/assets/hm/28/08/280826e3a79f9bdd531d9981caa8e522a755e9a1.jpg",
    ),
    makeNewProduct(
      "2",
      25.42,
      "EUR",
      "sudadera admin fit",
      "#F3F039",
      "amarillo fosforito",
      "M",
      1,
    ),
    makeNewProduct(
      "3",
      12.99,
      "EUR",
      "camisa estampado",
      "#504F17",
      "granate terremoto",
      "L",
      1,
    ),
    makeNewProduct(
      "4",
      16.99,
      "EUR",
      "camisa estampado pero de lujo",
      "#4177D7",
      "azul fantasioso",
      "M",
      1,
      "	https://image.hm.com/assets/hm/aa/63/aa6321d7fd4f71c538a13cbbe74c1a859444a1a6.jpg",
    ),
    makeNewProduct(
      "5",
      35.2,
      "USD",
      "sudadera high chance lacoste",
      "#21CEA2",
      "aqua marina d'or",
      "S",
      2,
    ),
    makeNewProduct(
      "6",
      60.8,
      "EUR",
      "Zapatillas Nikey air force",
      "#C51766",
      "purpura rosa",
      "36",
      1,
    ),
  ]);


  products.forEach((product) => {
    productosCantidadTotal += product.ammount;
    precioFinal += product.price! * product.ammount;
    precioFinal = parseFloat(precioFinal.toFixed(2));
  });

  useEffect(() => {
    switch(purchaseSteps){
      case 0:
        let productosSummary =  document.getElementById('summaryBasket0')!;
        let precioTotal = document.getElementById('totalPriceBasket0')!;

        productosSummary.style.transition = '1s ease-in'; 
        productosSummary.style.transform = 'translateX(-300px)';
        productosSummary.style.opacity = '0';
        precioTotal.style.transition = '1s ease-in'; 
        precioTotal.style.transform = 'translateX(300px)';
        precioTotal.style.opacity = '0';
        setTimeout(() => {
            setBasketComponent(<ProcessPurchase 
            purchaseSteps = {purchaseSteps}
            />);
        }, 1000);
        break;
      case 1:
        console.log(purchaseSteps);
        console.log("hola");
        break;
    }
  }, [purchaseSteps])

  const [basketComponent, setBasketComponent] = useState(<SummaryPage
    products = {products}
    productosCantidadTotal={productosCantidadTotal}
    precioFinal={precioFinal}
    purchaseSteps={purchaseSteps}
    setPurchaseSteps = {setPurchaseSteps}
    setProducts = {setProducts}
    /> )

  return (
    <main className="flex justify-center">
      {basketComponent}
    </main>
  );
}
