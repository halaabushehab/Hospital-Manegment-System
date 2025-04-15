// src/app/api/animal-products/[id]/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/config";
import AnimalProduct from "../../../lib/models/AnimalProduct"; // Import the model

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    const product = await AnimalProduct.findById(params.id);
    if (!product) {
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }
    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json({ error: "Failed to fetch product", details: error.message }, { status: 500 });
  }
}