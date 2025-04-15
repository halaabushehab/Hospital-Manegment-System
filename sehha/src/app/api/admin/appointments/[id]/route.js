// import { NextResponse } from "next/server";
// import connectMongoDB from "../../../../lib/config";
// import Appointment from "../../../../lib/models/Booking";
// import { verifyToken } from "../../../../lib/utils/auth";

// export async function PUT(request, { params }) {
//   try {
//     await connectMongoDB();

//     // Verify admin or doctor role
//     // const token = request.cookies.get("token")?.value;
//     // const decoded = verifyToken(token);

//     // if (!["admin", "doctor"].includes(decoded.role)) {
//     //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     // }

//     const { id } = params;
//     const updateData = await request.json();

//     // Prevent changing time slots if appointment is completed/cancelled
//     const existingAppointment = await Appointment.findById(id);
//     if (
//       existingAppointment.status === "completed" ||
//       existingAppointment.status === "cancelled"
//     ) {
//       if (updateData.startTime || updateData.endTime || updateData.date) {
//         return NextResponse.json(
//           {
//             error:
//               "Cannot modify time slots for completed/cancelled appointments",
//           },
//           { status: 400 }
//         );
//       }
//     }

//     const updatedAppointment = await Appointment.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true }
//     )
//       .populate("patientId", "name email phoneNumber")
//       .populate("doctorId", "name department");

//     if (!updatedAppointment) {
//       return NextResponse.json(
//         { error: "Appointment not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       {
//         message: "Appointment updated successfully",
//         appointment: updatedAppointment,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating appointment:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(request, { params }) {
//   try {
//     await connectMongoDB();

//     // Verify admin or doctor role
//     // const token = request.cookies.get("token")?.value;
//     // const decoded = verifyToken(token);

//     // if (!["admin", "doctor"].includes(decoded.role)) {
//     //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     // }

//     const { id } = params;
//     const deletedAppointment = await Appointment.findByIdAndUpdate(
//       id,
//       { status: "cancelled" },
//       { new: true }
//     );

//     if (!deletedAppointment) {
//       return NextResponse.json(
//         { error: "Appointment not found" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "Appointment cancelled successfully" },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error cancelling appointment:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import connectMongoDB from "../../../../lib/config";
import Appointment from "../../../../lib/models/Booking";
import { verifyToken } from "../../../../lib/utils/auth";

export async function PUT(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;
    const updateData = await request.json();

    const existingAppointment = await Appointment.findById(id);
    if (
      existingAppointment.status === "completed" ||
      existingAppointment.status === "cancelled"
    ) {
      if (updateData.startTime || updateData.endTime || updateData.date) {
        return NextResponse.json(
          {
            error:
              "Cannot modify time slots for completed/cancelled appointments",
          },
          { status: 400 }
        );
      }
    }

    const updatedAppointment = await Appointment.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    )
      .populate("patientId", "name email phoneNumber")
      .populate("doctorId", "name department");

    if (!updatedAppointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Appointment updated successfully",
        appointment: updatedAppointment,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating appointment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = params;

    const appointment = await Appointment.findByIdAndDelete(id);

    if (!appointment) {
      return NextResponse.json(
        { error: "Appointment not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "Appointment cancelled successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error cancelling appointment:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
