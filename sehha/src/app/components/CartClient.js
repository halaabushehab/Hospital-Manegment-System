"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function CartClient({ initialCart, userId }) {
  const [cart, setCart] = useState(
    initialCart || { items: [], totalAmount: 0 }
  );
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/cart?userId=${userId}`);
      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }
      const data = await response.json();
      setCart(data || { items: [], totalAmount: 0 });
    } catch (error) {
      console.error("Error fetching cart:", error);
      setCart({ items: [], totalAmount: 0 });
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, action) => {
    if (!productId) return; // Prevent updates if productId is invalid

    try {
      const response = await fetch("/api/cart", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, productId, action }),
      });

      if (!response.ok) {
        throw new Error("Failed to update cart");
      }

      const updatedCart = await response.json();
      setCart(updatedCart || { items: [], totalAmount: 0 });
    } catch (error) {
      console.error("Error updating cart:", error);
      alert("Failed to update cart.");
    }
  };

  const clearCart = async () => {
    try {
      const response = await fetch(`/api/cart?userId=${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to clear cart");
      }

      setCart({ items: [], totalAmount: 0 });
      alert("Checkout successful! Your cart has been cleared.");
      router.push("/Payment");
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-xl shadow-xl">
          <div className="flex items-center space-x-4">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="text-blue-800 text-xl font-medium">
              Loading your cart...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Ensure cart.items is an array
  const cartItems = Array.isArray(cart.items) ? cart.items : [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center mb-8 pt-8">
          <div className="bg-gradient-to-r from-orange-400 to-orange-500 p-4 rounded-full shadow-lg mr-4 transform hover:rotate-12 transition-transform duration-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-blue-900 tracking-tight">
            Your Cart
          </h1>
        </div>

        {cartItems.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-10 text-center max-w-2xl mx-auto border border-blue-100">
            <div className="mb-6 bg-orange-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 text-orange-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-blue-900 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-8 text-lg">
              Time to find some amazing products for your furry friends!
            </p>
            <Link href="/animal-products">
              <button className="bg-gradient-to-r from-orange-400 to-orange-500 text-white py-4 px-8 rounded-xl font-medium hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
                Explore Products
              </button>
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8 border border-blue-100">
            <div className="mb-6 pb-4 border-b border-gray-100">
              <h2 className="text-2xl font-semibold text-blue-900">
                Shopping Cart ({cartItems.length} items)
              </h2>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {cartItems.map((item) => {
                // Ensure productId exists and is a string
                const productId =
                  item.productId?._id?.toString() ||
                  item.productId?.toString() ||
                  "";

                if (!productId) {
                  console.warn("Skipping item with invalid productId:", item);
                  return null; // Skip rendering this item
                }

                return (
                  <div
                    key={productId}
                    className="flex flex-col md:flex-row items-start md:items-center p-4 rounded-xl border border-gray-100 hover:border-blue-200 transition-colors duration-300 hover:bg-blue-50"
                  >
                    <div className="bg-gray-100 rounded-xl p-2 md:mr-6 mb-4 md:mb-0">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-blue-900 mb-1">
                        {item.name}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mb-3">
                        <p className="bg-blue-50 px-3 py-1 rounded-full">
                          Unit Price: ${item.price}
                        </p>
                        <p className="bg-green-50 px-3 py-1 rounded-full text-green-700 font-medium">
                          Subtotal: ${item.subtotal}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-4">
                        <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                          <button
                            onClick={() =>
                              updateCartItem(productId, "decrease")
                            }
                            className="bg-gray-100 text-blue-900 px-4 py-2 hover:bg-gray-200 font-bold"
                          >
                            -
                          </button>
                          <span className="px-6 py-2 bg-white text-blue-900 font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() =>
                              updateCartItem(productId, "increase")
                            }
                            className="bg-gray-100 text-blue-900 px-4 py-2 hover:bg-gray-200 font-bold"
                          >
                            +
                          </button>
                        </div>
                        <button
                          onClick={() => updateCartItem(productId, "remove")}
                          className="text-sm flex items-center text-red-500 hover:text-red-700 font-medium"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4 mr-1"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 bg-blue-50 p-6 rounded-xl">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <p className="text-gray-600 mb-1">Cart Summary</p>
                  <h3 className="text-3xl font-bold text-blue-900">
                    ${cart.totalAmount.toFixed(2)}
                  </h3>
                </div>
                <Link href={"/payment"}>
                  <button
                    onClick={clearCart}
                    className="mt-4 md:mt-0 w-full md:w-auto bg-gradient-to-r from-orange-400 to-orange-500 text-white py-4 px-8 rounded-xl font-medium hover:from-orange-500 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                  >
                    <span>Proceed to Checkout</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
