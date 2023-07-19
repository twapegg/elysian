import { Container, Row, Col, Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../styles/Women.css";

export default function Home() {
  const navigate = useNavigate();
  return (
    <>
      <Container>
        <Row className="justify-content-center">
          <Col md={8}>
            <Carousel indicators controls={false} className="carousel-home">
              <Carousel.Item>
                <img
                  src="https://media.gucci.com/content/DiaryArticleSingle_Standard_768x1075/1688564706/DiaryArticleSingle_Horsebit-Wave2-Jul23-01_001_Default.jpg"
                  className="d-block w-100"
                />
              </Carousel.Item>

              <Carousel.Item>
                <img
                  src="https://media.gucci.com/content/DiaryArticleSingle_Standard_768x1075/1688546705/DiaryArticleSingle_Horsebit-Wave2-Jul23-06_001_Default.jpg"
                  className="d-block w-100"
                />
              </Carousel.Item>
              <Carousel.Item>
                <img
                  src="https://media.gucci.com/dynamic/b3c8/hioNyWjn29XSyONeMzldfSB58wDZP_fMEZs5VNq+eeCPzPmdR7vqFDXbtkWC5dj4yVKykPWUt4WzQi9NX6zg8OogyJsRZBErAx3y_7bYeO_od1s7KouFMeGNjMRWIOis7kALYXrIjXk9dBaGBmc_fo8dtcT_dXuPaPSfybrk8934j+moZ+vCZ5q8vfFaYZQIX0_34K44MohBMu1ZtlMr2sMvbWTr64E5Y5RrVkRaqiP3s4O5CMo4FQh8sUIqRlKi/Portrait_Horsebit-4-Default.png"
                  className="d-block w-100"
                />
              </Carousel.Item>
            </Carousel>

            <h1 className="mt-5 text-center">GUCCI HORSEBIT 1955</h1>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-outline-dark mt-3 p-3 fw-bold"
                onClick={() => navigate("/handbags")}
              >
                EXPLORE THE COLLECTION
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <Row className="justify-content-center">
        <Col md={4}>
          <Carousel controls className="carousel-second my-5">
            <Carousel.Item>
              <img
                src="https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1581706804/602204_1DB0G_1000_001_074_0000_Light.jpg"
                className="d-block w-100"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://media.gucci.com/style/DarkGray_Center_0_0_490x490/1581706806/602204_1DB0G_6638_001_074_0000_Light.jpg"
                className="d-block w-100"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                src="https://media.gucci.com/style/DarkGray_Center_0_0_2400x2400/1581963303/602204_1DB0G_9022_001_074_0000_Light-Gucci-Horsebit-1955-shoulder-bag.jpg"
                className="d-block w-100"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
      <Row className="my-5 mb-5">
        <Col md={6} className="position-relative">
          <img
            src="https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1679700608/726274_AAA9F_7519_003_100_0000_Light-Aphrodite-medium-shoulder-bag.jpg"
            className="img-fluid w-100"
          />
        </Col>
        <Col md={6}>
          <img
            src="https://media.gucci.com/style/DarkGray_Center_0_0_1200x1200/1685466104/751518_1AAOW_9022_003_100_0000_Light-Gucci-Blondie-small-tote-bag.jpg"
            className="img-fluid w-100"
          />
        </Col>
      </Row>
      <Row className="my-5 mb-5">
        <Col md={6} className="position-relative">
          <h1 className="mt-5 text-center">GUCCI APHRODITE</h1>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-dark mt-3 p-3 fw-bold"
              onClick={() => navigate("/handbags")}
            >
              EXPLORE THE COLLECTION
            </button>
          </div>
        </Col>
        <Col md={6}>
          <h1 className="mt-5 text-center">GUCCI BLONDIE</h1>
          <div className="d-flex justify-content-center">
            <button
              className="btn btn-dark mt-3 p-3 fw-bold"
              onClick={() => navigate("/handbags")}
            >
              EXPLORE THE COLLECTION
            </button>
          </div>
        </Col>
      </Row>
      <div style={{ height: "250px" }}></div>
    </>
  );
}
