import OrdersProductCard from "./ordersProductCard";

type OrdersProductRowProps = {
  orderData: any;
  i: number;
};

export default function OrdersProductRow({
  orderData,
  i,
}: OrdersProductRowProps) {
  return (
    <div className="my-5 flex flex-col  border-b border-black" key={i}>
      <p className="mb-2 text-lg font-bold">
        Order #{i + 1}
        <span className="text-sm font-light">
          - ({orderData.paymentMethod.paymentTime.split("T")[0]})
        </span>
      </p>
      <div className="flex flex-row gap-5 overflow-x-auto">
        {orderData.order.OrderItem.map((orderObject: any, j: number) => {
          return <OrdersProductCard key={j} orderObject={orderObject} j={j} />;
        })}
      </div>
      <p className="my-2 font-light italic">
        Total:
        <span className="font-bold ">
          {`
                ${orderData.paymentMethod.totalAmount}€`}
        </span>
      </p>
    </div>
  );
}
