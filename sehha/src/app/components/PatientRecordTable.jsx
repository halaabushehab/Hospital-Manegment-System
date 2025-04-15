// "use client";
// import { useState } from "react";

// export default function PatientRecordTable({ records, onEdit }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(records.length / recordsPerPage);

//   return (
//     <div className="bg-white shadow rounded-lg overflow-hidden">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Patient
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Doctor
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Diagnosis
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentRecords.map((record) => (
//               <tr key={record._id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">
//                         {record.patient?.name}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {record.patient?.email}
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     {record.doctor?.name}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     {record.diagnosis}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {new Date(record.date).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button
//                     onClick={() => onEdit(record)}
//                     className="text-blue-600 hover:text-blue-900 mr-3"
//                   >
//                     View/Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Pagination */}
//       <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//         <div className="flex-1 flex justify-between sm:hidden">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
//////////////////////////الكود  الي تحت المعمول كومنت شغال
// "use client";
// import { useState } from "react";

// export default function PatientRecordTable({ records, onEdit }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 22;

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(records.length / recordsPerPage);

//   return (
//     <div className="bg-white shadow rounded-lg overflow-hidden mb-50">
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Patient
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Doctor
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Diagnosis
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Date
//               </th>
//               <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentRecords.map((record) => (
//               <tr key={record._id}>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="flex items-center">
//                     <div className="ml-4">
//                       <div className="text-sm font-medium text-gray-900">
//                         {record.patient?.name}
//                       </div>
//                       <div className="text-sm text-gray-500">
//                         {record.patient?.email}
//                       </div>
//                     </div>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     {record.doctor?.name}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   <div className="text-sm text-gray-900">
//                     {record.diagnosis}
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
//                   {new Date(record.date).toLocaleDateString()}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   <button
//                     onClick={() => onEdit(record)}
//                     className="text-blue-600 hover:text-blue-900 mr-3"
//                   >
//                     View/Edit
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       {/* Pagination */}
//       <div className="bg-white px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
//         <div className="flex-1 flex justify-between sm:hidden">
//           <button
//             onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//             disabled={currentPage === 1}
//             className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//           >
//             Previous
//           </button>
//           <button
//             onClick={() =>
//               setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//             }
//             disabled={currentPage === totalPages}
//             className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
//           >
//             Next
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

///////////////////////work
// "use client";
// import { useState } from "react";
// import { motion } from "framer-motion";

// export default function PatientRecordTable({ records, onEdit }) {
//   const [currentPage, setCurrentPage] = useState(1);
//   const recordsPerPage = 10;

//   // Colors from your specification
//   const colors = {
//     primary: "#FC7729",
//     secondary: "#FCAA29",
//     dark: "#303241",
//     light: "#FFFFFF",
//   };

//   // Pagination logic
//   const indexOfLastRecord = currentPage * recordsPerPage;
//   const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
//   const currentRecords = records.slice(indexOfFirstRecord, indexOfLastRecord);
//   const totalPages = Math.ceil(records.length / recordsPerPage);

//   // Animation variants
//   const tableRowVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: (i) => ({
//       opacity: 1,
//       y: 0,
//       transition: {
//         delay: i * 0.05,
//         duration: 0.3,
//         ease: "easeOut",
//       },
//     }),
//     hover: {
//       backgroundColor: "rgba(252, 170, 41, 0.05)",
//       transition: { duration: 0.2 },
//     },
//   };

//   return (
//     <div className="relative w-full rounded-xl overflow-hidden mb-12">
//       {/* Glassmorphism background effect */}
//       <div
//         className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/30 backdrop-blur-md border border-white/20 shadow-lg z-0"
//         style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
//       />

//       <div className="relative z-10 p-6">
//         <div className="overflow-x-auto rounded-lg">
//           <table className="min-w-full">
//             <thead>
//               <tr
//                 style={{ backgroundColor: colors.dark }}
//                 className="text-left"
//               >
//                 <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white">
//                   Patient
//                 </th>
//                 <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white">
//                   Doctor
//                 </th>
//                 <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white">
//                   Diagnosis
//                 </th>
//                 <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white">
//                   Date
//                 </th>
//                 <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white">
//                   Actions
//                 </th>
//               </tr>
//             </thead>
//             <tbody className="bg-white/60 backdrop-blur-sm divide-y divide-gray-100">
//               {currentRecords.map((record, index) => (
//                 <motion.tr
//                   key={record._id}
//                   custom={index}
//                   initial="hidden"
//                   animate="visible"
//                   whileHover="hover"
//                   variants={tableRowVariants}
//                 >
//                   <td className="px-6 py-4">
//                     <div className="flex items-center">
//                       <div
//                         className="h-10 w-10 rounded-full flex items-center justify-center"
//                         style={{ backgroundColor: colors.primary }}
//                       >
//                         <span className="text-white font-medium">
//                           {record.patient?.name?.charAt(0) || "?"}
//                         </span>
//                       </div>
//                       <div className="ml-4">
//                         <div
//                           className="text-sm font-medium"
//                           style={{ color: colors.dark }}
//                         >
//                           {record.patient?.name}
//                         </div>
//                         <div className="text-sm text-gray-500">
//                           {record.patient?.email}
//                         </div>
//                       </div>
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm" style={{ color: colors.dark }}>
//                       {record.doctor?.name}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4">
//                     <div className="text-sm" style={{ color: colors.dark }}>
//                       {record.diagnosis}
//                     </div>
//                   </td>
//                   <td className="px-6 py-4 text-sm text-gray-500">
//                     {new Date(record.date).toLocaleDateString()}
//                   </td>
//                   <td className="px-6 py-4 text-sm font-medium">
//                     <button
//                       onClick={() => onEdit(record)}
//                       className="px-4 py-2 rounded-full transition-all duration-300 hover:shadow-md"
//                       style={{
//                         backgroundColor: colors.secondary,
//                         color: colors.dark,
//                       }}
//                     >
//                       View/Edit
//                     </button>
//                   </td>
//                 </motion.tr>
//               ))}

//               {/* Empty rows for consistent height */}
//               {currentRecords.length < recordsPerPage &&
//                 Array(recordsPerPage - currentRecords.length)
//                   .fill(0)
//                   .map((_, i) => <tr key={`empty-${i}`} className="h-16" />)}
//             </tbody>
//           </table>
//         </div>

//         {/* Enhanced pagination */}
//         <div className="mt-6 flex items-center justify-between">
//           <div className="text-sm text-gray-500">
//             Showing {indexOfFirstRecord + 1} to{" "}
//             {Math.min(indexOfLastRecord, records.length)} of {records.length}{" "}
//             records
//           </div>

//           <div className="flex space-x-2">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 disabled:opacity-50"
//               style={{
//                 backgroundColor: currentPage === 1 ? "#f0f0f0" : colors.primary,
//                 color: currentPage === 1 ? "#a0a0a0" : "white",
//               }}
//             >
//               ←
//             </button>

//             <div
//               className="flex items-center px-4 h-10 rounded-full"
//               style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
//             >
//               <span className="font-medium" style={{ color: colors.dark }}>
//                 {currentPage}
//               </span>
//               <span className="mx-2 text-gray-400">/</span>
//               <span className="text-gray-500">{totalPages}</span>
//             </div>

//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 disabled:opacity-50"
//               style={{
//                 backgroundColor:
//                   currentPage === totalPages ? "#f0f0f0" : colors.primary,
//                 color: currentPage === totalPages ? "#a0a0a0" : "white",
//               }}
//             >
//               →
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function PatientRecordTable({ records, onEdit }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredRecords, setFilteredRecords] = useState(records);
  const recordsPerPage = 10;

  // Colors from your specification
  const colors = {
    primary: "#FC7729",
    secondary: "#FCAA29",
    dark: "#303241",
    light: "#FFFFFF",
  };

  // Filter records based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRecords(records);
      setCurrentPage(1);
    } else {
      const filtered = records.filter((record) =>
        record.patient?.name?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecords(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, records]);

  // Pagination logic
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredRecords.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPages = Math.ceil(filteredRecords.length / recordsPerPage);

  // Animation variants
  const tableRowVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
        ease: "easeOut",
      },
    }),
    hover: {
      backgroundColor: "rgba(252, 170, 41, 0.05)",
      transition: { duration: 0.2 },
    },
  };

  return (
    <div className="relative w-full rounded-xl overflow-hidden mb-12">
      {/* Glassmorphism background effect */}
      <div
        className="absolute inset-0 bg-gradient-to-br from-white/80 to-white/30 backdrop-blur-md border border-white/20 shadow-lg z-0"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.25)" }}
      />

      <div className="relative z-10 p-6">
        {/* Search Input */}
        <div className="mb-6 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by patient name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-xl bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 focus:border-transparent transition-all duration-300"
            style={{
              borderColor: colors.secondary,
              boxShadow: `0 0 0 1px ${colors.secondary}20`,
            }}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          )}
        </div>

        {/* Results count */}
        {searchTerm && (
          <div className="mb-4 text-sm text-gray-500">
            Found {filteredRecords.length} records matching "{searchTerm}"
          </div>
        )}

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full">
            <thead>
              <tr
                style={{ backgroundColor: colors.dark }}
                className="text-left"
              >
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white">
                  Patient
                </th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white">
                  Doctor
                </th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white">
                  Diagnosis
                </th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white">
                  Date
                </th>
                <th className="px-6 py-4 text-sm font-medium uppercase tracking-wider text-white">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white/60 backdrop-blur-sm divide-y divide-gray-100">
              {currentRecords.length > 0 ? (
                currentRecords.map((record, index) => (
                  <motion.tr
                    key={record._id}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    variants={tableRowVariants}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div
                          className="h-10 w-10 rounded-full flex items-center justify-center"
                          style={{ backgroundColor: colors.primary }}
                        >
                          <span className="text-white font-medium">
                            {record.patient?.name?.charAt(0) || "?"}
                          </span>
                        </div>
                        <div className="ml-4">
                          <div
                            className="text-sm font-medium"
                            style={{ color: colors.dark }}
                          >
                            {record.patient?.name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {record.patient?.email}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm" style={{ color: colors.dark }}>
                        {record.doctor?.name}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm" style={{ color: colors.dark }}>
                        {record.diagnosis}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(record.date).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <button
                        onClick={() => onEdit(record)}
                        className="px-4 py-2 rounded-full transition-all duration-300 hover:shadow-md"
                        style={{
                          backgroundColor: colors.secondary,
                          color: colors.dark,
                        }}
                      >
                        View/Edit
                      </button>
                    </td>
                  </motion.tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <svg
                        className="h-12 w-12 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1}
                          d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      <p className="mt-2 text-gray-500">
                        {searchTerm
                          ? `No records found for "${searchTerm}"`
                          : "No records available"}
                      </p>
                    </div>
                  </td>
                </tr>
              )}

              {/* Empty rows for consistent height */}
              {currentRecords.length > 0 &&
                currentRecords.length < recordsPerPage &&
                Array(recordsPerPage - currentRecords.length)
                  .fill(0)
                  .map((_, i) => <tr key={`empty-${i}`} className="h-16" />)}
            </tbody>
          </table>
        </div>

        {/* Enhanced pagination */}
        {filteredRecords.length > 0 && (
          <div className="mt-6 flex items-center justify-between">
            <div className="text-sm text-gray-500">
              Showing {indexOfFirstRecord + 1} to{" "}
              {Math.min(indexOfLastRecord, filteredRecords.length)} of{" "}
              {filteredRecords.length} records
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 disabled:opacity-50"
                style={{
                  backgroundColor:
                    currentPage === 1 ? "#f0f0f0" : colors.primary,
                  color: currentPage === 1 ? "#a0a0a0" : "white",
                }}
              >
                ←
              </button>

              <div
                className="flex items-center px-4 h-10 rounded-full"
                style={{ backgroundColor: "rgba(255, 255, 255, 0.5)" }}
              >
                <span className="font-medium" style={{ color: colors.dark }}>
                  {currentPage}
                </span>
                <span className="mx-2 text-gray-400">/</span>
                <span className="text-gray-500">{totalPages}</span>
              </div>

              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
                className="relative flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300 disabled:opacity-50"
                style={{
                  backgroundColor:
                    currentPage === totalPages ? "#f0f0f0" : colors.primary,
                  color: currentPage === totalPages ? "#a0a0a0" : "white",
                }}
              >
                →
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
