import { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import "../styles/BagDropdownProduct.css";

export default function BagDropdownProduct({ product }) {
  const { quantity } = product;
  const [productData, setProductData] = useState({});

  useEffect(() => {
    if (!product) return;
    fetch(`${process.env.REACT_APP_API_URL}/products/${product.product}`)
      .then((response) => response.json())
      .then((data) => {
        setProductData({
          brand: data.product.brand,
          name: data.product.name,
          image: data.product.image,
          color: data.product.color,
          price: data.product.price.toLocaleString(),
        });
      });
  }, [product]);

  return (
    <Row
      as={Link}
      to={`/women/handbags/${product.product}`}
      className="my-3 text-decoration-none"
    >
      <Col className="bag" md={5}>
        <img src={productData.image} className="img-fluid" alt="Image" />
      </Col>
      <Col md={6}>
        <div className="d-flex flex-column text-dark">
          <h6 className="fw-bold">
            {productData.brand} {productData.name}
          </h6>

          <p className="price py-2">${productData.price}</p>
          <span className="small">Variant: {productData.color} leather</span>
          <span className="small">Quantity: {quantity}</span>
        </div>
      </Col>
    </Row>
  );
}
