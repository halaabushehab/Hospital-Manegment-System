import { NextResponse } from "next/server";
import connectMongoDB from "../../lib/config";
import Appointment from "../../lib/models/Booking";
import PatientRecord from "../../lib/models/PatientRecord";
import User from "../../lib/models/User";

export async function POST(request) {
  try {
    await connectMongoDB();

    // Verify admin role
    // const token = request.cookies.get("token")?.value;
    // const decoded = verifyToken(token);

    // if (decoded.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    // }

    // Get existing patients and doctors
    const patients = await User.find({ role: "patient" }).select("_id");
    const doctors = await User.find({ role: "doctor" }).select("_id");

    if (patients.length === 0 || doctors.length === 0) {
      return NextResponse.json(
        { error: "Need at least 1 patient and 1 doctor in the database" },
        { status: 400 }
      );
    }

    // Data configuration
    const services = [
      { name: "Consultation", fee: 50 },
      { name: "Vaccination", fee: 75 },
      { name: "Dental Cleaning", fee: 120 },
      { name: "Surgery", fee: 500 },
      { name: "Emergency", fee: 200 },
    ];

    const diagnoses = [
      "Hypertension",
      "Diabetes",
      "Arthritis",
      "Respiratory Infection",
      "Dental Disease",
      "Skin Allergy",
      "Gastrointestinal Issues",
    ];

    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    let appointmentCount = 0;
    let recordCount = 0;

    // Clear existing test data (optional)
    await Appointment.deleteMany({ isTestData: true });
    await PatientRecord.deleteMany({ isTestData: true });

    // Generate data for each day
    for (let day = 0; day < 90; day++) {
      const currentDate = new Date(threeMonthsAgo);
      currentDate.setDate(threeMonthsAgo.getDate() + day);

      // Only generate records for weekdays (Mon-Fri)
      if (currentDate.getDay() > 0 && currentDate.getDay() < 6) {
        const appointmentsPerDay = Math.floor(Math.random() * 8) + 3; // 3-10 appointments/day

        for (let i = 0; i < appointmentsPerDay; i++) {
          // Random patient and doctor
          const patient =
            patients[Math.floor(Math.random() * patients.length)]._id;
          const doctor =
            doctors[Math.floor(Math.random() * doctors.length)]._id;
          const service = services[Math.floor(Math.random() * services.length)];

          // Create appointment
          const appointment = new Appointment({
            patient,
            doctor,
            date: currentDate,
            status: Math.random() > 0.1 ? "completed" : "cancelled",
            fee: service.fee,
            service: service.name,
            isTestData: true,
          });

          await appointment.save();
          appointmentCount++;

          // Create patient record for completed appointments
          if (appointment.status === "completed" && Math.random() > 0.2) {
            const record = new PatientRecord({
              patient,
              doctor,
              date: currentDate,
              diagnosis:
                diagnoses[Math.floor(Math.random() * diagnoses.length)],
              treatment: `Treatment plan for ${
                diagnoses[Math.floor(Math.random() * diagnoses.length)]
              }`,
              medications: [
                {
                  name: `Med-${Math.floor(Math.random() * 1000)}`,
                  dosage: `${Math.floor(Math.random() * 3) + 1}mg`,
                  frequency: ["Once daily", "Twice daily", "As needed"][
                    Math.floor(Math.random() * 3)
                  ],
                  duration: `${Math.floor(Math.random() * 14) + 7} days`,
                },
              ],
              vitalSigns: {
                bloodPressure: `${Math.floor(Math.random() * 40) + 100}/${
                  Math.floor(Math.random() * 20) + 60
                }`,
                heartRate: Math.floor(Math.random() * 40) + 60,
                temperature: Math.random() * 2 + 36.5,
                oxygenSaturation: Math.floor(Math.random() * 5) + 95,
              },
              isTestData: true,
            });

            await record.save();
            recordCount++;
          }
        }
      }
    }

    return NextResponse.json({
      success: true,
      message: "Test data generated successfully",
      appointments: appointmentCount,
      records: recordCount,
    });
  } catch (error) {
    console.error("Error generating test data:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
