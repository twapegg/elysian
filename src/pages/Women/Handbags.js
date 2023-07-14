import { useState, useEffect } from "react";
import { Col } from "react-bootstrap";
import ProductCard from "../../components/ProductCard";

export default function Handbags() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`)
      .then((response) => response.json())
      .then((data) => {
        const extractedProducts = data.products;
        setProducts(
          extractedProducts.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })
        );
      });
  }, []);

  return (
    <>
      <div
        className="hero bg-image"
        style={{
          backgroundImage:
            "url('//media.gucci.com/content/HeroRegularStandard_3200x1350/1684749646/HeroRegularStandard_Gucci-Prefall-May2023-017_001_Default.jpg')",
        }}
      >
        <p className="hero-text ">Handbags for Women</p>
      </div>

      <Col className="product-container mb-5 pb-5">{products}</Col>
      <div style={{ height: "250px" }}></div>
    </>
  );
}
