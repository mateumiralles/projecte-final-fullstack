import axios from "axios";
import { useState } from "react";
import InputPopUpWindow from "./inputPopUpWindow";
import SliderButton from "./sliderButton";

type NewAdressFromProps = {
  setCreateNewAddress: React.Dispatch<React.SetStateAction<boolean>>;
  setAddress: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export default function NewAdressFrom({
  setCreateNewAddress,
  setAddress,
}: NewAdressFromProps) {
  const [newAddress, setNewAddress] = useState<any>({
    streetName: "",
    doorBell: "",
    postalCode: 0,
    city: "",
    country: "",
  });

  const createAddress = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    const finalAddress = `${newAddress.streetName}, ${newAddress.doorBell}, ${newAddress.postalCode}, ${newAddress.city}, ${newAddress.country}`;
    try {
      const response = await axios.put(
        `http://localhost:3333/api/users/${user.id}`,
        { address: finalAddress },
      );
      console.log(response.status === 200);
      if (response.status === 200) {
        setCreateNewAddress(false);
        setAddress(response.data.address);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  const handleInputChangeAddress = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;
    setNewAddress({
      ...newAddress,
      [name]: value,
    });
  };

  return (
    <div className="flex h-full w-full flex-col content-evenly justify-evenly px-32 py-20">
      <p className="text-center text-2xl font-bold">Register a new Address</p>
      <div className="grid grid-cols-3 gap-20">
        {/* <InputPopUpWindow type="" name="" placeholder="" value={} handler={} maxLength={}/> */}
        <InputPopUpWindow
          type="text"
          name="country"
          placeholder="Country"
          value={newAddress.country}
          handler={handleInputChangeAddress}
        />

        <InputPopUpWindow
          type="text"
          name="city"
          placeholder="City"
          value={newAddress.city}
          handler={handleInputChangeAddress}
        />

        <InputPopUpWindow
          type="number"
          name="postalCode"
          placeholder="Postal code"
          value={newAddress.postalCode === 0 ? null : newAddress.postalCode}
          handler={handleInputChangeAddress}
          maxLength={6}
        />

        <InputPopUpWindow
          type="text"
          name="streetName"
          placeholder="Street name"
          value={newAddress.streetName}
          handler={handleInputChangeAddress}
        />
        <InputPopUpWindow
          type="text"
          name="doorBell"
          placeholder="Doorbell"
          value={newAddress.doorBell}
          handler={handleInputChangeAddress}
          maxLength={10}
        />

        <SliderButton text="Confirm New Adress" func={createAddress} />
      </div>
    </div>
  );
}
