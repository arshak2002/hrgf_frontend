import React, { useState } from "react";
import axios from "axios";
import "./CreateCategory.css";

const CreateCategory = () => {
  const [name, setName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    try {
      await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}product/categories/`,
        { name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Category created successfully!");
      setName("");
    } catch (error) {
      console.error(error);
      alert("Failed to create category.");
    }
  };

  return (
    <div className="form-container">
      <h2>Create Category</h2>
      <form onSubmit={handleSubmit} className="form">
        <input
          type="text"
          name="name"
          placeholder="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button type="submit">Create Category</button>
      </form>
    </div>
  );
};

export default CreateCategory;
