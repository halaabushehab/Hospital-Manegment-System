// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function UserTable({ users: initialUsers }) {
//   const [users, setUsers] = useState(initialUsers);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     name: "",
//     email: "",
//     role: "",
//     status: "",
//   });

//   const handleEdit = (user) => {
//     setEditingId(user._id);
//     setEditForm({
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       status: user.status,
//     });
//   };

//   const handleChange = (e) => {
//     setEditForm({
//       ...editForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = async (userId) => {
//     try {
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
//         editForm,
//         { withCredentials: true }
//       );

//       setUsers(
//         users.map((user) => (user._id === userId ? response.data.user : user))
//       );
//       setEditingId(null);
//       toast.success("User updated successfully");
//     } catch (error) {
//       toast.error("Error updating user");
//       console.error("Error updating user:", error);
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
//           { withCredentials: true }
//         );
//         setUsers(users.filter((user) => user._id !== userId));
//         toast.success("User deleted successfully");
//       } catch (error) {
//         toast.error("Error deleting user");
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   const handleStatusChange = async (userId, newStatus) => {
//     try {
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/status`,
//         { status: newStatus },
//         { withCredentials: true }
//       );

//       setUsers(
//         users.map((user) => (user._id === userId ? response.data.user : user))
//       );
//       toast.success("User status updated");
//     } catch (error) {
//       toast.error("Error updating user status");
//       console.error("Error updating user status:", error);
//     }
//   };

//   return (
//     <div className="bg-white shadow rounded-lg overflow-hidden">
//       <table className="min-w-full divide-y divide-gray-200">
//         <thead className="bg-gray-50">
//           <tr>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Name
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Email
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Role
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Status
//             </th>
//             <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
//               Actions
//             </th>
//           </tr>
//         </thead>
//         <tbody className="bg-white divide-y divide-gray-900">
//           {users.map((user) => (
//             <tr key={user._id}>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {editingId === user._id ? (
//                   <input
//                     type="text"
//                     name="name"
//                     value={editForm.name}
//                     onChange={handleChange}
//                     className="border rounded px-2 py-1"
//                   />
//                 ) : (
//                   user.name
//                 )}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {editingId === user._id ? (
//                   <input
//                     type="email"
//                     name="email"
//                     value={editForm.email}
//                     onChange={handleChange}
//                     className="border rounded px-2 py-1"
//                   />
//                 ) : (
//                   user.email
//                 )}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {editingId === user._id ? (
//                   <select
//                     name="role"
//                     value={editForm.role}
//                     onChange={handleChange}
//                     className="border rounded px-2 py-1"
//                   >
//                     <option value="patient">Patient</option>
//                     <option value="doctor">Doctor</option>
//                     <option value="admin">Admin</option>
//                   </select>
//                 ) : (
//                   user.role
//                 )}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap">
//                 {editingId === user._id ? (
//                   <select
//                     name="status"
//                     value={editForm.status}
//                     onChange={handleChange}
//                     className="border rounded px-2 py-1"
//                   >
//                     <option value="active">Active</option>
//                     <option value="suspended">Suspended</option>
//                     <option value="pending">Pending</option>
//                   </select>
//                 ) : (
//                   <span
//                     className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                       user.status === "active"
//                         ? "bg-green-100 text-green-800"
//                         : user.status === "suspended"
//                         ? "bg-red-100 text-red-800"
//                         : "bg-yellow-100 text-yellow-800"
//                     }`}
//                   >
//                     {user.status}
//                   </span>
//                 )}
//               </td>
//               <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                 {editingId === user._id ? (
//                   <>
//                     <button
//                       onClick={() => handleSave(user._id)}
//                       className="text-green-600 hover:text-green-900 mr-3"
//                     >
//                       Save
//                     </button>
//                     <button
//                       onClick={() => setEditingId(null)}
//                       className="text-gray-600 hover:text-gray-900"
//                     >
//                       Cancel
//                     </button>
//                   </>
//                 ) : (
//                   <>
//                     <button
//                       onClick={() => handleEdit(user)}
//                       className="text-blue-600 hover:text-blue-900 mr-3"
//                     >
//                       Edit
//                     </button>
//                     <button
//                       onClick={() => handleDelete(user._id)}
//                       className="text-red-600 hover:text-red-900 mr-3"
//                     >
//                       Delete
//                     </button>
//                     {user.status === "active" ? (
//                       <button
//                         onClick={() =>
//                           handleStatusChange(user._id, "suspended")
//                         }
//                         className="text-yellow-600 hover:text-yellow-900"
//                       >
//                         Suspend
//                       </button>
//                     ) : (
//                       <button
//                         onClick={() => handleStatusChange(user._id, "active")}
//                         className="text-green-600 hover:text-green-900"
//                       >
//                         Activate
//                       </button>
//                     )}
//                   </>
//                 )}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// export default function UserTable({ users: initialUsers }) {
//   const [users, setUsers] = useState(initialUsers);
//   const [editingId, setEditingId] = useState(null);
//   const [editForm, setEditForm] = useState({
//     name: "",
//     email: "",
//     role: "",
//     status: "",
//   });

