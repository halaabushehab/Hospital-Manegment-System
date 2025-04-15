// sehha/src/app/animal-products/[id]/page.js
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, useParams } from "next/navigation";

async function fetchProduct(id) {
  try {
    const res = await fetch(`http://localhost:3000/api/animal-products/${id}`, {
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error("Failed to fetch product");
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}

async function fetchCart(userId) {
  try {
    const response = await fetch(`/api/cart?userId=${userId}`);
    if (!response.ok) {
      throw new Error("Failed to fetch cart");
    }
    return response.json();
  } catch (error) {
    console.error("Error fetching cart:", error);
    return { items: [], totalAmount: 0 };
  }
}

export default function ProductDetailsPage() {
  const [product, setProduct] = useState(null);
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
  const [isLoading, setIsLoading] = useState(true); // حالة التحميل الجديدة
  const [error, setError] = useState(null); // حالة الخطأ الجديدة
  const router = useRouter();
  const { id } = useParams();
  const userId = "guest"; // Replace with real user ID if using authentication

  useEffect(() => {
    async function loadData() {
      setIsLoading(true); // نبدأ التحميل
      setError(null); // نرجع حالة الخطأ للوضع الافتراضي

      try {
        // Fetch product details
        const productData = await fetchProduct(id);
        console.log("Fetched product:", productData);
        setProduct(productData);

        // Fetch cart
        const cartData = await fetchCart(userId);
        console.log("Fetched cart:", cartData);
        setCart(cartData);
      } catch (err) {
        setError("Failed to load product details. Please try again later.");
      } finally {
        setIsLoading(false); // ننهي التحميل
      }
    }
    loadData();
  }, [id]);

  const addToCart = async (product) => {
    try {
      console.log("Adding product to cart:", product);
      const response = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, product }),
      });

      const responseData = await response.json();
      console.log("Add to cart response:", responseData);

      if (!response.ok) {
        throw new Error(
          `Failed to add to cart: ${responseData.error || "Unknown error"}`
        );
      }

      setCart(responseData);
      router.push("/cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(`Failed to add to cart: ${error.message}`);
    }
  };

  // حالة التحميل
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#C8C8C8]">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center mb-8 pt-4">
            <div className="bg-[#FCAA29] p-3 rounded-full shadow-lg mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2c-5.33 4-8 8-8 12 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4-2.67-8-8-12zm1 17.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1.5-5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3-3c-.83 0-1.5-.67-1.5-1.5S10.67 8 11.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-1-3c-.83 0-1.5-.67-1.5-1.5S9.67 4 10.5 4s1.5.67 1.5 1.5S11.33 8 10.5 8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[#303241]">
              Loading Product Details
            </h1>
          </div>
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-orange-500 mx-auto"></div>
            <p className="text-gray-600 mt-4">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  // حالة الخطأ
  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#C8C8C8]">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center mb-8 pt-4">
            <div className="bg-[#FCAA29] p-3 rounded-full shadow-lg mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2c-5.33 4-8 8-8 12 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4-2.67-8-8-12zm1 17.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1.5-5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3-3c-.83 0-1.5-.67-1.5-1.5S10.67 8 11.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-1-3c-.83 0-1.5-.67-1.5-1.5S9.67 4 10.5 4s1.5.67 1.5 1.5S11.33 8 10.5 8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[#303241]">
              Error Loading Product
            </h1>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-[#FC7729] mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-[#303241] mb-4">
              Failed to load product
            </h2>
            <p className="text-gray-600 mb-8">{error}</p>
            <Link href="/animal-products">
              <button className="bg-orange-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-amber-400 transition-colors duration-300">
                Back to Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // حالة المنتج غير موجود
  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#FFFFFF] to-[#C8C8C8]">
        <div className="container mx-auto p-6">
          <div className="flex items-center justify-center mb-8 pt-4">
            <div className="bg-[#FCAA29] p-3 rounded-full shadow-lg mr-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8 text-white"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2c-5.33 4-8 8-8 12 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4-2.67-8-8-12zm1 17.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1.5-5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3-3c-.83 0-1.5-.67-1.5-1.5S10.67 8 11.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-1-3c-.83 0-1.5-.67-1.5-1.5S9.67 4 10.5 4s1.5.67 1.5 1.5S11.33 8 10.5 8z" />
              </svg>
            </div>
            <h1 className="text-4xl font-bold text-[#303241]">
              Product Not Found
            </h1>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 text-center max-w-2xl mx-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-[#FC7729] mx-auto mb-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M12 18a6 6 0 100-12 6 6 0 000 12z"
              />
            </svg>
            <h2 className="text-2xl font-bold text-[#303241] mb-4">
              We couldn't find this product
            </h2>
            <p className="text-gray-600 mb-8">
              The product you are looking for does not exist or may have been
              removed.
            </p>
            <Link href="/animal-products">
              <button className="bg-orange-500 text-white py-2 px-6 rounded-lg font-medium hover:bg-amber-400 transition-colors duration-300">
                Back to Products
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // عرض تفاصيل المنتج
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Icon */}
        <div className="flex items-center justify-center mb-10">
          <div className="bg-amber-400 p-3 rounded-full shadow-lg mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 2c-5.33 4-8 8-8 12 0 4.42 3.58 8 8 8s8-3.58 8-8c0-4-2.67-8-8-12zm1 17.5c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm1.5-5.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-3-3c-.83 0-1.5-.67-1.5-1.5S10.67 8 11.5 8s1.5.67 1.5 1.5-.67 1.5-1.5 1.5zm-1-3c-.83 0-1.5-.67-1.5-1.5S9.67 4 10.5 4s1.5.67 1.5 1.5S11.33 8 10.5 8z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-[#303241]">Product Details</h1>
        </div>

        {/* Product Details Card */}
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0">
            {/* Product Image */}
            <div className="h-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover min-h-96"
              />
            </div>

            {/* Product Info */}
            <div className="p-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-4">
                {product.name}
              </h2>
              <div className="flex items-center mb-4">
                <span className="bg-amber-200 px-3 py-1 rounded-full text-sm text-gray-800 font-medium">
                  {product.category}
                </span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description || "No description available."}
              </p>

              <div className="flex items-center mb-8">
                <p className="text-3xl font-semibold text-amber-400">
                  ${product.price}
                </p>
                <div className="ml-4 bg-gray-100 px-3 py-1 rounded text-sm">
                  {product.stock > 0 ? (
                    <span className="text-green-600 font-medium">In Stock</span>
                  ) : (
                    <span className="text-red-600 font-medium">Out of Stock</span>
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                {product.stock > 0 ? (
                  <button
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-amber-400 text-white py-3 px-4 rounded-lg font-medium hover:bg-orange-500 transition-colors duration-300 flex items-center justify-center"
                  >
                    Add to Cart
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
                      <path d="M16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    disabled
                    className="flex-1 bg-gray-300 text-gray-600 py-3 px-4 rounded-lg font-medium cursor-not-allowed flex items-center justify-center"
                  >
                    Sold Out
                  </button>
                )}
                <Link href="/animal-products" className="flex-1">
                  <button className="w-full bg-orange-500 text-white py-3 px-4 rounded-lg font-medium hover:bg-amber-400 transition-colors duration-300 flex items-center justify-center">
                    Back to Products
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 ml-2"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l2.293 2.293a1 1 0 010 1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}