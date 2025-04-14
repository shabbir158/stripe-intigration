import mongoose from "mongoose";

const PaymetProductSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    paymentIntentId: String,
  },
  { timestamps: true }
);

export default mongoose.models.PaymetProduct ||
  mongoose.model("PaymetProduct", PaymetProductSchema);
