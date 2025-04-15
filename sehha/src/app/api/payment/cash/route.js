import { NextResponse } from "next/server";
import connectDB from "@/app/lib/config";
import Billing from "@/lib/models/Billing";

export async function POST(req) {
  await connectDB();
  const { billingId } = await req.json();

  const billing = await Billing.findByIdAndUpdate(
    billingId,
    {
      paymentMethod: "cash",
      paymentStatus: "paid",
      transactionId: `cash-${Date.now()}`,
    },
    { new: true }
  );

  if (!billing) return NextResponse.json({ success: false, message: "لم يتم العثور على الفاتورة" });

  return NextResponse.json({ success: true, message: "تم الدفع بنجاح" });
}
