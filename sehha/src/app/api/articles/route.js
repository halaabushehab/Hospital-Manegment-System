// src/app/api/articles/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/config";
import Article from "../../lib/models/Article";

export async function GET() {
  try {
    await connectMongoDB();
    const articles = await Article.find(); // fetch all
    console.log("Fetched articles from DB:", articles);

    return NextResponse.json(articles, { status: 200 });
  } catch (error) {
    console.error("Error fetching articles:", error);
    return NextResponse.json(
      { error: "Failed to fetch articles", details: error.message },
      { status: 500 }
    );
  }
}
