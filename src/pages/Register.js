import { useState, useEffect, useContext } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import Swal from "sweetalert2";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const [isContinueDisabled, setIsContinueDisabled] = useState(true);
  const [isPasswordFinished, setIsPasswordFinished] = useState(false);

  const { user } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    const delayActionTimeout = setTimeout(() => {
      // Perform the action after the delay
      if (password !== "") {
        // console.log("User is done typing:", email);
        setIsPasswordFinished(true);
      }
      // Add your logic here to handle the action
    }, 1000); // Adjust the delay time (in milliseconds) as per your requirement
    return () => {
      clearTimeout(delayActionTimeout);
    };
  }, [password]);

  useEffect(() => {
    if (
      email.length > 0 &&
      password.length > 0 &&
      passwordConfirmation.length > 0 &&
      password === passwordConfirmation
    ) {
      setIsContinueDisabled(false);
    } else {
      setIsContinueDisabled(true);
    }
  }, [email, password, passwordConfirmation]);

  function registerUser(e) {
    e.preventDefault();

    // Check if user already exists
    fetch(`${process.env.REACT_APP_API_URL}/users/checkEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data) {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "User already exists!",
          });
        } else {
          // Register the user
          fetch(`${process.env.REACT_APP_API_URL}/users/register`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email,
              password,
            }),
          });
          navigate("/login");
        }
      });
  }

  return (
    <Container>
      {user.id === null || user.id === undefined ? (
        <Row className="mt-5 pt-5">
          <h1 className="text-center mb-1">Create an account</h1>
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

              {isPasswordFinished ? (
                <Form.Group
                  className="mb-3"
                  controlId="formBasicPasswordConfirmation"
                >
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    className="py-2"
                    value={passwordConfirmation}
                    onChange={(e) => setPasswordConfirmation(e.target.value)}
                  />
                </Form.Group>
              ) : null}
              {password !== passwordConfirmation && isPasswordFinished ? (
                <Form.Text className="text-danger mb-3">
                  Passwords doesn't match!
                </Form.Text>
              ) : null}

              <div className="d-flex justify-content-between">
                <Button
                  variant="dark"
                  type="submit"
                  className="w-100 py-2"
                  disabled={isContinueDisabled}
                  onClick={registerUser}
                >
                  Continue
                </Button>
              </div>

              <p
                className="text-center mt-3 text-dark"
                style={{ fontSize: "18px" }}
              >
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-decoration-none text-dark fw-bold"
                >
                  Log in
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
