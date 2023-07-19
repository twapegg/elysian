import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";

export default function ProductDashboardItem({ product }) {
  const [productData, setProductData] = useState({
    _id: product._id,
    brand: product.brand,
    name: product.name,
    color: product.color,
    price: product.price.toLocaleString(),
    available: product.available,
  });

  const [editedProduct, setEditedProduct] = useState({
    _id: product._id,
    brand: product.brand,
    name: product.name,
    color: product.color,
    price: product.price,
    image: product.image,
  });

  const [showModal, setShowModal] = useState(false);

  const handleModal = () => setShowModal(!showModal);

  const handleArchiveProduct = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/products/archive/${productData._id}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProductData({
          ...productData,
          available: false,
        });
      });
  };

  const handleActivateProduct = () => {
    fetch(
      `${process.env.REACT_APP_API_URL}/products/activate/${productData._id}/`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((response) => response.json())
      .then((data) => {
        setProductData({
          ...productData,
          available: true,
        });
      });
  };

  const handleUpdateProduct = () => {
    fetch(`${process.env.REACT_APP_API_URL}/products/${editedProduct._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        brand: editedProduct.brand,
        name: editedProduct.name,
        color: editedProduct.color,
        price: editedProduct.price,
        image: editedProduct.image,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setProductData({
          ...productData,
          brand: editedProduct.brand,
          name: editedProduct.name,
          color: editedProduct.color,
          price: editedProduct.price,
          image: editedProduct.image,
        });
        handleModal();
      });
  };

  return (
    <>
      <td>
        {productData.brand} {productData.name}
      </td>
      <td>
        {productData.color === null
          ? "N/A"
          : productData.color.toLocaleString()}
      </td>
      <td> ${productData.price}</td>
      <td>{productData.available ? "Yes" : "No"}</td>
      <td className="text-center">
        {productData.available === true ? (
          <Button variant="warning" onClick={() => handleArchiveProduct()}>
            Archive
          </Button>
        ) : (
          <Button variant="success" onClick={() => handleActivateProduct()}>
            Unarchive
          </Button>
        )}
      </td>
      <td>
        <Button variant="secondary" onClick={() => handleModal()}>
          Edit
        </Button>
      </td>

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
            placeholder="Product Color"
            name="color"
            autoComplete="off"
            value={editedProduct.color}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, color: e.target.value })
            }
          />
          <Form.Control
            type="text"
            placeholder="Product Price"
            name="price"
            autoComplete="off"
            value={editedProduct.price}
            onChange={(e) =>
              setEditedProduct({ ...editedProduct, price: e.target.value })
            }
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateProduct}>
            Update Product
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
