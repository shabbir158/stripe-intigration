"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
  Elements,
} from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

export default function Checkout({ amount, secret, stripePK, message }) {
  const stripePromise = loadStripe(stripePK);
  const clientSecret = secret;

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div>
      {stripePromise && clientSecret && (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret: clientSecret,
            // mode : "payment",
            // amount : amount,
            // currency : "usd"
          }}
        >
          <CheckoutForm amount={amount} />
        </Elements>
      )}
    </div>
  );
}
