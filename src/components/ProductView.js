import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Col, Row, Button } from "react-bootstrap";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data.product.price = data.product.price.toLocaleString();
        setProduct(data.product);
      });
  }, [id]);

  const addToShoppingBag = () => {
    fetch(`${process.env.REACT_APP_API_URL}/cart/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(product),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <Row>
      <Col md={12} className="position-relative">
        <Container
          className="text-center position-absolute"
          style={{
            left: "35.5%",
            top: "40%",
            zIndex: "1",
            backgroundColor: "white",
            width: "27.5%",
          }}
        >
          <Row>
            <Col>
              <div style={{ width: "22rem" }}>
                <h6 className="big">
                  {product.brand} {product.name}
                </h6>
                <h6 className="price">${product.price}</h6>
                <Button variant="dark" className="w-auto3">
                  Add to Shopping Bag
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
        <Col
          md={12}
          className="d-flex align-items-center justify-content-center"
        >
          <div className="col-6">
            <div
              className="hero bg-image"
              style={{
                backgroundImage:
                  "url('https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1568828708/602204_1DB0G_9022_005_100_0000_Light-Gucci-Horsebit-1955-shoulder-bag.jpg')",
              }}
            ></div>
          </div>
          <div className="col-6">
            <div
              className="hero"
              style={{
                backgroundImage:
                  "url('https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1581963303/602204_1DB0G_9022_001_074_0000_Light-Gucci-Horsebit-1955-shoulder-bag.jpg')",
              }}
            ></div>
          </div>
        </Col>
      </Col>
    </Row>
  );
}
