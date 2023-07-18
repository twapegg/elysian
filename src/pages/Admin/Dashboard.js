import { useEffect, useState } from "react";
import { Button, Container, Row, Table, Modal, Form } from "react-bootstrap";
import "../../styles/Dashboard.css";

export default function Dashboard() {
  const [activeProducts, setActiveProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  // New Product Form Input
  const [product, setProduct] = useState({
    brand: "",
    name: "",
    category: "",
    color: "",
    price: "",
    image: "",
    description: "",
    available: true,
  });

  // Edit Product Form Input
  const [editedProduct, setEditedProduct] = useState({
    id: "",
    brand: "",
    name: "",
    category: "",
    color: "",
    price: "",
    image: "",
    description: "",
  });

  useEffect(() => {
    console.log(editedProduct);
  }, [editedProduct]);

  const handleAddModal = () => {
    setShowAddModal(!showAddModal);
  };

  const handleModal = (part) => {
    setShowModal(!showModal);
  };

  const handleAddProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/`, {
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
    fetch(`${process.env.REACT_APP_API_URL}/products/archive/${partId}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    window.location.reload();
  };

  const handleActivateProduct = (partId) => {
    fetch(`${process.env.REACT_APP_API_URL}/products/activate/${partId}/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    window.location.reload();
  };

  const handleUpdateProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${editedProduct.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        brand: editedProduct.brand,
        name: editedProduct.name,
        category: editedProduct.category,
        price: editedProduct.price,
      }),
    }).then((response) => response.json());
    window.location.reload();
  };

  const handleDeleteProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${editedProduct.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => response.json());
    window.location.reload();
  };

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/products/all`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const extractedProducts = data.products;
        setActiveProducts(
          extractedProducts.map((params) => {
            return (
              <tr key={params._id}>
                <td>
                  {params.brand} {params.name}
                </td>
                <td>{params.category}</td>
                <td>${params.price}</td>
                <td>
                  {params.available === true ? "In stock" : "Out of stock"}
                </td>
                <td>
                  {params.available === true ? (
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
                        brand: params.brand,
                        name: params.name,
                        category: params.category,
                        color: params.color,
                        price: params.price,
                        image: params.image,
                        description: params.description,
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
  });

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
            placeholder="Product Brand"
            name="brand"
            autoComplete="off"
            value={product.brand}
            onChange={(e) => setProduct({ ...product, brand: e.target.value })}
          />
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
            placeholder="Product Category"
            name="category"
            autoComplete="off"
            value={product.category}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
          />
          <Form.Control
            type="text"
            placeholder="Product Color"
            name="color"
            autoComplete="off"
            value={product.color}
            onChange={(e) => setProduct({ ...product, color: e.target.value })}
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
          <Form.Control
            type="text"
            placeholder="Product Image"
            name="image"
            autoComplete="off"
            value={product.image}
            onChange={(e) => setProduct({ ...product, image: e.target.value })}
          />
          <Form.Control
            type="text"
            placeholder="Product Description"
            name="description"
            autoComplete="off"
            value={product.description}
            onChange={(e) =>
              setProduct({ ...product, description: e.target.value })
            }
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
            placeholder="Product Brand"
            name="brand"
            autoComplete="off"
            value={editedProduct.brand}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, brand: e.target.value })
            }
          />
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
            placeholder="Product Category"
            name="category"
            autoComplete="off"
            value={editedProduct.category}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, category: e.target.value })
            }
          />
          <Form.Control
            type="text"
            placeholder="Product Color"
            name="color"
            autoComplete="off"
            value={editedProduct.color}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, color: e.target.value })
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
          <Form.Control
            type="text"
            placeholder="Product Image"
            name="image"
            autoComplete="off"
            value={editedProduct.image}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, image: e.target.value })
            }
          />
          <Form.Control
            type="text"
            placeholder="Product Description"
            name="description"
            autoComplete="off"
            value={editedProduct.description}
            onChange={(e) =>
              setEditedProduct({
                ...editedProduct,
                description: e.target.value,
              })
            }
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
