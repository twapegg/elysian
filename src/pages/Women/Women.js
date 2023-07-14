import { Container, Row, Col } from "react-bootstrap";
import "../../styles/Women.css";

export default function Women() {
  return (
    <>
      <div
        className="hero bg-image"
        style={{
          backgroundImage:
            "url('//media.gucci.com/content/HeroRegularStandard_3200x1350/1683299772/HeroRegularStandard_Summer-stories-2023-07_001_Default.jpg'",
        }}
      >
        <p className="hero-text">Women</p>
      </div>
      <Container>
        <Row>
          <Col className="mb-5 pb-5">
            <div className="my-5"></div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
