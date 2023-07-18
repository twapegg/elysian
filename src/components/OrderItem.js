import { useState } from "react";
import { Navigate } from "react-router-dom";

export default function DashboardItem({ order }) {
  const [orderData, setOrderData] = useState({
    _id: order._id,
    products: order.products,
    totalPrice: order.totalPrice,
    date: order.date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    }),
  });

  return (
    <>
      <tr>
        <td>{orderData._id}</td>
        <td>${orderData.totalPrice.toLocaleString()}</td>
        <td>{orderData.date}</td>
      </tr>
    </>
  );
}
