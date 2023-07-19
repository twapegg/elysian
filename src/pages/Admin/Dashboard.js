import { useContext, useEffect, useState } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import UserContext from "../../context/UserContext";
import { Navigate, useNavigate } from "react-router-dom";
import "../../styles/Dashboard.css";

export default function Dashboard() {
  const { user } = useContext(UserContext);
  const [orderSales, setOrderSales] = useState(0);
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [userCount, setUserCount] = useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/get/totalsales`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setOrderSales(data.totalSales.toLocaleString());
        });
      }
    });
    fetch(`${process.env.REACT_APP_API_URL}/orders/get/count`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setOrderCount(data.totalNumberOfOrders);
        });
      }
    });

    // Count number of products
    fetch(`${process.env.REACT_APP_API_URL}/products/count/total`).then(
      (response) => {
        if (response.ok) {
          response.json().then((data) => {
            setProductCount(data.count);
          });
        }
      }
    );

    // Count number of users
    fetch(`${process.env.REACT_APP_API_URL}/users/count/total`).then(
      (response) => {
        if (response.ok) {
          response.json().then((data) => {
            setUserCount(data);
          });
        }
      }
    );
  }, []);

  return (
    <Container>
      {user.isAdmin === true ? (
        <Row className="mt-5 pt-5">
          <h3 className="ms-5">Admin Dashboard</h3>

          <Col md={6}>
            <Card className="mt-3">
              <Card.Body>
                <Card.Title className="fs-2 text-center">Orders</Card.Title>
                <h5 className="text-center fw-bold fs-4 mt-2">{orderCount}</h5>
                <div className="my-4 d-flex align-items-center justify-content-around">
                  <Card.Title className="fs-3">Sales:</Card.Title>
                  <h5 className="text-center fw-bold">${orderSales}</h5>
                </div>

                <div className="d-flex justify-content-center">
                  <Button
                    variant="dark"
                    onClick={() => {
                      navigate("/dashboard/orders");
                    }}
                  >
                    View all orders
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="mt-3">
              <Card.Body>
                <Card.Title className="fs-2 text-center">Users</Card.Title>
                <h5 className="text-center fw-bold fs-4 mt-2">{userCount}</h5>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="dark"
                    onClick={() => {
                      navigate("/dashboard/users");
                    }}
                  >
                    View all users
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>

          <Col md={3}>
            <Card className="mt-3">
              <Card.Body>
                <Card.Title className="fs-2 text-center">Products</Card.Title>
                <h5 className="text-center fw-bold fs-4 mt-2">
                  {productCount}
                </h5>
                <div className="d-flex justify-content-center">
                  <Button
                    variant="dark"
                    onClick={() => {
                      navigate("/dashboard/products");
                    }}
                  >
                    View all products
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      ) : (
        <Navigate to="/*" />
      )}
    </Container>
  );
}
