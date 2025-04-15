// app/api/protected/route.js
import { NextResponse } from "next/server";
import { verifyToken } from "lib/utils/auth";

export async function GET(request) {
  try {
    // Retrieve the token from the cookies
    const token = request.cookies.get("token")?.value;

    // Verify and decode the token
    const decoded = verifyToken(token);

    // Continue with your protected logic here
    return NextResponse.json({ data: "Protected data", decoded });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 401 });
  }
}
