import { useState, useEffect, useContext } from "react";
import { Nav, Container, Navbar, Dropdown, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag } from "react-icons/hi";
import UserContext from "../context/UserContext";
import BagDropdownProduct from "./BagDropdownProduct";
import "../styles/AppNavBar.css";

export default function AppNavBar() {
  const { user, cart } = useContext(UserContext);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (cart.products.length > 0) {
      setProducts(cart.products);
    } else {
      setProducts([]);
    }
  }, [cart]);

  const handleDropdownToggle = (dropdownName) => {
    setActiveDropdown((prevDropdown) =>
      prevDropdown === dropdownName ? null : dropdownName
    );
  };

  return (
    <>
      <Navbar bg="white" style={{ height: "4.5rem" }}>
        <Container className="d-flex justify-content-between align-items-center">
          <Navbar.Brand
            as={Link}
            to="/"
            className="header-text space"
            style={{ fontSize: "2rem", letterSpacing: "0.2rem" }}
          >
            Elysian
          </Navbar.Brand>
          <Nav className="ms-auto">
            <Nav.Link
              onClick={() => handleDropdownToggle("cartDropdown")}
              className="cart-icon"
            >
              <HiOutlineShoppingBag />
            </Nav.Link>

            {activeDropdown === "cartDropdown" && (
              <Dropdown show align="end" className="cart-dropdown">
                <Dropdown.Menu className="mx-5" style={{ minWidth: "26rem" }}>
                  {products.length > 0 ? (
                    <Row>
                      <h5 className="text-center mt-2">Shopping Bag</h5>

                      {products.map((product) => (
                        <BagDropdownProduct
                          key={product.product}
                          product={product}
                        />
                      ))}
                    </Row>
                  ) : (
                    <>
                      <h6 className="text-center">
                        Your Shopping Bag is Empty
                      </h6>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Nav.Link
              onClick={() => handleDropdownToggle("personDropdown")}
              className="person-icon"
            >
              <GoPerson />
            </Nav.Link>

            {activeDropdown === "personDropdown" && (
              <Dropdown show align="end" className="person-dropdown">
                <Dropdown.Menu>
                  {user.id === null || user.id === undefined ? (
                    <>
                      <Dropdown.Item
                        as={Link}
                        to="/login"
                        onClick={() => handleDropdownToggle("personDropdown")}
                      >
                        Login
                      </Dropdown.Item>
                      <Dropdown.Item
                        as={Link}
                        to="/register"
                        onClick={() => handleDropdownToggle("personDropdown")}
                      >
                        Register
                      </Dropdown.Item>
                    </>
                  ) : (
                    <Dropdown.Item as={Link} to="/logout">
                      Logout
                    </Dropdown.Item>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            )}

            <Nav.Link
              onClick={() => handleDropdownToggle("hamburgerDropdown")}
              className="hamburger-icon"
            >
              <RxHamburgerMenu />
            </Nav.Link>

            {activeDropdown === "hamburgerDropdown" && (
              <Dropdown show align="end" className="hamburger-dropdown">
                <Dropdown.Menu>
                  <Dropdown.Item>What's New</Dropdown.Item>
                  <Dropdown.Item
                    as={Link}
                    to="/women"
                    onClick={() => handleDropdownToggle("hamburgerDropdown")}
                  >
                    Women
                  </Dropdown.Item>
                  <Dropdown.Item>Men</Dropdown.Item>
                  <Dropdown.Item>Travel</Dropdown.Item>
                  <Dropdown.Item>Handbags</Dropdown.Item>
                  <Dropdown.Item>Sports</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
