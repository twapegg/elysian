import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import BuildCard from "../components/BuildCard";

export default function Home() {
  const buildCards = [
    {
      id: 1,
      name: "Entry Level AMD Gaming Build",
      price: "386.21",
      img: "https://cdna.pcpartpicker.com/static/forever/images/product/b32fb28bca9fb6780a07e11767da9f38.256p.jpg",
      cpu: "AMD Ryzen 5600G",
      gpu: "Integrated Graphics",
      motherboard: "Gigabyte B550M DS3H",
    },
    {
      id: 2,
      name: "Excellent Intel Gaming/Streaming Build",
      price: "1185.88",
      img: "https://cdna.pcpartpicker.com/static/forever/images/product/ce2b31469b4d7e134a2410ae6b42b011.256p.jpg",
      cpu: "Intel Core i5-13400F",
      gpu: "Radeon RX 6800 XT",
      motherboard: "Gigabyte B760M DS3H",
    },
    {
      id: 3,
      name: "Magnificent AMD Gaming/Streaming Build",
      price: "1880.91",
      img: "https://cdna.pcpartpicker.com/static/forever/images/product/0610d363ccccf52837f07d811e4eb2a3.256p.jpg",
      cpu: "AMD Ryzen 7 7800X3D",
      gpu: "GeForce RTX 3090",
      motherboard: "Asus ROG Strix X570-E Gaming ATX AM4",
    },
  ];

  return (
    <Container style={{ height: "100vh" }}>
      <Row className="mt-3">
        <Col className="col-8 mx-auto">
          <h1 className="text-center p-3 display-3 fw-bold">Build Guides</h1>

          <Card.Text
            className="text-center text-secondary"
            style={{ fontSize: "18pt" }}
          >
            Building your own PC and need ideas on where to get started? Explore
            our build guides which cover systems for a variety of use-cases and
            budgets.
          </Card.Text>
        </Col>
      </Row>
      <Row className="mt-4">
        {buildCards.map((buildCard) => (
          <Col key={buildCard.id}>
            <BuildCard params={buildCard} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
