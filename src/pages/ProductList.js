import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ProductList.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}product/products/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setProducts(res.data.results))
      .catch((err) => console.error("Failed to fetch products:", err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`${process.env.REACT_APP_BACKEND_URL}product/products/${id}/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      alert("Product deleted successfully!");
      fetchProducts(); // Refresh product list
    } catch (error) {
      console.error("Delete failed:", error);
      alert("Failed to delete product.");
    }
  };

  return (
    <div className="product-list-container">
      <h2>All Products</h2>
      <table className="product-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Price (₹)</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((prod) => (
            <tr key={prod.id}>
              <td>{prod.name}</td>
              <td>{prod.description}</td>
              <td>{prod.price}</td>
              <td>{prod.category_name || "-"}</td>
              <td>
                <button onClick={() => navigate(`/edit-product/${prod.id}`)}>Edit</button>
                <button onClick={() => handleDelete(prod.id)} className="delete-btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
