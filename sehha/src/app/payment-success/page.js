// "use client";

// import { useEffect } from "react";

// export default function PaymentSuccess({ searchParams }) {
//   const { amount } = searchParams;

//   useEffect(() => {
//     // Send billing data to MongoDB
//     const sendBillingData = async () => {
//       try {
//         await fetch("/api/save-billing", {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({
//             amount,
//             date: new Date().toISOString(),
//             method: "Stripe",
//             email: "hala_2999@yahoo.com", // replace dynamically if needed
//           }),
//         });
//       } catch (error) {
//         console.error("Failed to save billing data:", error);
//       }
//     };

//     if (amount) {
//       sendBillingData();
//     }
//   }, [amount]);

//   return (
//     <main className="max-w-4xl mx-auto p-10 text-white rounded-3xl bg-gradient-to-br from-[#FC7729] via-[#FCAA29] to-[#FFE5B4] shadow-[0_20px_50px_rgba(0,0,0,0.1)] mt-20 relative overflow-hidden my-40 border border-white/10">
//     {/* خلفية زخرفية مميزة */}
//     <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full top-[-80px] left-[-80px] blur-3xl animate-pulse"></div>
//     <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full bottom-[-80px] right-[-80px] blur-3xl animate-pulse"></div>
//     <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-5 mix-blend-overlay"></div>
  
//     {/* المحتوى */}
//     <div className="relative z-10 text-center">
//       <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-xl text-white tracking-tight">
//         Payment Successful!
//       </h1>
//       <h2 className="text-xl md:text-2xl text-white/90 font-medium mb-6">
//         Thank you for your trust. Your transaction was processed securely.
//       </h2>
  
//       <div className="inline-block px-10 py-4 bg-white text-[#FC7729] text-4xl font-extrabold rounded-2xl shadow-lg tracking-wide transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
//         ${amount}
//       </div>
  
//       <p className="text-sm text-white/70 mt-4">
//         A confirmation receipt has been sent to your email.
//       </p>
//     </div>
//   </main>
  
  
//   );
// }














"use client";

export default function PaymentSuccess({ searchParams }) {
  const { amount } = searchParams;


  return (
    <main className="max-w-4xl mx-auto p-10 text-white rounded-3xl bg-gradient-to-br from-[#FC7729] via-[#FCAA29] to-[#FFE5B4] shadow-[0_20px_50px_rgba(0,0,0,0.1)] mt-20 relative overflow-hidden my-40 border border-white/10">
    {/* خلفية زخرفية مميزة */}
    <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full top-[-80px] left-[-80px] blur-3xl animate-pulse"></div>
    <div className="absolute w-96 h-96 bg-white opacity-10 rounded-full bottom-[-80px] right-[-80px] blur-3xl animate-pulse"></div>
    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/paper-fibers.png')] opacity-5 mix-blend-overlay"></div>
  
    {/* المحتوى */}
    <div className="relative z-10 text-center">
      <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-xl text-white tracking-tight">
        Payment Successful!
      </h1>
      <h2 className="text-xl md:text-2xl text-white/90 font-medium mb-6">
        Thank you for your trust. Your transaction was processed securely.
      </h2>
  
      <div className="inline-block px-10 py-4 bg-white text-[#FC7729] text-4xl font-extrabold rounded-2xl shadow-lg tracking-wide transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
        ${amount}
      </div>
  
      <p className="text-sm text-white/70 mt-4">
        A confirmation receipt has been sent to your email.
      </p>
    </div>
  </main>
  
  
  );
}
