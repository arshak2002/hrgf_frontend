import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin") === "true";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("admin"); // optional: clear admin flag
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <Link to="/">Home</Link>

      {!isAuthenticated ? (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </>
      ) : (
        <>
          <Link to="/cart">Cart</Link>
          <Link to="/orders">Orders</Link>
          <Link to="/profile">Profile</Link>

          {isAdmin && (
            <>
              <Link to="/admin/create-product">Create Product</Link>
              <Link to="/admin/create-category">Create Category</Link>
            </>
          )}

          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        </>
      )}
    </nav>
  );
}
