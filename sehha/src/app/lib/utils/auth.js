import jwt from "jsonwebtoken";

export function verifyToken(token) {
  if (!token) {
    throw new Error("No token provided");
  }

  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid token");
  }
}

export function extractUserIdFromToken(request) {
  const token = request.cookies.get("token")?.value;
  console.log("Extracted token:", token);
  if (!token) {
    throw new Error("No token provided");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded token:", decoded);
    return decoded.userId;
  } catch (error) {
    throw new Error("Invalid token");
  }
}
