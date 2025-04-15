// app/api/auth/me/route.js
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import connectMongoDB from "../../../lib/config";
import User from "../../../lib/models/User";

export async function GET(request) {
  try {
    // Get token from cookies
    const cookieHeader = request.headers.get("cookie");
    if (!cookieHeader) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const tokenCookie = cookieHeader
      .split("; ")
      .find((cookie) => cookie.startsWith("token="));
    if (!tokenCookie) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const token = tokenCookie.split("=")[1];
    if (!token) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Get user from database
    await connectMongoDB();
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      userId: user._id,
      email: user.email,
      role: user.role,
    });
  } catch (error) {
    console.error("Error in auth/me route:", error);
    if (
      error.name === "JsonWebTokenError" ||
      error.name === "TokenExpiredError"
    ) {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
