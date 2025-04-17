"use client";
import Checkout from "@/components/Checkout";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Loader from "../(loader)/page";

if (process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY === undefined) {
  throw new Error("NEXT_PUBLIC_STRIPE_PUBLIC_KEY is not defined");
}

const Home = () => {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    setLoading(true);
    const fetchRecord = async () => {
      const resp = await axios.get(`/api/show-single?id=${id}`);
      console.log(resp);

      setAmount(resp.data.data);
      setLoading(false);
    };
    fetchRecord();
  }, [id]);

  const [secret, setSecret] = useState("");
  const [message, setMessage] = useState("");

  const stripePK = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY;

  useEffect(() => {
    const fetchPaymentIntent = async () => {
      if (!amount) return;

      try {
        const response = await axios(
          `http://localhost:3002/api/create-payment-intent`,
          {
            method: "POST",
            data: {
              amount,
            },
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        setSecret(await response.data.clientSecret);
        setMessage(await response.data.message);
      } catch (error) {
        console.error("Error creating payment intent:", error);
        setMessage("Failed to create payment intent.");
      }
    };

    fetchPaymentIntent();
  }, [amount]);

  if (loading) {
    return <Loader />;
  }

  if (!amount) {
    return <h1>Amount not found!</h1>;
  }

  return (
    <>
      <Checkout
        amount={amount}
        secret={secret}
        stripePK={stripePK}
        jsonData={""}
        message={message}
      />
    </>
  );
};

export default Home;
