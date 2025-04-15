// "use client";

// import React, { useEffect, useState } from "react";
// import {
//   useStripe,
//   useElements,
//   PaymentElement,
// } from "@stripe/react-stripe-js";
// import convertToSubcurrency from "../lib/convertToSubcurrency";

// const CheckoutPage = ({ amount }) => {
//   const stripe = useStripe();
//   const elements = useElements();
//   const [errorMessage, setErrorMessage] = useState();
//   const [clientSecret, setClientSecret] = useState("");
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("Received data:", data);
//         if (data.clientSecret) {
//           setClientSecret(data.clientSecret);
//         } else {
//           setErrorMessage("Failed to retrieve client secret.");
//         }
//       })
//       .catch((error) => {
//         console.error("Error creating payment intent:", error);
//       });
//   }, []);
  
//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     setLoading(true);
  
//     if (!stripe || !elements) {
//       setErrorMessage("Stripe.js or Elements not loaded.");
//       setLoading(false);
//       return;
//     }
  
//     const { error: submitError } = await elements.submit();
  
//     if (submitError) {
//       setErrorMessage(submitError.message);
//       setLoading(false);
//       return;
//     }
  
//     const { error } = await stripe.confirmPayment({
//       elements,
//       clientSecret,
//       confirmParams: {
//         return_url: `http://localhost:3000/payment-success?amount=${amount}`,
//       },
//     });
  
//     if (error) {
//       setErrorMessage(error.message);
//     } else {
//       console.log("Payment successful!");
//     }
  
//     setLoading(false);
//   };

//   if (!clientSecret || !stripe || !elements) {
//     return (
//       <div className="flex items-center justify-center">
//         <div
//           className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
//           role="status"
//         >
//           <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
//             Loading...
//           </span>
//         </div>
//       </div>
//     );
//   }
  

//   return (
//     <form onSubmit={handleSubmit} className="bg-white p-2 rounded-md">
//       {clientSecret && <PaymentElement />}

//       {errorMessage && <div>{errorMessage}</div>}

//       <button
//         disabled={!stripe || loading}
//         className="text-white w-full p-5 bg-black mt-2 rounded-md font-bold disabled:opacity-50 disabled:animate-pulse"
//       >
//         {!loading ? `Pay $${amount}` : "Processing..."}
//       </button>
//     </form>
//   );
// };

// export default CheckoutPage;






"use client";

import React, { useEffect, useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import convertToSubcurrency from "../lib/convertToSubcurrency";

const CheckoutPage = ({ amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState();
  const [clientSecret, setClientSecret] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch("/api/create-payment-intent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: convertToSubcurrency(amount) }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Received data:", data);
        if (data.clientSecret) {
          setClientSecret(data.clientSecret);
        } else {
          setErrorMessage("Failed to retrieve client secret.");
        }
      })
      .catch((error) => {
        console.error("Error creating payment intent:", error);
      });
  }, []);
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
  
    if (!stripe || !elements) {
      setErrorMessage("Stripe.js or Elements not loaded.");
      setLoading(false);
      return;
    }
  
    const { error: submitError } = await elements.submit();
  
    if (submitError) {
      setErrorMessage(submitError.message);
      setLoading(false);
      return;
    }
  
    const { error } = await stripe.confirmPayment({
      elements,
      clientSecret,
      confirmParams: {
        return_url: `http://localhost:3000/payment-success?amount=${amount}`,
      },
    });
  
    if (error) {
      setErrorMessage(error.message);
    } else {
      console.log("Payment successful!");
    }
  
    setLoading(false);
  };

  if (!clientSecret || !stripe || !elements) {
    return (
      <div className="flex items-center justify-center">
        <div
          className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
          role="status"
        >
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </div>
      </div>
    );
  }
  

  return (
<form
  onSubmit={handleSubmit}
  className="bg-gradient-to-br from-[#FC7729] to-[#FCAA29] p-8 rounded-3xl shadow-2xl w-full max-w-md mx-auto mt-10 relative overflow-hidden"
>
  {/* زينة خلفية بلور */}
  <div className="absolute w-64 h-64 bg-white opacity-10 rounded-full top-[-40px] right-[-40px] blur-3xl"></div>

  <div className="bg-white p-6 rounded-2xl shadow-md relative z-10">
    <h2 className="text-3xl font-extrabold text-[#303241] mb-6 text-center">
      Choose Payment Type
    </h2>

    {/* اختيار نوع الدفع */}
    <div className="mb-6 flex flex-col gap-3">
      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-[#FC7729] transition-all duration-200">
        <input
          type="radio"
          name="paymentType"
          value="doctor"
          onChange={() => setAmount(50)}
          className="accent-[#FC7729]"
          required
        />
        <span className="font-semibold text-gray-700">
          Book a 30-minute session with the doctor ($50)
        </span>
      </label>

      <label className="flex items-center gap-3 p-4 border rounded-lg cursor-pointer hover:border-[#FC7729] transition-all duration-200">
        <input
          type="radio"
          name="paymentType"
          value="products"
          onChange={() => setAmount(defaultProductAmount)}
          className="accent-[#FC7729]"
        />
        <span className="font-semibold text-gray-700">
          Purchase products from our website
        </span>
      </label>
    </div>

    {/* Stripe Element */}
    {clientSecret && (
      <div className="mb-4">
        <PaymentElement />
      </div>
    )}

    {/* رسالة الخطأ */}
    {errorMessage && (
      <div className="text-red-500 text-sm mb-2 text-center">
        {errorMessage}
      </div>
    )}

    {/* زر الدفع */}
    <button
      disabled={!stripe || loading}
      className="w-full py-3 mt-4 rounded-lg text-white font-bold transition duration-300 bg-[#1D1D1D] hover:bg-black disabled:opacity-50 disabled:animate-pulse"
    >
      {!loading ? `Pay $${amount}` : "Processing..."}
    </button>
  </div>
</form>

  );
};

export default CheckoutPage;
