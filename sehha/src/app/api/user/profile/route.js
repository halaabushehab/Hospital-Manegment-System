import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/config";
import User from "../../../lib/models/User";
import Appointment from "../../../lib/models/Appointment";
import { extractUserIdFromToken } from "../../../lib/utils/auth";

export async function GET(request) {
  try {
    await connectMongoDB();

    // Extract logged-in user's ID from JWT
    const userId = extractUserIdFromToken(request);

    // Fetch user profile
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Fetch all appointments for this user using "userId"
    const appointments = await Appointment.find({ userId });

    // Merge appointments into user object
    const userObj = user.toObject();
    userObj.appointments = appointments;

    console.log("Fetched user from DB:", userObj);
    console.log("Fetched appointments:", appointments);

    return NextResponse.json(userObj);
  } catch (error) {
    console.error("Error fetching user data and appointments:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectMongoDB();

    // Extract user ID from JWT
    const userId = extractUserIdFromToken(request);

    // Parse updated data
    const updatedData = await request.json();

    const updatedUser = await User.findByIdAndUpdate(userId, updatedData, {
      new: true,
    });

    if (!updatedUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    return NextResponse.json(updatedUser);
  } catch (error) {
    console.error("Error updating user data:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
