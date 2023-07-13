import { useEffect, useState } from "react";
import "../styles/Dashboard.css";
import { Button, Container, Row, Table, Modal, Form } from "react-bootstrap";

export default function Dashboard() {
  const [activeProducts, setActiveProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // New Product Form Input
  const [product, setProduct] = useState({
    name: "",
    type: "",
    price: "",
  });

  // Edit Product Form Input
  const [editedProduct, setEditedProduct] = useState({
    id: "",
    name: "",
    type: "",
    price: "",
  });

  const handleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleModal = (part) => {
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

  const handleArchiveProduct = (partId) => {
    fetch(`${process.env.REACT_APP_API_URL}/parts/${partId}/archive`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    window.location.reload();
  };

  const handleActivateProduct = (partId) => {
    fetch(`${process.env.REACT_APP_API_URL}/parts/${partId}/activate`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    window.location.reload();
  };

  const handleUpdateProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/parts/${editedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: editedProduct.name,
        type: editedProduct.type,
        price: editedProduct.price,
      }),
    }).then((response) => response.json());
    window.location.reload();
  };

  const handleDeleteProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/parts/${editedProduct.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => response.json());
    window.location.reload();
  };

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
                <td>{params._id}</td>
                <td>{params.name}</td>
                <td>{params.type}</td>
                <td>{params.price}</td>
                <td>
                  {params.isAvailable === true ? "In stock" : "Out of stock"}
                </td>
                <td>
                  {params.isAvailable === true ? (
                    <Button
                      variant="danger"
                      onClick={() => handleArchiveProduct(params._id)}
                    >
                      Archive
                    </Button>
                  ) : (
                    <Button
                      variant="success"
                      onClick={() => handleActivateProduct(params._id)}
                    >
                      Unarchive
                    </Button>
                  )}

                  <Button
                    variant="warning"
                    onClick={() => {
                      setEditedProduct({
                        id: params._id,
                        name: params.name,
                        type: params.type,
                        price: params.price,
                      });
                      handleModal();
                    }}
                  >
                    Update
                  </Button>
                </td>
              </tr>
            );
          })
        );
      });
  },);

  return (
    <Container>
      <Row className="mt-4">
        <h1 className="text-center">Admin Dashboard</h1>
        <div className="d-flex justify-content-center align-items-center">
          <Button onClick={handleAddModal}>Add New Product</Button>
          <Button>Show User Orders</Button>
        </div>
        <Table striped bordered hover variant="dark" className="mt-5">
          <thead>
            <tr>
              <th>ID</th>
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

      <Modal show={showAddModal} onHide={handleAddModal}>
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
          <Button variant="secondary" onClick={handleAddModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{editedProduct.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Product Name"
            name="name"
            autoComplete="off"
            value={editedProduct.name}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, name: e.target.value })
            }
          />
          <Form.Control
            type="text"
            placeholder="Product Type"
            name="type"
            autoComplete="off"
            value={editedProduct.type}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, type: e.target.value })
            }
          />
          <Form.Control
            type="number"
            placeholder="Product Price"
            name="price"
            autoComplete="off"
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, price: e.target.value })
            }
            className="no-spinners"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button variant="danger" onClick={handleDeleteProduct}>
            Delete Product
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