//   const handleEdit = (user) => {
//     setEditingId(user._id);
//     setEditForm({
//       name: user.name,
//       email: user.email,
//       role: user.role,
//       status: user.status,
//     });
//   };

//   const handleChange = (e) => {
//     setEditForm({
//       ...editForm,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSave = async (userId) => {
//     try {
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
//         editForm,
//         { withCredentials: true }
//       );

//       setUsers(
//         users.map((user) => (user._id === userId ? response.data.user : user))
//       );
//       setEditingId(null);
//       toast.success("User updated successfully");
//     } catch (error) {
//       toast.error("Error updating user");
//       console.error("Error updating user:", error);
//     }
//   };

//   const handleDelete = async (userId) => {
//     if (window.confirm("Are you sure you want to delete this user?")) {
//       try {
//         await axios.delete(
//           `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
//           { withCredentials: true }
//         );
//         setUsers(users.filter((user) => user._id !== userId));
//         toast.success("User deleted successfully");
//       } catch (error) {
//         toast.error("Error deleting user");
//         console.error("Error deleting user:", error);
//       }
//     }
//   };

//   const handleStatusChange = async (userId, newStatus) => {
//     try {
//       const response = await axios.put(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/status`,
//         { status: newStatus },
//         { withCredentials: true }
//       );

//       setUsers(
//         users.map((user) => (user._id === userId ? response.data.user : user))
//       );
//       toast.success("User status updated");
//     } catch (error) {
//       toast.error("Error updating user status");
//       console.error("Error updating user status:", error);
//     }
//   };

//   const getStatusStyles = (status) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800 border-green-200";
//       case "suspended":
//         return "bg-red-100 text-red-800 border-red-200";
//       default:
//         return "bg-yellow-100 text-yellow-800 border-yellow-200";
//     }
//   };

