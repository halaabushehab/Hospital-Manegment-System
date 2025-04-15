// // src/app/api/appointments/route.js - With simulation support
// import { NextResponse } from "next/server";
// import connectDB from "../../lib/mongodb";
// import Appointment from "../../lib/models/Booking";

// export async function POST(request) {
//   try {
//     // Enable simulation mode for testing without a live MongoDB
//     const SIMULATION_MODE = process.env.SIMULATION_MODE === "true";

//     if (!SIMULATION_MODE) {
//       await connectDB();
//     }

//     const data = await request.json();

//     // Validate required fields
//     const requiredFields = [
//       "patientId",
//       "doctorId",
//       "department",
//       "date",
//       "startTime",
//       "endTime",
//       "reason",
//     ];
//     for (const field of requiredFields) {
//       if (!data[field]) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: `Missing required field: ${field}`,
//           },
//           { status: 400 }
//         );
//       }
//     }

//     // In simulation mode, we just pretend to save
//     if (SIMULATION_MODE) {
//       // Add generated ID and created date to simulate DB
//       const simulatedAppointment = {
//         ...data,
//         _id: Math.random().toString(36).substring(2, 15),
//         createdAt: new Date().toISOString(),
//         status: "pending",
//       };

//       return NextResponse.json(
//         {
//           success: true,
//           message: "Appointment created successfully (simulation mode)",
//           appointment: simulatedAppointment,
//         },
//         { status: 201 }
//       );
//     }

//     // Real database save
//     const appointment = new Appointment(data);
//     await appointment.save();

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Appointment created successfully",
//         appointment,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating appointment:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to create appointment",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }
// import mongoose from "mongoose";
// import { NextResponse } from "next/server";
// import connectMongoDB from "../../lib/config";
// import Appointment from "../../lib/models/Booking";

// export async function POST(request) {
//   try {
//     await connectMongoDB(); // Connect to MongoDB

//     const data = await request.json();

//     // Validate required fields
//     const requiredFields = [
//       "patientId",
//       "doctorId",
//       "department",
//       "date",
//       "startTime",
//       "endTime",
//       "reason",
//     ];

//     for (const field of requiredFields) {
//       if (!data[field]) {
//         return NextResponse.json(
//           {
//             success: false,
//             message: `Missing required field: ${field}`,
//           },
//           { status: 400 }
//         );
//       }
//     }

//     // Validate and convert doctorId to ObjectId
//     if (!mongoose.Types.ObjectId.isValid(data.doctorId)) {
//       return NextResponse.json(
//         {
//           success: false,
//           message: "Invalid doctorId format",
//         },
//         { status: 400 }
//       );
//     }

//     // Convert doctorId to ObjectId
//     data.doctorId = mongoose.Types.ObjectId(data.doctorId);

//     // Create a new appointment
//     const appointment = new Appointment(data);
//     await appointment.save();

//     return NextResponse.json(
//       {
//         success: true,
//         message: "Appointment created successfully",
//         appointment,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating appointment:", error);
//     return NextResponse.json(
//       {
//         success: false,
//         message: "Failed to create appointment",
//         error: error.message,
//       },
//       { status: 500 }
//     );
//   }
// }

// // src/app/api/appointments/route.js
// import { NextResponse } from "next/server";
// import connectMongoDB from "../../lib/config";
// import Appointment from "../../lib/models/Appointment";

// export async function POST(request) {
//   try {
//     await connectMongoDB();

//     // Parse the request body
//     const data = await request.json();

//     // Validate required fields
//     const requiredFields = ['doctorId', 'department', 'date', 'startTime', 'endTime', 'reason'];
//     for (const field of requiredFields) {
//       if (!data[field]) {
//         return NextResponse.json(
//           { success: false, message: `Missing required field: ${field}` },
//           { status: 400 }
//         );
//       }
//     }

//     // Create a new appointment
//     const appointment = await Appointment.create({
//       patientId: data.patientId, // Assuming patientId is passed in the request body
//       doctorId: data.doctorId,
//       department: data.department,
//       date: new Date(data.date),
//       startTime: data.startTime,
//       endTime: data.endTime,
//       reason: data.reason,
//       notes: data.notes || "",
//       emergency: data.emergency || false,
//     });

