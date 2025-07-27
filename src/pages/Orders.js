import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Orders.css";

export default function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}product/orders/`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((res) => setOrders(res.data.results))
      .catch((err) => {
        console.error("Failed to fetch orders", err);
        alert("Error fetching orders.");
      });
  }, []);

  return (
    <div className="orders-container">
      <h2>My Orders</h2>

      {orders.length === 0 ? (
        <p>You have no orders yet.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h4>Order #{order.id}</h4>
              <p>
                <small>
                  Placed on: {new Date(order.created_at).toLocaleString()}
                </small>
              </p>
              <div className="order-items">
                {order.items.map((item, index) => (
                  <div key={index} className="order-item">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="order-item-image"
                    />
                    <div>
                      <strong>{item.product.name}</strong>
                      <p>Qty: {item.quantity}</p>
                      <p>₹{item.product.price}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
