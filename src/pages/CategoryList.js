import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CategoryList.css";

export default function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editedName, setEditedName] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}product/categories/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;

    try {
      await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}product/categories/${id}/`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setCategories(categories.filter((cat) => cat.id !== id));
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  const handleEdit = (id, name) => {
    setEditingId(id);
    setEditedName(name);
  };

  const handleUpdate = async (id) => {
    try {
      await axios.patch(
        `${process.env.REACT_APP_BACKEND_URL}product/categories/${id}/`,
        { name: editedName },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setEditingId(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to update category", error);
    }
  };

  return (
    <div className="category-list-container">
      <h2>Category List</h2>
      {categories.length === 0 ? (
        <p>No categories found.</p>
      ) : (
        <ul className="category-list">
          {categories.map((category) => (
            <li key={category.id} className="category-item">
              {editingId === category.id ? (
                <>
                  <input
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    className="edit-input"
                  />
                  <button onClick={() => handleUpdate(category.id)}>Save</button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <span>{category.name}</span>
                  <div className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => handleEdit(category.id, category.name)}
                    >
                      Edit
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(category.id)}
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
