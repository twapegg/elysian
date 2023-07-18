import { useState } from "react";
import { BsToggleOn, BsToggleOff, BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";

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

  console.log(orderData.products);

  return (
    <>
      <tr>
        <td>{orderData._id}</td>
        <td>
          <ul>
            {orderData.products.map((product) => (
              <li key={product._id}>{product.name}</li>
            ))}
          </ul>
        </td>
        <td>${orderData.totalPrice.toLocaleString()}</td>
        <td>{orderData.date}</td>
      </tr>
    </>
  );
}
