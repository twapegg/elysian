import React from "react";
import { Navbar, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsChevronLeft } from "react-icons/bs";
import "./SecondNavBar.css";

export default function SecondNavBar() {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="d-flex justify-content-between align-items-center">
        <Link to="/" className="mr-3">
          <BsChevronLeft size={24} className="icon" />
        </Link>
        <Navbar.Brand as={Link} to="/" className="text-center mx-auto">
          pcBuilder
        </Navbar.Brand>
        <div style={{ width: "24px" }}></div> {/* Empty div for spacing */}
      </Container>
    </Navbar>
  );
}
