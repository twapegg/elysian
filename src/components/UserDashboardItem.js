import { useState } from "react";
import { BsToggleOn, BsToggleOff, BsThreeDotsVertical } from "react-icons/bs";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function DashboardItem({ user }) {
  const [userData, setUserData] = useState({
    _id: user._id,
    email: user.email,
    isAdmin: user.isAdmin,
  });
  const [activeDropdown, setActiveDropdown] = useState(false);

  const handleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };

  const handleToggleAdmin = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/setAdmin/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        id: userData._id,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((data) => {
          setUserData(data);
        });
      }
    });
  };

  const handleDeleteUser = () => {
    fetch(`${process.env.REACT_APP_API_URL}/users/${userData._id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => {
      if (response.ok) {
        setUserData({});
      }
    });
  };

  return (
    <>
      <tr>
        <td>{userData._id}</td>
        <td>{userData.email}</td>
        <td>
          {userData !== null && userData.isAdmin ? (
            <>
              <BsToggleOn className="fs-3" onClick={handleToggleAdmin} />
            </>
          ) : (
            <>
              <BsToggleOff className="fs-3" onClick={handleToggleAdmin} />
            </>
          )}
        </td>
        <td>
          {userData ? (
            <>
              <BsThreeDotsVertical className="fs-4" onClick={handleDropdown} />
              <Dropdown show={activeDropdown} align="end">
                <Dropdown.Menu>
                  <Dropdown.Item
                    bg="dark"
                    as={Link}
                    to={`/dashboard/users/${userData._id}`}
                  >
                    View Order History
                  </Dropdown.Item>
                  <Dropdown.Item
                    style={{ backgroundColor: "#dc3545", color: "white" }}
                    onClick={handleDeleteUser}
                  >
                    Delete User
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </>
          ) : null}
        </td>
      </tr>
    </>
  );
}