//   return (
//     <div className="relative backdrop-blur-sm bg-white/70 shadow-lg rounded-xl overflow-hidden border border-gray-100">
//       <div className="absolute inset-0 bg-gradient-to-br from-[#FC7729]/10 to-[#FCAA29]/10 pointer-events-none"></div>
//       <div className="overflow-x-auto">
//         <table className="min-w-full divide-y divide-gray-200">
//           <thead className="bg-[#303241]">
//             <tr>
//               <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Name
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Email
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Role
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Status
//               </th>
//               <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
//                 Actions
//               </th>
//             </tr>
//           </thead>
//           <tbody className="bg-transparent divide-y divide-gray-200">
//             {users.map((user) => (
//               <tr
//                 key={user._id}
//                 className="transition-all duration-200 hover:bg-[#303241]/5"
//               >
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {editingId === user._id ? (
//                     <input
//                       type="text"
//                       name="name"
//                       value={editForm.name}
//                       onChange={handleChange}
//                       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
//                     />
//                   ) : (
//                     <span className="font-medium text-gray-900">
//                       {user.name}
//                     </span>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {editingId === user._id ? (
//                     <input
//                       type="email"
//                       name="email"
//                       value={editForm.email}
//                       onChange={handleChange}
//                       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
//                     />
//                   ) : (
//                     <span className="text-gray-600">{user.email}</span>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {editingId === user._id ? (
//                     <select
//                       name="role"
//                       value={editForm.role}
//                       onChange={handleChange}
//                       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
//                     >
//                       <option value="patient">Patient</option>
//                       <option value="doctor">Doctor</option>
//                       <option value="admin">Admin</option>
//                     </select>
//                   ) : (
//                     <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#303241]/10 text-[#303241]">
//                       {user.role}
//                     </span>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap">
//                   {editingId === user._id ? (
//                     <select
//                       name="status"
//                       value={editForm.status}
//                       onChange={handleChange}
//                       className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
//                     >
//                       <option value="active">Active</option>
//                       <option value="suspended">Suspended</option>
//                       <option value="pending">Pending</option>
//                     </select>
//                   ) : (
//                     <span
//                       className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyles(
//                         user.status
//                       )}`}
//                     >
//                       {user.status}
//                     </span>
//                   )}
//                 </td>
//                 <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
//                   {editingId === user._id ? (
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleSave(user._id)}
//                         className="flex items-center justify-center px-3 py-1 bg-[#FC7729] text-white rounded-lg hover:bg-[#FC7729]/90 transition-all duration-200 shadow-md hover:shadow-lg"
//                       >
//                         Save
//                       </button>
//                       <button
//                         onClick={() => setEditingId(null)}
//                         className="flex items-center justify-center px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   ) : (
//                     <div className="flex space-x-2">
//                       <button
//                         onClick={() => handleEdit(user)}
//                         className="flex items-center justify-center p-2 bg-[#303241]/10 text-[#303241] rounded-lg hover:bg-[#303241]/20 transition-all duration-200"
//                         title="Edit"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
//                           />
//                         </svg>
//                       </button>
//                       <button
//                         onClick={() => handleDelete(user._id)}
//                         className="flex items-center justify-center p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200"
//                         title="Delete"
//                       >
//                         <svg
//                           xmlns="http://www.w3.org/2000/svg"
//                           className="h-4 w-4"
//                           fill="none"
//                           viewBox="0 0 24 24"
//                           stroke="currentColor"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
//                           />
//                         </svg>
//                       </button>
//                       {user.status === "active" ? (
//                         <button
//                           onClick={() =>
//                             handleStatusChange(user._id, "suspended")
//                           }
//                           className="flex items-center justify-center p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-all duration-200"
//                           title="Suspend"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                             />
//                           </svg>
//                         </button>
//                       ) : (
//                         <button
//                           onClick={() => handleStatusChange(user._id, "active")}
//                           className="flex items-center justify-center p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all duration-200"
//                           title="Activate"
//                         >
//                           <svg
//                             xmlns="http://www.w3.org/2000/svg"
//                             className="h-4 w-4"
//                             fill="none"
//                             viewBox="0 0 24 24"
//                             stroke="currentColor"
//                           >
//                             <path
//                               strokeLinecap="round"
//                               strokeLinejoin="round"
//                               strokeWidth={2}
//                               d="M5 13l4 4L19 7"
//                             />
//                           </svg>
//                         </button>
//                       )}
//                     </div>
//                   )}
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }
"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserTable({ users: initialUsers }) {
  const [users, setUsers] = useState(initialUsers);
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  // Filter users based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
      setCurrentPage(1);
    } else {
      const filtered = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
      setCurrentPage(1);
    }
  }, [searchTerm, users]);

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const handleEdit = (user) => {
    setEditingId(user._id);
    setEditForm({
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    });
  };

  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value,
    });
  };

  const handleSave = async (userId) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
        editForm,
        { withCredentials: true }
      );

      setUsers(
        users.map((user) => (user._id === userId ? response.data.user : user))
      );
      setEditingId(null);
      toast.success("User updated successfully");
    } catch (error) {
      toast.error("Error updating user");
      console.error("Error updating user:", error);
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}`,
          { withCredentials: true }
        );
        setUsers(users.filter((user) => user._id !== userId));
        toast.success("User deleted successfully");
      } catch (error) {
        toast.error("Error deleting user");
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleStatusChange = async (userId, newStatus) => {
    try {
      const response = await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users/${userId}/status`,
        { status: newStatus },
        { withCredentials: true }
      );

      setUsers(
        users.map((user) => (user._id === userId ? response.data.user : user))
      );
      toast.success("User status updated");
    } catch (error) {
      toast.error("Error updating user status");
      console.error("Error updating user status:", error);
    }
  };

  const getStatusStyles = (status) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800 border-green-200";
      case "suspended":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
    }
  };

  return (
    <div className="relative backdrop-blur-sm bg-white/70 shadow-lg rounded-xl overflow-hidden border border-gray-100">
      <div className="absolute inset-0 bg-gradient-to-br from-[#FC7729]/10 to-[#FCAA29]/10 pointer-events-none"></div>

      {/* Search Input */}
      <div className="p-4">
        <div className="relative max-w-md">
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
            placeholder="Search by user name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-white/70 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute right-3 top-2.5 text-gray-400 hover:text-gray-600"
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
      </div>

      {/* Results count */}
      {searchTerm && (
        <div className="px-4 pb-2 text-sm text-gray-500">
          Found {filteredUsers.length} users matching "{searchTerm}"
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-[#303241]">
            <tr>
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Name
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Email
              </th>
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Role
              </th>
              {/* <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Status
              </th> */}
              <th className="px-6 py-4 text-left text-xs font-medium text-white uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-transparent divide-y divide-gray-200">
            {currentUsers.length > 0 ? (
              currentUsers.map((user) => (
                <tr
                  key={user._id}
                  className="transition-all duration-200 hover:bg-[#303241]/5"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user._id ? (
                      <input
                        type="text"
                        name="name"
                        value={editForm.name}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <span className="font-medium text-gray-900">
                        {user.name}
                      </span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user._id ? (
                      <input
                        type="email"
                        name="email"
                        value={editForm.email}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                      />
                    ) : (
                      <span className="text-gray-600">{user.email}</span>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user._id ? (
                      <select
                        name="role"
                        value={editForm.role}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                      >
                        <option value="patient">Patient</option>
                        <option value="doctor">Doctor</option>
                        <option value="admin">Admin</option>
                      </select>
                    ) : (
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#303241]/10 text-[#303241]">
                        {user.role}
                      </span>
                    )}
                  </td>
                  {/* <td className="px-6 py-4 whitespace-nowrap">
                    {editingId === user._id ? (
                      <select
                        name="status"
                        value={editForm.status}
                        onChange={handleChange}
                        className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                      >
                        <option value="active">Active</option>
                        <option value="suspended">Suspended</option>
                        <option value="pending">Pending</option>
                      </select>
                    ) : (
                      <span
                        className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full border ${getStatusStyles(
                          user.status
                        )}`}
                      >
                        {user.status}
                      </span>
                    )}
                  </td> */}
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    {editingId === user._id ? (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleSave(user._id)}
                          className="flex items-center justify-center px-3 py-1 bg-[#FC7729] text-white rounded-lg hover:bg-[#FC7729]/90 transition-all duration-200 shadow-md hover:shadow-lg"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingId(null)}
                          className="flex items-center justify-center px-3 py-1 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-all duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="flex items-center justify-center p-2 bg-[#303241]/10 text-[#303241] rounded-lg hover:bg-[#303241]/20 transition-all duration-200"
                          title="Edit"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => handleDelete(user._id)}
                          className="flex items-center justify-center p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-all duration-200"
                          title="Delete"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                        {user.status === "active" ? (
                          <button
                            onClick={() =>
                              handleStatusChange(user._id, "suspended")
                            }
                            className="flex items-center justify-center p-2 bg-yellow-100 text-yellow-600 rounded-lg hover:bg-yellow-200 transition-all duration-200"
                            title="Suspend"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                              />
                            </svg>
                          </button>
                        ) : (
                          <button
                            onClick={() =>
                              handleStatusChange(user._id, "active")
                            }
                            className="flex items-center justify-center p-2 bg-green-100 text-green-600 rounded-lg hover:bg-green-200 transition-all duration-200"
                            title="Activate"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5 13l4 4L19 7"
                              />
                            </svg>
                          </button>
                        )}
                      </div>
                    )}
                  </td>
                </tr>
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
                        ? `No users found for "${searchTerm}"`
                        : "No users available"}
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {filteredUsers.length > 0 && (
        <div className="px-4 py-3 flex items-center justify-between border-t border-gray-200 sm:px-6">
          <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
            <div>
              <p className="text-sm text-gray-700">
                Showing{" "}
                <span className="font-medium">{indexOfFirstUser + 1}</span> to{" "}
                <span className="font-medium">
                  {Math.min(indexOfLastUser, filteredUsers.length)}
                </span>{" "}
                of <span className="font-medium">{filteredUsers.length}</span>{" "}
                results
              </p>
            </div>
            <div>
              <nav
                className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
                aria-label="Pagination"
              >
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                  className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>

                {/* Page numbers */}
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                        currentPage === page
                          ? "z-10 bg-[#FC7729] border-[#FC7729] text-white"
                          : "bg-white border-gray-300 text-gray-500 hover:bg-gray-50"
                      }`}
                    >
                      {page}
                    </button>
                  )
                )}

                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                  className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </nav>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
