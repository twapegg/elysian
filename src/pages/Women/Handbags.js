import { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "../../styles/Handbags.css";
import ProductCard from "../../components/ProductCard";

export default function Handbags() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(
          data.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        );
      });
  }, []);

  return (
    <>
      <div className="hero bg-image">
        <p className="hero-text display-1">Handbags for Women</p>
      </div>

      <Col>{products}</Col>
    </>
  );
}
