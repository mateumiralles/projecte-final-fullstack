"use client"

import axios from "axios";
import { useState, useEffect } from "react";
import PaymentMethod from "./paymentMethod";
export default function ProcessPurchase(props: {purchaseSteps: number}){
    //const [user, setUser] = useState<>(); 
    const [paymentMethods, setPaymentMethods] = useState<any[]>([]);
    const [createNewPay, setCreateNewPay] = useState<boolean>(false);
    const [newPaymentMethod, setNewPaymentMethod] = useState<any>({
        cardNumber: "",
        expirationDate: "",
        ownerName: "",
    }
    );

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setNewPaymentMethod({
          ...newPaymentMethod,
          [name]: value,
        });
      };

    const getPaymentMethods = async () => {
        const user = JSON.parse(localStorage.getItem('user')!)
        try{
            const response = await axios.get(`http://localhost:3333/api/users/${user.id}/payment-methods`);
            console.log(response);
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
        }
    }, [props.purchaseSteps])
    


    return(
        <>
        <div style={createNewPay ? {display: "block"} : {display: "none"}} className="w-[50%] h-[50%] bg-white rounded border border-black absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <p>Add a new payment method</p>
            <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={newPaymentMethod.cardNumber}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="expirationDate"
                placeholder="Expiration Date"
                value={newPaymentMethod.expirationDate}
                onChange={handleInputChange}
            />
            <input
                type="text"
                name="ownerName"
                placeholder="Owner Name"
                value={newPaymentMethod.ownerName}
                onChange={handleInputChange}
            />
            <button onClick={createPaymentMethod}>Add payment methodd</button>
        </div>
            <div className="w-[75%] flex flex-row gap-4">
                <div id="processPurchase" className="opacity-0 translate-y-80 flex flex-col w-[80%] flex-[3] items-end">
                    <div className="w-full">
                        <div className="flex flex-row justify-between">
                            <h1 className="font-bold text-lg">Payment method</h1>
                            <p>\/</p>
                        </div>
                        
                        {paymentMethods.map(payment => (
                            <PaymentMethod />
                        ))}
                        <p onClick={() => setCreateNewPay(true)}>Add new payment method</p>
                    </div>
                </div>
                <div className="flex-[1]">
                    <p>a</p>
                </div>
            </div>
        </>
    )
}