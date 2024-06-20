import React from "react";

// chatgptpromt:i want a donate page with a button that redirects to a stripe checkout page

export default function Donate() {
  const stripeCheckoutUrl = "https://buy.stripe.com/8wM9CP6N78Fh21q5kk";

  return (
    <div className="donate-container">
      <h1>Donate to Our Cause</h1>
      <a href={stripeCheckoutUrl} target="_blank" rel="noopener noreferrer">
        <button type="button">
          Donate
        </button>
      </a>
    </div>
  );
}
