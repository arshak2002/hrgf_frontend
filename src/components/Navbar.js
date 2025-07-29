import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("admin");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      {!isAuthenticated ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : isAdmin ? (
        // Admin-only menu
        <>
          <Link to="/admin/create-product">Create Product</Link>
          <Link to="/admin/create-category">Create Category</Link>
          <Link to="/admin/products">Manage Products</Link>
          <Link to="/admin/categories">Manage Categories</Link>
          <Link to="/admin/all-orders">All Orders</Link>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </>
      ) : (
        // Non-admin menu
        <>
          <Link to="/">Home</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/profile">Profile</Link>
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
