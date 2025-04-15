"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

async function fetchOrder(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/orders?_id=${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch order");
    }
    const data = await res.json();
    return data[0]; // لأننا نستخدم query parameter
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
  }
}

export default function OrderDetailPage({ params }) {
  const { id } = params;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetchOrder(id).then((data) => setOrder(data));
  }, [id]);

  if (!order) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6">Order Not Found</h1>
        <Link href="/billing" className="text-blue-500 hover:underline">
          Back to Billing
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Order #{id}</h1>
      <Link href="/billing" className="text-blue-500 hover:underline mb-4 inline-block">
        Back to Billing
      </Link>

      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-[#303241]">
            Order #{order._id}
          </h2>
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              order.paymentStatus === "paid"
                ? "bg-green-100 text-green-800"
                : order.paymentStatus === "pending"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-red-100 text-red-800"
            }`}
          >
            {order.paymentStatus}
          </span>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#303241] mb-2">
            User Information
          </h3>
          <p className="text-gray-600">Name: {order.user.name}</p>
          <p className="text-gray-600">Email: {order.user.email}</p>
          <p className="text-gray-600">Phone: {order.user.phone}</p>
        </div>

        <div className="mb-4">
          <h3 className="text-lg font-semibold text-[#303241] mb-2">
            Order Details
          </h3>
          {order.items.map((item, index) => (
            <div key={index} className="flex justify-between text-gray-600 mb-2">
              <span>
                {item.name} (x{item.quantity})
              </span>
              <span>${item.subtotal.toFixed(2)}</span>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-xl font-bold text-[#303241]">
          <span>Total</span>
          <span>${order.totalAmount.toFixed(2)}</span>
        </div>

        <div className="mt-4">
          <p className="text-gray-600">
            Order Date: {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}