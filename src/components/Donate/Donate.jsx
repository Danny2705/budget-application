import React from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

export default function Donate() {
  const stripe = useStripe();
  const elements = useElements();

  // reference: https://docs.stripe.com/api and gpt: how do i encourpurate a payment method with stripe

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
