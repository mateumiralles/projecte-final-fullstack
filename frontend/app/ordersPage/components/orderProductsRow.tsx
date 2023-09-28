import OrdersProductCard from "./ordersProductCard";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";


type OrdersProductRowProps = {
  orderData: any;
  i: number;
};

export default function OrdersProductRow({
  orderData,
  i,
}: OrdersProductRowProps) {
    const row = useRef(null);
    useLayoutEffect(() => {
        gsap.context(() => {
          gsap.to(row.current, { opacity: 1, duration: 1,  x:0 });
        });
      }, []);

  return (
    <div className="my-5 flex flex-col  border-b border-black " key={i}>
        <div className="opacity-0  -translate-x-[50px]" ref={row}>
      <p className="mb-2 text-lg font-bold">
        Order #{i + 1}
        <span className="text-sm font-light">
        &nbsp;- ({orderData.paymentMethod==null ? null : orderData.paymentMethod.paymentTime.split("T")[0]})
        </span>
      </p>
      <div className="flex flex-row gap-5 overflow-x-auto " >
        {orderData.order.OrderItem.map((orderObject: any, j: number) => {
          return <OrdersProductCard key={j} orderObject={orderObject} j={j} />;
        })}
      </div></div>
      <p className="my-2 font-light italic">
        
        Total:
        <span className="font-bold ">
          {`
                ${orderData.paymentMethod==null ? null : orderData.paymentMethod.totalAmount}€`}
        </span>
      </p>
    </div>
  );
}
