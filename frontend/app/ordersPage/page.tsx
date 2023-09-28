"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import OrdersProductRow from "./components/orderProductsRow";
export default function ordersPage() {
  const [orders, setOrders] = useState<any>([]);

  const getOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    try {
      const payments = await axios.get(
        `http://localhost:3333/api/users/${user.id}/payments`,
      );
      console.log(payments.data);
      if (payments.status === 200) {
        try {
          const orders = await axios.get(
            `http://localhost:3333/api/users/${user.id}/order`,
          );
          console.log(orders.data);
          if (orders.status === 200) {
            payments.data.forEach((payment: any, index: number) => {
              console.log(payment.orderId);
              orders.data.forEach((order: any) => {
                if (payment.orderId === order.id) {
                  setOrders((prevOrders: any) => [
                    ...prevOrders,
                    { paymentMethod: payments.data[index], order: order },
                  ]);
                }
              });
            });
            setOrders((prevOrders: any) => [...prevOrders].reverse());
          }
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <main className="ml-20 mt-5">
      <p className="text-2xl font-bold">Your order history</p>
      {orders.map((orderData: any, i: number) => {
        return <OrdersProductRow key={i} orderData={orderData} i={i} />;
      })}
    </main>
  );
}
