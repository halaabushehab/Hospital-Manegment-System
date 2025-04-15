// src/app/api/animal-products/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/config";
import AnimalProduct from "../../lib/models/AnimalProduct";

export async function GET(request) {
    try {
      console.log("Starting /api/animal-products request...");
  
      // Ensure MongoDB connection
      await connectMongoDB();
      console.log("MongoDB connection established");
  
      // Extract query parameters
      const { searchParams } = new URL(request.url);
      const category = searchParams.get("category") || "all";
      const search = searchParams.get("search") || ""; // New search parameter
      const page = parseInt(searchParams.get("page")) || 1;
      const limit = 6;
      console.log(`Query parameters: category=${category}, search=${search}, page=${page}, limit=${limit}`);
  
      // Build the query
      const query = {};
      if (category && category !== "all") {
        query.category = category;
      }
      if (search) {
        query.name = { $regex: search, $options: "i" }; // Case-insensitive search by name
      }
      console.log("Query:", query);
  
      // Calculate skip for pagination
      const skip = (page - 1) * limit;
      console.log(`Pagination: skip=${skip}, limit=${limit}`);
  
      // Fetch products with pagination, filtering, and search
      console.log("Fetching products from database...");
      const products = await AnimalProduct.find(query)
        .skip(skip)
        .limit(limit)
        .lean();
      console.log("Fetched products:", products);
  
      // Get the total number of products for pagination metadata
      console.log("Counting total products...");
      const totalProducts = await AnimalProduct.countDocuments(query);
      console.log("Total products:", totalProducts);
  
      const totalPages = Math.ceil(totalProducts / limit);
      console.log("Total pages:", totalPages);
  
      // If the request includes a "getCategories" parameter, return categories
      const getCategories = searchParams.get("getCategories");
      if (getCategories) {
        console.log("Fetching distinct categories...");
        const categories = await AnimalProduct.distinct("category");
        console.log("Categories:", categories);
        return NextResponse.json(["all", ...categories], { status: 200 });
      }
  
      return NextResponse.json(
        {
          products: products || [],
          pagination: {
            currentPage: page,
            totalPages: totalPages || 1,
            totalProducts: totalProducts || 0,
            productsPerPage: limit,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      console.error("Error in /api/animal-products:", error.message);
      console.error("Stack trace:", error.stack);
      return NextResponse.json(
        {
          error: "Failed to fetch products",
          details: error.message,
          stack: error.stack,
        },
        { status: 500 }
      );
    }
  }