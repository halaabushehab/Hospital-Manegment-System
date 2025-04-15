// src/app/api/user/appointments/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/config";
import Appointment from "../../../lib/models/Appointment"; // Adjust the import path as necessary
import { extractUserIdFromToken } from "../../../lib/utils/auth"; // Adjust the import path as necessary

export async function GET(request) {
  try {
    await connectMongoDB();

    // Extract patientId from the JWT token (the patient is the logged‑in user)
    const patientId = extractUserIdFromToken(request);

    // Find appointments for this patientId
    const appointments = await Appointment.find({ patientId });

    return NextResponse.json({ success: true, appointments });
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch appointments",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
