import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/app/server/mongoConnection";
import addProduct from "@/app/server/models/addProduct";
export const POST = async (req) => {
  try {
    await dbConnect();
    const { title, description, price } = await req.json();

    console.log("title is ", title);

    const addData = new addProduct({
      title: title,
      description: description,
      price: price,
    });
    await addData.save();
    return NextResponse.json({
      message: "Data Saved",
      data: addData,
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Invalid Server Error ",
      error,
    });
  }
};
