import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { Offcanvas, Col, Row, Dropdown, Button } from "react-bootstrap";
import UserContext from "../context/UserContext";

export default function ProductView() {
  const { setCart } = useContext(UserContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`)
      .then((response) => response.json())
      .then((data) => {
        data.product.price = data.product.price.toLocaleString();
        setProduct(data.product);
      });
  }, [id]);

  // // const addToShoppingBag = () => {
  // //   fetch(`${process.env.REACT_APP_API_URL}/cart/me/cart`, {`)
  // };

  return (
    <div className="position-relative">
      <Col md={12} className="product-bg">
        <Col sm={12} md={6} className="d-inline-block">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid w-100"
          />
        </Col>
        <div className="w-50 d-none d-md-inline-block ">
          <img
            src={product.image}
            alt={product.name}
            className="img-fluid w-100 "
          />
        </div>
      </Col>

      <Row className="d-md-block d-none">
        <Col sm={12} md={3} className="product" style={{ zIndex: 1 }}>
          <h5 className="text-center fs-5 fw-bold">
            {product.brand} {product.name}
          </h5>

          <span className="mt-2 fs-5 fw-bold">${product.price}</span>
          <Dropdown
            variant="primary"
            onClick={handleShow}
            className="mt-3 fs-6"
          >
            <Dropdown.Toggle variant="transparent" id="dropdown-basic">
              {product.color} leather
            </Dropdown.Toggle>
          </Dropdown>

          <span className="mt-3">
            {product.available ? "AVAILABLE" : "NOT AVAILABLE"}
          </span>

          <p className="mt-3 text-center ">
            {product.available
              ? "Your selection is available for immediate purchase."
              : "We're sorry, this product is currently not available for purchase."}
          </p>

          <Button
            variant="dark"
            className="mt-1 fs-6 w-100 product-button fw-bold"
            // onClick={addToShoppingBag}
          >
            ADD TO SHOPPING BAG
          </Button>
          <Button
            variant="transparent"
            className="mt-1 fs-6 w-100 product-button border-dark fw-bold"
          >
            CHECKOUT
          </Button>

          <Offcanvas show={show} placement="bottom" onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Variant</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body></Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </div>
  );
}
