"use client";
import { ProductGeneral } from "../classes";
import { useState, useEffect } from "react";
import ProductInfo from "./components/productBasketCard";
import SummaryPage from "./summaryPage";
import ProcessPurchase from "./processPurchase";
import axios from "axios";

export default function basketPage() {
  const makeNewProduct = (
    id: number,
    code: string,
    price: number,
    currency: string,
    name: string,
    colorRgb: string,
    size: string,
    ammount: number,
    img?: string,
  ) => {
    const product = new ProductGeneral();
    if (img) product.img = img;
    product.id = id;
    product.code = code;
    product.price = price;
    product.currency = currency;
    product.name = name;
    product.colorRgb = colorRgb;
    product.size = size;
    product.ammount = ammount;
    return product;
  };

  let productosCantidadTotal = 0;
  let precioFinal = 0;
  const [purchaseSteps, setPurchaseSteps] = useState(-1);
  const [products, setProducts] = useState<Array<any>>([]);
  
  products.forEach((product: any) => {
    productosCantidadTotal += product.ammount;
    precioFinal += product.price! * product.ammount;

    precioFinal = parseFloat(precioFinal.toFixed(2));
  });


  const getUserCart = async () => {
    const user = JSON.parse(localStorage.getItem('user')!);
    try{
      const userCart = await axios.get(`http://localhost:3333/api/users/${user.id}/cart`);
      if(userCart.status===200){
        userCart.data.CartItem.forEach(async (cartItem:any) => {
          try{
            const productSummary = await axios.get(`http://localhost:3333/api/productSummaries/${cartItem.productSummaryCode}`);
            if(productSummary.status===200){
              const productSummaryEnd = productSummary.data;
              const newProduct = makeNewProduct(
                cartItem.id,
                cartItem.productSummaryCode,
                productSummaryEnd.price,
                productSummaryEnd.currency,
                productSummaryEnd.name,
                cartItem.colorRgb,
                cartItem.size,
                cartItem.quantity,  
                cartItem.img,
              )
              setProducts((prevProducts) => [...prevProducts, newProduct]);
            }
          } catch (error: any){
            console.log(error);
          }
        });
      }
    } catch (error: any){
      console.log(error);
    }
    
  }


  useEffect(() => {
    switch(purchaseSteps){
      case -1:
        getUserCart();
        break;
      case 0:
        let productosSummary =  document.getElementById('summaryBasket0')!;
        // let precioTotal = document.getElementById('totalPriceBasket0')!;

        productosSummary.style.transition = '1s ease-in'; 
        productosSummary.style.transform = 'translateX(-300px)';
        productosSummary.style.opacity = '0';
        // precioTotal.style
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

  useEffect(() => {
    setBasketComponent(
      <SummaryPage
    products = {products}
    productosCantidadTotal={productosCantidadTotal}
    precioFinal={precioFinal}
    purchaseSteps={purchaseSteps}
    setPurchaseSteps = {setPurchaseSteps}
    setProducts = {setProducts}
    />
    )
  }, [products])

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
      <div id="products" className="flex w-[90%] flex-row justify-center">
        {basketComponent}
          <div className="mt-2 flex flex-[2] justify-center">
              <div id="totalPriceBasket0" className="fixed w-[25%] rounded border border-black">
                  <div className="flex flex-col">
                    <p className="mb-6 text-lg font-semibold text-center p-4">
                      Summary of your delivery
                    </p>
                    <div className="max-h-[55vh] overflow-y-auto p-4">
                      {products.map((product, i) => {
                        return (
                          <>
                          <div key={i} className="mt-2 flex flex-row justify-between ">
                            <p>{product.name}</p>
                            <div className="flex flex-row w-24 justify-between">
                            <p>x{product.ammount}&nbsp;</p>
                            <p>{product.price}€</p>
                            </div>
                          </div>

                          </>
                        );
                      })}
                    </div>
                  </div>
                  <div className="flex w-full flex-row justify-between p-4">
                    <p>{productosCantidadTotal} artículos</p>
                    <p>{precioFinal}€</p>
                  </div>
                  <div className="flex w-full flex-row justify-between p-4">
                    <p className="font-bold">TOTAL:</p>
                    <p className="font-bold">{precioFinal}€</p>
                  </div>
                  <div onClick={() => setPurchaseSteps(purchaseSteps+1)} className="flex bg-black items-center justify-center border-t border-black p-4 transition-all hover:cursor-pointer hover:text-gray-600">
                    <p className="text-white">TRAMITAR PEDIDO</p>
                  </div>
              </div>
          </div>
      </div>
    </main>
  );
}
