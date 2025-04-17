import { Stripe } from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined.");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-04-10",
});

export const POST = async (req) => {
  try {
    const { amount } = await req.json();

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "USD",
      automatic_payment_methods: { enabled: true },
    });

    return Response.json({
      clientSecret: paymentIntent.client_secret,
      message: "Amount Succesfully sent ",
    });
  } catch (error) {
    console.error("Internal Error:", error);

    return Response.json(
      { error: `Internal Server Error: ${error}` },
      { status: 500 }
    );
  }
};
