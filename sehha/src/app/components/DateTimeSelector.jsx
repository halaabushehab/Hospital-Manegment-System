// src/components/DateTimeSelector.jsx
"use client";

import { useState, useEffect } from "react";

export default function DateTimeSelector({ doctorId, onSelect, onBack }) {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  // Get the next 7 days for the date selector
  const nextDays = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Format date as YYYY-MM-DD for the input
  const formatDateForInput = (date) => {
    return date.toISOString().split("T")[0];
  };

  // Format date for display
  const formatDateForDisplay = (date) => {
    return new Intl.DateTimeFormat("en-US", {
      weekday: "short",
      month: "short",
      day: "numeric",
    }).format(date);
  };

  // Get day of week from date
  const getDayOfWeek = (date) => {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return days[new Date(date).getDay()];
  };

  useEffect(() => {
    const fetchDoctorDetails = async () => {
      try {
        // In a real app, you would fetch the doctor's details including availability
        // For this example, we'll simulate it with a timeout
        setLoading(true);

        // Simulated doctor data - in a real app, fetch from API
        setTimeout(() => {
          const mockDoctor = {
            _id: doctorId,
            userId: { name: "John Smith" },
            availability: [
              {
                day: "Mon",
                slots: [
                  { start: "09:00", end: "09:30" },
                  { start: "10:00", end: "10:30" },
                  { start: "11:00", end: "11:30" },
                ],
              },
              {
                day: "Tue",
                slots: [
                  { start: "09:00", end: "09:30" },
                  { start: "10:00", end: "10:30" },
                ],
              },
              {
                day: "Wed",
                slots: [
                  { start: "14:00", end: "14:30" },
                  { start: "15:00", end: "15:30" },
                ],
              },
              {
                day: "Thu",
                slots: [
                  { start: "09:00", end: "09:30" },
                  { start: "16:00", end: "16:30" },
                ],
              },
              {
                day: "Fri",
                slots: [
                  { start: "11:00", end: "11:30" },
                  { start: "13:00", end: "13:30" },
                ],
              },
            ],
          };

          setDoctor(mockDoctor);
          setLoading(false);
        }, 800);
      } catch (err) {
        setError("Failed to load doctor details. Please try again.");
        setLoading(false);
      }
    };

    fetchDoctorDetails();
  }, [doctorId]);

  useEffect(() => {
    if (selectedDate && doctor) {
      const dayOfWeek = getDayOfWeek(selectedDate);
      const dayAvailability = doctor.availability.find(
        (a) => a.day === dayOfWeek
      );
      setAvailableSlots(dayAvailability ? dayAvailability.slots : []);
    } else {
      setAvailableSlots([]);
    }
  }, [selectedDate, doctor]);

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // const handleContinue = () => {
  //   if (selectedDate && selectedSlot) {
  //     onSelect(selectedDate, selectedSlot.start, selectedSlot.end);
  //   }
  // };

  //////////////ali
  const handleContinue = () => {
    if (selectedDate && selectedSlot) {
      // تنسيق التاريخ كما يفعل الإدمن (بدون وقت)
      const formattedDate = new Date(selectedDate);
      formattedDate.setHours(0, 0, 0, 0); // إعادة الضبط لمنتصف الليل

      onSelect(
        formattedDate.toISOString(), // التاريخ الجديد
        selectedSlot.start,
        selectedSlot.end
      );
    }
  };
  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        <p className="mt-2">Loading doctor's schedule...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 p-4 rounded-lg">
        <p className="text-red-700">{error}</p>
        <button
          onClick={onBack}
          className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Select Date & Time</h2>
        <button
          onClick={onBack}
          className="text-blue-600 hover:underline flex items-center"
        >
          <span className="mr-1">←</span> Back
        </button>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium mb-3">Select Date</h3>
        <div className="grid grid-cols-7 gap-2">
          {nextDays.map((date) => {
            const formattedDate = formatDateForInput(date);
            const isSelected = selectedDate === formattedDate;

            return (
              <button
                key={formattedDate}
                onClick={() => handleDateSelect(formattedDate)}
                className={`p-2 border rounded-md text-center transition-colors ${
                  isSelected
                    ? "bg-blue-600 text-white border-blue-600"
                    : "hover:bg-blue-50"
                }`}
              >
                <div className="text-xs">
                  {date.toLocaleDateString("en-US", { weekday: "short" })}
                </div>
                <div className="text-lg font-medium">{date.getDate()}</div>
                <div className="text-xs">
                  {date.toLocaleDateString("en-US", { month: "short" })}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-3">Select Time</h3>

          {availableSlots.length === 0 ? (
            <p className="text-gray-500">No available slots for this date.</p>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot, index) => {
                const isSelected =
                  selectedSlot &&
                  selectedSlot.start === slot.start &&
                  selectedSlot.end === slot.end;

                return (
                  <button
                    key={index}
                    onClick={() => handleSlotSelect(slot)}
                    className={`p-2 border rounded-md text-center transition-colors ${
                      isSelected
                        ? "bg-blue-600 text-white border-blue-600"
                        : "hover:bg-blue-50"
                    }`}
                  >
                    {slot.start} - {slot.end}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div className="mt-6 flex justify-end">
        <button
          onClick={handleContinue}
          disabled={!selectedDate || !selectedSlot}
          className={`px-6 py-2 rounded-md ${
            selectedDate && selectedSlot
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          Continue
        </button>
      </div>
    </div>
  );
}
