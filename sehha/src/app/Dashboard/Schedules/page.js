// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import { format, addDays, isSameDay, parseISO } from "date-fns";
// import AppointmentModal from "../../components/AppointmentModal";
// // import DoctorSelector from "@/components/DoctorSelector";
// import TimeSlotCalendar from "../../components/TimeSlotCalendar";

// export default function SchedulesPage() {
//   const [appointments, setAppointments] = useState([]);
//   const [doctors, setDoctors] = useState([]);
//   const [selectedDoctor, setSelectedDoctor] = useState(null);
//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     fetchDoctors();
//   }, []);

//   useEffect(() => {
//     if (selectedDoctor) {
//       fetchAppointments();
//     }
//   }, [selectedDoctor, selectedDate]);

//   const fetchDoctors = async () => {
//     try {
//       const response = await axios.get("/api/admin/users", {
//         params: { role: "doctor" },
//         withCredentials: true,
//       });
//       setDoctors(response.data);
//       if (response.data.length > 0) {
//         setSelectedDoctor(response.data[0]._id);
//       }
//     } catch (error) {
//       console.error("Error fetching doctors:", error);
//     }
//   };

//   const fetchAppointments = async () => {
//     try {
//       setIsLoading(true);
//       const response = await axios.get("/api/admin/appointments", {
//         params: {
//           doctorId: selectedDoctor,
//           date: selectedDate.toISOString(),
//         },
//         withCredentials: true,
//       });
//       setAppointments(response.data);
//     } catch (error) {
//       console.error("Error fetching appointments:", error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleDateChange = (date) => {
//     setSelectedDate(date);
//   };

//   const handleCreateAppointment = async (appointmentData) => {
//     try {
//       await axios.post("/api/admin/appointments", appointmentData, {
//         withCredentials: true,
//       });
//       fetchAppointments();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error creating appointment:", error);
//       if (error.response?.data?.conflictingAppointment) {
//         alert(
//           `Time slot conflict with ${error.response.data.conflictingAppointment.patient} at ${error.response.data.conflictingAppointment.time}`
//         );
//       } else {
//         alert("Failed to create appointment");
//       }
//     }
//   };

//   const handleUpdateAppointment = async (id, updateData) => {
//     try {
//       await axios.put(`/api/admin/appointments/${id}`, updateData, {
//         withCredentials: true,
//       });
//       fetchAppointments();
//       setIsModalOpen(false);
//     } catch (error) {
//       console.error("Error updating appointment:", error);
//       alert("Failed to update appointment");
//     }
//   };

//   const handleCancelAppointment = async (id) => {
//     if (confirm("Are you sure you want to cancel this appointment?")) {
//       try {
//         await axios.delete(`/api/admin/appointments/${id}`, {
//           withCredentials: true,
//         });
//         fetchAppointments();
//       } catch (error) {
//         console.error("Error cancelling appointment:", error);
//         alert("Failed to cancel appointment");
//       }
//     }
//   };

//   const handleStatusChange = async (id, status) => {
//     try {
//       await axios.put(
//         `/api/admin/appointments/${id}`,
//         { status },
//         { withCredentials: true }
//       );
//       fetchAppointments();
//     } catch (error) {
//       console.error("Error updating status:", error);
//       alert("Failed to update status");
//     }
//   };

//   return (
//     <div className="p-6">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold">Doctor Schedules</h1>
//         <button
//           onClick={() => {
//             setSelectedAppointment(null);
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add New Appointment
//         </button>
//       </div>

//       <div className="bg-white p-4 rounded-lg shadow mb-6">
//         <div className="flex flex-wrap items-center gap-4">
//           <div className="flex items-center space-x-2">
//             <span className="font-medium">Doctor:</span>
//             <select
//               value={selectedDoctor || ""}
//               onChange={(e) => setSelectedDoctor(e.target.value)}
//               className="border rounded p-2"
//             >
//               {doctors.map((doctor) => (
//                 <option key={doctor._id} value={doctor._id}>
//                   Dr. {doctor.name} ({doctor.department})
//                 </option>
//               ))}
//             </select>
//           </div>

//           <div className="flex items-center space-x-2">
//             <span className="font-medium">Date:</span>
//             <input
//               type="date"
//               value={format(selectedDate, "yyyy-MM-dd")}
//               onChange={(e) => setSelectedDate(parseISO(e.target.value))}
//               className="border rounded p-2"
//             />
//             <button
//               onClick={() => setSelectedDate(addDays(selectedDate, -1))}
//               className="px-3 py-1 bg-gray-200 rounded"
//             >
//               &lt;
//             </button>
//             <button
//               onClick={() => setSelectedDate(addDays(selectedDate, 1))}
//               className="px-3 py-1 bg-gray-200 rounded"
//             >
//               &gt;
//             </button>
//             <button
//               onClick={() => setSelectedDate(new Date())}
//               className="px-3 py-1 bg-gray-200 rounded"
//             >
//               Today
//             </button>
//           </div>
//         </div>
//       </div>

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <TimeSlotCalendar
//           appointments={appointments}
//           selectedDate={selectedDate}
//           onEdit={(appointment) => {
//             setSelectedAppointment(appointment);
//             setIsModalOpen(true);
//           }}
//           onCancel={handleCancelAppointment}
//           onStatusChange={handleStatusChange}
//         />
//       )}

