"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function UserProfilePage() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    profilePicture: "",
    petType: "",
    petName: "",
    petAge: "", // Controlled as a string for the input
  });
  const [updatedData, setUpdatedData] = useState(userData);
  const [appointments, setAppointments] = useState([]);
  const [editing, setEditing] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  // Fetch user profile data
  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get("/api/user/profile");
        const user = response.data;
        // Convert petAge to string for controlled components
        setUserData({
          ...user,
          petAge:
            user.petAge !== undefined && user.petAge !== null
              ? String(user.petAge)
              : "",
        });
        setUpdatedData({
          ...user,
          petAge:
            user.petAge !== undefined && user.petAge !== null
              ? String(user.petAge)
              : "",
        });
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError("Failed to fetch user data.");
      }
    }
    fetchUserData();
  }, []);

  // Fetch the user's reserved appointments
  useEffect(() => {
    async function fetchAppointments() {
      try {
        const response = await axios.get("/api/user/appointments");
        if (response.data.appointments) {
          setAppointments(response.data.appointments);
        }
      } catch (err) {
        console.error("Error fetching appointments:", err);
      }
    }
    fetchAppointments();
  }, []);

  const handleChange = (e) => {
    setUpdatedData({ ...updatedData, [e.target.name]: e.target.value });
  };

  const handleSave = async (e) => {
    e.preventDefault();
    // Convert petAge to a number before sending
    const payload = {
      ...updatedData,
      petAge:
        updatedData.petAge !== "" ? Number(updatedData.petAge) : undefined,
    };

    try {
      const response = await axios.put("/api/user/profile", payload);
      if (response.status === 200) {
        setUserData({
          ...payload,
          petAge: payload.petAge !== undefined ? String(payload.petAge) : "",
        });
        setUpdatedData({
          ...payload,
          petAge: payload.petAge !== undefined ? String(payload.petAge) : "",
        });
        setEditing(false);
      }
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("Failed to update user data.");
    }
  };

  const handleEditToggle = () => {
    setEditing(!editing);
  };

  return (
    <div className="min-h-screen bg-[#1D1D1D]">
      {/* Decorative top bar */}
      <div className="h-2 bg-gradient-to-r from-[#FC7729] to-[#FCAA29]"></div>

      <div className="container mx-auto px-4 py-12">
        {error && (
          <div className="mb-8 bg-red-500 bg-opacity-10 border-l-4 border-red-500 p-4 rounded-r">
            <p className="text-red-400">{error}</p>
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Profile Overview & Appointments */}
          <div className="lg:w-1/3">
            <div className="bg-[#303241] rounded-2xl overflow-hidden shadow-lg mb-6">
              <div className="h-24 bg-gradient-to-r from-[#FC7729] to-[#FCAA29]"></div>
              <div className="px-6 pb-6 -mt-12">
                <div className="flex justify-center">
                  {userData.profilePicture ? (
                    <img
                      src={userData.profilePicture}
                      alt="Profile"
                      className="w-24 h-24 rounded-full border-4 border-[#303241] object-cover bg-[#1D1D1D]"
                    />
                  ) : (
                    <div className="w-24 h-24 rounded-full border-4 border-[#303241] flex items-center justify-center bg-[#1D1D1D]">
                      <span className="text-2xl text-[#F2C94C]">
                        {userData.name
                          ? userData.name.charAt(0).toUpperCase()
                          : "?"}
                      </span>
                    </div>
                  )}
                </div>

                <div className="text-center mt-4">
                  <h2 className="text-xl font-bold text-[#FFFFFF]">
                    {userData.name}
                  </h2>
                  <p className="text-[#C8C8C8] text-sm mt-1">
                    {userData.email}
                  </p>
                </div>

                {!editing && (
                  <div className="mt-6 pt-6 border-t border-[#1D1D1D]">
                    <div className="flex items-center mb-3">
                      <div className="w-10 h-10 rounded-full bg-[#1D1D1D] flex items-center justify-center mr-3">
                        {/* Icon */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-[#FCAA29]"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-[#C8C8C8] text-xs">Phone</p>
                        <p className="text-[#FFFFFF]">
                          {userData.phoneNumber || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {!editing && (
                  <button
                    onClick={handleEditToggle}
                    className="w-full mt-6 bg-[#FC7729] hover:bg-[#FCAA29] text-white py-2 px-4 rounded transition-colors duration-300"
                  >
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {/* Appointments Overview */}
            <div className="bg-[#303241] rounded-2xl p-6 shadow-lg mb-6">
              <h3 className="text-[#FCAA29] font-medium mb-4">
                My Appointments
              </h3>
              {appointments.length > 0 ? (
                <ul className="space-y-2">
                  {appointments.map((appointment) => (
                    <li key={appointment._id} className="text-[#FFFFFF]">
                      Date: {new Date(appointment.date).toLocaleDateString()}{" "}
                      &middot; Time: {appointment.startTime} -{" "}
                      {appointment.endTime}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[#C8C8C8]">No appointments reserved.</p>
              )}
            </div>
          </div>

          {/* Right Column - Main Content (Profile Details and Edit Form) */}
          <div className="lg:w-2/3">
            <div className="bg-[#303241] rounded-2xl p-6 shadow-lg">
              <h1 className="text-2xl font-bold text-[#FC7729] pb-4 border-b border-[#1D1D1D] mb-6">
                {editing ? "Edit Profile Information" : "Profile Information"}
              </h1>

              {editing ? (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-[#F2C94C] text-sm font-medium mb-2"
                        htmlFor="name"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={updatedData.name}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#1D1D1D] border border-[#1D1D1D] focus:border-[#FCAA29] rounded-lg p-3 text-[#FFFFFF] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label
                        className="block text-[#F2C94C] text-sm font-medium mb-2"
                        htmlFor="phoneNumber"
                      >
                        Phone Number
                      </label>
                      <input
                        id="phoneNumber"
                        type="tel"
                        name="phoneNumber"
                        value={updatedData.phoneNumber}
                        onChange={handleChange}
                        className="w-full bg-[#1D1D1D] border border-[#1D1D1D] focus:border-[#FCAA29] rounded-lg p-3 text-[#FFFFFF] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-[#F2C94C] text-sm font-medium mb-2"
                      htmlFor="profilePicture"
                    >
                      Profile Picture URL
                    </label>
                    <input
                      id="profilePicture"
                      type="text"
                      name="profilePicture"
                      value={updatedData.profilePicture}
                      onChange={handleChange}
                      className="w-full bg-[#1D1D1D] border border-[#1D1D1D] focus:border-[#FCAA29] rounded-lg p-3 text-[#FFFFFF] focus:outline-none"
                    />
                  </div>

                  <div className="pt-6 border-t border-[#1D1D1D]">
                    <h3 className="text-xl font-medium text-[#F2C94C] mb-4">
                      Pet Details
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label
                          className="block text-[#F2C94C] text-sm font-medium mb-2"
                          htmlFor="petName"
                        >
                          Pet Name
                        </label>
                        <input
                          id="petName"
                          type="text"
                          name="petName"
                          value={updatedData.petName}
                          onChange={handleChange}
                          className="w-full bg-[#1D1D1D] border border-[#1D1D1D] focus:border-[#FCAA29] rounded-lg p-3 text-[#FFFFFF] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label
                          className="block text-[#F2C94C] text-sm font-medium mb-2"
                          htmlFor="petAge"
                        >
                          Pet Age
                        </label>
                        <input
                          id="petAge"
                          type="number"
                          name="petAge"
                          value={updatedData.petAge}
                          onChange={handleChange}
                          className="w-full bg-[#1D1D1D] border border-[#1D1D1D] focus:border-[#FCAA29] rounded-lg p-3 text-[#FFFFFF] focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-end space-x-4 pt-6">
                    <button
                      type="button"
                      onClick={handleEditToggle}
                      className="px-6 py-2 bg-transparent border border-[#C8C8C8] text-[#C8C8C8] rounded-lg hover:bg-[#1D1D1D] transition-colors duration-300"
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2 bg-[#FC7729] hover:bg-[#FCAA29] text-white rounded-lg transition-colors duration-300"
                    >
                      Save Changes
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-8">
                  <div>
                    <h3 className="text-[#F2C94C] font-medium mb-4">
                      Account Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                      <div>
                        <p className="text-[#C8C8C8] text-sm">Name</p>
                        <p className="text-[#FFFFFF]">{userData.name}</p>
                      </div>
                      <div>
                        <p className="text-[#C8C8C8] text-sm">Email</p>
                        <p className="text-[#FFFFFF]">{userData.email}</p>
                      </div>
                      <div>
                        <p className="text-[#C8C8C8] text-sm">Phone</p>
                        <p className="text-[#FFFFFF]">
                          {userData.phoneNumber || "Not provided"}
                        </p>
                      </div>
                    </div>
                  </div>

                  {userData.petName && (
                    <div className="pt-6 border-t border-[#1D1D1D]">
                      <h3 className="text-[#F2C94C] font-medium mb-4">
                        Pet Information
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-y-6 gap-x-8">
                        <div>
                          <p className="text-[#C8C8C8] text-sm">Pet Name</p>
                          <p className="text-[#FFFFFF]">{userData.petName}</p>
                        </div>
                        <div>
                          <p className="text-[#C8C8C8] text-sm">Pet Type</p>
                          <p className="text-[#FFFFFF]">
                            {userData.petType || "Not specified"}
                          </p>
                        </div>
                        <div>
                          <p className="text-[#C8C8C8] text-sm">Pet Age</p>
                          <p className="text-[#FFFFFF]">
                            {userData.petAge !== undefined &&
                            userData.petAge !== null &&
                            userData.petAge !== ""
                              ? `Age: ${userData.petAge}`
                              : "Age not provided"}
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
