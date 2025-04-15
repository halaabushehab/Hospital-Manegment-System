// // /app/api/save-billing/route.js

// import { NextResponse } from "next/server";
// import { MongoClient } from "mongodb";

// const uri = process.env.MONGODB_URI;
// const client = new MongoClient(uri);
// const dbName = "hospital"; // غيّرها حسب اسم قاعدة البيانات

// export async function POST(request) {
//   try {
//     const data = await request.json();
//     await client.connect();
//     const db = client.db(dbName);
//     const collection = db.collection("billing");

//     await collection.insertOne(data);

//     return NextResponse.json({ message: "Billing data saved successfully" });
//   } catch (error) {
//     console.error("MongoDB Error:", error);
//     return NextResponse.json({ error: "Failed to save billing data" }, { status: 500 });
//   } finally {
//     await client.close();
//   }
// }



import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "hospital"; // غيّرها حسب اسم قاعدة البيانات

export async function POST(request) {
  try {
    const data = await request.json();
    
    // استخراج البيانات المدخلة من الفورم
    const { name, email, amount, method, address, phoneNumber, date } = data;
    
    // إضافة البيانات إلى قاعدة البيانات
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("billing");

    // إضافة سجل الدفع إلى collection
    await collection.insertOne({
      name,
      email,
      amount,
      method,
      address,
      phoneNumber,
      date,
    });

    return NextResponse.json({ message: "Billing data saved successfully" });
  } catch (error) {
    console.error("MongoDB Error:", error);
    return NextResponse.json({ error: "Failed to save billing data" }, { status: 500 });
  } finally {
    await client.close();
  }
}
