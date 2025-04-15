
// "use client";

// import CheckoutPage from "../components/CheckoutPage";
// import convertToSubcurrency from "../lib/convertToSubcurrency";
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";



// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

// export default function Home() {
//   const amount = 49.99;

//   return (
//     <main className="max-w-6xl mx-auto p-10 text-white text-center border m-10 rounded-md bg-gradient-to-tr from-blue-500 to-purple-500">
//       <div className="mb-10">
//         <h1 className="text-4xl font-extrabold mb-2">Sonny</h1>
//         <h2 className="text-2xl">
//           has requested
//           <span className="font-bold"> ${amount}</span>
//         </h2>
//       </div>

//       <Elements
//         stripe={stripePromise}
//         options={{
//           mode: "payment",
//           amount: convertToSubcurrency(amount),
//           currency: "usd",
//         }}
//       >
//         <CheckoutPage amount={amount} />
//       </Elements>
//     </main>
//   );
// }








"use client";

import CheckoutPage from "../components/CheckoutPage";
import convertToSubcurrency from "../lib/convertToSubcurrency";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";



const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY);

export default function Home() {
  const amount = 49.99;

  return (
<main className="max-w-5xl mx-auto p-10 rounded-3xl shadow-2xl border border-[#FCAA29] bg-gradient-to-tr from-[#FC7729] to-[#F2C94C]">
  <div className="bg-white p-8 rounded-2xl shadow-md text-center mb-10">
    <h1 className="text-4xl md:text-5xl font-extrabold text-[#303241] mb-4 drop-shadow-sm">
      🐾 Book your vet visit with care!
    </h1>
    <h2 className="text-xl md:text-2xl text-[#1D1D1D] font-medium leading-relaxed">
      You're one step away from confirming your pet’s appointment.<br />
      Complete your 
      .
    </h2>
  </div>

  <div className="bg-white p-6 md:p-10 rounded-2xl shadow-lg">
    <Elements
      stripe={stripePromise}
      options={{
        mode: "payment",
        amount: convertToSubcurrency(amount),
        currency: "usd",
      }}
    >
      <CheckoutPage amount={amount} />
    </Elements>
  </div>
</main>

  );
}



