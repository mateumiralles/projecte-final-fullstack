"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import PaymentMethodSlider from "./components/paymentMethodSlider";
import AdressSlider from "./components/adressSlider";
import NewAdressFrom from "./components/newAdressForm";
export default function ProcessPurchase(props: { purchaseSteps: number }) {
  //const [user, setUser] = useState<>();
  const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
  const [address, setAddress] = useState<string>();
  const [createNewPay, setCreateNewPay] = useState<boolean>(false);
  const [createNewAddress, setCreateNewAddress] = useState<boolean>(false);
  const [newPaymentMethod, setNewPaymentMethod] = useState<any>({
    cardNumber: "",
    expirationDate: "",
    ownerName: "",
  });

  const handleCardNumberChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const inputNumero = event.target.value.replace(/\s/g, ""); // Elimina espacios en blanco actuales
    let formattedNumero = "";

    for (let i = 0; i < inputNumero.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formattedNumero += " "; // Añade un espacio cada 4 caracteres
      }
      formattedNumero += inputNumero[i];
    }
    setNewPaymentMethod({
      ...newPaymentMethod,
      ["cardNumber"]: formattedNumero,
    });
  };

  const handleInputChangeCard = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setNewPaymentMethod({
      ...newPaymentMethod,
      [name]: value,
    });
  };

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

  const createPaymentMethod = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    console.log({
      isDefault: true,
      type: 1,
      cardNumber: newPaymentMethod.cardNumber,
      expirationDate: newPaymentMethod.expirationDate,
      ownerName: newPaymentMethod.ownerName,
      userId: 2,
    });
    try {
      const response = await axios.post(
        `http://localhost:3333/api/paymentMethods/`,
        {
          isDefault: true,
          type: 1,
          cardNumber: newPaymentMethod.cardNumber,
          expirationDate: newPaymentMethod.expirationDate,
          ownerName: newPaymentMethod.ownerName,
          userId: 1,
        },
      );
      console.log(response);
      if (response.status === 201) {
        setCreateNewPay(false);
        getPaymentMethods();
      }
    } catch (error: any) {
      console.log(error);
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
     <NewAdressFrom createNewAddress={createNewAddress} setAddress={setAddress} setCreateNewAddress={setCreateNewAddress}/>
      
      <div
        style={createNewPay ? { display: "block" } : { display: "none" }}
        className="absolute left-[50%] top-[50%] z-10 h-[50%] w-[50%] translate-x-[-50%] translate-y-[-50%] rounded border border-black bg-white"
      >
        <p>Add a new payment method</p>
        <input
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={newPaymentMethod.cardNumber}
          onChange={handleCardNumberChange}
          maxLength={19}
        />
        <input
          type="text"
          name="expirationDate"
          placeholder="Expiration Date"
          value={newPaymentMethod.expirationDate}
          onChange={handleInputChangeCard}
        />
        <input
          type="text"
          name="ownerName"
          placeholder="Owner Name"
          value={newPaymentMethod.ownerName}
          onChange={handleInputChangeCard}
        />
        <button onClick={createPaymentMethod}>Add payment method</button>
        <p onClick={() => setCreateNewPay(false)}>X</p>
      </div>
      <div className=" mt-2 flex flex-grow flex-row gap-4">
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
