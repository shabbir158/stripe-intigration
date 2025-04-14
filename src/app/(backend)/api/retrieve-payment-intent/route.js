import Stripe from "stripe";
import { NextResponse } from "next/server";
import PaymetProduct from "@/app/server/models/PaymetProduct.js";
import dbConnect from "@/app/server/mongoConnection";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "PaymentIntent ID is required" });
    }
    const paymentIntent = await stripe.paymentIntents.retrieve(id);

    if (!paymentIntent) {
      return NextResponse.json({ error: "PaymentIntent not found" });
    }
    await dbConnect();

    const newProduct = await PaymetProduct.create({
      title: paymentIntent.description || "No title",
      price: paymentIntent.amount / 100,
      paymentIntentId: paymentIntent.id,
    });
    await newProduct.save();
    return NextResponse.json({
      message: "Data of Payment",
      id: paymentIntent.id,
      amount: paymentIntent.amount,
      data: newProduct,
      status: paymentIntent.status,
    });
  } catch (error) {
    return NextResponse.json({ error: error.message });
  }
}
