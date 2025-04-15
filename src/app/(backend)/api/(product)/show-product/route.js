import { NextResponse, NextRequest } from "next/server";
import dbConnect from "@/app/server/mongoConnection";
import addProduct from "@/app/server/models/addProduct";

export const GET = async (req) => {
  try {
    await addProduct();
    const products = await addProduct.find();
    if (!products) {
      return NextResponse.json({
        message: "Products are not availabe ",
        status: 402,
      });
    }
    return NextResponse.json({
      message: "Products are available",
      status: 200,
      data: products,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Inavlid Server Error",
      status: 500,
    });
  }
};
