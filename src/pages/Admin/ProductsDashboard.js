import { useEffect, useState } from "react";
import {
  Container,
  Col,
  Row,
  Table,
  Modal,
  Form,
  Button,
} from "react-bootstrap";
import { FaPlus } from "react-icons/fa";
import ProductDashboardItem from "../../components/ProductDashboardItem";
import Swal from "sweetalert2";

export default function ProductsDashboard() {
  const [products, setProducts] = useState([]);

  const [newProduct, setNewProduct] = useState({
    brand: "",
    name: "",
    color: "",
    price: 0,
    available: false,
    image: "",
  });

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => setShowModal(!showModal);

  // Retrieve all products from the database
  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setProducts(data.products));
  }, []);

  // Create a new product
  const handleCreateProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(newProduct),
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts([...products, data.product]);
        setNewProduct({
          brand: "",
          name: "",
          color: "",
          price: 0,
          available: false,
          image: "",
        });
      });
  };

  // Delete a product
  const handleDeleteProduct = (id) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setProducts(products.filter((product) => product._id !== id));
      });
  };

  return (
    <Container>
      <Row className="mt-5 py-5">
        <div className="d-flex justify-content-between">
          <h1 className="ms-5">Product Management</h1>
          <button className="btn btn-dark me-5 fw-bold" onClick={handleModal}>
            <div className="d-inline me-2">
              <FaPlus />
            </div>
            Add Product
          </button>
        </div>
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
                  Name
                </th>
                <th style={{ backgroundColor: "#e8e8e8" }}>Variant</th>
                <th style={{ backgroundColor: "#e8e8e8" }}>Price</th>
                <th style={{ backgroundColor: "#e8e8e8" }}>Availability</th>
                <th
                  colSpan={3}
                  style={{
                    backgroundColor: "#e8e8e8",
                    borderRadius: "0 16px 0 0",
                  }}
                  className="text-center"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <ProductDashboardItem product={product} />
                  <td>
                    <Button
                      variant="danger"
                      className="ms-2"
                      onClick={() => {
                        handleDeleteProduct(product._id);
                      }}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{newProduct.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Control
            type="text"
            placeholder="Product Brand"
            name="brand"
            autoComplete="off"
            value={newProduct.brand}
            onChange={(e) =>
              setNewProduct({ ...newProduct, brand: e.target.value })
            }
          />
          <Form.Control
            type="text"
            placeholder="Product Name"
            name="name"
            autoComplete="off"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
          <Form.Control
            type="text"
            placeholder="Product Color"
            name="color"
            autoComplete="off"
            value={newProduct.color}
            onChange={(e) =>
              setNewProduct({ ...newProduct, color: e.target.value })
            }
          />
          <Form.Control
            type="text"
            placeholder="Product Price"
            name="price"
            autoComplete="off"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
          <Form.Control
            type="text"
            placeholder="Product Image"
            name="image"
            autoComplete="off"
            value={newProduct.image}
            onChange={(e) =>
              setNewProduct({ ...newProduct, image: e.target.value })
            }
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCreateProduct}>
            Add Product
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
