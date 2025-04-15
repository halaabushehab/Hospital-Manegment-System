"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phoneNumber: "",
    profilePicture: "",
    petType: "",
    petName: "",
    petAge: "", // pet age as a string initially
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // Convert petAge to a number if not empty
    const payload = {
      ...formData,
      petAge: formData.petAge !== "" ? Number(formData.petAge) : undefined,
    };

    console.log("Register payload:", payload); // <--- Debug line

    try {
      const response = await axios.post("/api/auth/register", payload);
      if (response.status === 201) {
        router.push("/Login");
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.error);
      } else {
        setError("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1D1D1D] text-[#FFFFFF]">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#FC7729] via-[#F2C94C] to-[#FCAA29]"></div>

      <div className="container mx-auto px-4 py-10 max-w-4xl">
        {/* Branding */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-[#FC7729] to-[#FCAA29] mb-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-white tracking-tight">
            Join Our Community
          </h1>
          <p className="text-[#C8C8C8] mt-2">
            Create an account to connect with other pet lovers
          </p>
        </div>

        <div className="bg-[#303241] rounded-xl shadow-2xl overflow-hidden">
          {/* Error message */}
          {error && (
            <div className="bg-red-500 bg-opacity-10 border-l-4 border-red-500 p-4">
              <div className="flex">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-red-400"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <p className="ml-2 text-sm text-red-400">{error}</p>
              </div>
            </div>
          )}

          {/* Form section */}
          <div className="p-8">
            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Personal Information Section */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-[#FC7729] h-6 w-1 rounded-full mr-3"></div>
                  <h2 className="text-xl font-semibold text-white">
                    Personal Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-[#FFFFFF]"
                    >
                      Full Name
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#C8C8C8]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <input
                        id="name"
                        className="block w-full pl-10 pr-3 py-3 bg-[#1D1D1D] border border-[#1D1D1D] rounded-lg focus:ring-2 focus:ring-[#FCAA29] focus:border-transparent text-[#FFFFFF] placeholder-[#C8C8C8] focus:outline-none"
                        type="text"
                        name="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-[#FFFFFF]"
                    >
                      Email Address
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#C8C8C8]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>
                      <input
                        id="email"
                        className="block w-full pl-10 pr-3 py-3 bg-[#1D1D1D] border border-[#1D1D1D] rounded-lg focus:ring-2 focus:ring-[#FCAA29] focus:border-transparent text-[#FFFFFF] placeholder-[#C8C8C8] focus:outline-none"
                        type="email"
                        name="email"
                        placeholder="you@example.com"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[#FFFFFF]"
                    >
                      Password
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#C8C8C8]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                      <input
                        id="password"
                        className="block w-full pl-10 pr-3 py-3 bg-[#1D1D1D] border border-[#1D1D1D] rounded-lg focus:ring-2 focus:ring-[#FCAA29] focus:border-transparent text-[#FFFFFF] placeholder-[#C8C8C8] focus:outline-none"
                        type="password"
                        name="password"
                        placeholder="••••••••"
                        value={formData.password}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <p className="text-xs text-[#C8C8C8] mt-1">
                      Must be at least 8 characters
                    </p>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-[#FFFFFF]"
                    >
                      Phone Number
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#C8C8C8]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a1 1 0 01-1 1h-1C9.716 21 3 14.284 3 6V5z"
                          />
                        </svg>
                      </div>
                      <input
                        id="phoneNumber"
                        className="block w-full pl-10 pr-3 py-3 bg-[#1D1D1D] border border-[#1D1D1D] rounded-lg focus:ring-2 focus:ring-[#FCAA29] focus:border-transparent text-[#FFFFFF] placeholder-[#C8C8C8] focus:outline-none"
                        type="tel"
                        name="phoneNumber"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="md:col-span-2 space-y-1">
                    <label
                      htmlFor="profilePicture"
                      className="block text-sm font-medium text-[#FFFFFF]"
                    >
                      Profile Picture URL
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#C8C8C8]"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                      </div>
                      <input
                        id="profilePicture"
                        className="block w-full pl-10 pr-3 py-3 bg-[#1D1D1D] border border-[#1D1D1D] rounded-lg focus:ring-2 focus:ring-[#FCAA29] focus:border-transparent text-[#FFFFFF] placeholder-[#C8C8C8] focus:outline-none"
                        type="text"
                        name="profilePicture"
                        placeholder="https://example.com/your-image.jpg"
                        value={formData.profilePicture}
                        onChange={handleChange}
                      />
                    </div>
                    <p className="text-xs text-[#C8C8C8] mt-1">
                      Optional: Enter a URL for your profile picture
                    </p>
                  </div>
                </div>
              </div>

              {/* Pet Information Section */}
              <div>
                <div className="flex items-center mb-6">
                  <div className="bg-[#FCAA29] h-6 w-1 rounded-full mr-3"></div>
                  <h2 className="text-xl font-semibold text-white">
                    Pet Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1">
                    <label
                      htmlFor="petType"
                      className="block text-sm font-medium text-[#FFFFFF]"
                    >
                      Pet Type
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        id="petType"
                        className="block w-full pl-10 pr-3 py-3 bg-[#1D1D1D] border border-[#1D1D1D] rounded-lg focus:ring-2 focus:ring-[#FCAA29] focus:border-transparent text-[#FFFFFF] placeholder-[#C8C8C8] focus:outline-none"
                        type="text"
                        name="petType"
                        placeholder="Dog, Cat, Bird, etc."
                        value={formData.petType}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label
                      htmlFor="petName"
                      className="block text-sm font-medium text-[#FFFFFF]"
                    >
                      Pet Name
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        id="petName"
                        className="block w-full pl-10 pr-3 py-3 bg-[#1D1D1D] border border-[#1D1D1D] rounded-lg focus:ring-2 focus:ring-[#FCAA29] focus:border-transparent text-[#FFFFFF] placeholder-[#C8C8C8] focus:outline-none"
                        type="text"
                        name="petName"
                        placeholder="Buddy, Luna, Max, etc."
                        value={formData.petName}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* New field for Pet Age */}
                  <div className="space-y-1">
                    <label
                      htmlFor="petAge"
                      className="block text-sm font-medium text-[#FFFFFF]"
                    >
                      Pet Age
                    </label>
                    <div className="relative rounded-md shadow-sm">
                      <input
                        id="petAge"
                        className="block w-full pl-10 pr-3 py-3 bg-[#1D1D1D] border border-[#1D1D1D] rounded-lg focus:ring-2 focus:ring-[#FCAA29] focus:border-transparent text-[#FFFFFF] placeholder-[#C8C8C8] focus:outline-none"
                        type="number"
                        name="petAge"
                        placeholder="Enter pet age"
                        value={formData.petAge}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Terms and Submit */}
              <div className="pt-6 space-y-6">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      name="terms"
                      type="checkbox"
                      className="h-4 w-4 accent-[#FCAA29] rounded border-[#C8C8C8] focus:ring-[#FCAA29]"
                      required
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label htmlFor="terms" className="text-[#C8C8C8]">
                      I agree to the{" "}
                      <a
                        href="#"
                        className="text-[#FCAA29] hover:text-[#FC7729]"
                      >
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a
                        href="#"
                        className="text-[#FCAA29] hover:text-[#FC7729]"
                      >
                        Privacy Policy
                      </a>
                    </label>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center gap-4 justify-between pt-6 border-t border-[#1D1D1D]">
                  <p className="text-[#C8C8C8] text-sm">
                    Already have an account?{" "}
                    <a
                      href="/Login"
                      className="text-[#FCAA29] font-medium hover:text-[#FC7729] transition-colors"
                    >
                      Sign in
                    </a>
                  </p>

                  <button
                    className="w-full md:w-auto flex justify-center py-3 px-8 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-gradient-to-r from-[#FC7729] to-[#FCAA29] hover:from-[#FCAA29] hover:to-[#FC7729] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCAA29] transition-all duration-300"
                    type="submit"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
