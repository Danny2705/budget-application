import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Donate() {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const cardElement = elements.getElement(CardElement);

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: cardElement ? cardElement : null,
    });

    if (error) {
      console.error("[error]", error.message);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      // You can now use the paymentMethod.id to create a payment intent on your server
    }
  };

  return (
    <div className="donate-container">
      <h1>Donate to Our Cause</h1>
      <form onSubmit={handleSubmit}>
        <CardElement />
        <button type="submit" disabled={!stripe}>
          Donate
        </button>
      </form>
    </div>
  );
}
