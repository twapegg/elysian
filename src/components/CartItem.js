import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import "../styles/BagDropdownProduct.css";

export default function CartItem({ product }) {
  const { quantity } = product;
  const [productData, setProductData] = useState({});
  const { cart, setCart } = useContext(UserContext);

  useEffect(() => {
    if (!product) return;
    fetch(`${process.env.REACT_APP_API_URL}/products/${product.product}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData({
          _id: data.product._id,
          brand: data.product.brand,
          name: data.product.name,
          image: data.product.image,
          color: data.product.color,
          available: data.product.available,
          price: data.product.price.toLocaleString(),
        });
      });
  }, [product]);

  const handleRemove = () => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/${cart._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ product: productData._id }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCart(data.cart);
      });
  };

  return (
    <Container>
      <Row className="my-3 text-decoration-none text-dark">
        <Col className="bag" md={4}>
          <img src={productData.image} className="img-fluid" alt="Image" />
        </Col>
        <Col md={8}>
          <div className="d-flex flex-column">
            <h6 className="fw-bold">
              {productData.brand} {productData.name}
            </h6>

            <p className="price mt-2">${productData.price}</p>
            <span className="small">Variant: {productData.color} leather</span>
            <span className="small mt-2">Quantity: {quantity}</span>
            <span className="mt-2 small">
              {productData.available ? "AVAILABLE" : "NOT AVAILABLE"}
            </span>
            <p className="mt-2 small">
              {productData.available
                ? "Your selection is available for immediate purchase."
                : "We're sorry, this product is currently not available for purchase."}
            </p>
          </div>
          <div>
            <button className="btn btn-outline-dark" onClick={handleRemove}>
              REMOVE
            </button>
          </div>
        </Col>
      </Row>
      <hr />
    </Container>
  );
}
