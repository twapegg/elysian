import { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Logout() {
  const { setUser, unsetUser, setCart } = useContext(UserContext);

  useEffect(() => {
    unsetUser();
    setUser({
      id: null,
      isAdmin: null,
    });
    setCart({
      id: null,
      products: [],
    });
  });

  return <Navigate to="/login" />;
}
