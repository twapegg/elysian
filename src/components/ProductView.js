import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Container, Card, Col, Row, Button } from "react-bootstrap";

export default function ProductView() {
  const { id } = useParams();
  const [product, setProduct] = useState({
    brand: "",
    name: "",
    category: "",
    color: "",
    price: "",
    image: "",
    description: "",
    available: true,
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data.product.price = data.product.price.toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
        });
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
    <>
      <div
        className="hero bg-image"
        style={{
          backgroundImage:
            "url('//media.gucci.com/content/HeroRegularStandard_3200x1350/1684749646/HeroRegularStandard_Gucci-Prefall-May2023-017_001_Default.jpg')",
        }}
      >
        <Container
          className="d-flex align-items-center justify-content-center"
          style={{ height: "100%" }}
        >
          <Row>
            <Col>
              <Card style={{ width: "22rem" }}>
                <Card.Title className="text-center">
                  {product.brand} {product.name}
                </Card.Title>

                <h6 className="text-center price">{product.price}</h6>

                <Button>Add to Shopping Bag</Button>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  );
}
