"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import OrdersProductCard from "./components/ordersProductCard";
import OrdersProductRow from "./components/orderProductsRow";
export default function ordersPage() {
  const [orders, setOrders] = useState<any>([]);

  const getOrders = async () => {
    const user = JSON.parse(localStorage.getItem("user")!);
    try {
      const orders = await axios.get(
        `http://localhost:3333/api/users/${user.id}/order`,
      );
      if (orders.status === 200) {
        try {
          const payments = await axios.get(
            `http://localhost:3333/api/users/${user.id}/payments`,
          );
          if (payments.status === 200) {
            orders.data.forEach((order: any, index: number) => {
              if (payments.data[index] !== undefined)
                setOrders((prevOrders: any) => [
                  ...prevOrders,
                  { paymentMethod: payments.data[index], order: order },
                ]);
              else
                setOrders((prevOrders: any) => [
                  ...prevOrders,
                  { paymentMethod: null, order: order },
                ]);
            });
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
  console.log(orders);
  return (
    <main className="ml-20 mt-5">
      <p className="text-2xl font-bold">Your order history</p>
      {orders.map((order: any) =>
        order.order.OrderItem.map((orderSpecific: any) =>
          console.log(orderSpecific),
        ),
      )}
      {orders.map((orderData: any, i: number) => {
        return (
          <OrdersProductRow key={i} orderData={orderData} i={i}/>
        );
      })}
    </main>
  );
}
