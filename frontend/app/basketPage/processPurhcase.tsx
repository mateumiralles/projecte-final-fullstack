"use client"

import { useEffect } from "react";
export default function ProcessPurchase(props: {purchaseSteps: number}){

    useEffect(() => {
        console.log("PROCESS PURCHASE");
        console.log(props.purchaseSteps);
        if(props.purchaseSteps==0){
            setTimeout(() => {
                console.log("SE CAMBIA LA ANIMACIÓN");
            const element = document.getElementById('processPurchase')!;
            element.style.transition = '1s ease-out'; 
            element.style.transform = 'translateY(0px)';
            element.style.opacity = '1';    
            }, 100);
        }
    }, [props.purchaseSteps])
    


    return(
        <div id="processPurchase" className="opacity-0 translate-y-80">
            <h1>HOLAAAAAAAAA</h1>
        </div>

    )
}