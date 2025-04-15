import mongoose from "mongoose";

const patientRecordSchema = new mongoose.Schema(
  {
    patient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    diagnosis: {
      type: String,
      required: true,
    },
    treatment: String,
    medications: [
      {
        name: String,
        dosage: String,
        frequency: String,
        duration: String,
      },
    ],
    notes: String,
    labResults: [
      {
        testName: String,
        result: String,
        date: Date,
      },
    ],
    vitalSigns: {
      bloodPressure: String,
      heartRate: Number,
      temperature: Number,
      oxygenSaturation: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.models.PatientRecord ||
  mongoose.model("PatientRecord", patientRecordSchema);
