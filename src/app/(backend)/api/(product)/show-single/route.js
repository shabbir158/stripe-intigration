import { NextResponse } from "next/server";
import dbConnect from "@/app/server/mongoConnection";
import addProduct from "@/app/server/models/addProduct";

export const GET = async (req) => {
  try {
    await dbConnect();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    console.log("id", id);

    const product = await addProduct.findById(id);

    if (!product || !product.price) {
      return NextResponse.json({
        message: "Product is not available",
        status: 402,
      });
    }

    return NextResponse.json({
      message: "Product is available",
      status: 200,
      data: product.price,
    });
  } catch (error) {
    console.error("Server Error:", error);
    return NextResponse.json({
      message: "Invalid Server Error",
      status: 500,
    });
  }
};
