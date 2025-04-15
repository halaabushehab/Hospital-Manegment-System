// "use client";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import { useState } from "react";

// // Updated navigation links for veterinary focus
// const navLinks = [
//   { name: "Home", path: "/" },
//   { name: "Services", path: "/services" },
//   { name: "Veterinarians", path: "/veterinarians" },
//   { name: "Appointments", path: "/appointment" },
//   { name: "Pet Portal", path: "/pet-portal" },
//   { name: "Medical Records", path: "/medical-records" },
//   { name: "Insurance", path: "/insurance" },
//   { name: "About Us", path: "/about" },
//   { name: "Contact", path: "/contact" },
// ];

// export default function Navbar() {
//   const pathname = usePathname();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   // Color palette from your requirements
//   const colors = {
//     gold: "#FCAA29",
//     white: "#FFFFFF",
//     lightGray: "#C8C8C8",
//     black: "#000000",
//     darkBlue: "#303241",
//     yellow: "#F2C94C",
//     darkGray: "#1D1D1D",
//     orange: "#FC7729",
//   };

//   return (
//     <nav className="bg-[#303241] shadow-lg border-b-4 border-[#FC7729]">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           {/* Logo and Brand */}
//           <div className="flex items-center">
//             <Link href="/" className="flex items-center">
//               <span className="text-[#F2C94C] text-2xl mr-2">🐾</span>
//               <span className="text-[#FFFFFF] font-bold text-xl">VetNova</span>
//             </Link>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:block">
//             <div className="flex items-center space-x-1">
//               {navLinks.map((link) => (
//                 <Link
//                   key={link.path}
//                   href={link.path}
//                   className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200
//                     ${
//                       pathname === link.path
//                         ? "bg-[#FCAA29] text-[#1D1D1D]"
//                         : "text-[#FFFFFF] hover:bg-[#1D1D1D] hover:text-[#F2C94C]"
//                     }`}
//                 >
//                   {link.name}
//                 </Link>
//               ))}
//             </div>
//           </div>

//           {/* Login and Register Buttons */}
//           <div className="hidden md:flex items-center space-x-3">
//             <Link
//               href="/Register"
//               className="bg-[#F2C94C] text-[#1D1D1D] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold text-sm shadow-md transition-all duration-200 border border-[#FFFFFF]"
//             >
//               Register
//             </Link>
//             <Link
//               href="/Login"
//               className="bg-[#FC7729] text-[#FFFFFF] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold text-sm shadow-md transition-all duration-200 border border-[#FFFFFF]"
//             >
//               Login
//             </Link>
//           </div>

//           {/* Mobile Menu Button */}
//           <div className="md:hidden flex items-center">
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="text-[#FFFFFF] hover:text-[#F2C94C] focus:outline-none"
//               aria-label="Toggle menu"
//             >
//               {!isMenuOpen ? (
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M4 6h16M4 12h16M4 18h16"
//                   />
//                 </svg>
//               ) : (
//                 <svg
//                   className="h-6 w-6"
//                   fill="none"
//                   viewBox="0 0 24 24"
//                   stroke="currentColor"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M6 18L18 6M6 6l12 12"
//                   />
//                 </svg>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 bg-[#303241]">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 href={link.path}
//                 className={`block px-3 py-2 rounded-md text-base font-medium
//                   ${
//                     pathname === link.path
//                       ? "bg-[#FCAA29] text-[#1D1D1D]"
//                       : "text-[#FFFFFF] hover:bg-[#1D1D1D] hover:text-[#F2C94C]"
//                   }`}
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 {link.name}
//               </Link>
//             ))}
//             <div className="flex flex-col space-y-2 mt-4">
//               <Link
//                 href="/Register"
//                 className="block w-full text-center bg-[#F2C94C] text-[#1D1D1D] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold border border-[#FFFFFF]"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Register
//               </Link>
//               <Link
//                 href="/Login"
//                 className="block w-full text-center bg-[#FC7729] text-[#FFFFFF] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold border border-[#FFFFFF]"
//                 onClick={() => setIsMenuOpen(false)}
//               >
//                 Login
//               </Link>
//             </div>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }
"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";

// Updated navigation links based on roles
const commonNavLinks = [
  { name: "Home", path: "/" },
  { name: "About", path: "/aboutUs" },
  { name: "Contact Us", path: "/ContactUs" },
  { name: "Pet Products", path: "/animal-products" },
  { name: "Appointments", path: "/appointment" },
  // { name: "Patient Record", path: "/PatientRecord" },
];

// Additional links for different roles
const patientLinks = [];

