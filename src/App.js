// App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Navbar from "./components/Navbar";
import Orders from "./pages/Orders";
import ProductDetail from "./pages/ProductDetail";
import Profile from "./pages/Profile";
import CreateProduct from "./pages/CreateProduct";
import CreateProductCategory from "./pages/CreateProductCategory";
import AdminRoute from "./components/AdminRoute";
import ProductList from "./pages/ProductList";
import EditProduct from "./pages/EditProduct";
import CategoryList from "./pages/CategoryList";
import AdminOrderList from "./pages/AllOrders"

const stripePromise = loadStripe("pk_test_51RokSJDAcUfEF0K8LLeeterLaibJr0sOWY6a4uN8ZlCf3kRWmLkotXO15XT40DiPgDUuheViwXYhMyKsyDMmn7zK00M6V5r5tL");

function App() {
  return (
    <Elements stripe={stripePromise}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          
          {/* ✅ Admin Only Routes */}
          <Route path="/admin/create-product" element={<CreateProduct />} />
          <Route path="/admin/create-category" element={<CreateProductCategory />} />
          <Route path="/admin/products" element={<ProductList />} />
          <Route path="/edit-product/:id" element={<EditProduct />} /> 
          <Route path="/admin/categories" element={<CategoryList />} /> 
          <Route path="/admin/all-orders" element={<AdminOrderList />} /> 
        </Routes>
      </Router>
    </Elements>
  );
}

export default App;
