"useClient";

import { SetStateAction, useState } from "react";
import CreditCard from "./creditCard";
import handleSlidersExpand from "../handleSlidersExpandFunction";

type PaymentMethodSliderProps = {
    paymentMethods : any[];
    setPayment : React.Dispatch<React.SetStateAction<any>>
}


export default function PaymentMethodSlider({paymentMethods,setPayment}:PaymentMethodSliderProps) {
  

  return (
    <div className="overflow-hidden rounded border border-black px-5 ">
      <div
        className="flex flex-row justify-between pb-5 pt-5 hover:cursor-pointer"
        onClick={() => {
          handleSlidersExpand(0);
        }}
      >
        <h1 className="text-lg font-bold">Payment method</h1>
        <p>\/</p>
      </div>
      <div
        id="expandMethods"
        className="transition-max-height duration-300 ease-in-out"
      >
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
            onClick={() => setPayment(true)}
            className="my-5 flex cursor-pointer items-center justify-center rounded border border-black bg-black p-4 text-white transition duration-300 ease-in-out hover:scale-95"
          >
            ADD A NEW CARD
          </div>
        </div>
      </div>
    </div>
  );
}