const doctorLinks = [{ name: "Patient Record", path: "/PatientRecord" }];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [navLinks, setNavLinks] = useState(commonNavLinks);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Fetch user info from an API endpoint instead of directly accessing cookies
    const fetchUserData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/auth/me", {
          method: "GET",
          credentials: "include", // Important to include cookies
        });

        if (response.ok) {
          const userData = await response.json();
          setUser(userData);

          // Set navigation links based on role
          if (userData.role === "doctor") {
            setNavLinks([...commonNavLinks, ...doctorLinks]);
          } else if (userData.role === "patient") {
            setNavLinks([...commonNavLinks, ...patientLinks]);
          } else {
            setNavLinks(commonNavLinks);
          }
        } else {
          // Not authenticated
          setUser(null);
          setNavLinks(commonNavLinks);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        setUser(null);
        setNavLinks(commonNavLinks);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setUser(null);
        setNavLinks(commonNavLinks);
        router.push("/");
        router.refresh(); // Force refresh to update the UI
      }
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <nav className="bg-[#303241] shadow-lg border-b-4 border-[#FC7729]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center">
              <span className="text-[#F2C94C] text-2xl mr-2">🐾</span>
              <span className="text-[#FFFFFF] font-bold text-xl">VetNova</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  href={link.path}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 
                    ${
                      pathname === link.path
                        ? "bg-[#FCAA29] text-[#1D1D1D]"
                        : "text-[#FFFFFF] hover:bg-[#1D1D1D] hover:text-[#F2C94C]"
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Login/Register or Profile */}
          <div className="hidden md:flex items-center space-x-3">
            {isLoading ? (
              <div className="text-white text-sm">Loading...</div>
            ) : !user ? (
              <>
                <Link
                  href="/register"
                  className="bg-[#F2C94C] text-[#1D1D1D] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold text-sm shadow-md transition-all duration-200 border border-[#FFFFFF]"
                >
                  Register
                </Link>
                <Link
                  href="/Login"
                  className="bg-[#FC7729] text-[#FFFFFF] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold text-sm shadow-md transition-all duration-200 border border-[#FFFFFF]"
                >
                  Login
                </Link>
              </>
            ) : (
              <div className="flex items-center space-x-3">
                <div className="relative group">
                  <button className="flex items-center space-x-2 bg-[#1D1D1D] text-[#FFFFFF] hover:bg-[#FC7729] px-3 py-2 rounded-md transition-all duration-200">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
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
                    <span className="text-sm font-medium">{user.name}</span>
                  </button>
                  <div className="absolute right-0 w-48 mt-2 origin-top-right bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                    <div className="py-1">
                      <Link
                        href="/UserProfile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        My Profile
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
                {/* {user.role && (
                  <div className="bg-[#F2C94C] px-2 py-1 rounded-md text-xs font-bold text-[#1D1D1D]">
                    {user.role}
                  </div>
                )} */}
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#FFFFFF] hover:text-[#F2C94C] focus:outline-none"
              aria-label="Toggle menu"
            >
              {!isMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-[#303241]">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`block px-3 py-2 rounded-md text-base font-medium
                  ${
                    pathname === link.path
                      ? "bg-[#FCAA29] text-[#1D1D1D]"
                      : "text-[#FFFFFF] hover:bg-[#1D1D1D] hover:text-[#F2C94C]"
                  }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}

            {/* Mobile Login/Register or Profile */}
            {isLoading ? (
              <div className="mt-4 px-3 py-2 text-white">Loading...</div>
            ) : !user ? (
              <div className="flex flex-col space-y-2 mt-4">
                <Link
                  href="/register"
                  className="block w-full text-center bg-[#F2C94C] text-[#1D1D1D] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold border border-[#FFFFFF]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Register
                </Link>
                <Link
                  href="/Login"
                  className="block w-full text-center bg-[#FC7729] text-[#FFFFFF] hover:bg-[#FCAA29] px-4 py-2 rounded-md font-bold border border-[#FFFFFF]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              </div>
            ) : (
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between bg-[#1D1D1D] px-3 py-2 rounded-md">
                  <div className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-[#FFFFFF] mr-2"
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
                    <span className="text-[#FFFFFF]">
                      {user.name || "Profile"}
                    </span>
                  </div>
                  {/* {user.role && (
                    <span className="bg-[#F2C94C] px-2 py-1 rounded-md text-xs font-bold text-[#1D1D1D]">
                      {user.role}
                    </span>
                  )} */}
                </div>
                <Link
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-[#FFFFFF] hover:bg-[#1D1D1D] hover:text-[#F2C94C]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  My Profile
                </Link>
                <Link
                  href="/settings"
                  className="block px-3 py-2 rounded-md text-[#FFFFFF] hover:bg-[#1D1D1D] hover:text-[#F2C94C]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Settings
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 rounded-md text-[#FFFFFF] hover:bg-[#1D1D1D] hover:text-[#F2C94C]"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
