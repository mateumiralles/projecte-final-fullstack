import axios from "axios";
import { useState } from "react";

type NewAdressFromProps ={
    createNewAddress: boolean ,
    setCreateNewAddress: React.Dispatch<React.SetStateAction<boolean>>,
    setAddress: React.Dispatch<React.SetStateAction<string | undefined>>,
    
}

export default function NewAdressFrom({createNewAddress, setCreateNewAddress, setAddress}:NewAdressFromProps){
    
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
    
    return <div
    style={createNewAddress ? { display: "block" } : { display: "none" }}
    className="absolute left-[50%] top-[50%] z-10 h-[50%] w-[50%] translate-x-[-50%] translate-y-[-50%] rounded border border-black bg-white"
  >
    <p>Create a new address</p>
    <input
      type="text"
      name="streetName"
      placeholder="Street name"
      value={newAddress.streetName}
      onChange={handleInputChangeAddress}
    />
    <input
      type="text"
      name="doorBell"
      placeholder="Doorbell"
      value={newAddress.doorBell}
      onChange={handleInputChangeAddress}
      maxLength={10}
    />
    <input
      type="number"
      name="postalCode"
      placeholder="Postal code"
      value={newAddress.postalCode}
      onChange={handleInputChangeAddress}
      maxLength={6}
    />
    <input
      type="text"
      name="city"
      placeholder="City"
      value={newAddress.city}
      onChange={handleInputChangeAddress}
    />
    <input
      type="text"
      name="country"
      placeholder="Country"
      value={newAddress.country}
      onChange={handleInputChangeAddress}
    />
    <button onClick={createAddress}>Add address</button>
    <p onClick={() => setCreateNewAddress(false)}>X</p>
  </div>
}