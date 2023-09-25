type PaymentMethodProps = {
    cardNumber: string;
    expirationDate: string;
    ownerName: string;
    type: number;
    isDefault: boolean;
  };

export default function PaymentMethod({ cardNumber, expirationDate, ownerName, type, isDefault }: PaymentMethodProps){
    return(
        <div className="p-5 rounded-2xl min-w-[24rem] max-w-[28rem] aspect-[16/8] shadow-md flex flex-col justify-between hover:cursor-pointer border border-black">
            <div>
                <p className="font-bold text-xl">{cardNumber}</p>
                <p>{expirationDate}</p>
            </div>
            <div className="flex flex-row justify-between items-center">
                <p className="text-base">{ownerName}</p>
                <p className="italic text-sm">{isDefault ? "Default card" : null}</p>
            </div>
        </div>
    )
}