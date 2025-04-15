import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

// Cache the connection to avoid creating multiple connections
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectMongoDB = async () => {
  if (cached.conn) {
    console.log("Using cached MongoDB connection.");
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };
    console.log("Connecting to MongoDB...");
    cached.promise = mongoose
      .connect(MONGODB_URI, {
        ...opts,
        dbName: "hospital",
      })
      .then((mongoose) => {
        console.log("Connected to MongoDB.");
        return mongoose;
      })
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};

export default connectMongoDB;
