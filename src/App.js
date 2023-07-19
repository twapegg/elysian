import { useState, useEffect } from "react";
import AppNavBar from "./components/AppNavBar";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import Register from "./pages/Register";
import Dashboard from "./pages/Admin/Dashboard";
import ProductsDashboard from "./pages/Admin/ProductsDashboard";
import UserDashboard from "./pages/Admin/UserDashboard";
import OrderDashboard from "./pages/Admin/OrderDashboard";
import UserOrderHistory from "./pages/Admin/UserOrderHistory";
import Home from "./pages/Home";
import Handbags from "./pages/Handbags";
import ProductView from "./components/ProductView";
import ShoppingBag from "./pages/ShoppingBag";
import OrderHistory from "./pages/OrderHistory";
import NotFound from "./pages/NotFound";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserProvider } from "./context/UserContext";

function App() {
  const [user, setUser] = useState({
    id: null,
    isAdmin: null,
  });

  const [cart, setCart] = useState({
    id: null,
    user: null,
    products: [],
    subTotal: 0,
  });

  function unsetUser() {
    localStorage.clear();
  }

  const [bagDropdown, setBagDropdown] = useState(false);

  const handleBagDropdown = () => {
    setBagDropdown(!bagDropdown);
  };

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
  // If user doesn't have a cart, create one
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
        } else {
          fetch(`${process.env.REACT_APP_API_URL}/carts/`, {
            method: "POST",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              user: user.id,
            }),
          }).then((response) => {
            if (response.ok) {
              response.json().then((data) => {
                setCart(data.cart);
              });
            }
          });
        }
      });
    }
  }, [user.id]);

  return (
    <UserProvider
      value={{
        user,
        setUser,
        unsetUser,
        cart,
        setCart,
        setBagDropdown,
        bagDropdown,
        handleBagDropdown,
      }}
    >
      <BrowserRouter>
        <AppNavBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/users" element={<UserDashboard />} />
          <Route path="/dashboard/users/:id" element={<UserOrderHistory />} />
          <Route path="/dashboard/products" element={<ProductsDashboard />} />
          <Route path="/dashboard/orders" element={<OrderDashboard />} />
          <Route path="/cart" element={<ShoppingBag />} />
          <Route path="/history" element={<OrderHistory />} />
          <Route path="/handbags" element={<Handbags />} />
          <Route path="/handbags/:id" element={<ProductView />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
}

export default App;
