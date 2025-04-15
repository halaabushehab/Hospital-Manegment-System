import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/config";
import PatientRecord from "../../lib/models/PatientRecord";
import { verifyToken } from "../../lib/utils/auth";

// export async function GET(request) {
//   try {
//     await connectMongoDB();

//     Verify admin or doctor role
//     const token = request.cookies.get("token")?.value;
//     const decoded = verifyToken(token);

//     if (!["admin", "doctor"].includes(decoded.role)) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     Get all patient records with patient details
//     const records = await PatientRecord.find()
//       .populate("patient", "name email phoneNumber")
//       .populate("doctor", "name specialization");

//     return NextResponse.json(records);
//   } catch (error) {
//     console.error("Error fetching patient records:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connectMongoDB();

//     Verify admin or doctor role
//     const token = request.cookies.get("token")?.value;
//     const decoded = verifyToken(token);

//     if (!["admin", "doctor"].includes(decoded.role)) {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     }

//     const {
//       patientId,
//       doctorId,
//       diagnosis,
//       treatment,
//       medications,
//       notes,
//       labResults,
//       vitalSigns,
//     } = await request.json();

//     Create new record
//     const newRecord = new PatientRecord({
//       patient: patientId,
//       doctor: doctorId,
//       diagnosis,
//       treatment,
//       medications,
//       notes,
//       labResults,
//       vitalSigns,
//       date: new Date(),
//     });

//     await newRecord.save();

//     return NextResponse.json(
//       { message: "Record created successfully", record: newRecord },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating patient record:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function GET(request) {
  try {
    await connectMongoDB();

    // Verify admin or doctor role
    // const token = request.cookies.get("token")?.value;
    // const decoded = verifyToken(token);

    // if (!["admin", "doctor"].includes(decoded.role)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    // Get all patient records with patient details
    const records = await PatientRecord.find()
      .populate("patient", "name email phoneNumber")
      .populate("doctor", "name specialization");

    return NextResponse.json(records);
  } catch (error) {
    console.error("Error fetching patient records:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectMongoDB();

    // Verify admin or doctor role
    // const token = request.cookies.get("token")?.value;
    // const decoded = verifyToken(token);

    // if (!["admin", "doctor"].includes(decoded.role)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    const {
      patientId,
      doctorId,
      diagnosis,
      treatment,
      medications,
      notes,
      labResults,
      vitalSigns,
    } = await request.json();

    // Create new record
    const newRecord = new PatientRecord({
      patient: patientId,
      doctor: doctorId,
      diagnosis,
      treatment,
      medications,
      notes,
      labResults,
      vitalSigns,
      date: new Date(),
    });

    await newRecord.save();

    return NextResponse.json(
      { message: "Record created successfully", record: newRecord },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating patient record:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