//     return NextResponse.json({
//       success: true,
//       message: "Appointment booked successfully",
//       appointment
//     }, { status: 201 });

//   } catch (error) {
//     console.error("Error booking appointment:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to book appointment", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// // Optional: Add a GET endpoint to retrieve appointments
// export async function GET(request) {
//   try {
//     await connectMongoDB();

//     const { searchParams } = new URL(request.url);
//     const status = searchParams.get("status");

//     // Build query based on provided patientId or doctorId in the request
//     const patientId = searchParams.get("patientId");
//     const doctorId = searchParams.get("doctorId");

//     const query = {};
//     if (patientId) query.patientId = patientId;
//     if (doctorId) query.doctorId = doctorId;

//     // Add status filter if provided
//     if (status) {
//       query.status = status;
//     }

//     // Get appointments and populate related information
//     const appointments = await Appointment.find(query)
//       .populate("doctorId", "userId")
//       .populate({
//         path: "doctorId",
//         populate: {
//           path: "userId",
//           select: "name"
//         }
//       })
//       .sort({ date: 1, startTime: 1 });

//     return NextResponse.json({ success: true, appointments });

//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     return NextResponse.json(
//       { success: false, message: "Failed to fetch appointments", error: error.message },
//       { status: 500 }
//     );
//   }
// }

// src/app/api/appointments/route.js
import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/config";
import Appointment from "../../lib/models/Appointment";
import { extractUserIdFromToken } from "../../lib/utils/auth";

// src/app/api/appointments/route.js - Updated POST function
export async function POST(request) {
  try {
    await connectMongoDB();

    // Extract user ID from authentication token
    try {
      const userId = extractUserIdFromToken(request);

      // Parse the request body
      const data = await request.json();

      // Validate required fields
      const requiredFields = [
        "doctorId",
        "department",
        "date",
        "startTime",
        "endTime",
        "reason",
      ];
      for (const field of requiredFields) {
        if (!data[field]) {
          return NextResponse.json(
            { success: false, message: `Missing required field: ${field}` },
            { status: 400 }
          );
        }
      }

      // Create a new appointment with patientId from auth token
      const appointment = await Appointment.create({
        patientId: userId, // Use the authenticated user's ID from token
        doctorId: data.doctorId,
        department: data.department,
        date: new Date(data.date),
        startTime: data.startTime,
        endTime: data.endTime,
        reason: data.reason,
        notes: data.notes || "",
        emergency: data.emergency || false,
        // Remove the status field if it's not included in the request
        // Let Mongoose use the default value from your schema
      });

      return NextResponse.json(
        {
          success: true,
          message: "Appointment booked successfully",
          appointment,
        },
        { status: 201 }
      );
    } catch (authError) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required: " + authError.message,
        },
        { status: 401 }
      );
    }
  } catch (error) {
    console.error("Error booking appointment:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Failed to book appointment",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

// Optional: Add a GET endpoint to retrieve appointments
export async function GET(request) {
  try {
    await connectMongoDB();

    try {
      // Get authenticated user ID
      const userId = extractUserIdFromToken(request);

      const { searchParams } = new URL(request.url);
      const status = searchParams.get("status");

      // Check if query is for doctor's appointments
      const doctorId = searchParams.get("doctorId");

      const query = {};

      // If doctorId is specified, filter by doctor
      // Otherwise use the authenticated user's ID as patientId
      if (doctorId) {
        query.doctorId = doctorId;
      } else {
        // By default, users see their own appointments as patients
        query.patientId = userId;
      }

      // Add status filter if provided
      if (status) {
        query.status = status;
      }

      // Get appointments and populate related information
      const appointments = await Appointment.find(query)
        .populate("doctorId", "userId")
        .populate({
          path: "doctorId",
          populate: {
            path: "userId",
            select: "name",
          },
        })
        .sort({ date: 1, startTime: 1 });

      return NextResponse.json({ success: true, appointments });
    } catch (authError) {
      return NextResponse.json(
        {
          success: false,
          message: "Authentication required: " + authError.message,
        },
        { status: 401 }
      );
    }
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
