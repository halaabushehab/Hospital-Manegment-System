// import UserTable from "../../components/UserTable";
// import axios from "axios";

// async function getUsers() {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     console.log("API response:", response.data);
//     return response.data;
//   } catch (error) {
//     console.error("Detailed API error:", {
//       message: error.message,
//       status: error.response?.status,
//       data: error.response?.data,
//       headers: error.response?.headers,
//     });
//     return [];
//   }
// }
// export default async function UserManagementPage() {
//   const users = await getUsers();

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//         <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
//           Add New User
//         </button>
//       </div>
//       <UserTable users={users} />
//     </div>
//   );
// }
// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import UserTable from "../../components/UserTable";
// import UserModal from "../../components/UserModal";

// export default function UserManagementPage() {
//   const [users, setUsers] = useState([]);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState("");

//   const fetchUsers = async () => {
//     try {
//       setIsLoading(true);
//       setError("");
//       const response = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log(response.data);
//       setUsers(response.data);
//     } catch (err) {
//       setError("Failed to load users");
//       console.error(err);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const handleCreateUser = async (userData) => {
//     try {
//       await axios.post("/api/admin/users", userData, {
//         withCredentials: true,
//       });
//       fetchUsers();
//       setIsModalOpen(false);
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to create user");
//       console.error(err);
//     }
//   };

//   const handleUpdateUser = async (userId, userData) => {
//     try {
//       await axios.put(`/api/admin/users/${userId}`, userData, {
//         withCredentials: true,
//       });
//       fetchUsers();
//       setIsModalOpen(false);
//     } catch (err) {
//       setError(err.response?.data?.error || "Failed to update user");
//       console.error(err);
//     }
//   };

//   const handleStatusChange = async (userId, status) => {
//     try {
//       await axios.put(
//         `/api/admin/users/${userId}`,
//         { status },
//         { withCredentials: true }
//       );
//       fetchUsers();
//     } catch (err) {
//       setError("Failed to update user status");
//       console.error(err);
//     }
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-2xl font-bold text-gray-800">User Management</h1>
//         <button
//           onClick={() => {
//             setSelectedUser(null);
//             setIsModalOpen(true);
//           }}
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Add New User
//         </button>
//       </div>

//       {error && (
//         <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">{error}</div>
//       )}

//       {isLoading ? (
//         <div className="flex justify-center items-center h-64">
//           <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//         </div>
//       ) : (
//         <UserTable
//           users={users}
//           onEdit={(user) => {
//             setSelectedUser(user);
//             setIsModalOpen(true);
//           }}
//           onStatusChange={handleStatusChange}
//         />
//       )}

//       <UserModal
//         isOpen={isModalOpen}
//         onClose={() => setIsModalOpen(false)}
//         onSubmit={
//           selectedUser
//             ? (data) => handleUpdateUser(selectedUser._id, data)
//             : handleCreateUser
//         }
//         initialData={selectedUser}
//       />
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import UserTable from "../../components/UserTable";
import UserModal from "../../components/UserModal";
import { motion } from "framer-motion";

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  // Colors for consistent theme
  const colors = {
    primary: "#FC7729",
    secondary: "#FCAA29",
    dark: "#303241",
    light: "#FFFFFF",
  };

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError("");
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/admin/users`,
        {
          withCredentials: true,
        }
      );
      setUsers(response.data);
    } catch (err) {
      setError("Failed to load users");
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleCreateUser = async (userData) => {
    try {
      await axios.post("/api/admin/users", userData, {
        withCredentials: true,
      });
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to create user");
      console.error(err);
    }
  };

  const handleUpdateUser = async (userId, userData) => {
    try {
      await axios.put(`/api/admin/users/${userId}`, userData, {
        withCredentials: true,
      });
      fetchUsers();
      setIsModalOpen(false);
    } catch (err) {
      setError(err.response?.data?.error || "Failed to update user");
      console.error(err);
    }
  };

  const handleStatusChange = async (userId, status) => {
    try {
      await axios.put(
        `/api/admin/users/${userId}`,
        { status },
        { withCredentials: true }
      );
      fetchUsers();
    } catch (err) {
      setError("Failed to update user status");
      console.error(err);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4 sm:px-8">
      <motion.div
        className="max-w-6xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* Header Section */}
        <motion.div
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4"
          variants={itemVariants}
        >
          <div>
            <h1 className="text-3xl font-bold" style={{ color: colors.dark }}>
              User Management
            </h1>
            <p className="text-gray-500 mt-1">
              Manage all system users and their permissions
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedUser(null);
              setIsModalOpen(true);
            }}
            className="px-6 py-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
            style={{
              backgroundColor: colors.primary,
              color: colors.light,
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New User
          </button>
        </motion.div>

        {/* Error Message */}
        {error && (
          <motion.div
            className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg flex items-center gap-3"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {error}
          </motion.div>
        )}

        {/* Content Container */}
        <motion.div
          className="bg-white/70 backdrop-blur-md rounded-2xl shadow-xl border border-white/30 overflow-hidden"
          variants={itemVariants}
        >
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <div className="relative">
                <div className="w-12 h-12 rounded-full absolute border-4 border-solid border-gray-200"></div>
                <div
                  className="w-12 h-12 rounded-full animate-spin absolute border-4 border-solid border-t-transparent"
                  style={{
                    borderLeftColor: colors.primary,
                    borderRightColor: colors.primary,
                    borderBottomColor: colors.secondary,
                  }}
                ></div>
              </div>
            </div>
          ) : (
            <UserTable
              users={users}
              onEdit={(user) => {
                setSelectedUser(user);
                setIsModalOpen(true);
              }}
              onStatusChange={handleStatusChange}
            />
          )}
        </motion.div>

        {/* Footer Section - Optional stats */}
        <motion.div
          className="mt-8 text-gray-500 text-sm flex justify-between items-center"
          variants={itemVariants}
        >
          <div>Total Users: {users.length}</div>
          <div>Last updated: {new Date().toLocaleString()}</div>
        </motion.div>
      </motion.div>

      {/* User Modal */}
      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSubmit={
          selectedUser
            ? (data) => handleUpdateUser(selectedUser._id, data)
            : handleCreateUser
        }
        initialData={selectedUser}
      />
    </div>
  );
}
