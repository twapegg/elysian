import { useState, useEffect, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Offcanvas,
  Col,
  Row,
  Dropdown,
  Button,
  Container,
} from "react-bootstrap";
import UserContext from "../context/UserContext";

export default function ProductView() {
  const { user, cart, setCart, bagDropdown, setBagDropdown } =
    useContext(UserContext);
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [show, setShow] = useState(false);
  const [similarProducts, setSimilarProducts] = useState([]);

  const navigate = useNavigate();

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

  const addToCart = () => {
    fetch(`${process.env.REACT_APP_API_URL}/carts/add/${cart._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ product: `${product._id}`, quantity: 1 }),
    })
      .then((response) => response.json())
      .then((data) => {
        setCart({
          ...cart,
          products: data.cart.products,
          subTotal: data.cart.subTotal,
        });
      });
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/similar/${product.name}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setSimilarProducts(data.products);
        });
      }
    });
  }, [product.name]);

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
            onClick={() => {
              addToCart();
              setBagDropdown(true);
            }}
            disabled={
              user.isAdmin || user.id === undefined || user.id === null
                ? true
                : false
            }
          >
            ADD TO SHOPPING BAG
          </Button>
          <Button
            variant="transparent"
            className="mt-1 fs-6 w-100 product-button border-dark fw-bold"
            onClick={() => {
              addToCart();
              navigate("/cart");
              if (bagDropdown) {
                setBagDropdown(false);
              }
            }}
            disabled={
              user.isAdmin || user.id === undefined || user.id === null
                ? true
                : false
            }
          >
            CHECKOUT
          </Button>

          <Offcanvas show={show} placement="bottom" onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Variants</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <div className="d-flex">
                {similarProducts.map((product) => (
                  <Container key={product._id}>
                    <Row>
                      <Col as={Link} to={`/handbags/${product._id}`} md={6}>
                        <img
                          src={product.image}
                          alt={product.name}
                          className="img-fluid w-75"
                        />
                      </Col>
                    </Row>
                  </Container>
                ))}
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Col>
      </Row>
    </div>
  );
}
