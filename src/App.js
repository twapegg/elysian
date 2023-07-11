import { Fragment, useState, useEffect } from "react";
import AppNavBar from "./components/AppNavBar";
import SecondNavBar from "./components/SecondNavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";
import "./App.css";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  function unsetUser() {
    localStorage.clear();
  }

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) =>
      response.ok
        ? response.json().then((data) => {
            setUser({
              id: data._id,
              isAdmin: data.isAdmin,
            });
          })
        : null
    );
  }, []);

  return (
    <UserProvider value={{ user, setUser, unsetUser }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Fragment>
                <AppNavBar />
                <Home />
              </Fragment>
            }
          />
          <Route
            path="/register"
            element={
              <Fragment>
                <SecondNavBar />
                <Register />
              </Fragment>
            }
          />
          <Route
            path="/login"
            element={
              <Fragment>
                <SecondNavBar />
                <Login />
              </Fragment>
            }
          />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
