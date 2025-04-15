import mongoose from "mongoose";

const AddProductSchema = new mongoose.Schema(
  {
    id: String,
    title: String,
    price: String,
    description: String,
  },
  { timestamps: true }
);

export default mongoose.models.addProduct ||
  mongoose.model("addProduct", AddProductSchema);
