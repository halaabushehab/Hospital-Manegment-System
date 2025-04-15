import connectMongoDB from "../../lib/config";
import Doctor from "../../lib/models/Doctor";
import { NextResponse } from "next/server";


export async function GET(request) {
    try {
      await connectMongoDB(); // Connect to MongoDB
      // Fetch distinct departments from the Doctor collection
      const departments = await Doctor.distinct("department");
      console.log("Departments fetched:", departments); // Log the fetched departments
     return NextResponse.json(departments); // Return the departments as a response
    } catch (error) {
      console.error("Error fetching departments:", error);
     return NextResponse.json({ error: "Failed to fetch departments" });
    }
}