import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function BuildCard({ params }) {
  const { _id, name, price, img, cpu, gpu, motherboard } = params;

  return (
    <Card as={Link} style={{ width: "22rem", textDecoration: "none" }}>
      <Card.Img
        variant="top"
        src={img}
        className="img-fluid mx-auto d-block p-3"
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title>{name}</Card.Title>
        <div className="mt-auto">
          <Card.Text className="text-muted">{cpu}</Card.Text>
          <Card.Text className="text-muted">{gpu}</Card.Text>
          <Card.Text className="text-muted">{motherboard}</Card.Text>
        </div>
      </Card.Body>
      <Card.Footer>
        <h6>${price}</h6>
      </Card.Footer>
    </Card>
  );
}
