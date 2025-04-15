"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
// import { signIn } from "next-auth/react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError(null);
  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(formData),
  //     });
  //     const data = await res.json();
  //     if (!res.ok) {
  //       setError(data.error);
  //     } else {
  //       if (data.user.role === "admin") {
  //         router.push("/Dashboard/UserManagement");
  //       } else {
  //         router.push("/");
  //       }
  //     }
  //   } catch (err) {
  //     setError("Something went wrong. Please try again.");
  //   }
  // };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error);
      } else {
        if (data.user.role === "admin") {
          window.location.href = "/Dashboard/UserManagement"; // Full reload
        } else {
          window.location.href = "/"; // Full reload
        }
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    }
  };
  const handleGoogleLogin = () => {
    // Trigger Google login via NextAuth
    // signIn("google");
    console.log("Google login clicked");
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#1D1D1D]">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#FC7729] via-[#F2C94C] to-[#FCAA29]"></div>

      <div className="flex flex-1 items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo/Branding Area */}
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
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              Welcome Back
            </h1>
            <p className="text-[#C8C8C8] mt-2">
              Sign in to continue to your account
            </p>
          </div>

          {/* Main Card */}
          <div className="bg-[#303241] rounded-xl shadow-2xl overflow-hidden">
            {/* Error alert */}
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

            <div className="p-8">
              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-[#FFFFFF]"
                  >
                    Email Address
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
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
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 bg-[#1D1D1D] border border-[#1D1D1D] rounded-lg focus:ring-2 focus:ring-[#FCAA29] focus:border-transparent text-[#FFFFFF] placeholder-[#C8C8C8] focus:outline-none"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-sm font-medium text-[#FFFFFF]"
                    >
                      Password
                    </label>
                    <a
                      href="/forgot-password"
                      className="text-sm text-[#FCAA29] hover:text-[#FC7729] transition-colors"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="mt-1 relative rounded-md shadow-sm">
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
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="block w-full pl-10 pr-3 py-3 bg-[#1D1D1D] border border-[#1D1D1D] rounded-lg focus:ring-2 focus:ring-[#FCAA29] focus:border-transparent text-[#FFFFFF] placeholder-[#C8C8C8] focus:outline-none"
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-[#FC7729] to-[#FCAA29] hover:from-[#FCAA29] hover:to-[#FC7729] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCAA29] transition-all duration-300"
                  >
                    Sign In
                  </button>
                </div>
              </form>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#1D1D1D]"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-[#303241] text-[#C8C8C8]">
                      Or continue with
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <button
                    onClick={handleGoogleLogin}
                    className="w-full flex items-center justify-center px-4 py-3 border border-[#1D1D1D] rounded-lg shadow-sm bg-[#1D1D1D] text-sm font-medium text-[#FFFFFF] hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FCAA29] transition-all duration-300"
                  >
                    <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24">
                      <g transform="matrix(1, 0, 0, 1, 0, 0)">
                        <path
                          d="M21.35,11.1H12.18V13.83H18.69C18.36,17.64 15.19,19.27 12.19,19.27C8.36,19.27 5,16.25 5,12C5,7.9 8.2,4.73 12.2,4.73C15.29,4.73 17.1,6.7 17.1,6.7L19,4.72C19,4.72 16.56,2 12.1,2C6.42,2 2.03,6.8 2.03,12C2.03,17.05 6.16,22 12.25,22C17.6,22 21.5,18.33 21.5,12.91C21.5,11.76 21.35,11.1 21.35,11.1V11.1Z"
                          fill="#FFFFFF"
                        />
                      </g>
                    </svg>
                    Sign in with Google
                  </button>
                </div>
              </div>
            </div>

            <div className="px-8 py-6 bg-[#1D1D1D] bg-opacity-30 text-center">
              <p className="text-[#C8C8C8]">
                Don't have an account?
                <a
                  href="/Register"
                  className="ml-1 font-medium text-[#FCAA29] hover:text-[#FC7729] transition-colors"
                >
                  Create an account
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
