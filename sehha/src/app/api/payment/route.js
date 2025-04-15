// src/app/api/payment/route.js
import Stripe from "stripe";
import { NextResponse } from "next/server";
import connectDB from "@/app/lib/config";
import Billing from "@/app/lib/models/Billing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  try {
    await connectDB();
    const { billingId } = await req.json();

    const billing = await Billing.findById(billingId);
    if (!billing) {
      return NextResponse.json({ error: "Billing not found" }, { status: 404 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: billing.items.map((item) => ({
        price_data: {
          currency: "usd",
          product_data: { name: item.description },
          unit_amount: item.cost * 100,
        },
        quantity: 1,
      })),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/payment/cancel`,
      metadata: {
        billingId: billing._id.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Payment API error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
