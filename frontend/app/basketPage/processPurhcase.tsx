"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PaymentMethodSlider from "./components/paymentMethodSlider";
import AdressSlider from "./components/adressSlider";
import NewAdressFrom from "./components/newAdressForm";
import NewCardForm from "./components/newCardForm";
export default function ProcessPurchase(props: { purchaseSteps: number }) {
  //const [user, setUser] = useState<>();
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [address, setAddress] = useState<string>();
  const [createNewPay, setCreateNewPay] = useState<boolean>(false);
  const [createNewAddress, setCreateNewAddress] = useState<boolean>(false);

  const getAddress = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    try {
      const response = await axios.get(
        `http://localhost:3333/api/users/${user.id}`,
      );
      if (response.status === 200) {
        setAddress(response.data.address);
      }
    } catch (error: any) {
      if (error.response.status === 404) {
      }
    }
  };

  const getPaymentMethods = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    try {
      const response = await axios.get(
        `http://localhost:3333/api/users/${user.id}/payment-methods`,
      );
      console.log(response.data);
      if (response.status === 200) {
        setPaymentMethods(response.data);
      }
    } catch (error: any) {
      if (error.response.status === 404) {
      }
    }
  };

  useEffect(() => {
    console.log("PROCESS PURCHASE");
    console.log(props.purchaseSteps);
    if (props.purchaseSteps == 0) {
      const user = JSON.parse(localStorage.getItem("user")!);
      //setUser(user);
      setTimeout(() => {
        console.log("SE CAMBIA LA ANIMACIÓN");
        const element = document.getElementById("processPurchase")!;
        element.style.transition = "1s ease-out";
        element.style.transform = "translateY(0px)";
        element.style.opacity = "1";
      }, 100);
      getPaymentMethods();
      getAddress();
    }
  }, [props.purchaseSteps]);

  return (
    <>
      <NewCardForm
        createNewPay={createNewPay}
        getPaymentMethods={getPaymentMethods}
        setCreateNewPay={setCreateNewPay}
      />
      <NewAdressFrom
        createNewAddress={createNewAddress}
        setAddress={setAddress}
        setCreateNewAddress={setCreateNewAddress}
      />

      <div className="mt-2 flex flex-grow flex-row gap-4">
        <div
          id="processPurchase"
          className="flex w-[80%] flex-[3] translate-y-80 flex-col items-end opacity-0"
        >
          <div className="w-full">
            <PaymentMethodSlider
              paymentMethods={paymentMethods}
              setPayment={setCreateNewPay}
            />
            <AdressSlider
              address={address}
              createAddress={setCreateNewAddress}
            />
          </div>
        </div>
      </div>
    </>
  );
}
