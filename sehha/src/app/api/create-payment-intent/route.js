// const { NextResponse } = require("next/server");
// const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// export async function POST(request) {
//   try {
//     const { amount } = await request.json();

//     const paymentIntent = await stripe.paymentIntents.create({
//       amount: amount,
//       currency: "usd",
//       automatic_payment_methods: { enabled: true },
//     });

//     return NextResponse.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     console.error("Internal Error:", error);
//     // Handle other errors (e.g., network issues, parsing errors)
//     return NextResponse.json(
//       { error: `Internal Server Error: ${error}` },
//       { status: 500 }
//     );
//   }
// }




import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";
// import connectMongoDB from "../../lib/config";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// إعداد اتصال MongoDB
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export async function POST(request) {
  try {
    const { amount } = await request.json();

    // 1. إنشاء الدفع على Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
      automatic_payment_methods: { enabled: true },
    });

    // 2. حفظ البيانات في MongoDB
    await client.connect();
    const db = client.db(); // اسم الداتا بيز من URI أو ممكن تسميه هنا
    const billingCollection = db.collection("billing");

    await billingCollection.insertOne({
      amount,
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
      status: paymentIntent.status,
      createdAt: new Date(),
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error("Internal Error:", error);
    return NextResponse.json(
      { error: `Internal Server Error: ${error.message}` },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
