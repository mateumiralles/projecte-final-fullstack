"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import CreditCard from "./components/creditCard";
import NewAdressFrom from "./components/newAdressForm";
import NewCardForm from "./components/newCardForm";
import ProcessPurchaseSlider from "./components/processPurchaseSlider";
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
          <div className="flex w-full flex-col gap-4">
            <ProcessPurchaseSlider
              type="payment"
              title="Payment Method"
              content={
                <>
                  <div className="grid justify-items-center gap-12 lg:grid-cols-2">
                    {paymentMethods.map((payment) => (
                      <CreditCard
                        cardNumber={payment.cardNumber}
                        expirationDate={payment.expirationDate}
                        ownerName={payment.ownerName}
                        type={payment.type}
                        isDefault={payment.isDefault}
                      />
                    ))}
                  </div>
                  <div className="flex flex-col ">
                    {paymentMethods.length < 1 ? (
                      <p>There is no card linked to your account yet!</p>
                    ) : (
                      <></>
                    )}

                    <div
                      onClick={() => setCreateNewPay(true)}
                      className="my-5 flex cursor-pointer items-center justify-center rounded border border-black bg-black p-4 text-white transition duration-300 ease-in-out hover:scale-95"
                    >
                      ADD A NEW CARD
                    </div>
                  </div>
                </>
              }
            />
            <ProcessPurchaseSlider
              type="address"
              title="Address"
              content={
                <>
                  <div className="flex flex-row justify-between">
                    <p>
                      {address === undefined
                        ? "No address is defined yet"
                        : address}
                    </p>
                    <p onClick={() => setCreateNewAddress(true)}>
                      {address === undefined
                        ? "Add new address"
                        : "Change address"}
                    </p>
                  </div>
                  <div className="h-7"></div>
                </>
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}
