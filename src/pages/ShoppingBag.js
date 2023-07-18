import { useContext } from "react";
import { Container, Col, Row } from "react-bootstrap";
import UserContext from "../context/UserContext";
import CartItem from "../components/CartItem";
import { useNavigate } from "react-router-dom";

export default function ShoppingBag() {
  const { user, setCart, cart } = useContext(UserContext);

  const navigate = useNavigate();

  const handleCheckout = () => {
    fetch(`${process.env.REACT_APP_API_URL}/orders/`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user: user.id,
        products: cart.products,
        totalPrice: cart.subTotal + cart.subTotal * 0.1,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          console.log(data);
          setCart({
            id: null,
            user: null,
            products: [],
            subTotal: 0,
          });
        });
      }
      navigate("/history");
    });
  };

  return (
    <>
      <div
        className="hero bg-image"
        style={{
          backgroundImage:
            "url('//media.gucci.com/content/HeroShortStandard_3200x654/1684494946/HeroShortStandard_Gucci-Prefall-May2023-03_001_Default.jpg')",
          height: "60vh",
        }}
      >
        <p className="hero-text mt-3">SHOPPING BAG</p>
      </div>
      <Container>
        <Row className="mt-5">
          <Col md={8}>
            <h6>YOUR SELECTIONS</h6>
            <hr />
            <div className="w-100">
              {cart.products.map((product) => (
                <CartItem key={product._id} product={product} />
              ))}
            </div>
          </Col>
          <Col md={4} className="border pt-2 px-3">
            <h6 className="text-center">ORDER SUMMARY</h6>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="fw-bold">Subtotal</span>
              <span>${cart.subTotal.toLocaleString()}</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold mt-2">Shipping</span>
              <span className="mt-2">FREE</span>
            </div>
            <div className="d-flex justify-content-between">
              <span className="fw-bold mt-2">Estimated Tax</span>
              <span className="mt-2">${cart.subTotal * 0.1}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between">
              <span className="fs-4">Total</span>
              <span className="fs-4">
                ${(cart.subTotal + cart.subTotal * 0.1).toLocaleString()}
              </span>
            </div>
            <hr />
            <button className="btn btn-dark w-100" onClick={handleCheckout}>
              CHECKOUT
            </button>
          </Col>
        </Row>
      </Container>
    </>
  );
}
