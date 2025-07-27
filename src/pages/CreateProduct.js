import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CreateProduct.css";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Load categories if API exists
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}product/categories/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setCategories(res.data))
      .catch((err) => console.error("Error loading categories:", err));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}product/products/`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      alert("Product created successfully!");
      setFormData({ name: "", description: "", price: "", category: "" });
    } catch (error) {
      console.error(error);
      alert("Failed to create product.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Product Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Product Description"
          value={formData.description}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <select name="category" value={formData.category} onChange={handleChange} required>
          <option value="">Select Category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProduct;
