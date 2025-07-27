import React from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../components/CheckoutForm";

// Your Stripe public key
const stripePromise = loadStripe("pk_test_51RokSJDAcUfEF0K8LLeeterLaibJr0sOWY6a4uN8ZlCf3kRWmLkotXO15XT40DiPgDUuheViwXYhMyKsyDMmn7zK00M6V5r5tL");

export default function CheckoutPage() {
  const cartItems = [
    { product: 2, quantity: 1 }, // example: replace with actual cart
  ];

  return (
    <div>
      <h2>Checkout</h2>
      <Elements stripe={stripePromise}>
        <CheckoutForm items={cartItems} />
      </Elements>
    </div>
  );
}
