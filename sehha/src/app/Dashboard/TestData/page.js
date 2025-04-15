"use client";
import { useState } from "react";
import axios from "axios";

export default function TestDataPage() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const generateTestData = async () => {
    try {
      setIsGenerating(true);
      setError(null);
      const response = await axios.post(
        "/api/test-data",
        {},
        {
          withCredentials: true,
        }
      );
      setResult(response.data);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to generate test data");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Generate Test Data</h1>

      <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl">
        <h2 className="text-xl font-semibold mb-4">Analytics Test Data</h2>
        <p className="mb-4">
          This will generate 3 months of realistic test data including:
        </p>
        <ul className="list-disc pl-5 mb-6">
          <li>Appointments (completed and cancelled)</li>
          <li>Patient medical records</li>
          <li>Various diagnoses and treatments</li>
          <li>Realistic revenue data</li>
        </ul>

        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
          <p className="text-yellow-700">
            <strong>Note:</strong> This will create realistic but fake data.
            Existing test data will be deleted.
          </p>
        </div>

        <button
          onClick={generateTestData}
          disabled={isGenerating}
          className={`px-4 py-2 rounded text-white ${
            isGenerating ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isGenerating ? "Generating..." : "Generate Test Data"}
        </button>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded border border-red-200">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="mt-4 p-4 bg-green-50 text-green-700 rounded border border-green-200">
            <p>Successfully generated:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>{result.appointments} appointments</li>
              <li>{result.records} patient records</li>
            </ul>
            <p className="mt-2 font-medium">
              You can now view this data in your Analytics dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
