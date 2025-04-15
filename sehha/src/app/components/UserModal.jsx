// "use client";
// import { useState, useEffect } from "react";
// import axios from "axios";

// export default function UserModal({ isOpen, onClose, onSubmit, initialData }) {
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     role: "patient",
//     phoneNumber: "",
//     address: "",
//     status: "active",
//     // Patient fields
//     dateOfBirth: "",
//     gender: "",
//     bloodType: "",
//     // Doctor fields
//     specialization: "",
//     qualifications: [],
//     licenseNumber: "",
//     yearsOfExperience: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   useEffect(() => {
//     if (initialData) {
//       setFormData({
//         name: initialData.name || "",
//         email: initialData.email || "",
//         password: "",
//         role: initialData.role || "patient",
//         phoneNumber: initialData.phoneNumber || "",
//         address: initialData.address || "",
//         status: initialData.status || "active",
//         dateOfBirth: initialData.dateOfBirth || "",
//         gender: initialData.gender || "",
//         bloodType: initialData.bloodType || "",
//         specialization: initialData.specialization || "",
//         qualifications: initialData.qualifications || [],
//         licenseNumber: initialData.licenseNumber || "",
//         yearsOfExperience: initialData.yearsOfExperience || "",
//       });
//     } else {
//       setFormData({
//         name: "",
//         email: "",
//         password: "",
//         role: "patient",
//         phoneNumber: "",
//         address: "",
//         status: "active",
//         dateOfBirth: "",
//         gender: "",
//         bloodType: "",
//         specialization: "",
//         qualifications: [],
//         licenseNumber: "",
//         yearsOfExperience: "",
//       });
//     }
//     setErrors({});
//   }, [initialData, isOpen]);

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
//     }));
//   };

//   const handleQualificationChange = (index, value) => {
//     const newQualifications = [...formData.qualifications];
//     newQualifications[index] = value;
//     setFormData((prev) => ({
//       ...prev,
//       qualifications: newQualifications,
//     }));
//   };

//   const addQualification = () => {
//     setFormData((prev) => ({
//       ...prev,
//       qualifications: [...prev.qualifications, ""],
//     }));
//   };

//   const removeQualification = (index) => {
//     const newQualifications = formData.qualifications.filter(
//       (_, i) => i !== index
//     );
//     setFormData((prev) => ({
//       ...prev,
//       qualifications: newQualifications,
//     }));
//   };

//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.name) newErrors.name = "Name is required";
//     if (!formData.email) newErrors.email = "Email is required";
//     if (!initialData && !formData.password)
//       newErrors.password = "Password is required";
//     if (formData.phoneNumber && !/^[0-9]{10}$/.test(formData.phoneNumber)) {
//       newErrors.phoneNumber = "Invalid phone number (10 digits)";
//     }

//     if (formData.role === "doctor") {
//       if (!formData.specialization)
//         newErrors.specialization = "Specialization is required";
//       if (!formData.licenseNumber)
//         newErrors.licenseNumber = "License number is required";
//     }

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     setIsSubmitting(true);
//     try {
//       const dataToSubmit = { ...formData };
//       if (initialData && !dataToSubmit.password) {
//         delete dataToSubmit.password; // Don't update password if not changed
//       }

