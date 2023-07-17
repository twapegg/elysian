import { useState, useEffect } from "react";
import AppNavBar from "./components/AppNavBar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Women from "./pages/Women/Women";
import Handbags from "./pages/Women/Handbags";
import ProductView from "./components/ProductView";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const [cart, setCart] = useState({
    user: null,
    products: [],
    subTotal: 0,
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

  // Gets the cart of the user if the user is logged in
  useEffect(() => {
    if (user.id !== undefined || user.id !== null) {
      fetch(`${process.env.REACT_APP_API_URL}/users/me/cart`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }).then((response) => {
        if (response.ok) {
          response.json().then((data) => {
            setCart(data.cart);
          });
        }
      });
    }
  }, [user.id]);

  return (
    <UserProvider value={{ user, setUser, unsetUser, cart, setCart }}>
      <BrowserRouter>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/women" element={<Women />} />
          <Route path="/women/handbags" element={<Handbags />} />
          <Route path="/women/handbags/:id" element={<ProductView />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
