import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useNavigate, Link, Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const { user, setUser } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (email !== "" && password !== "") {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  }, [email, password]);

  function loginUser(e) {
    e.preventDefault();

    // Fetch the user from the database
    fetch(`${process.env.REACT_APP_API_URL}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          if (data) {
            localStorage.setItem("token", data.access);
            retrieveUserDetails(data.access);
          }
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Invalid email or password!",
        });
      }
    });
  }

  function retrieveUserDetails(token) {
    // Fetch the user details from the URI
    fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser({
          id: data._id,
          isAdmin: data.isAdmin,
        });
        if (data.isAdmin === true) {
          navigate("/dashboard");
        } else {
          navigate("/");
        }
      });
  }

  return (
    <Container>
      {user.id === undefined || user.id === null ? (
        <Row className="mt-5 pt-5">
          <h1 className="text-center mb-1">Welcome back</h1>
          <Col className="col-xl-5 col-lg-4 col-md-7 col-sm-12 mx-auto p-5">
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="email"
                  placeholder="Email address"
                  autoComplete="off"
                  className="py-2"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  className="py-2"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <div className="d-flex justify-content-between">
                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 py-2"
                  disabled={isDisabled}
                  onClick={loginUser}
                >
                  Continue
                </Button>
              </div>

              <p
                className="text-center mt-3 text-dark"
                style={{ fontSize: "18px" }}
              >
                Don't have an account?{" "}
                <Link
                  to="/register"
                  className="text-decoration-none text-dark fw-bold"
                >
                  Sign up
                </Link>
              </p>
            </Form>
          </Col>
        </Row>
      ) : (
        <Navigate to="/*" />
      )}
    </Container>
  );
}
