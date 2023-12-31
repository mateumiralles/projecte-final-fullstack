import axios from "axios";
import { useState } from "react";
import InputPopUpWindow from "./inputPopUpWindow";
import SliderButton from "./sliderButton";

type NewCardFormProps = {
  setCreateNewPay: React.Dispatch<React.SetStateAction<boolean>>;
  getPaymentMethods: () => Promise<void>;
};

export default function NewCardForm({
  setCreateNewPay,
  getPaymentMethods,
}: NewCardFormProps) {
  const [newPaymentMethod, setNewPaymentMethod] = useState<any>({
    cardNumber: "",
    expirationDate: "",
    ownerName: "",
  });

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

  return (
    <div className="flex h-full w-full flex-col content-evenly justify-evenly px-32 py-20">
      <p className="text-center text-2xl font-bold">
        Register a new Payment Method
      </p>
      <div className="grid grid-cols-2 gap-16">
        <InputPopUpWindow
          type="text"
          name="cardNumber"
          placeholder="Card Number"
          value={newPaymentMethod.cardNumber}
          handler={handleCardNumberChange}
          maxLength={19}
        />
        <InputPopUpWindow
          type="text"
          name="expirationDate"
          placeholder="Expiration Date"
          value={newPaymentMethod.expirationDate}
          handler={handleInputChangeCard}
          maxLength={5}
        />
        <InputPopUpWindow
          type="text"
          name="ownerName"
          placeholder="Owner's Name"
          value={newPaymentMethod.ownerName}
          handler={handleInputChangeCard}
        />
        <SliderButton
          text="Confirm New Payment Method"
          func={createPaymentMethod}
        />
      </div>
    </div>
  );
}
