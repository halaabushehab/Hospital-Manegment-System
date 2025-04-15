import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

import connectMongoDB from "../../../lib/config";
import User from "../../../lib/models/User";
import Doctor from "../../../lib/models/Doctor";
import { verifyToken } from "../../../lib/utils/auth";
import { headers } from "next/headers";
export async function GET(request) {
  try {
    await connectMongoDB();

    // console.log(request.cookies);

    // const token = request.cookies.get("token")?.value;
    // const decoded = verifyToken(token);

    // if (decoded.role !== "admin") {
    //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    // }
    const { searchParams } = new URL(request.url);
    const role = searchParams.get("role");

    const filter = role ? { role } : {};

    const users = await User.find(filter).select("-password -googleId");
    console.log(users);
    return NextResponse.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function POST(request) {
//   try {
//     await connectMongoDB();

//     // Verify admin role
//     // const token = request.cookies.get("token")?.value;
//     // const decoded = verifyToken(token);

//     // if (decoded.role !== "admin") {
//     //   return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     // }

//     const { name, email, password, role } = await request.json();

//     // Basic validation
//     if (!name || !email || !password || !role) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 400 }
//       );
//     }

//     // Create new user
//     const newUser = new User({
//       name,
//       email,
//       password: await bcrypt.hash(password, 10),
//       role,
//       status: "active",
//     });

//     await newUser.save();

//     return NextResponse.json(
//       { message: "User created successfully", user: newUser },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(request) {
//   try {
//     await connectMongoDB();

//     // Verify admin role
//     // const token = request.cookies.get("token")?.value;
//     // const decoded = verifyToken(token);

//     // if (decoded.role !== "admin") {
//     //   return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
//     // }

//     const data = await request.json();
//     const { role } = data;

//     // Basic validation
//     if (
//       !data.name ||
//       !data.email ||
//       (!data.password && !data.googleId) ||
//       !role
//     ) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     // Check if user already exists
//     const existingUser = await User.findOne({ email: data.email });
//     if (existingUser) {
//       return NextResponse.json(
//         { error: "User already exists" },
//         { status: 409 }
//       );
//     }

//     // Role-specific validation
//     if (role === "doctor") {
//       if (!data.specialization || !data.licenseNumber) {
//         return NextResponse.json(
//           {
//             error: "Specialization and license number are required for doctors",
//           },
//           { status: 400 }
//         );
//       }
//     }

//     // Create new user
//     const newUser = new User({
//       ...data,

//       status: "active",
//     });

//     await newUser.save();

//     // Return user without sensitive data
//     const userResponse = newUser.toObject();
//     delete userResponse.password;
//     delete userResponse.googleId;

//     return NextResponse.json(
//       { message: "User created successfully", user: userResponse },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating user:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }

export async function POST(request) {
  try {
    await connectMongoDB();

    const data = await request.json();
    const { role, password } = data;

    // Basic validation
    if (!data.name || !data.email || (!password && !data.googleId) || !role) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email: data.email });
    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // Hash password if provided
    let hashedPassword;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Create new user
    const newUser = new User({
      ...data,
      password: hashedPassword, // استبدال كلمة المرور بالمشفرة
      status: "active",
    });

    await newUser.save();
    if (role === "doctor") {
      const newDoctor = new Doctor({
        userId: newUser._id,
        department: data.department || data.specialization, // يمكن تعديله حسب الحاجة
        experience: data.yearsOfExperience || 0,
        specializations: [data.specialization], // تحويل التخصص إلى مصفوفة
        availability: [], // سيتم إضافتها لاحقاً
        bio: data.bio || "",
      });

      await newDoctor.save();
    }

    // Return user without sensitive data
    const userResponse = newUser.toObject();
    delete userResponse.password;
    delete userResponse.googleId;

    return NextResponse.json(
      { message: "User created successfully", user: userResponse },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 }
    );
  }
}

// export async function GET(request) {
//   try {
//     await connectMongoDB();

//     // Get cookie header from the request
//     console.log(request.cookies.token);

//     // console.log(token);
//     if (!token) {
//       throw new Error("No token provided");
//     }

//     const decoded = verifyToken(token);

//     if (decoded.role !== "admin") {
//       return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//     }

//     const users = await User.find({}).select("-password -googleId");

//     return NextResponse.json(users);
//   } catch (error) {
//     console.error("Error fetching users:", error);
//     return NextResponse.json(
//       { error: error.message || "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
