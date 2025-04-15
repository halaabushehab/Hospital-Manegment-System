"use client";
import React from "react";

export default function AppointmentForm({
  formData,
  onChange,
  onSubmit,
  isSubmitting,
  onBack,
}) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Appointment Details</h2>
        <button
          onClick={onBack}
          type="button"
          className="text-blue-600 hover:underline flex items-center"
        >
          <span className="mr-1">←</span> Back
        </button>
      </div>

      {/** Display selected department, date, and time details */}
      <div className="mb-6">
        <h3 className="font-medium mb-2">Selected Information</h3>
        <div className="bg-gray-50 p-4 rounded-md">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-gray-500">Department</p>
              <p className="font-medium">{formData.department}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Date</p>
              <p className="font-medium">
                {new Date(formData.date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Time</p>
              <p className="font-medium">
                {formData.startTime} - {formData.endTime}
              </p>
            </div>
          </div>
          <div className="mt-2 text-xs text-gray-400">
            Doctor ID: {formData.doctorId || "Not selected"}
          </div>
        </div>
      </div>

      {/** Form for entering additional appointment details */}
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div>
            <label
              htmlFor="reason"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Reason for Visit
            </label>
            <select
              id="reason"
              name="reason"
              value={formData.reason}
              onChange={onChange}
              required
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="">Select reason</option>
              <option value="Consultation">Consultation</option>
              <option value="Follow-up">Follow-up</option>
              <option value="Test Results">Test Results</option>
              <option value="Treatment">Treatment</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Additional Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              rows="3"
              value={formData.notes}
              onChange={onChange}
              placeholder="Any additional information the doctor should know..."
              className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="emergency"
              name="emergency"
              checked={formData.emergency}
              onChange={(e) =>
                onChange({
                  target: { name: "emergency", value: e.target.checked },
                })
              }
              className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
            />
            <label htmlFor="emergency" className="ml-2 text-sm text-gray-700">
              This is an emergency
            </label>
          </div>
        </div>

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting || !formData.reason || !formData.doctorId}
            className={`px-6 py-2 rounded-md ${
              isSubmitting || !formData.reason || !formData.doctorId
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {isSubmitting ? "Booking..." : "Book Appointment"}
          </button>
        </div>
      </form>
    </div>
  );
}
