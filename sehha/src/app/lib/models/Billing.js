// src/app/lib/models/Billing.js
import mongoose from "mongoose";

const billingSchema = new mongoose.Schema(
  {
    patientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    appointmentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Appointment",
    },
    amount: { type: Number, required: true },
    items: [
      {
        description: { type: String },
        cost: { type: Number },
      },
    ],
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    paymentMethod: { type: String },
    transactionId: { type: String },
    issuedAt: { type: Date, default: Date.now },
    dueDate: { type: Date },
  },
  { timestamps: true }
);

const Billing = mongoose.models.Billing || mongoose.model("Billing", billingSchema);

export default Billing;