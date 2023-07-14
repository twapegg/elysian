import { useState } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { brand, name, price, image } = product;
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {isHovered ? (
        <Link
          to={`/women/handbags/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <Card>
            <Card.Img
              variant="top"
              src={image}
              className="img-fluid mx-auto d-block p-3"
            />
            <Card.Body className="d-flex flex-column">
              <Card.Title className="text-center">
                {brand} {name}
              </Card.Title>
              <div className="mt-3 text-center price">
                {price.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </div>
              <h6
                as={Link}
                to={`/products/${product._id}`}
                className="mt-3 text-center text-uppercase"
                style={{ textDecoration: "underline" }}
              >
                Shop This
              </h6>
            </Card.Body>
          </Card>
        </Link>
      ) : (
        <Link
          to={`/women/handbags/${product._id}`}
          style={{ textDecoration: "none" }}
        >
          <div className="img-border">
            <Card.Img
              variant="top"
              src={image}
              className="img-fluid mx-auto d-block p-3"
            />
          </div>
        </Link>
      )}
    </div>
  );
}
