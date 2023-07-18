import { useEffect, useState } from "react";
import { Container, Col, Row, Table } from "react-bootstrap";
import DashboardItem from "../../components/DashboardItem";

export default function UserDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/users/`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setUsers(data));
  }, []);

  return (
    <Container>
      <Row>
        <h1 className="ms-5">User Management</h1>
        <Col md={12}>
          <Table hover className="mt-3">
            <thead>
              <tr>
                <th
                  style={{
                    backgroundColor: "#e8e8e8",
                    borderRadius: "16px 0 0 0",
                  }}
                >
                  ID
                </th>
                <th style={{ backgroundColor: "#e8e8e8" }}>Email</th>
                <th style={{ backgroundColor: "#e8e8e8" }}>Admin</th>
                <th
                  style={{
                    backgroundColor: "#e8e8e8",
                    borderRadius: "0 16px 0 0",
                  }}
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <DashboardItem key={user._id} user={user} />
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
}
