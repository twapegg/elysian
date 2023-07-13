import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  const { brand, name, price, image } = product;
  return (
    <Card style={{ width: "31rem", textDecoration: "none" }}>
      <Card.Img
        variant="top"
        src={image}
        className="img-fluid mx-auto d-block p-3"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>
          {brand} {name}
        </Card.Title>
        <div className="mt-auto">{price}</div>
      </Card.Body>
    </Card>
  );
}
