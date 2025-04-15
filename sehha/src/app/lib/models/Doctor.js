const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    department: { type: String, required: true }, // القسم (جراحة، أمراض جلدية، إلخ)
    experience: { type: Number, required: true }, // سنوات الخبرة
    rating: { type: Number, default: 4.5 },
    reviewCount: { type: Number, default: 0 },
    specializations: { type: [String], required: true }, // التخصصات الدقيقة
    availability: [
      {
        day: {
          type: String,
          enum: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        slots: [{ start: String, end: String }], // أوقات العمل (مثل ["09:00", "17:00"])
      },
    ],
    bio: { type: String }, // وصف مختصر عن الطبيب
  },
  { timestamps: true }
);

export default mongoose.models.Doctor || mongoose.model("Doctor", doctorSchema);
