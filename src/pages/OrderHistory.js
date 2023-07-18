import { useState, useEffect } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import OrderItem from "../components/OrderItem";

export default function OrderHistory() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/me/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setOrders(data));
  }, []);

  return (
    <Container>
      <Row>
        <h1 className="ms-5">My Order History</h1>
        <Col md={12}>
          <Table hover className="mt-3">
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#e8e8e8",
                    borderRadius: "16px 0 0 0",
                  }}
                >
                  Order ID
                </th>
                <th style={{ backgroundColor: "#e8e8e8" }}>Products</th>
                <th style={{ backgroundColor: "#e8e8e8" }}>Total Price</th>
                <th
                  style={{
                    backgroundColor: "#e8e8e8",
                    borderRadius: "0 16px 0 0",
                  }}
                >
                  Date Purchased
                </th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <OrderItem key={order._id} order={order} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
