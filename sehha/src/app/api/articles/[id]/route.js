// src/app/api/articles/[id]/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "@/app/lib/config";
import Article from "@/app/lib/models/Article";

export async function GET(request, { params }) {
  try {
    await connectMongoDB();

    const { id } = params; // dynamic route param
    const article = await Article.findById(id);

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 });
    }

    return NextResponse.json(article, { status: 200 });
  } catch (error) {
    console.error("Error fetching article:", error);
    return NextResponse.json(
      { error: "Failed to fetch article", details: error.message },
      { status: 500 }
    );
  }
}
