// import { NextResponse } from "next/server";
// import connectMongoDB from "../../../lib/config";
// import Appointment from "../../../lib/models/Booking";
// import { verifyToken } from "../../../lib/utils/auth";

// export async function GET(request) {
//   try {
//     await connectMongoDB();

//     // Verify admin or doctor role
//     // const token = request.cookies.get("token")?.value;
//     // const decoded = verifyToken(token);

//     // if (!["admin", "doctor"].includes(decoded.role)) {
//     //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     // }

//     const { searchParams } = new URL(request.url);
//     const doctorId = searchParams.get("doctorId");
//     const date = searchParams.get("date");
//     const status = searchParams.get("status");

//     let query = {};
//     if (doctorId) query.doctorId = doctorId;
//     if (date) {
//       const startDate = new Date(date);
//       startDate.setHours(0, 0, 0, 0);
//       const endDate = new Date(startDate);
//       endDate.setDate(startDate.getDate() + 1);

//       query.date = {
//         $gte: startDate,
//         $lt: endDate,
//       };
//     }
//     if (status) query.status = status;

//     const appointments = await Appointment.find(query)
//       .populate("patientId", "name email phoneNumber")
//       .populate("doctorId", "name department")
//       .sort({ date: 1, startTime: 1 });

//     return NextResponse.json(appointments);
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connectMongoDB();

//     // Verify admin or doctor role
//     // const token = request.cookies.get("token")?.value;
//     // const decoded = verifyToken(token);

//     // if (!["admin", "doctor"].includes(decoded.role)) {
//     //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     // }

//     const {
//       patientId,
//       doctorId,
//       department,
//       date,
//       startTime,
//       endTime,
//       emergency,
//       reason,
//       notes,
//     } = await request.json();

//     // Check for overlapping appointments
//     const overlappingAppointment = await Appointment.findOne({
//       doctorId,
//       date: new Date(date),
//       $or: [
//         {
//           startTime: { $lt: endTime },
//           endTime: { $gt: startTime },
//           status: { $in: ["pending", "approved"] },
//         },
//       ],
//     });

//     if (overlappingAppointment) {
//       return NextResponse.json(
//         {
//           error: "Time slot already booked",
//           conflictingAppointment: {
//             id: overlappingAppointment._id,
//             patient: overlappingAppointment.patientId?.name,
//             time: `${overlappingAppointment.startTime}-${overlappingAppointment.endTime}`,
//           },
//         },
//         { status: 400 }
//       );
//     }

//     const newAppointment = new Appointment({
//       patientId,
//       doctorId,
//       department,
//       date: new Date(date),
//       startTime,
//       endTime,
//       emergency,
//       reason,
//       notes,
//       status: "approved", // Auto-approve if created by admin/doctor
//     });

//     await newAppointment.save();

//     return NextResponse.json(
//       {
//         message: "Appointment scheduled successfully",
//         appointment: newAppointment,
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating appointment:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/config";
import Appointment from "../../../lib/models/Booking";
import { verifyToken } from "../../../lib/utils/auth";

export async function GET(request) {
  try {
    await connectMongoDB();

    const { searchParams } = new URL(request.url);
    const doctorId = searchParams.get("doctorId");
    const date = searchParams.get("date");
    const status = searchParams.get("status");

    let query = {};
    if (doctorId) query.doctorId = doctorId;
    if (date) {
      const startDate = new Date(date);
      startDate.setUTCHours(0, 0, 0, 0);
      const endDate = new Date(startDate);
      endDate.setUTCDate(startDate.getUTCDate() + 1);

      query.date = {
        $gte: startDate,
        $lt: endDate,
      };
    }
    if (status) query.status = status;

    const appointments = await Appointment.find(query)
      .populate("patientId", "name email phoneNumber")
      .populate("doctorId", "name department")
      .sort({ date: 1, startTime: 1 });

    return NextResponse.json(appointments);
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
// export async function GET(request) {
//   try {
//     await connectMongoDB();

//     const { searchParams } = new URL(request.url);
//     const doctorId = searchParams.get("doctorId");
//     const date = searchParams.get("date");
//     const status = searchParams.get("status");

//     let query = {};
//     if (doctorId) query.doctorId = doctorId;
//     if (status) query.status = status;

//     // ✅ مقارنة التاريخ بناءً على اليوم فقط بدون الساعة
//     if (date) {
//       const dayOnly = date.split("T")[0]; // مثال: "2025-04-12"
//       query.$expr = {
//         $eq: [{ $dateToString: { format: "%Y-%m-%d", date: "$date" } }, dayOnly],
//       };
//     }

//     const appointments = await Appointment.find(query)
//       .populate("patientId", "name email phoneNumber")
//       .populate("doctorId", "name department")
//       .sort({ date: 1, startTime: 1 });

//     return NextResponse.json(appointments);
//   } catch (error) {
//     console.error("Error fetching appointments:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request) {
  try {
    await connectMongoDB();

    const {
      patientId,
      doctorId,
      department,
      date,
      startTime,
      endTime,
      emergency,
      reason,
      notes,
    } = await request.json();

    if (!patientId || !doctorId || !date || !startTime || !endTime || !reason) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const overlappingAppointment = await Appointment.findOne({
      doctorId,
      date: new Date(date),
      status: { $in: ["pending", "approved"] },
      $or: [
        {
          startTime: { $lt: endTime },
          endTime: { $gt: startTime },
        },
      ],
    });

    if (overlappingAppointment) {
      return NextResponse.json(
        {
          error: "Time slot already booked",
          conflictingAppointment: {
            id: overlappingAppointment._id,
            patient: overlappingAppointment.patientId?.name,
            time: `${overlappingAppointment.startTime}-${overlappingAppointment.endTime}`,
          },
        },
        { status: 400 }
      );
    }

    const newAppointment = new Appointment({
      patientId,
      doctorId,
      department,
      date: new Date(date),
      startTime,
      endTime,
      emergency,
      reason,
      notes,
      status: "approved", // Auto-approve if created by admin/doctor
    });

    await newAppointment.save();

    return NextResponse.json(
      {
        message: "Appointment scheduled successfully",
        appointment: newAppointment,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating appointment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
