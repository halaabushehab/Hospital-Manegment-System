import { NextResponse } from "next/server";
import connectMongoDB from "../../../lib/config";
import PatientRecord from "../../../lib/models/PatientRecord";
import { verifyToken } from "../../../lib/utils/auth";

export async function PUT(request, context) {
  try {
    await connectMongoDB();

    // const token = request.cookies.get("token")?.value;
    // const decoded = verifyToken(token);

    // if (!["admin", "doctor"].includes(decoded.role)) {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    const { id } = context.params;
    const updatedData = await request.json();

    const updatedRecord = await PatientRecord.findByIdAndUpdate(
      id,
      updatedData,
      {
        new: true,
      }
    );

    return NextResponse.json({
      message: "Record updated successfully",
      record: updatedRecord,
    });
  } catch (error) {
    console.error("Error updating record:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
