// src/app/api/doctors/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/config";
import Doctor from "../../lib/models/Doctor";

// This helps ensure User model is loaded
import "../../lib/models/User";

export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const department = searchParams.get("department");

    const query = department ? { department } : {};

    // Option 1: Use populate if User model is properly registered
    const doctors = await Doctor.find(query).populate("userId", "name");

    // Option 2: Alternative approach without populate if still having issues
    /* 
    const doctors = await Doctor.find(query);
    // You'd need to handle displaying doctor information without the user name
    */

    return NextResponse.json({ doctors });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch doctors",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
