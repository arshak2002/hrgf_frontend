// components/AdminRoute.js
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin") === "true";

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