//       await onSubmit(dataToSubmit);
//       onClose();
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       setErrors({
//         submit: error.response?.data?.error || "Failed to save user",
//       });
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center p-4 z-50">
//       <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//         <div className="p-6">
//           <div className="flex justify-between items-center mb-4">
//             <h2 className="text-xl font-semibold">
//               {initialData ? "Edit User" : "Add New User"}
//             </h2>
//             <button
//               onClick={onClose}
//               className="text-gray-500 hover:text-gray-700"
//             >
//               <svg
//                 className="h-6 w-6"
//                 fill="none"
//                 viewBox="0 0 24 24"
//                 stroke="currentColor"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>
//           </div>

//           {errors.submit && (
//             <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
//               {errors.submit}
//             </div>
//           )}

//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Name *
//                 </label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={formData.name}
//                   onChange={handleChange}
//                   className={`w-full p-2 border rounded ${
//                     errors.name ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.name && (
//                   <p className="text-red-500 text-xs mt-1">{errors.name}</p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Email *
//                 </label>
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   className={`w-full p-2 border rounded ${
//                     errors.email ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.email && (
//                   <p className="text-red-500 text-xs mt-1">{errors.email}</p>
//                 )}
//               </div>
//             </div>

//             {!initialData && (
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Password *
//                 </label>
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   className={`w-full p-2 border rounded ${
//                     errors.password ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.password && (
//                   <p className="text-red-500 text-xs mt-1">{errors.password}</p>
//                 )}
//               </div>
//             )}

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Role *
//                 </label>
//                 <select
//                   name="role"
//                   value={formData.role}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 >
//                   <option value="patient">Patient</option>
//                   <option value="doctor">Doctor</option>
//                   <option value="admin">Admin</option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Status
//                 </label>
//                 <select
//                   name="status"
//                   value={formData.status}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 >
//                   <option value="active">Active</option>
//                   <option value="pending">Pending</option>
//                   <option value="suspended">Suspended</option>
//                 </select>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   name="phoneNumber"
//                   value={formData.phoneNumber}
//                   onChange={handleChange}
//                   placeholder="10 digits"
//                   className={`w-full p-2 border rounded ${
//                     errors.phoneNumber ? "border-red-500" : ""
//                   }`}
//                 />
//                 {errors.phoneNumber && (
//                   <p className="text-red-500 text-xs mt-1">
//                     {errors.phoneNumber}
//                   </p>
//                 )}
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-1">
//                   Address
//                 </label>
//                 <input
//                   type="text"
//                   name="address"
//                   value={formData.address}
//                   onChange={handleChange}
//                   className="w-full p-2 border rounded"
//                 />
//               </div>
//             </div>

//             {formData.role === "patient" && (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Date of Birth
//                     </label>
//                     <input
//                       type="date"
//                       name="dateOfBirth"
//                       value={formData.dateOfBirth}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded"
//                     />
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Gender
//                     </label>
//                     <select
//                       name="gender"
//                       value={formData.gender}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded"
//                     >
//                       <option value="">Select</option>
//                       <option value="male">Male</option>
//                       <option value="female">Female</option>
//                       <option value="other">Other</option>
//                     </select>
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Blood Type
//                     </label>
//                     <select
//                       name="bloodType"
//                       value={formData.bloodType}
//                       onChange={handleChange}
//                       className="w-full p-2 border rounded"
//                     >
//                       <option value="">Select</option>
//                       <option value="A+">A+</option>
//                       <option value="A-">A-</option>
//                       <option value="B+">B+</option>
//                       <option value="B-">B-</option>
//                       <option value="AB+">AB+</option>
//                       <option value="AB-">AB-</option>
//                       <option value="O+">O+</option>
//                       <option value="O-">O-</option>
//                     </select>
//                   </div>
//                 </div>
//               </>
//             )}

//             {formData.role === "doctor" && (
//               <>
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       Specialization *
//                     </label>
//                     <input
//                       type="text"
//                       name="specialization"
//                       value={formData.specialization}
//                       onChange={handleChange}
//                       className={`w-full p-2 border rounded ${
//                         errors.specialization ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.specialization && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {errors.specialization}
//                       </p>
//                     )}
//                   </div>

//                   <div>
//                     <label className="block text-sm font-medium text-gray-700 mb-1">
//                       License Number *
//                     </label>
//                     <input
//                       type="text"
//                       name="licenseNumber"
//                       value={formData.licenseNumber}
//                       onChange={handleChange}
//                       className={`w-full p-2 border rounded ${
//                         errors.licenseNumber ? "border-red-500" : ""
//                       }`}
//                     />
//                     {errors.licenseNumber && (
//                       <p className="text-red-500 text-xs mt-1">
//                         {errors.licenseNumber}
//                       </p>
//                     )}
//                   </div>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Years of Experience
//                   </label>
//                   <input
//                     type="number"
//                     name="yearsOfExperience"
//                     value={formData.yearsOfExperience}
//                     onChange={handleChange}
//                     min="0"
//                     className="w-full p-2 border rounded"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-sm font-medium text-gray-700 mb-1">
//                     Qualifications
//                   </label>
//                   {formData.qualifications.map((qual, index) => (
//                     <div key={index} className="flex items-center mb-2">
//                       <input
//                         type="text"
//                         value={qual}
//                         onChange={(e) =>
//                           handleQualificationChange(index, e.target.value)
//                         }
//                         className="flex-1 p-2 border rounded"
//                       />
//                       <button
//                         type="button"
//                         onClick={() => removeQualification(index)}
//                         className="ml-2 p-2 text-red-500 hover:text-red-700"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   ))}
//                   <button
//                     type="button"
//                     onClick={addQualification}
//                     className="mt-2 px-3 py-1 bg-gray-200 rounded text-sm"
//                   >
//                     Add Qualification
//                   </button>
//                 </div>
//               </>
//             )}

//             <div className="flex justify-end space-x-3 pt-4">
//               <button
//                 type="button"
//                 onClick={onClose}
//                 className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50"
//               >
//                 Cancel
//               </button>
//               <button
//                 type="submit"
//                 disabled={isSubmitting}
//                 className={`px-4 py-2 border border-transparent rounded-md shadow-sm text-white ${
//                   isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
//                 }`}
//               >
//                 {isSubmitting ? "Saving..." : "Save"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from "react";
import axios from "axios";

export default function UserModal({ isOpen, onClose, onSubmit, initialData }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "patient",
    phoneNumber: "",
    address: "",
    status: "active",
    // Patient fields
    dateOfBirth: "",
    gender: "",
    bloodType: "",
    // Doctor fields
    specialization: "",
    qualifications: [],
    licenseNumber: "",
    yearsOfExperience: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || "",
        email: initialData.email || "",
        password: "",
        role: initialData.role || "patient",
        phoneNumber: initialData.phoneNumber || "",
        address: initialData.address || "",
        status: initialData.status || "active",
        dateOfBirth: initialData.dateOfBirth || "",
        gender: initialData.gender || "",
        bloodType: initialData.bloodType || "",
        specialization: initialData.specialization || "",
        qualifications: initialData.qualifications || [],
        licenseNumber: initialData.licenseNumber || "",
        yearsOfExperience: initialData.yearsOfExperience || "",
      });
    } else {
      setFormData({
        name: "",
        email: "",
        password: "",
        role: "patient",
        phoneNumber: "",
        address: "",
        status: "active",
        dateOfBirth: "",
        gender: "",
        bloodType: "",
        specialization: "",
        qualifications: [],
        licenseNumber: "",
        yearsOfExperience: "",
      });
    }
    setErrors({});
  }, [initialData, isOpen]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleQualificationChange = (index, value) => {
    const newQualifications = [...formData.qualifications];
    newQualifications[index] = value;
    setFormData((prev) => ({
      ...prev,
      qualifications: newQualifications,
    }));
  };

  const addQualification = () => {
    setFormData((prev) => ({
      ...prev,
      qualifications: [...prev.qualifications, ""],
    }));
  };

  const removeQualification = (index) => {
    const newQualifications = formData.qualifications.filter(
      (_, i) => i !== index
    );
    setFormData((prev) => ({
      ...prev,
      qualifications: newQualifications,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    if (!initialData && !formData.password)
      newErrors.password = "Password is required";
    if (formData.phoneNumber && !/^[0-9]{10}$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = "Invalid phone number (10 digits)";
    }

    if (formData.role === "doctor") {
      if (!formData.specialization)
        newErrors.specialization = "Specialization is required";
      if (!formData.licenseNumber)
        newErrors.licenseNumber = "License number is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const dataToSubmit = { ...formData };
      if (initialData && !dataToSubmit.password) {
        delete dataToSubmit.password; // Don't update password if not changed
      }

      await onSubmit(dataToSubmit);
      onClose();
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        submit: error.response?.data?.error || "Failed to save user",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#303241]/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 transition-opacity duration-300">
      <div className="bg-white/90 backdrop-blur-sm rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-white/20">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FC7729]/5 to-[#FCAA29]/5 rounded-xl pointer-events-none"></div>
          <div className="p-6 relative">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-[#303241]">
                {initialData ? "Edit User" : "Add New User"}
              </h2>
              <button
                onClick={onClose}
                className="text-[#303241] hover:text-[#FC7729] transition-colors duration-200 p-2 rounded-full hover:bg-[#303241]/5"
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

            {errors.submit && (
              <div className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg border border-red-200 shadow-sm">
                {errors.submit}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#303241] mb-1">
                    Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200 ${
                      errors.name
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white/60"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#303241] mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200 ${
                      errors.email
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white/60"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {!initialData && (
                <div>
                  <label className="block text-sm font-medium text-[#303241] mb-1">
                    Password *
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200 ${
                      errors.password
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white/60"
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.password}
                    </p>
                  )}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#303241] mb-1">
                    Role *
                  </label>
                  <select
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                  >
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#303241] mb-1">
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                  >
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-[#303241] mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    placeholder="10 digits"
                    className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200 ${
                      errors.phoneNumber
                        ? "border-red-500 bg-red-50"
                        : "border-gray-200 bg-white/60"
                    }`}
                  />
                  {errors.phoneNumber && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phoneNumber}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#303241] mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                  />
                </div>
              </div>

              {formData.role === "patient" && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-2">
                  <div>
                    <label className="block text-sm font-medium text-[#303241] mb-1">
                      Date of Birth
                    </label>
                    <input
                      type="date"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#303241] mb-1">
                      Gender
                    </label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#303241] mb-1">
                      Blood Type
                    </label>
                    <select
                      name="bloodType"
                      value={formData.bloodType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                    >
                      <option value="">Select</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </select>
                  </div>
                </div>
              )}

              {formData.role === "doctor" && (
                <div className="space-y-5 pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-[#303241] mb-1">
                        Specialization *
                      </label>
                      <input
                        type="text"
                        name="specialization"
                        value={formData.specialization}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200 ${
                          errors.specialization
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 bg-white/60"
                        }`}
                      />
                      {errors.specialization && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.specialization}
                        </p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-[#303241] mb-1">
                        License Number *
                      </label>
                      <input
                        type="text"
                        name="licenseNumber"
                        value={formData.licenseNumber}
                        onChange={handleChange}
                        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200 ${
                          errors.licenseNumber
                            ? "border-red-500 bg-red-50"
                            : "border-gray-200 bg-white/60"
                        }`}
                      />
                      {errors.licenseNumber && (
                        <p className="text-red-500 text-xs mt-1">
                          {errors.licenseNumber}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#303241] mb-1">
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="yearsOfExperience"
                      value={formData.yearsOfExperience}
                      onChange={handleChange}
                      min="0"
                      className="w-full p-3 border border-gray-200 rounded-lg bg-white/60 focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#303241] mb-3">
                      Qualifications
                    </label>
                    <div className="space-y-3 mb-3">
                      {formData.qualifications.map((qual, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <input
                            type="text"
                            value={qual}
                            onChange={(e) =>
                              handleQualificationChange(index, e.target.value)
                            }
                            className="flex-1 p-3 border border-gray-200 rounded-lg bg-white/60 focus:ring-2 focus:ring-[#FC7729] focus:border-transparent transition-all duration-200"
                          />
                          <button
                            type="button"
                            onClick={() => removeQualification(index)}
                            className="p-3 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors duration-200"
                            aria-label="Remove qualification"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-5 w-5"
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
                        </div>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={addQualification}
                      className="px-4 py-2 bg-[#303241]/10 hover:bg-[#303241]/20 text-[#303241] rounded-lg transition-colors duration-200 flex items-center gap-2"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      Add Qualification
                    </button>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3 pt-6">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-[#303241] bg-white hover:bg-gray-50 shadow-sm transition-all duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-5 py-2.5 rounded-lg shadow-md text-white transition-all duration-200 ${
                    isSubmitting
                      ? "bg-[#FCAA29]/70"
                      : "bg-[#FC7729] hover:bg-[#FC7729]/90 hover:shadow-lg"
                  }`}
                >
                  {isSubmitting ? (
                    <span className="flex items-center gap-2">
                      <svg
                        className="animate-spin h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Saving...
                    </span>
                  ) : (
                    "Save"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
