import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/config";
import Appointment from "../../lib/models/Appointment";
import PatientRecord from "../../lib/models/PatientRecord";
import { verifyToken } from "../../lib/utils/auth";

export async function GET(request) {
  try {
    await connectMongoDB();

    // Verify admin role
    const token = request.cookies.get("token")?.value;
    const decoded = verifyToken(token);

    if (decoded.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const timeRange = searchParams.get("range") || "monthly"; // weekly, monthly, yearly
    const startDate = searchParams.get("start");
    const endDate = searchParams.get("end");

    // Calculate date ranges
    let dateFilter = {};
    const now = new Date();

    if (startDate && endDate) {
      dateFilter = {
        date: {
          $gte: new Date(startDate),
          $lte: new Date(endDate),
        },
      };
    } else {
      switch (timeRange) {
        case "weekly":
          dateFilter = {
            date: {
              $gte: new Date(now.setDate(now.getDate() - 7)),
              $lte: new Date(),
            },
          };
          break;
        case "yearly":
          dateFilter = {
            date: {
              $gte: new Date(now.getFullYear(), 0, 1),
              $lte: new Date(),
            },
          };
          break;
        default: // monthly
          dateFilter = {
            date: {
              $gte: new Date(now.getFullYear(), now.getMonth(), 1),
              $lte: new Date(),
            },
          };
      }
    }

    // Get appointment statistics
    const appointments = await Appointment.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
          },
          count: { $sum: 1 },
          completed: {
            $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
          },
          cancelled: {
            $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
          },
          revenue: { $sum: "$fee" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Get patient visit statistics
    const patientVisits = await PatientRecord.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: {
            year: { $year: "$date" },
            month: { $month: "$date" },
            day: { $dayOfMonth: "$date" },
          },
          count: { $sum: 1 },
          uniquePatients: { $addToSet: "$patient" },
        },
      },
      {
        $project: {
          count: 1,
          uniquePatientCount: { $size: "$uniquePatients" },
        },
      },
      { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    ]);

    // Get appointments by department
    const appointmentsByDepartment = await Appointment.aggregate([
      { $match: dateFilter },
      {
        $group: {
          _id: "$department",
          count: { $sum: 1 },
        },
      },
      { $sort: { count: -1 } },
    ]);

    // Calculate totals
    const totals = {
      appointments: appointments.reduce((sum, item) => sum + item.count, 0),
      completed: appointments.reduce((sum, item) => sum + item.completed, 0),
      cancelled: appointments.reduce((sum, item) => sum + item.cancelled, 0),
      revenue: appointments.reduce((sum, item) => sum + item.revenue, 0),
      patientVisits: patientVisits.reduce((sum, item) => sum + item.count, 0),
      uniquePatients: patientVisits.reduce(
        (sum, item) => sum + item.uniquePatientCount,
        0
      ),
    };

    return NextResponse.json({
      appointments,
      patientVisits,
      appointmentsByDepartment,
      totals,
      timeRange,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function GET(request) {
//   try {
//     await connectMongoDB();

//     // Verify admin role
//     const token = request.cookies.get("token")?.value;
//     const decoded = verifyToken(token);

//     if (decoded.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const { searchParams } = new URL(request.url);
//     const timeRange = searchParams.get("range") || "monthly"; // weekly, monthly, yearly
//     const startDate = searchParams.get("start");
//     const endDate = searchParams.get("end");

//     // Calculate date ranges
//     let dateFilter = {};
//     const now = new Date();

//     if (startDate && endDate) {
//       dateFilter = {
//         date: {
//           $gte: new Date(startDate),
//           $lte: new Date(endDate),
//         },
//       };
//     } else {
//       switch (timeRange) {
//         case "weekly":
//           dateFilter = {
//             date: {
//               $gte: new Date(now.setDate(now.getDate() - 7)),
//               $lte: new Date(),
//             },
//           };
//           break;
//         case "yearly":
//           dateFilter = {
//             date: {
//               $gte: new Date(now.getFullYear(), 0, 1),
//               $lte: new Date(),
//             },
//           };
//           break;
//         default: // monthly
//           dateFilter = {
//             date: {
//               $gte: new Date(now.getFullYear(), now.getMonth(), 1),
//               $lte: new Date(),
//             },
//           };
//       }
//     }

//     // Get appointment statistics
//     const appointments = await Appointment.aggregate([
//       { $match: dateFilter },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$date" },
//             month: { $month: "$date" },
//             day: { $dayOfMonth: "$date" },
//           },
//           count: { $sum: 1 },
//           completed: {
//             $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] },
//           },
//           cancelled: {
//             $sum: { $cond: [{ $eq: ["$status", "cancelled"] }, 1, 0] },
//           },
//           revenue: { $sum: "$fee" },
//         },
//       },
//       { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
//     ]);

//     // Get patient visit statistics
//     const patientVisits = await PatientRecord.aggregate([
//       { $match: dateFilter },
//       {
//         $group: {
//           _id: {
//             year: { $year: "$date" },
//             month: { $month: "$date" },
//             day: { $dayOfMonth: "$date" },
//           },
//           count: { $sum: 1 },
//           uniquePatients: { $addToSet: "$patient" },
//         },
//       },
//       {
//         $project: {
//           count: 1,
//           uniquePatientCount: { $size: "$uniquePatients" },
//         },
//       },
//       { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
//     ]);

//     // Calculate totals
//     const totals = {
//       appointments: appointments.reduce((sum, item) => sum + item.count, 0),
//       completed: appointments.reduce((sum, item) => sum + item.completed, 0),
//       cancelled: appointments.reduce((sum, item) => sum + item.cancelled, 0),
//       revenue: appointments.reduce((sum, item) => sum + item.revenue, 0),
//       patientVisits: patientVisits.reduce((sum, item) => sum + item.count, 0),
//       uniquePatients: patientVisits.reduce(
//         (sum, item) => sum + item.uniquePatientCount,
//         0
//       ),
//     };

//     return NextResponse.json({
//       appointments,
//       patientVisits,
//       totals,
//       timeRange,
//     });
//   } catch (error) {
//     console.error("Analytics error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
