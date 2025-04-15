"use client";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export default function AppointmentModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  doctors,
  selectedDate,
  patients, // 👈 Add this
}) {
  const [formData, setFormData] = useState({
    patientId: "",
    doctorId: doctors.length > 0 ? doctors[0]._id : "",
    department: "",
    date: selectedDate,
    startTime: "09:00",
    endTime: "10:00",
    emergency: false,
    reason: "",
    notes: "",
    status: "approved",
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        patientId: initialData.patientId?._id || "",
        doctorId: initialData.doctorId?._id || "",
        department: initialData.department || "",
        date: new Date(initialData.date),
        startTime: initialData.startTime,
        endTime: initialData.endTime,
        emergency: initialData.emergency || false,
        reason: initialData.reason || "",
        notes: initialData.notes || "",
        status: initialData.status || "approved",
      });
    } else if (doctors.length > 0) {
      setFormData((prev) => ({
        ...prev,
        doctorId: doctors[0]._id,
        department: doctors[0].department,
        date: selectedDate,
      }));
    }
  }, [initialData, doctors, selectedDate]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleTimeChange = (field, value) => {
    // Validate time format
    if (/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value)) {
      setFormData((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      date: formData.date.toISOString(),
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">
              {initialData ? "Edit Appointment" : "Add New Appointment"}
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
            >
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
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Doctor
                </label>
                <select
                  name="doctorId"
                  value={formData.doctorId}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                >
                  {doctors.map((doctor) => (
                    <option key={doctor._id} value={doctor._id}>
                      Dr. {doctor.name} ({doctor.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Department
                </label>
                <input
                  type="text"
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <DatePicker
                  selected={formData.date}
                  onChange={(date) =>
                    setFormData((prev) => ({ ...prev, date }))
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time
                </label>
                <input
                  type="time"
                  name="startTime"
                  value={formData.startTime}
                  onChange={(e) =>
                    handleTimeChange("startTime", e.target.value)
                  }
                  className="w-full p-2 border rounded"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  End Time
                </label>
                <input
                  type="time"
                  name="endTime"
                  value={formData.endTime}
                  onChange={(e) => handleTimeChange("endTime", e.target.value)}
                  className="w-full p-2 border rounded"
                  required
                />
              </div>
            </div>

            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="emergency"
                  checked={formData.emergency}
                  onChange={handleChange}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="ml-2 text-sm text-gray-700">
                  Emergency Appointment
                </span>
              </label>
            </div>

            {/* <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Patient ID
              </label>
              <input
                type="text"
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
                placeholder="Enter patient ID"
              />
            </div> */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Patient
              </label>
              <select
                name="patientId"
                value={formData.patientId}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">-- Select a patient --</option>
                {patients.map((patient) => (
                  <option key={patient._id} value={patient._id}>
                    {patient.name} ({patient.email})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Reason
              </label>
              <input
                type="text"
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="w-full p-2 border rounded"
                rows={3}
              />
            </div>

            {initialData && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full p-2 border rounded"
                >
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
              >
                {initialData ? "Update Appointment" : "Create Appointment"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
