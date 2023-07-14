import { useState } from "react";
import { Nav, Container, Navbar, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/UserContext";
import { RxHamburgerMenu } from "react-icons/rx";
import { GoPerson } from "react-icons/go";
import { HiOutlineShoppingBag, HiOutlineSearch } from "react-icons/hi";
import "../styles/AppNavBar.css";

export default function AppNavBar() {
  const { user } = useContext(UserContext);
  const [activeDropdown, setActiveDropdown] = useState(null);

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
            <Nav.Link className="search-icon">
              <HiOutlineSearch />
            </Nav.Link>

            <Nav.Link as={Link} to="/cart" className="cart-icon">
              <HiOutlineShoppingBag />
            </Nav.Link>
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
                      <Dropdown.Item as={Link} to="/login">
                        Login
                      </Dropdown.Item>
                      <Dropdown.Item as={Link} to="/register">
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
