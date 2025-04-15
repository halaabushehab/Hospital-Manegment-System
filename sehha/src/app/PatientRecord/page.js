"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import PatientRecordModal from "../components/PatientRecordModal";
import PatientRecordTable from "../components/PatientRecordTable";

export default function PatientRecordsPage() {
  const [records, setRecords] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchRecords();
  }, []);

  const fetchRecords = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/patient-records", {
        withCredentials: true,
      });
      setRecords(response.data);
    } catch (error) {
      console.error("Error fetching records:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //   const handleCreateRecord = async (recordData) => {
  //     try {
  //       await axios.post("/api/patient-records", recordData, {
  //         withCredentials: true,
  //       });
  //       fetchRecords();
  //       setIsModalOpen(false);
  //     } catch (error) {
  //       console.error("Error creating record:", error);
  //     }
  //   };
  //   const handleCreateRecord = async (recordData) => {
  //     try {
  //       console.log("📤 Sending recordData:", recordData); // Check this output
  //       await axios.post("/api/patient-records", recordData, {
  //         withCredentials: true,
  //       });
  //       fetchRecords();
  //       setIsModalOpen(false);
  //     } catch (error) {
  //       console.error("❌ Error creating record:", error);
  //     }
  //   };
  const handleCreateRecord = async (recordData) => {
    try {
      if (recordData._id) {
        // Update existing record
        await axios.put(`/api/patient-records/${recordData._id}`, recordData, {
          withCredentials: true,
        });
      } else {
        // Create new record
        await axios.post("/api/patient-records", recordData, {
          withCredentials: true,
        });
      }

      fetchRecords();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating/updating record:", error);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Patient Records</h1>
        <button
          onClick={() => {
            setSelectedRecord(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Record
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <PatientRecordTable
          records={records}
          onEdit={(record) => {
            setSelectedRecord(record);
            setIsModalOpen(true);
          }}
        />
      )}

      <PatientRecordModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleCreateRecord}
        initialData={selectedRecord}
      />
    </div>
  );
}
