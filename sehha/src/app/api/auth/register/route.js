import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import connectMongoDB from "../../../lib/config"; // Adjust the import path as necessary
import User from "../../../lib/models/User"; // Adjust the import path as necessary

export async function POST(request) {
  try {
    await connectMongoDB();

    // Parse the request body
    const {
      name,
      email,
      password,
      phoneNumber,
      profilePicture,
      petType,
      petName,
      petAge, // Possibly a string coming in from the frontend
    } = await request.json();

    // Convert petAge to a number if it's provided and not an empty string.
    const parsedPetAge =
      petAge !== undefined && petAge !== "" ? Number(petAge) : undefined;

    // 1. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    // 2. Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create new user including the extra fields, using the parsed petAge
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phoneNumber,
      profilePicture,
      petType,
      petName,
      petAge: parsedPetAge, // Save the numeric pet age here
      // role defaults to "patient" per your model
    });
    await newUser.save();

    return NextResponse.json(
      { message: "Registration successful" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error in register route:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
