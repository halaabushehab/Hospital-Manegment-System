import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/config";
import User from "../../../../lib/models/User";
import { verifyToken } from "../../../../lib/utils/auth";

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
    const updateData = await request.json();

    // Remove password from update data if present
    if (updateData.password) {
      delete updateData.password;
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
    }).select("-password -googleId");

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();

    // Verify admin role
    const token = request.cookies.get("token")?.value;
    const decoded = verifyToken(token);

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
