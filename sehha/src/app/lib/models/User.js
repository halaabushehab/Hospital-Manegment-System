import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  googleId: {
    type: String,
  },
  role: {
    type: String,
    enum: ["patient", "doctor", "admin"],
    default: "patient",
  },
  name: {
    type: String,
    required: true,
    trim: true,
  },
  profilePicture: {
    type: String,
  },
  phoneNumber: {
    type: String,
    validate: {
      validator: function (value) {
        // Allow empty value or a string of exactly 10 digits
        if (!value) return true;
        return /^[0-9]{10}$/.test(value);
      },
      message: (props) =>
        `${props.value} is not a valid phone number! It must be exactly 10 digits.`,
    },
  },
  address: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "suspended", "pending"],
    default: "active",
  },
  petType: {
    type: String,
  },
  petName: {
    type: String,
  },
  petAge: { type: Number }, // The key for storing petAge as a Number
  licenseNumber: {
    type: String,
  },
  qualifications: {
    type: [String],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Use a cached model if it exists (for hot-reloading in dev), otherwise create a new model.
export default mongoose.models.User || mongoose.model("User", userSchema);
