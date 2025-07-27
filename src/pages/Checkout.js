// src/components/CheckoutForm.js

import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import axios from "axios";

function CheckoutForm({ items }) {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement,
    });

    if (error) {
      alert(error.message);
      return;
    }

    const response = await axios.post(
      `${process.env.REACT_APP_BACKEND_URL}product/place-order/`,
      {
        payment_method_id: paymentMethod.id,
        items: items, // array: [{ product: 1, quantity: 2 }]
      },
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );

    if (response.status === 201) {
      alert("Order placed successfully");
    } else {
      alert("Payment failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement />
      <button type="submit" disabled={!stripe}>
        Pay
      </button>
    </form>
  );
}

export default CheckoutForm;
