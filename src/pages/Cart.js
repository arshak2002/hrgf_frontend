// Cart.js
import { useEffect, useState } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./Cart.css";

export default function Cart() {
  const [items, setItems] = useState([]);
  const [cardComplete, setCardComplete] = useState(false);
  const stripe = useStripe();
  const elements = useElements();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = () => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}product/cart/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => setItems(res.data.results))
      .catch((err) => {
        console.error("Error fetching cart:", err);
        alert("Failed to load cart.");
      });
  };

  const handleBuy = async (selectedItems) => {
    if (!stripe || !elements) {
      alert("Stripe not initialized");
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      console.error("Stripe error:", error);
      alert(error.message);
      return;
    }

    const payload = {
      payment_method_id: paymentMethod.id,
      items: selectedItems.map((item) => ({
        product: item.product.id,
        quantity: item.quantity,
      })),
    };

    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}product/orders/place-order/`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((res) => {
        alert("Order placed!");
        fetchCart(); // reload cart
      })
      .catch((err) => {
        console.error("Order failed", err.response?.data || err.message);
        alert("Failed to place order.");
      });
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">My Cart</h2>

      {items.length === 0 ? (
        <p>No items in cart.</p>
      ) : (
        <div className="cart-grid">
          {items.map((item) => (
            <div key={item.id} className="cart-item-card">
              <h4>{item.product.name}</h4>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.product.price}</p>

              <div style={{ display: "flex", gap: "10px" }}>
                <button className="remove-button" onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
                <button className="checkout-button" onClick={() => handleBuy([item])}>
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {items.length > 0 && (
        <div>
          <h4 style={{ marginTop: "2rem" }}>Enter Card Details</h4>
          <div style={{ border: "1px solid #ccc", padding: "10px", marginBottom: "1rem" }}>
            <CardElement
              onChange={(e) => setCardComplete(e.complete)}
              options={{ style: { base: { fontSize: "16px" } } }}
            />
          </div>

          <button
            className="checkout-button"
            disabled={!cardComplete}
            onClick={() => handleBuy(items)}
          >
            Buy All
          </button>
        </div>
      )}
    </div>
  );

  function handleRemove(id) {
    axios
      .delete(`${process.env.REACT_APP_BACKEND_URL}product/cart/${id}/`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then(() => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== id));
      })
      .catch((err) => {
        console.error("Failed to delete item from cart", err);
        alert("Failed to remove item. Try again.");
      });
  }
}
