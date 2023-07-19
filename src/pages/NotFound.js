import React from "react";
import { Col, Row } from "react-bootstrap";

export default function NotFound() {
  return (
    <>
      <div className="position-relative mt-5 py-5" style={{ height: "60 vh" }}>
        <Col md={12}>
          <img
            src={
              "//media.gucci.com/content/HeroShortStandard_3200x654/1684494946/HeroShortStandard_Gucci-Prefall-May2023-03_001_Default.jpg"
            }
            className="img-fluid w-100 h-100"
          />
        </Col>
        <Col
          md={12}
          className="position-absolute top-50 start-50 translate-middle"
        >
          <div className="text-light">
            <h1 className="text-center">404</h1>
            <h2 className="text-center">Page Not Found</h2>
          </div>
        </Col>
      </div>
    </>
  );
}
