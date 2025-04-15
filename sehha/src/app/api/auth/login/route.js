import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import connectMongoDB from "../../../lib/config";
import User from "../../../lib/models/User"; // Adjust the import path as necessary
import { cookies } from "next/headers";
export async function POST(request) {
  try {
    await connectMongoDB();

    const { email, password } = await request.json();
    if (!email || !password) {
      return NextResponse.json(
        { error: "Missing email or password" },
        { status: 400 }
      );
    }

    // 1. Find user
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    // 3. Generate JWT
    const payload = {
      userId: user._id,
      role: user.role,
    };
    // Adjust expiresIn as needed (e.g., '1h' or '7d')
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // 4. Set cookie
    // NextResponse allows setting cookies like this:
    const response = NextResponse.json(
      {
        message: "Login successful",
        user: { email: user.email, role: user.role },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60, // 1 hour in seconds
      // sameSite: "strict" // optionally set sameSite
    });

    return response;
  } catch (error) {
    console.error("Error in login route:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