//       <AppointmentModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={
//           selectedAppointment
//             ? (data) => handleUpdateAppointment(selectedAppointment._id, data)
//             : handleCreateAppointment
//         }
//         initialData={selectedAppointment}
//         doctors={doctors}
//         selectedDate={selectedDate}
//       />
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { format, addDays, isSameDay, parseISO } from "date-fns";
import AppointmentModal from "../../components/AppointmentModal";
// import DoctorSelector from "@/components/DoctorSelector";
import TimeSlotCalendar from "../../components/TimeSlotCalendar";

export default function SchedulesPage() {
  const [appointments, setAppointments] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patient, setPatient] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [selectedPatien, setSelectedPatient] = useState(null);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDoctors();
    fetchPatients();
  }, []);

  useEffect(() => {
    if (selectedDoctor) {
      fetchAppointments();
    }
  }, [selectedDoctor, selectedDate]);

  const fetchDoctors = async () => {
    try {
      const response = await axios.get("/api/admin/users", {
        params: { role: "doctor" },
        withCredentials: true,
      });
      setDoctors(response.data);
      if (response.data.length > 0) {
        setSelectedDoctor(response.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };
  const fetchPatients = async () => {
    try {
      const response = await axios.get("/api/admin/users", {
        params: { role: "patient" },
        withCredentials: true,
      });

      setPatient(response.data);
      if (response.data.length > 0) {
        setSelectedPatient(response.data[0]._id);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  const fetchAppointments = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/admin/appointments", {
        params: {
          doctorId: selectedDoctor,
          // date: selectedDate.toISOString(),
          date: selectedDate.toLocaleDateString("en-CA"),
        },
        withCredentials: true,
      });
      console.log(response.data);
      console.log("Selected date:", selectedDate.toISOString().split("T")[0]);
      setAppointments(response.data);
    } catch (error) {
      console.error("Error fetching appointments:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleCreateAppointment = async (appointmentData) => {
    try {
      await axios.post("/api/admin/appointments", appointmentData, {
        withCredentials: true,
      });
      fetchAppointments();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error creating appointment:", error);
      if (error.response?.data?.conflictingAppointment) {
        alert(
          `Time slot conflict with ${error.response.data.conflictingAppointment.patient} at ${error.response.data.conflictingAppointment.time}`
        );
      } else {
        alert("Failed to create appointment");
      }
    }
  };

  const handleUpdateAppointment = async (id, updateData) => {
    try {
      await axios.put(`/api/admin/appointments/${id}`, updateData, {
        withCredentials: true,
      });
      fetchAppointments();
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error updating appointment:", error);
      alert("Failed to update appointment");
    }
  };

  const handleCancelAppointment = async (id) => {
    if (confirm("Are you sure you want to cancel this appointment?")) {
      try {
        await axios.delete(`/api/admin/appointments/${id}`, {
          withCredentials: true,
        });
        fetchAppointments();
      } catch (error) {
        console.error("Error cancelling appointment:", error);
        alert("Failed to cancel appointment");
      }
    }
  };

  const handleStatusChange = async (id, status) => {
    try {
      await axios.put(
        `/api/admin/appointments/${id}`,
        { status },
        { withCredentials: true }
      );
      fetchAppointments();
    } catch (error) {
      console.error("Error updating status:", error);
      alert("Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Doctor Schedules</h1>
        <button
          onClick={() => {
            setSelectedAppointment(null);
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Appointment
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-medium">Doctor:</span>
            <select
              value={selectedDoctor || ""}
              onChange={(e) => setSelectedDoctor(e.target.value)}
              className="border rounded p-2"
            >
              {doctors.map((doctor) => (
                <option key={doctor._id} value={doctor._id}>
                  Dr. {doctor.name} ({doctor.department})
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center space-x-2">
            <span className="font-medium">Date:</span>
            <input
              type="date"
              value={format(selectedDate, "yyyy-MM-dd")}
              onChange={(e) => setSelectedDate(new Date(e.target.value))}
              className="border rounded p-2"
            />
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, -1))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              &lt;
            </button>
            <button
              onClick={() => setSelectedDate(addDays(selectedDate, 1))}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              &gt;
            </button>
            <button
              onClick={() => setSelectedDate(new Date())}
              className="px-3 py-1 bg-gray-200 rounded"
            >
              Today
            </button>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <TimeSlotCalendar
          appointments={appointments}
          selectedDate={selectedDate}
          onEdit={(appointment) => {
            setSelectedAppointment(appointment);
            setIsModalOpen(true);
          }}
          onCancel={handleCancelAppointment}
          onStatusChange={handleStatusChange}
        />
      )}

      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={
          selectedAppointment
            ? (data) => handleUpdateAppointment(selectedAppointment._id, data)
            : handleCreateAppointment
        }
        initialData={selectedAppointment}
        doctors={doctors}
        selectedDate={selectedDate}
        patients={patient}
      />
    </div>
  );
}
