type CreditCardProps = {
  id: number;
  selectedPaymentMethod: number | undefined;
  setSelectedPaymentMethod: React.Dispatch<React.SetStateAction<any>>;
  cardNumber: string;
  expirationDate: string;
  ownerName: string;
  type: number;
  isDefault: boolean;
};

export default function CreditCard({
  id,
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  cardNumber,
  expirationDate,
  ownerName,
  type,
  isDefault,
}: CreditCardProps) {
  return (
    <div
      onClick={() => setSelectedPaymentMethod(id)}
      className={`${
        selectedPaymentMethod === id ? `bg-gray-300` : null
      } flex aspect-[16/8] min-w-[24rem] max-w-[28rem] flex-col justify-between rounded-2xl border border-black p-5 shadow-md hover:cursor-pointer  ${
        selectedPaymentMethod === id ? `hover:bg-gray-300` : "hover:bg-white"
      } transition ease-in-out hover:scale-95`}
    >
      <div>
        <p className="text-xl font-bold">{cardNumber}</p>
        <p>{expirationDate}</p>
      </div>
      <div className="flex flex-row items-center justify-between">
        <p className="text-base">{ownerName}</p>
        <p className="text-sm italic">{isDefault ? "Default card" : null}</p>
      </div>
    </div>
  );
}
