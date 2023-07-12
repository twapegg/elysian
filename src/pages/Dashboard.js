import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Button, Container, Row, Table, Modal, Form } from "react-bootstrap";

export default function Dashboard() {
  const [activeProducts, setActiveProducts] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // New Product Form Input
  const [product, setProduct] = useState({
    name: "",
    type: "",
    price: "",
  });

  const handleModal = () => {
    setShowModal(!showModal);
  };

  const handleAddProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/parts/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(product),
    });
    window.location.reload();
  };

  //   const handleArchiveProduct = () => {
  //     fetch(`${process.env.REACT_APP_API_URL}/parts/${}`, {

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/parts/`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setActiveProducts(
          data.map((params) => {
            return (
              <tr key={params._id}>
                <td>{params.name}</td>
                <td>{params.type}</td>
                <td>{params.price}</td>
                <td>
                  {params.isAvailable === true ? "In stock" : "Out of stock"}
                </td>
                <td>
                  {params.isAvailable === true ? (
                    <Button variant="danger">Archive</Button>
                  ) : (
                    <Button variant="success">Unarchive</Button>
                  )}

                  <Button variant="warning">Update</Button>
                </td>
              </tr>
            );
          })
        );
      });
  }, []);

  return (
    <Container>
      <Row className="mt-4">
        <h1 className="text-center">Admin Dashboard</h1>
        <div className="d-flex justify-content-center align-items-center">
          <Button onClick={handleModal}>Add New Product</Button>
          <Button>Show User Orders</Button>
        </div>
        <Table striped bordered hover variant="dark" className="mt-5">
          <thead>
            <tr>
              <th>Name</th>
              <th>Part Type</th>
              <th>Price</th>
              <th>Availability</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{activeProducts}</tbody>
        </Table>
      </Row>

      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Product Name"
            name="name"
            autoComplete="off"
            value={product.name}
            onChange={(e) => setProduct({ ...product, name: e.target.value })}
          />
          <Form.Control
            type="text"
            placeholder="Product Type"
            name="type"
            autoComplete="off"
            value={product.type}
            onChange={(e) => setProduct({ ...product, type: e.target.value })}
          />
          <Form.Control
            type="number"
            placeholder="Product Price"
            name="price"
            autoComplete="off"
            value={product.price}
            onChange={(e) => setProduct({ ...product, price: e.target.value })}
            className="no-spinners"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
