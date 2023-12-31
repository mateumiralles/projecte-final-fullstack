"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ReactLoading from "react-loading";
import { ProductGeneral } from "../classes";
import FinalBasketWindow from "./components/finalBasketWindow";
import PopupWarning from "./components/popUpWarning";
import SummaryBasketPanel from "./components/sumaryBasketPanel";
import ProcessPurchase from "./processPurchase";
import SummaryPage from "./summaryPage";

export default function BasketPage() {
  const [isLoaded, setIsLoaded] = useState(false);
  const { push } = useRouter();

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
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<number>();
  const [popWarning, setPopWarning] = useState<boolean>(false);
  const [warningMsg, setWarningMsg] = useState<string>("");

  products.forEach((product: any) => {
    productosCantidadTotal += product.ammount;
    precioFinal += product.price! * product.ammount;

    precioFinal = parseFloat(precioFinal.toFixed(2));
  });

  const getUserCart = async () => {
    setProducts([]);
    const user = JSON.parse(localStorage.getItem("user")!);
    try {
      const userCart = await axios.get(
        `http://localhost:3333/api/users/${user.id}/cart`,
      );
      if (userCart.status === 200) {
        userCart.data.CartItem.forEach(async (cartItem: any) => {
          try {
            const productSummary = await axios.get(
              `http://localhost:3333/api/productSummaries/${cartItem.productSummaryCode}`,
            );
            if (productSummary.status === 200) {
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
              );
              setProducts((prevProducts) => [...prevProducts, newProduct]);
            }
          } catch (error: any) {
            console.log(error);
          }
        });
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const createOrder = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    if (selectedPaymentMethod !== undefined && selectedPaymentMethod !== 0) {
      try {
        const createOrder = await axios.post(
          `http://localhost:3333/api/users/${user.id}/order`,
        );
        console.log(createOrder);
        if (createOrder.status === 201) {
          try {
            const getWishlist = await axios.get(
              `http://localhost:3333/api/users/${user.id}/wishList`,
            );
            console.log(getWishlist);
            if (getWishlist.status === 200) {
              createOrder.data.orderItems.forEach(async (item: any) => {
                const matchingItem = getWishlist.data.WishListItem.find(
                  (bItem: any) =>
                    bItem.productSummaryCode === item.productSummaryCode,
                );
                if (matchingItem) {
                  try {
                    const deleteItemFromWishlist = await axios.delete(
                      `http://localhost:3333/api/users/${user.id}/wishList/delete/${matchingItem.id}`,
                    );
                    console.log(deleteItemFromWishlist);
                    if (deleteItemFromWishlist.status === 204) {
                    }
                  } catch (error) {
                    console.log(error);
                  }
                }
                console.log(item);
              });
            }
          } catch (error: any) {
            console.log(error);
          }
          try {
            createOrder.data.order.userId;
            const createPayment = await axios.post(
              `http://localhost:3333/api/payments`,
              {
                paymentMethodId: selectedPaymentMethod,
                totalAmount: precioFinal,
                paymentTime: new Date(),
                userId: createOrder.data.order.userId,
                orderId: createOrder.data.order.id,
              },
            );
            console.log(createPayment);
            if (createPayment.status === 201) {
            }
          } catch (error) {
            console.log(error);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    switch (purchaseSteps) {
      case -1:
        getUserCart();
        break;
      case 0:
        let productosSummary = document.getElementById("summaryBasket0")!;
        // let precioTotal = document.getElementById('totalPriceBasket0')!;

        productosSummary.style.transition = "1s ease-in";
        productosSummary.style.transform = "translateX(-300px)";
        productosSummary.style.opacity = "0";
        // precioTotal.style
        setTimeout(() => {
          setBasketComponent(
            <ProcessPurchase
              purchaseSteps={purchaseSteps}
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              setPurchaseSteps={setPurchaseSteps}
            />,
          );
        }, 1000);

        break;
      case 1:
        createOrder();

        setTimeout(() => {
          push("/");
        }, 6000);
        break;
    }
  }, [purchaseSteps]);

  useEffect(() => {
    setBasketComponent(
      <ProcessPurchase
        purchaseSteps={purchaseSteps}
        selectedPaymentMethod={selectedPaymentMethod}
        setSelectedPaymentMethod={setSelectedPaymentMethod}
        setPurchaseSteps={setPurchaseSteps}
      />,
    );
  }, [selectedPaymentMethod]);

  useEffect(() => {
    let timeoutId: any;

    if (popWarning) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setPopWarning(false);
      }, 4000);
    }
    return () => {
      clearTimeout(timeoutId);
    };
  }, [popWarning]);

  useEffect(() => {
    setBasketComponent(
      <SummaryPage
        products={products}
        productosCantidadTotal={productosCantidadTotal}
        precioFinal={precioFinal}
        purchaseSteps={purchaseSteps}
        setPurchaseSteps={setPurchaseSteps}
        setProducts={setProducts}
      />,
    );
    console.log(products);
    setIsLoaded(true);
  }, [products]);

  const [basketComponent, setBasketComponent] = useState(
    <SummaryPage
      products={products}
      productosCantidadTotal={productosCantidadTotal}
      precioFinal={precioFinal}
      purchaseSteps={purchaseSteps}
      setPurchaseSteps={setPurchaseSteps}
      setProducts={setProducts}
    />,
  );

  return (
    <main className="flex justify-center">
      {purchaseSteps === 1 ? <FinalBasketWindow /> : null}
      <PopupWarning
        message={warningMsg}
        visible={popWarning}
        setVisible={setPopWarning}
      />
      {products.length === 0 ? (
        <div className="flex h-[90vh] items-center justify-center">
          {isLoaded ? (
            <p className="text-3xl font-bold">Your basket is empty!</p>
          ) : (
            <ReactLoading
              type="bubbles"
              color="#000000"
              height={200}
              width={200}
            />
          )}
        </div>
      ) : (
        <div id="products" className="flex w-[90%] flex-row justify-center">
          {basketComponent}
          <SummaryBasketPanel
            selectedPaymentMethod={selectedPaymentMethod}
            products={products}
            productosCantidadTotal={productosCantidadTotal}
            precioFinal={precioFinal}
            purchaseSteps={purchaseSteps}
            setPurchaseSteps={setPurchaseSteps}
            setPopWarning={setPopWarning}
            setWarningMsg={setWarningMsg}
          />
        </div>
      )}
    </main>
  );
}
