const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  department: { type: String, required: true },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  emergency: { type: Boolean, default: false },
  reason: { type: String, required: true },
  notes: { type: String },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "completed", "cancelled"],
    default: "pending",
  },
  prescription: { type: String },
  createdAt: { type: Date, default: Date.now },
});

// module.exports = mongoose.model("Appointment", appointmentSchema);
const Appointment =
  mongoose.models.Appointment ||
  mongoose.model("Appointment", appointmentSchema);
export default Appointment;
