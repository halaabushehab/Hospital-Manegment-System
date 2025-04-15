import { NextResponse } from "next/server";
import connectMongoDB from "../../../../../lib/config";
import User from "../../../../../lib/models/User";
import { verifyToken } from "../../../../../lib/utils/auth";

export async function PUT(request, { params }) {
  try {
    await connectMongoDB();

    // Verify admin role
    // const token = request.cookies.get("token")?.value;
    // const decoded = verifyToken(token);

    // if (decoded.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }

    const { id } = params;
    const { status } = await request.json();

    if (!["active", "suspended", "pending"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status value" },
        { status: 400 }
      );
    }

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    ).select("-password -googleId");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User status updated", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user status:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
