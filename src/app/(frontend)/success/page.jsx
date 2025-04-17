"use client";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter, useParams } from "next/navigation";

export default function Success() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [paymentData, setPaymentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const paymentIntentId = searchParams.get("payment_intent");

  const fetchPaymentDetails = async () => {
    try {
      const res = await fetch(
        `http://localhost:3002/api/retrieve-payment-intent?id=${paymentIntentId}`
      );
      if (!res.ok) {
        throw new Error("Failed to fetch payment details");
      }
      const data = await res.json();
      setPaymentData(data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (paymentIntentId) {
      fetchPaymentDetails();
    }
  }, [paymentIntentId]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 max-w-md w-full text-center">
        {loading ? (
          <p className="text-gray-600">Loading payment details...</p>
        ) : paymentData ? (
          <>
            <div className="flex justify-center mb-6">
              <div className="bg-green-100 p-4 rounded-full">
                <svg
                  className="w-10 h-10 text-green-500 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <h1 className="text-2xl font-semibold text-green-600">
              Payment Successful!
            </h1>
            <p className="text-gray-700 mt-2">Thank you for your payment</p>
            <div className="mt-6 text-left">
              <p className="text-sm text-gray-500">Transaction ID:</p>
              <p className="font-medium break-all text-green-800">
                {paymentData.id}
              </p>

              <p className="text-sm text-gray-500 mt-4">Amount Paid:</p>
              <p className="font-medium text-lg text-green-700">
                ${(paymentData.amount / 100).toFixed(2)}
              </p>

              <p className="text-sm text-gray-500 mt-4">Status:</p>
              <p className="font-medium capitalize text-green-700">
                {paymentData.status}
              </p>
            </div>

            <button
              onClick={() => router.push("/buy")}
              className="mt-6 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-6 rounded-lg transition duration-300"
            >
              Go to Home
            </button>
          </>
        ) : (
          <p className="text-red-500">Unable to retrieve payment details.</p>
        )}
      </div>
    </div>
  );
}
