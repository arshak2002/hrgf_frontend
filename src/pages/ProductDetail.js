import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import "./ProductDetail.css";

export default function ProductDetail() {
    const { id } = useParams(); // get product id from URL
    const navigate = useNavigate();
    const [product, setProduct] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [cardComplete, setCardComplete] = useState(false);
    const [loading, setLoading] = useState(false);
    const stripe = useStripe();
    const elements = useElements();

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BACKEND_URL}product/products/${id}/`)
            .then((res) => setProduct(res.data));
    }, [id]);

    const handleBuyNow = async () => {
        if (!stripe || !elements) {
            alert("Stripe not initialized");
            return;
        }

        setLoading(true);

        const cardElement = elements.getElement(CardElement);
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: "card",
            card: cardElement,
        });

        if (error) {
            console.error("Stripe error:", error);
            alert(error.message);
            setLoading(false);
            return;
        }

        const payload = {
            payment_method_id: paymentMethod.id,
            items: [
                {
                    product: product.id,
                    quantity: 1,
                },
            ],
        };

        axios
            .post(`${process.env.REACT_APP_BACKEND_URL}product/orders/place-order/`, payload, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            })
            .then((res) => {
                alert("Order placed successfully!");
            })
            .catch((err) => {
                console.error("Order failed", err.response?.data || err.message);
                alert("Failed to place order.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    if (!product) return <p>Loading product...</p>;

    return (
        <div className="product-detail-container">
          <div className="product-wrapper">
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-content">
              <h2 className="product-title">{product.name}</h2>
              <p className="product-description">{product.description}</p>
              <h4 className="product-price">Price: ₹{product.price}</h4>
      
              <h4 className="card-section-title">Enter Card Details</h4>
              <div className="card-input-box">
                <CardElement
                  onChange={(e) => setCardComplete(e.complete)}
                  options={{ style: { base: { fontSize: "16px" } } }}
                />
              </div>
      
              <button
                onClick={handleBuyNow}
                disabled={!cardComplete || loading}
                className="buy-button"
              >
                {loading ? "Placing Order..." : "Buy Now"}
              </button>
            </div>
          </div>
        </div>
      );
      
}
