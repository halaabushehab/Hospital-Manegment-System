"use client";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      // بإمكانك هنا تتأكد من الجلسة أو تحدث الفاتورة من خلال Webhook
      console.log("Payment Successful with session:", sessionId);
    }
  }, [sessionId]);

  return (
    <div className="p-8 text-center">
      <h1 className="text-3xl font-bold text-green-600">تم الدفع بنجاح!</h1>
      <p className="mt-4">شكراً لك، تم تأكيد دفعتك.</p>
    </div>
  );
}
