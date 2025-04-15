import mongoose from "mongoose";
import connectMongoDB from "../lib/config";
import Appointment from "../lib/models/Booking";
import PatientRecord from "../lib/models/PatientRecord";
import User from "../lib/models/User";

async function insertTestData() {
  try {
    await connectMongoDB();

    // Get existing patients and doctors
    const patients = await User.find({ role: "patient" }).select("_id");
    const doctors = await User.find({ role: "doctor" }).select("_id");

    if (patients.length === 0 || doctors.length === 0) {
      throw new Error("Need at least 1 patient and 1 doctor in the database");
    }

    // Data configuration
    const services = [
      { name: "Consultation", fee: 50 },
      { name: "Vaccination", fee: 75 },
      // ... other services
    ];

    const diagnoses = [
      "Hypertension",
      "Diabetes",
      // ... other diagnoses
    ];

    const now = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(now.getMonth() - 3);

    let appointmentCount = 0;
    let recordCount = 0;

    // Generate data for each day
    for (let day = 0; day < 90; day++) {
      const currentDate = new Date(threeMonthsAgo);
      currentDate.setDate(threeMonthsAgo.getDate() + day);

      if (currentDate.getDay() > 0 && currentDate.getDay() < 6) {
        const appointmentsPerDay = Math.floor(Math.random() * 8) + 3;

        for (let i = 0; i < appointmentsPerDay; i++) {
          // Create appointment
          const appointment = new Appointment({
            patient: patients[Math.floor(Math.random() * patients.length)]._id,
            doctor: doctors[Math.floor(Math.random() * doctors.length)]._id,
            date: currentDate,
            status: Math.random() > 0.1 ? "completed" : "cancelled",
            fee: services[Math.floor(Math.random() * services.length)].fee,
            isTestData: true,
          });

          await appointment.save();
          appointmentCount++;

          // Create patient record for completed appointments
          if (appointment.status === "completed" && Math.random() > 0.2) {
            const record = new PatientRecord({
              patient: appointment.patient,
              doctor: appointment.doctor,
              date: currentDate,
              diagnosis:
                diagnoses[Math.floor(Math.random() * diagnoses.length)],
              // ... other fields
              isTestData: true,
            });

            await record.save();
            recordCount++;
          }
        }
      }
    }

    console.log(`Inserted ${appointmentCount} test appointments`);
    console.log(`Inserted ${recordCount} test patient records`);
    process.exit(0);
  } catch (error) {
    console.error("Error inserting test data:", error);
    process.exit(1);
  }
}

insertTestData();
