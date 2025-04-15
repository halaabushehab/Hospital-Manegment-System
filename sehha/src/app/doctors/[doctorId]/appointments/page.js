// // app/doctors/[doctorId]/appointments/page.js
// "use client";

// import { useState, useEffect } from "react";
// import { useParams } from "next/navigation";

// export default function DoctorAppointments() {
//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [debug, setDebug] = useState({});
//   const params = useParams();
//   const doctorId = params.doctorId;

//   useEffect(() => {
//     async function fetchAppointments() {
//       if (!doctorId) {
//         setLoading(false);
//         setDebug((prev) => ({ ...prev, error: "No doctor ID provided" }));
//         return;
//       }

//       try {
     

//         // Now try the doctor appointments API
//         console.log(`Fetching appointments for doctor ID: ${doctorId}`);
//         const apiUrl = `/api/doctors/${doctorId}/appointments`;
//         setDebug((prev) => ({ ...prev, apiUrl }));

//         const response = await fetch(apiUrl);
//         setDebug((prev) => ({ ...prev, status: response.status }));

//         if (!response.ok) {
//           const errorText = await response.text();
//           console.error("API response not OK:", response.status, errorText);
//           let errorJson;
//           try {
//             errorJson = JSON.parse(errorText);
//           } catch (e) {
//             errorJson = { text: errorText };
//           }
//           setDebug((prev) => ({ ...prev, responseError: errorJson }));
//           throw new Error(`API error: ${response.status}`);
//         }

//         const data = await response.json();
//         console.log("Appointments data:", data);
//         setAppointments(data);
//       } catch (err) {
//         console.error("Error details:", err);
//         setError(err.message || "Failed to fetch appointments");
//         setDebug((prev) => ({ ...prev, fetchError: err.toString() }));
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchAppointments();
//   }, [doctorId]);

//   if (loading)
//     return (
//       <div className="flex justify-center p-8">Loading appointments...</div>
//     );

//   return (
//     <div className="p-6">
//       <h1 className="text-2xl font-bold mb-6">Doctor Appointments</h1>
//       <p className="mb-4">Doctor ID: {doctorId}</p>

//       {error && (
//         <div className="text-red-500 p-4 mb-4">
//           <h2 className="font-bold">Error loading appointments</h2>
//           <p>{error}</p>

//           <div className="mt-4 p-4 bg-gray-100 rounded">
//             <h3 className="font-bold">Debug Information</h3>
//             <pre className="mt-2 text-xs overflow-auto">
//               {JSON.stringify(debug, null, 2)}
//             </pre>
//           </div>
//         </div>
//       )}

//       {!error && appointments.length === 0 ? (
//         <p>No appointments found for this doctor.</p>
//       ) : (
//         <div className="bg-white rounded-lg shadow">
//           <table className="min-w-full divide-y divide-gray-200">
//             <thead className="bg-gray-50">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Patient ID
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Date
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Time
//                 </th>
//                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                   Status
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white divide-y divide-gray-200">
//               {appointments.map((appointment) => (
//                 <tr key={appointment._id} className="hover:bg-gray-50">
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {String(appointment.patientId)}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {appointment.date
//                       ? new Date(appointment.date).toLocaleDateString()
//                       : "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                     {appointment.startTime || "N/A"}
//                   </td>
//                   <td className="px-6 py-4 whitespace-nowrap">
//                     {appointment.status || "N/A"}
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }


// app/doctors/[doctorId]/appointments/page.js
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function DoctorAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [doctorName, setDoctorName] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const params = useParams();
  const doctorId = params.doctorId;

  useEffect(() => {
    async function fetchAppointments() {
      if (!doctorId) {
        setLoading(false);
        return;
      }

      try {
        console.log(`Fetching appointments for doctor ID: ${doctorId}`);
        const apiUrl = `/api/doctors/${doctorId}/appointments`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
          const errorText = await response.text();
          console.error("API response not OK:", response.status, errorText);
          throw new Error(`API error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Appointments data:", data);
        
        if (data.doctorName) {
          setDoctorName(data.doctorName);
        }
        
        setAppointments(data.appointments || []);
      } catch (err) {
        console.error("Error details:", err);
        setError(err.message || "Failed to fetch appointments");
      } finally {
        setLoading(false);
      }
    }

    fetchAppointments();
  }, [doctorId]);

  if (loading)
    return (
      <div className="flex justify-center p-8">Loading appointments...</div>
    );

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Appointments for Dr. {doctorName || 'Unknown'}</h1>

      {error && (
        <div className="text-red-500 p-4 mb-4">
          <h2 className="font-bold">Error loading appointments</h2>
          <p>{error}</p>
        </div>
      )}

      {!error && appointments.length === 0 ? (
        <p>No appointments found for this doctor.</p>
      ) : (
        <div className="bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Patient Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Reason
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {appointments.map((appointment) => (
                <tr key={appointment._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">
                    {appointment.patientName || 'Unknown Patient'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.date
                      ? new Date(appointment.date).toLocaleDateString()
                      : "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.startTime || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {appointment.reason || "N/A"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      appointment.status === "approved" ? "bg-green-100 text-green-800" : 
                      appointment.status === "pending" ? "bg-yellow-100 text-yellow-800" : 
                      "bg-red-100 text-red-800"
                    }`}>
                      {appointment.status || "N/A"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
