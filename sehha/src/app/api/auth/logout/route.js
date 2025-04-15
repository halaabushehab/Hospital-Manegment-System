import { NextResponse } from "next/server";

export async function POST() {
  // To clear the cookie, set it with an empty value and immediate expiration
  const response = NextResponse.json(
    { message: "Logged out" },
    { status: 200 }
  );
  response.cookies.set("token", "", {
    httpOnly: true,
    expires: new Date(0), // or maxAge: 0
    path: "/",
  });
  return response;
}
