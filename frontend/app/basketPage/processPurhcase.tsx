"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import PaymentMethod from "./paymentMethod";
export default function ProcessPurchase(props: {purchaseSteps: number}){
    //const [user, setUser] = useState<>(); 
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [address, setAddress] = useState<string>();
    const [createNewPay, setCreateNewPay] = useState<boolean>(false);
    const [createNewAddress, setCreateNewAddress] = useState<boolean>(false);
    const [newPaymentMethod, setNewPaymentMethod] = useState<any>({
        cardNumber: "",
        expirationDate: "",
        ownerName: "",
    }
    );
    const [newAddress, setNewAddress] = useState<any>({
        streetName: "",
        doorBell: "",
        postalCode: 0,
        city: "",
        country: "",
    })

    const createAddress = async () => {
        const user = JSON.parse(localStorage.getItem('user')!);
        const finalAddress = `${newAddress.streetName}, ${newAddress.doorBell}, ${newAddress.postalCode}, ${newAddress.city}, ${newAddress.country}` 
        try{
            const response = await axios.put(`http://localhost:3333/api/users/${user.id}`, {address: finalAddress});
            console.log(response.status===200);
            if(response.status===200){
                setCreateNewAddress(false)
                setAddress(response.data.address);
            }
        } catch (error: any) {
            console.log(error);
        }
    }

    const handleCardNumberChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const inputNumero = event.target.value.replace(/\s/g, ''); // Elimina espacios en blanco actuales
        let formattedNumero = '';
    
        for (let i = 0; i < inputNumero.length; i++) {
          if (i > 0 && i % 4 === 0) {
            formattedNumero += ' '; // Añade un espacio cada 4 caracteres
          }
          formattedNumero += inputNumero[i];
        }
        setNewPaymentMethod({
            ...newPaymentMethod,
            ["cardNumber"]: formattedNumero,
          });
    }

    const handleSectionDetail = (type: number) => {
        console.log("handlesectionDetail");
        let contentHeight;
        switch(type){
            case 0:
                const expandMethods = document.getElementById("expandMethods")!;
                contentHeight = expandMethods.scrollHeight + "px";
                console.log(expandMethods.style.maxHeight!="");
                if (expandMethods.style.maxHeight === contentHeight) {
                    expandMethods.style.maxHeight = "0px";
                } else {
                    expandMethods.style.maxHeight = contentHeight;
                }
            break;
            case 1:
                const expandAddress = document.getElementById("expandAddress")!;
                contentHeight = expandAddress.scrollHeight + "px";
                console.log(expandAddress.style.maxHeight!="");
                if (expandAddress.style.maxHeight === contentHeight) {
                    expandAddress.style.maxHeight = "0px";
                } else {
                    expandAddress.style.maxHeight = contentHeight;
                }
            break;
        }

    }

    const handleInputChangeAddress = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewAddress({
          ...newAddress,
          [name]: value,
        });
    }


    const handleInputChangeCard = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewPaymentMethod({
          ...newPaymentMethod,
          [name]: value,
        });
      };

    const getAddress = async () => {
        const user = JSON.parse(localStorage.getItem('user')!);
        try{
            const response = await axios.get(`http://localhost:3333/api/users/${user.id}`);
            if(response.status===200){
                setAddress(response.data.address);
            }
        } catch (error: any) {
            if(error.response.status===404){

            }
        }
    }

    const getPaymentMethods = async () => {
        const user = JSON.parse(localStorage.getItem('user')!);
        try{
            const response = await axios.get(`http://localhost:3333/api/users/${user.id}/payment-methods`);
            console.log(response.data);
            if(response.status===200){
                setPaymentMethods(response.data);
            }

        } catch (error: any) {
            if(error.response.status===404){

            }
        }
    }



    const createPaymentMethod = async () => {
        const user = JSON.parse(localStorage.getItem('user')!)
        console.log({isDefault: true, type: 1, cardNumber: newPaymentMethod.cardNumber, expirationDate: newPaymentMethod.expirationDate, ownerName: newPaymentMethod.ownerName, userId: 2});
        try{
            const response = await axios.post(`http://localhost:3333/api/paymentMethods/`, {isDefault: true, type: 1, cardNumber: newPaymentMethod.cardNumber, expirationDate: newPaymentMethod.expirationDate, ownerName: newPaymentMethod.ownerName, userId: 1});
            console.log(response);
            if(response.status===201){
                setCreateNewPay(false);
                getPaymentMethods();
            }

        } catch (error: any) {
            console.log(error);
        }
    }

    useEffect(() => {
        console.log("PROCESS PURCHASE");
        console.log(props.purchaseSteps);
        if(props.purchaseSteps==0){
            const user = JSON.parse(localStorage.getItem('user')!);
            //setUser(user);
            setTimeout(() => {
                console.log("SE CAMBIA LA ANIMACIÓN");
            const element = document.getElementById('processPurchase')!;
            element.style.transition = '1s ease-out'; 
            element.style.transform = 'translateY(0px)';
            element.style.opacity = '1';
            }, 100);
            getPaymentMethods();
            getAddress();
        }
    }, [props.purchaseSteps])
    


    return(
        <>
            <div style={createNewAddress ? {display: "block"} : {display: "none"}} className="w-[50%] z-10 h-[50%] bg-white rounded border border-black absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
        <div style={createNewPay ? {display: "block"} : {display: "none"}} className="w-[50%] z-10 h-[50%] bg-white rounded border border-black absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
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
            <div className=" flex flex-row gap-4 flex-grow mt-2">
                <div id="processPurchase" className="opacity-0 translate-y-80 flex flex-col w-[80%] flex-[3] items-end">
                    <div className="w-full">
                        <div className="overflow-hidden border border-black rounded pl-5 pr-5">
                            <div className="flex flex-row justify-between pt-5 pb-5 hover:cursor-pointer" onClick={() => {handleSectionDetail(0)}}>
                                <h1 className="font-bold text-lg">Payment method</h1>
                                <p>\/</p>
                            </div>
                            <div id="expandMethods" className="transition-max-height duration-300 ease-in-out">
                            <div className="grid gap-12 lg:grid-cols-2 justify-items-center">
                                {paymentMethods.map(payment => (
                                    <PaymentMethod 
                                        cardNumber={payment.cardNumber}
                                        expirationDate={payment.expirationDate}
                                        ownerName={payment.ownerName}
                                        type={payment.type}
                                        isDefault={payment.isDefault}
                                    />
                                ))}
                                </div>
                                <p onClick={() => setCreateNewPay(true)}>Add new payment method</p>
                                <div className="h-5"></div>
                            </div>
                           
                        </div>
                        <div className="overflow-hidden border border-black rounded pl-5 pr-5 mt-4">
                            <div className="flex flex-row justify-between pt-5 pb-5 hover:cursor-pointer" onClick={() => {handleSectionDetail(1)}}>
                                <h1 className="font-bold text-lg">Address</h1>
                                <p>\/</p>
                            </div>
                            <div id="expandAddress" className="transition-max-height duration-300 ease-in-out ">
                                <div className="flex flex-row justify-between">
                                    <p>{address===undefined ? "No address is defined yet" : address}</p>
                                    <p onClick={() => setCreateNewAddress(true)}>{address===undefined ? "Add new address" : "Change address"}</p>
                                </div>
                                 <div className="h-7"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}