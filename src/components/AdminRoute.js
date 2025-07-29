// components/AdminRoute.js
import { Navigate, Outlet } from "react-router-dom";

export default function AdminRoute() {
  const isAuthenticated = !!localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin") === "true";

  return isAuthenticated && isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
}
