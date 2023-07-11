import { useEffect, useState, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

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
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Invalid email or password!",
          });
        }
      })
      .then((data) => {
        if (data) {
          localStorage.setItem("token", data.access);
          retrieveUserDetails(data.access);
          Swal.fire({
            icon: "success",
            title: "Success!",
            text: "You have successfully logged in!",
          });
          navigate("/");
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
      });
  }

  return (
    <Container>
      <Row className="mt-5">
        <h1 className="text-center mb-4">Login</h1>
        <Col className="col-6 mx-auto border border-tertiary p-5">
          <h4>Welcome back!</h4>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" onClick={loginUser}>
              Login
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}
