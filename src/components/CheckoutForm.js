"use client";

import {
  useElements,
  useStripe,
  PaymentElement,
} from "@stripe/react-stripe-js";
import React, { useState, useEffect } from "react";

export default function CheckoutForm({ amount }) {
  const stripe = useStripe();
  const elements = useElements();

  const [errorMessage, setErrorMessage] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }
    setIsLoading(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `http://localhost:3002/success`,
      },
    });

    if (error) {
      console.log("I am the error when comfirmPayment       ", error);
      setErrorMessage(error.message);
    } else {
      setErrorMessage("Done");
    }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
      {/* {clientSecret && <PaymentElement /> } */}

      <PaymentElement />

      {/* { errorMessage && <div> {errorMessage} </div> } */}

      <button
        disabled={!stripe || isLoading}
        className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
      >
        {!isLoading ? `Pay $${amount}` : "Processing..."}
      </button>
    </form>
  );
}
