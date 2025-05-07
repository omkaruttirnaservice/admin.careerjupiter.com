// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import { setAuthCookies } from "../Utlis/cookieHelper";
// import Swal from "sweetalert2";
// import {
//   FaMobileAlt,
//   FaLock,
//   FaBook,
//   FaGraduationCap,
//   FaLightbulb,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";
// import { AnimatePresence, motion } from "framer-motion";
// import Cookies from "js-cookie";

// const Login = () => {
//   const [mobileNo, setMobileNo] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [role, setRole] = useState("");
//   const navigate = useNavigate();
//   const [showPassword, setShowPassword] = useState(false);

//   const handleLogin = async () => {
//     if (!mobileNo || mobileNo.length !== 10) {
//       Swal.fire(
//         "Invalid Number!",
//         "Enter a valid 10-digit mobile number.",
//         "warning"
//       );
//       return;
//     }

//     if (!password) {
//       Swal.fire("Missing Fields!", "Please enter your password.", "warning");
//       return;
//     }

//     try {
//       setLoading(true);
//       const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
//         mobile_no: mobileNo,
//         password,
//         role,
//       });

//       if (response.data.success) {
//         const {
//           token,
//           role: responseRole,
//           subrole,
//           userID,
//           classID,
//         } = response.data.data || {};
//         console.log("user id====", response?.data?.data);
//         console.log("Response data", response.data);
//         console.log("Role ***********", role);

//         Swal.fire(
//           "Success!",
//           response.data.usrMsg || "Logged in successfully!",
//           "success"
//         ).then(() => {
//           console.log("role", role);

//           // ✅ For VENDOR

//           if (responseRole === "ADMIN") {
//             setAuthCookies({ token: token, role: responseRole, userID });
//             navigate("/dashboard");
//           } else if (responseRole === "VENDOR") {
//             const payload = {
//               token: token,
//               role: responseRole,
//               userID,
//               subrole,
//               classID,
//             };
//             setAuthCookies(payload);
//             navigate("/vendor-class/class-dashboard");
//           }

//         });
//         // ✅ For ADMIN
//       } else {
//         // ❌ No class found
//         Swal.fire({
//           title: "User Not Found!",
//           text: "No registered class found. Please register first.",
//           icon: "warning",
//           confirmButtonText: "Register Now",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             navigate("/register-class");
//           }
//         });
//       }
//     } catch (error) {
//       Swal.fire(
//         "Warning",
//         error.response?.data?.message ||
//           error.response?.data?.usrMsg ||
//           error.response?.data?.errMsg ||
//           "Please Try Again",
//         "warning"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-orange-500">
//       {/* Floating Icons */}
//       <div className="absolute inset-0 flex flex-wrap">
//         {[FaBook, FaGraduationCap, FaLightbulb, FaBook, FaGraduationCap].map(
//           (Icon, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 0.3, y: 0 }}
//               transition={{ duration: 1, delay: i * 0.3 }}
//               className="absolute text-white opacity-20"
//               style={{
//                 fontSize: `${Math.random() * 3 + 2}rem`,
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//               }}
//             >
//               <Icon />
//             </motion.div>
//           )
//         )}
//       </div>

//       {/* Login Box */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="relative w-full max-w-md p-8 rounded-xl shadow-2xl bg-white text-gray-900 border-2 border-gray-300"
//       >
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-purple-800">Login</h2>
//           <p className="text-gray-700 mt-1">Welcome back!</p>
//         </div>

//         <div>
//           <label className="text-gray-700 text-lg font-medium mb-2 flex items-center">
//             Select Role
//           </label>
//           <select
//             className="w-full bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4 outline-none text-gray-900"
//             value={role}
//             onChange={(e) => setRole(e.target.value)}
//           >
//             <option value="" disabled>
//               Select Role
//             </option>
//             <option value="ADMIN">Admin</option>
//             <option value="VENDOR">Class</option>
//           </select>
//         </div>

//         {/* Mobile Number */}
//         <label className="text-gray-700 text-lg font-medium mb-2 flex items-center">
//           Mobile Number
//         </label>
//         <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4">
//           <FaMobileAlt className="text-blue-500 mr-3" />
//           <input
//             type="text"
//             className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
//             placeholder="Enter Mobile Number"
//             value={mobileNo}
//             onChange={(e) => setMobileNo(e.target.value)}
//           />
//         </div>

//         {/* Password */}
//         <label className="text-gray-700 text-lg font-medium mb-2">
//           Password
//         </label>
//         <div className="relative bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4 flex items-center">
//           <FaLock className="text-purple-600 mr-3" />

//           <div className="relative w-full h-6 md:h-8 lg:h-10">
//             <AnimatePresence mode="wait">
//               {showPassword ? (
//                 <motion.input
//                   key="text"
//                   type="text"
//                   value={password}
//                   placeholder="Enter Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   initial={{ x: 30, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   exit={{ x: -30, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="w-full h-full outline-none bg-transparent text-gray-900 placeholder-gray-500 pr-10 absolute top-0 left-0"
//                 />
//               ) : (
//                 <motion.input
//                   key="password"
//                   type="password"
//                   value={password}
//                   placeholder="Enter Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   initial={{ x: 30, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   exit={{ x: -30, opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="w-full h-full outline-none bg-transparent text-gray-900 placeholder-gray-500 pr-10 absolute top-0 left-0"
//                 />
//               )}
//             </AnimatePresence>
//           </div>

//           <span
//             className="cursor-pointer text-gray-500 ml-2 z-10"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <div className="text-center">
//           <span>Don't Have Class Account ? </span>
//           <button
//             type="button"
//             onClick={() => navigate("/register-class")}
//             className="text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
//           >
//             Register Here
//           </button>
//         </div>
//         {/* Login Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full mt-4 bg-gradient-to-br from-purple-700 to-orange-500 cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md flex items-center justify-center"
//         >
//           {loading ? "Submitting..." : "Login"}
//         </motion.button>

//         {/* Decorations */}
//         <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
//         <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500 opacity-10 rounded-full blur-xl"></div>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";
// import axios from "axios";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import Swal from "sweetalert2";

// const Login = () => {
//   const navigate = useNavigate();
//   const [mobileNo, setMobileNo] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("ADMIN");
//   const [loading, setLoading] = useState(false);
//   const [errorMessage, setErrorMessage] = useState("");

//   const setAuthCookies = (data) => {
//     Cookies.set("token", data.token, { expires: 1 });
//     Cookies.set("role", data.role, { expires: 1 });
//     if (data.subrole) Cookies.set("subrole", data.subrole, { expires: 1 });
//     Cookies.set("userID", data.userID, { expires: 1 });
//     if (data.classID) Cookies.set("classID", data.classID, { expires: 1 });
//   };

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setErrorMessage("");

//     // try {
//     //   const [mainRole, subrole] = role.split("-");

//     //   const payload = {
//     //     mobile_no: mobileNo,
//     //     password,
//     //     role: mainRole,
//     //   };

//     //   if (mainRole === "VENDOR" && subrole) {
//     //     payload.subrole = subrole;
//     //   }

//     //   const response = await axios.post(`${API_BASE_URL}/api/admin/login`, payload);

//     //   const { token, role: responseRole, userID, classID } = response.data;

//     //   setAuthCookies({ token, role: mainRole, subrole, userID, classID });

//     //   if (mainRole === "ADMIN") {
//     //     navigate("/dashboard");
//     //   } else if (mainRole === "VENDOR") {
//     //     if (subrole === "class") {
//     //       navigate("/vendor-class/class-dashboard");
//     //     } else if (subrole === "college") {
//     //       navigate("/vendor-college/college-dashboard");
//     //     } else if (subrole === "university") {
//     //       navigate("/vendor-university/university-dashboard");
//     //     }
//     //   }
//     // }
//     try {
//       const [mainRole, subrole] = role.split("-");

//       const payload = {
//         mobile_no: mobileNo,
//         password,
//         role: mainRole,
//       };

//       if (mainRole === "VENDOR" && subrole) {
//         payload.subrole = subrole;
//       }

//       const response = await axios.post(`${API_BASE_URL}/api/admin/login`, payload);

//       if (response.data.success) {
//         const {
//           token,
//           role: responseRole,
//           subrole: responseSubrole,
//           userID,
//           classID,
//         } = response.data.data || {};

//         Swal.fire(
//           "Success!",
//           response.data.usrMsg || "Logged in successfully!",
//           "success"
//         ).then(() => {
//           if (responseRole === "ADMIN") {
//             setAuthCookies({ token, role: responseRole, userID, classID });
//             navigate("/dashboard");
//           } else if (responseRole === "VENDOR") {
//             const cookiePayload = {
//               token,
//               role: responseRole,
//               subrole: responseSubrole,
//               userID,
//               classID,
//             };
//             setAuthCookies(cookiePayload);

//             const normalizedSubrole = responseSubrole?.toLowerCase();

//             if (normalizedSubrole === "class") {
//               navigate("/vendor-class/class-dashboard");
//             } else if (normalizedSubrole === "college") {
//               navigate("/vendor-college/college-dashboard");
//             } else if (normalizedSubrole === "university") {
//               navigate("/vendor-university/university-dashboard");
//             }

//           }
//         });
//       } else {
//         Swal.fire({
//           title: "User Not Found!",
//           text: "No registered class found. Please register first.",
//           icon: "warning",
//           confirmButtonText: "Register Now",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             navigate("/register-class");
//           }
//         });
//       }
//     } catch (error) {
//       Swal.fire(
//         "Error",
//         error.response?.data?.message || "Login failed.",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//      }
//     //    catch (error) {
//     //   setErrorMessage(error.response?.data?.message || "Login failed.");
//     // } finally {
//     //   setLoading(false);
//     // }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-screen bg-gray-100">
//       <form
//         onSubmit={handleLogin}
//         className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
//       >
//         <h2 className="text-2xl font-bold text-center mb-6">Login</h2>

//         <select
//           className="w-full bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4 outline-none text-gray-900"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="ADMIN">Admin</option>
//           <option value="VENDOR-class">Vendor - Class</option>
//           <option value="VENDOR-college">Vendor - College</option>
//           <option value="VENDOR-university">Vendor - University</option>
//         </select>

//         <input
//           type="text"
//           placeholder="Mobile Number"
//           value={mobileNo}
//           onChange={(e) => setMobileNo(e.target.value)}
//           className="w-full p-3 rounded-lg border border-gray-300 mb-4"
//           required
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className="w-full p-3 rounded-lg border border-gray-300 mb-4"
//           required
//         />

//         {errorMessage && (
//           <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
//         )}

//         <button
//           type="submit"
//           disabled={loading}
//           className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import Cookies from "js-cookie";
// import Swal from "sweetalert2";
// import {
//   FaMobileAlt,
//   FaLock,
//   FaBook,
//   FaGraduationCap,
//   FaLightbulb,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";
// import { AnimatePresence, motion } from "framer-motion";
// import { setAuthCookies } from "../Utlis/cookieHelper";

// const Login = () => {
//   const [mobileNo, setMobileNo] = useState("");
//   const [password, setPassword] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [role, setRole] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

// //   const setAuthCookies = (data) => {
// //     Cookies.set("token", data.token, { expires: 1 });
// //     Cookies.set("role", data.role, { expires: 1 });
// //     if (data.subrole) Cookies.set("subrole", data.subrole, { expires: 1 });
// //     Cookies.set("userID", data.userID, { expires: 1 });
// //     if (data.classID) Cookies.set("classID", data.classID, { expires: 1 });
// //     if (data.collegeID) Cookies.set("collegeID", data.collegeID, { expires: 1 });
// // if (data.universityID) Cookies.set("universityID", data.universityID, { expires: 1 });

// //   };

//   // const handleLogin = async () => {
//   //   if (!mobileNo || mobileNo.length !== 10) {
//   //     Swal.fire("Invalid Number!", "Enter a valid 10-digit mobile number.", "warning");
//   //     return;
//   //   }

//   //   if (!password) {
//   //     Swal.fire("Missing Fields!", "Please enter your password.", "warning");
//   //     return;
//   //   }

//   //   try {
//   //     setLoading(true);
//   //     const [mainRole, subrole] = role.split("-");

//   //     const payload = {
//   //       mobile_no: mobileNo,
//   //       password,
//   //       role: mainRole,
//   //     };
//   //     if (mainRole === "VENDOR" && subrole) payload.subrole = subrole;

//   //     const response = await axios.post(`${API_BASE_URL}/api/admin/login`, payload);

//   //     if (response.data.success) {
//   //       const {
//   //         token,
//   //         role: responseRole,
//   //         subrole: responseSubrole,
//   //         userID,
//   //         classID,
//   //         collegeID,
//   //         universityID,
//   //       } = response.data.data || {};

//   //       Swal.fire("Success!", response.data.usrMsg || "Logged in successfully!", "success").then(() => {
//   //         const cookiePayload = {
//   //           token,
//   //           role: responseRole,
//   //           userID,
//   //           classID,
//   //           subrole: responseSubrole,
//   //           collegeID: collegeID,         // ✅ Corrected
//   //           universityID: universityID,   // ✅ Corrected
//   //         };

//   //         setAuthCookies(cookiePayload);

//   //         if (responseRole === "ADMIN") {
//   //           navigate("/dashboard");
//   //         } else if (responseRole === "VENDOR") {
//   //           const normalizedSubrole = responseSubrole?.toLowerCase();
//   //           if (normalizedSubrole === "class") navigate("/vendor-class/class-dashboard");
//   //           else if (normalizedSubrole === "college") navigate("/vendor-college/college-dashboard");
//   //           else if (normalizedSubrole === "university") navigate("/vendor-university/university-dashboard");
//   //         }
//   //       });
//   //     } else {
//   //       Swal.fire({
//   //         title: "User Not Found!",
//   //         text: "No registered class found. Please register first.",
//   //         icon: "warning",
//   //         confirmButtonText: "Register Now",
//   //       }).then((result) => {
//   //         if (result.isConfirmed) navigate("/register-class");
//   //       });
//   //     }
//   //   } catch (error) {
//   //     Swal.fire(
//   //       "Login Failed",
//   //       error.response?.data?.message ||
//   //         error.response?.data?.usrMsg ||
//   //         "Something went wrong. Please try again.",
//   //       "error"
//   //     );
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };

// //   import axios from "axios";
// // import Swal from "sweetalert2";
// // import { useNavigate } from "react-router-dom";
// // import { setAuthCookies } from "../helpers/cookieHelper"; // Adjust path if needed
// // import { API_BASE_URL } from "../config"; // Adjust as per your setup

// const handleLogin = async () => {
//   if (!mobileNo || mobileNo.length !== 10) {
//     Swal.fire("Invalid Number!", "Enter a valid 10-digit mobile number.", "warning");
//     return;
//   }

//   if (!password) {
//     Swal.fire("Missing Fields!", "Please enter your password.", "warning");
//     return;
//   }

//   try {
//     setLoading(true);
//     const [mainRole, subrole] = role.split("-");

//     const payload = {
//       mobile_no: mobileNo,
//       password,
//       role: mainRole,
//     };

//     if (mainRole === "VENDOR" && subrole) {
//       payload.subrole = subrole;
//     }

//     const response = await axios.post(`${API_BASE_URL}/api/admin/login`, payload);

//     if (response.data.success) {
//       const {
//         token,
//         role: responseRole,
//         subrole: responseSubrole,
//         userID,
//         classID,
//         collegeID,
//         universityID,
//       } = response.data.data || {};

//       Swal.fire("Success!", response.data.usrMsg || "Logged in successfully!", "success").then(() => {
//         // Set cookies via helper
//         setAuthCookies({
//           token,
//           role: responseRole,
//           userID,
//           classID,
//           collegeID,
//           universityID,
//           subrole: responseSubrole,
//         });

//         // Navigate based on role
//         if (responseRole === "ADMIN") {
//           navigate("/dashboard");
//         } else if (responseRole === "VENDOR") {
//           const normalizedSubrole = responseSubrole?.toLowerCase();
//           console.log("normalizedSubrole++++++",normalizedSubrole);

//           if (responseRole === "VENDOR" && normalizedSubrole === "class") {
//             window.location.href = ("/vendor-class/class-dashboard");
//             // navigate("/vendor-class/class-dashboard");
//           } else if (normalizedSubrole === "college") {
//             console.log("inside college-----",normalizedSubrole);
//             window.location.href = "/vendor-college/college-dashboard";
//             // navigate("/vendor-college/college-dashboard");

//           } else if (normalizedSubrole === "university") {
//             console.log("inside university---------",normalizedSubrole);
//             navigate("/vendor-university/university-dashboard");
//           }
//         }
//       });
//     } else {
//       Swal.fire({
//         title: "User Not Found!",
//         text: "No registered class found. Please register first.",
//         icon: "warning",
//         confirmButtonText: "Register Now",
//       }).then((result) => {
//         if (result.isConfirmed) {
//           navigate("/register-class");
//         }
//       });
//     }
//   } catch (error) {
//     Swal.fire(
//       "Login Failed",
//       error.response?.data?.message ||
//         error.response?.data?.usrMsg ||
//         "Something went wrong. Please try again.",
//       "error"
//     );
//   } finally {
//     setLoading(false);
//   }
// };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-orange-500">
//       {/* Floating Icons */}
//       <div className="absolute inset-0 flex flex-wrap">
//         {[FaBook, FaGraduationCap, FaLightbulb, FaBook, FaGraduationCap].map(
//           (Icon, i) => (
//             <motion.div
//               key={i}
//               initial={{ opacity: 0, y: -50 }}
//               animate={{ opacity: 0.3, y: 0 }}
//               transition={{ duration: 1, delay: i * 0.3 }}
//               className="absolute text-white opacity-20"
//               style={{
//                 fontSize: `${Math.random() * 3 + 2}rem`,
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//               }}
//             >
//               <Icon />
//             </motion.div>
//           )
//         )}
//       </div>

//       {/* Login Box */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="relative w-full max-w-md p-8 rounded-xl shadow-2xl bg-white text-gray-900 border-2 border-gray-300"
//       >
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-purple-800">Login</h2>
//           <p className="text-gray-700 mt-1">Welcome back!</p>
//         </div>

//         {/* Role */}
//         <label className="text-gray-700 text-lg font-medium mb-2">Select Role</label>
//         <select
//           className="w-full bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4 outline-none text-gray-900"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="" disabled>Select Role</option>
//           <option value="ADMIN">Admin</option>
//           <option value="VENDOR-class">Class</option>
//           <option value="VENDOR-college">College</option>
//           <option value="VENDOR-university">University</option>
//         </select>

//         {/* Mobile Number */}
//         <label className="text-gray-700 text-lg font-medium mb-2">Mobile Number</label>
//         <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4">
//           <FaMobileAlt className="text-blue-500 mr-3" />
//           <input
//             type="text"
//             className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
//             placeholder="Enter Mobile Number"
//             value={mobileNo}
//             onChange={(e) => setMobileNo(e.target.value)}
//           />
//         </div>

//         {/* Password */}
//         <label className="text-gray-700 text-lg font-medium mb-2">Password</label>
//         <div className="relative bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4 flex items-center">
//           <FaLock className="text-purple-600 mr-3" />
//           <div className="relative w-full h-6 md:h-8 lg:h-10">
//             <AnimatePresence mode="wait">
//               {showPassword ? (
//                 <motion.input
//                   key="text"
//                   type="text"
//                   value={password}
//                   placeholder="Enter Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   initial={{ x: 30, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   exit={{ x: -30, opacity: 0 }}
//                   transition={{ duration: 0.3 }}
//                   className="w-full h-full outline-none bg-transparent text-gray-900 placeholder-gray-500 pr-10 absolute top-0 left-0"
//                 />
//               ) : (
//                 <motion.input
//                   key="password"
//                   type="password"
//                   value={password}
//                   placeholder="Enter Password"
//                   onChange={(e) => setPassword(e.target.value)}
//                   initial={{ x: 30, opacity: 0 }}
//                   animate={{ x: 0, opacity: 1 }}
//                   exit={{ x: -30, opacity: 0 }}
//                   transition={{ duration: 0.2 }}
//                   className="w-full h-full outline-none bg-transparent text-gray-900 placeholder-gray-500 pr-10 absolute top-0 left-0"
//                 />
//               )}
//             </AnimatePresence>
//           </div>
//           <span
//             className="cursor-pointer text-gray-500 ml-2 z-10"
//             onClick={() => setShowPassword(!showPassword)}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         {/* Register Link */}
//         <div className="text-center mb-4">
//           <span>Don't have a class account? </span>
//           <button
//             type="button"
//             onClick={() => navigate("/register-class")}
//             className="text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
//           >
//             Register Here
//           </button>
//         </div>

//         {/* Login Button */}
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleLogin}
//           disabled={loading}
//           className="w-full bg-gradient-to-br from-purple-700 to-orange-500 text-white py-3 rounded-lg font-semibold shadow-md"
//         >
//           {loading ? "Submitting..." : "Login"}
//         </motion.button>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import Swal from "sweetalert2";
import {
  FaMobileAlt,
  FaLock,
  FaBook,
  FaGraduationCap,
  FaLightbulb,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { setAuthCookies } from "../Utlis/cookieHelper";

const Login = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // const getLoginEndpoint = (mainRole, subrole) => {
  //   if (mainRole === "VENDOR") {
  //     if (subrole === "college") return "/api/admin/login-college";
  //     if (subrole === "university") return "/api/admin/login-university";
  //   }
  //   return "/api/admin/login";
  // };

  const handleLogin = async () => {
    if (
      !mobileNo ||
      (role !== "VENDOR-college" &&
        role !== "VENDOR-university" &&
        role !== "VENDOR-class" &&
        mobileNo.length !== 10)
    ) {
      Swal.fire(
        "Invalid Input!",
        "Please provide a valid ID or 10-digit mobile number.",
        "warning"
      );
      return;
    }

    if (!password) {
      Swal.fire("Missing Fields!", "Please enter your password.", "warning");
      return;
    }

    try {
      setLoading(true);
      const [mainRole, subrole] = role.split("-");

      // Default endpoint
      let endpoint = `${API_BASE_URL}/api/admin/login`;

      // Determine specific endpoint for college/university
      if (role === "VENDOR-college")
        endpoint = `${API_BASE_URL}/api/admin/login-college`;
      else if (role === "VENDOR-university")
        endpoint = `${API_BASE_URL}/api/admin/login-university`;
      // class uses default endpoint

      // Payload build based on role
      let payload = {};
      if (role === "VENDOR-college") {
        payload = {
          collegeId: mobileNo,
          password,
          role: "Vendor",
          subrole: "college",
        };
      } else if (role === "VENDOR-university") {
        payload = {
          universityId: mobileNo,
          password,
          role: "Vendor",
          subrole: "university",
        };
      } else if (role === "VENDOR-class") {
        payload = {
          mobile_no: mobileNo,
          password,
          role: "VENDOR",
          subRole: "class", // Note: backend expects camelCase subRole here
        };
      } else {
        payload = {
          mobile_no: mobileNo,
          password,
          role: mainRole,
        };
        if (mainRole === "VENDOR" && subrole) payload.subrole = subrole;
      }

      const response = await axios.post(endpoint, payload);

      if (response.data.success) {
        const {
          token,
          role: responseRole,
          subrole: responseSubrole,
          userID,
          classID,
          collegeId,
          universityId,
        } = response.data.data || {};

        Swal.fire(
          "Success!",
          response.data.usrMsg || "Logged in successfully!",
          "success"
        ).then(() => {
          setAuthCookies({
            token,
            role: responseRole,
            userID,
            classID,
            collegeID: collegeId,
            universityID: universityId,
            subrole: responseSubrole ?? "class", // handle null subrole from response
          });

          const normalizedSubrole = (responseSubrole ?? "class").toLowerCase();

          if (responseRole === "ADMIN") {
            navigate("/dashboard");
          } else if (responseRole === "VENDOR") {
            switch ((responseSubrole ?? "class").toLowerCase()) {
              case "class":
                console.log("Subrole****** class", subrole);
                // navigate("/vendor-class/class-dashboard");
                window.location.href = "/vendor-class/class-dashboard";
                break;
              case "college":
                console.log("subrole ********", responseSubrole);
                window.location.href = "/vendor-college/college-dashboard";
                break;
              case "university":
                window.location.href = "/vendor-university/university-dashboard";
                // navigate("/vendor-university/university-dashboard");
                break;
              default:
                Swal.fire(
                  "Unknown Role",
                  "We couldn't determine your access level.",
                  "warning"
                );
            }
          }
        });
      } else {
        Swal.fire({
          title: "User Not Found!",
          text: "No registered record found. Please register first.",
          icon: "warning",
          confirmButtonText: "Register Now",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/register-class");
          }
        });
      }
    } catch (error) {
      Swal.fire(
        "Login Failed",
        error.response?.data?.message ||
          error.response?.data?.usrMsg ||
          "Please try again.",
        "warning"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-orange-500">
      <div className="absolute inset-0 flex flex-wrap">
        {[FaBook, FaGraduationCap, FaLightbulb, FaBook, FaGraduationCap].map(
          (Icon, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 0.3, y: 0 }}
              transition={{ duration: 1, delay: i * 0.3 }}
              className="absolute text-white opacity-20"
              style={{
                fontSize: `${Math.random() * 3 + 2}rem`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            >
              <Icon />
            </motion.div>
          )
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md p-8 rounded-xl shadow-2xl bg-white text-gray-900 border-2 border-gray-300"
      >
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-purple-800">Login</h2>
          <p className="text-gray-700 mt-1">Welcome back!</p>
        </div>

        {/* Role Selection */}
        <label className="text-gray-700 text-lg font-medium mb-2">
          Select Role
        </label>
        <select
          className="w-full bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4 outline-none text-gray-900"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="ADMIN">Admin</option>
          <option value="VENDOR-class">Class</option>
          <option value="VENDOR-college">College</option>
          <option value="VENDOR-university">University</option>
        </select>

        {/* Mobile No or ID */}
        <label className="text-gray-700 text-lg font-medium mb-2">
          {role === "VENDOR-college"
            ? "College ID Number"
            : role === "VENDOR-university"
            ? "University ID Number"
            : "Mobile Number"}
        </label>
        <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4">
          <FaMobileAlt className="text-blue-500 mr-3" />
          <input
            type="text"
            className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
            placeholder={
              role === "VENDOR-college"
                ? "Enter College ID"
                : role === "VENDOR-university"
                ? "Enter University ID"
                : "Enter Mobile Number"
            }
            value={mobileNo}
            maxLength={
              role === "ADMIN" || role === "VENDOR-class" ? 10 : undefined
            }
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>

        {/* Password */}
        <label className="text-gray-700 text-lg font-medium mb-2">
          Password
        </label>
        <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 mb-6">
          <FaLock className="text-blue-500 mr-3" />
          <input
            type={showPassword ? "text" : "password"}
            className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="text-blue-500 ml-2"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Register Link */}
        <div className="text-center mb-4">
          <span>Don't have a class account? </span>
          <button
            type="button"
            onClick={() => navigate("/register-class")}
            className="text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
          >
            Register Here
          </button>
        </div>
        {/* Login Button */}
        <button
          disabled={loading}
          onClick={handleLogin}
          className={`w-full py-3 rounded-lg text-white font-bold ${
            loading ? "bg-gray-400" : "w-full mt-4 bg-gradient-to-br from-purple-700 to-orange-500 hover:bg-purple-700"
          } transition duration-300`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </motion.div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import Swal from "sweetalert2";
// import {
//   FaMobileAlt,
//   FaLock,
//   FaBook,
//   FaGraduationCap,
//   FaLightbulb,
//   FaEye,
//   FaEyeSlash,
// } from "react-icons/fa";
// import { motion } from "framer-motion";
// import { setAuthCookies } from "../Utlis/cookieHelper";

// const Login = () => {
//   const [mobileNo, setMobileNo] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     if (!mobileNo || mobileNo.length !== 10) {
//       Swal.fire("Invalid Number!", "Enter a valid 10-digit mobile number.", "warning");
//       return;
//     }

//     if (!password) {
//       Swal.fire("Missing Fields!", "Please enter your password.", "warning");
//       return;
//     }

//     try {
//       setLoading(true);
//       const [mainRole, subrole] = role.split("-");

//       const payload = {
//         mobile_no: mobileNo,
//         password,
//         role: mainRole,
//       };

//       if (mainRole === "VENDOR" && subrole) payload.subrole = subrole;

//       const response = await axios.post(`${API_BASE_URL}/api/admin/login`, payload);

//       if (response.data.success) {
//         const {
//           token,
//           role: responseRole,
//           subrole: responseSubrole,
//           userID,
//           classID,
//           collegeID,
//           universityID,
//         } = response.data.data || {};

//         Swal.fire("Success!", response.data.usrMsg || "Logged in successfully!", "success").then(() => {
//           setAuthCookies({
//             token,
//             role: responseRole,
//             userID,
//             classID,
//             collegeID,
//             universityID,
//             subrole: responseSubrole,
//           });

//           const normalizedSubrole = responseSubrole?.toLowerCase();

//           if (responseRole === "ADMIN") {
//             navigate("/dashboard");
//           } else if (responseRole === "VENDOR") {
//             if (normalizedSubrole === "class") {
//               window.location.href = "/vendor-class/class-dashboard";
//             } else if (normalizedSubrole === "college") {
//               window.location.href = "/vendor-college/college-dashboard";
//             } else if (normalizedSubrole === "university") {
//               navigate("/vendor-university/university-dashboard");
//             }
//           }
//         });
//       } else {
//         Swal.fire({
//           title: "User Not Found!",
//           text: "No registered class found. Please register first.",
//           icon: "warning",
//           confirmButtonText: "Register Now",
//         }).then((result) => {
//           if (result.isConfirmed) {
//             navigate("/register-class");
//           }
//         });
//       }
//     } catch (error) {
//       Swal.fire(
//         "Login Failed",
//         error.response?.data?.message || error.response?.data?.usrMsg || "Something went wrong. Please try again.",
//         "error"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-orange-500">
//       {/* Floating Icons */}
//       <div className="absolute inset-0 flex flex-wrap">
//         {[FaBook, FaGraduationCap, FaLightbulb, FaBook, FaGraduationCap].map((Icon, i) => (
//           <motion.div
//             key={i}
//             initial={{ opacity: 0, y: -50 }}
//             animate={{ opacity: 0.3, y: 0 }}
//             transition={{ duration: 1, delay: i * 0.3 }}
//             className="absolute text-white opacity-20"
//             style={{
//               fontSize: `${Math.random() * 3 + 2}rem`,
//               top: `${Math.random() * 100}%`,
//               left: `${Math.random() * 100}%`,
//             }}
//           >
//             <Icon />
//           </motion.div>
//         ))}
//       </div>

//       {/* Login Box */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.5 }}
//         className="relative w-full max-w-md p-8 rounded-xl shadow-2xl bg-white text-gray-900 border-2 border-gray-300"
//       >
//         <div className="text-center mb-6">
//           <h2 className="text-3xl font-bold text-purple-800">Login</h2>
//           <p className="text-gray-700 mt-1">Welcome back!</p>
//         </div>

//         {/* Role Selection */}
//         <label className="text-gray-700 text-lg font-medium mb-2">Select Role</label>
//         <select
//           className="w-full bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4 outline-none text-gray-900"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="" disabled>Select Role</option>
//           <option value="ADMIN">Admin</option>
//           <option value="VENDOR-class">Class</option>
//           <option value="VENDOR-college">College</option>
//           <option value="VENDOR-university">University</option>
//         </select>

//         {/* Mobile Number */}
//         {/* Dynamic ID Label & Input */}
// <label className="text-gray-700 text-lg font-medium mb-2">
//   {role === "VENDOR-college"
//     ? "College ID Number"
//     : role === "VENDOR-university"
//     ? "University ID Number"
//     : "Mobile Number"}
// </label>

// <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4">
//   <FaMobileAlt className="text-blue-500 mr-3" />
//   <input
//     type={role === "ADMIN" || role === "VENDOR-class" ? "text" : "text"}
//     className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
//     placeholder={
//       role === "VENDOR-college"
//         ? "Enter College ID"
//         : role === "VENDOR-university"
//         ? "Enter University ID"
//         : "Enter Mobile Number"
//     }
//     value={mobileNo}
//     maxLength={role === "ADMIN" || role === "VENDOR-class" ? 10 : undefined}
//     onChange={(e) => setMobileNo(e.target.value)}
//   />
// </div>

//         {/* Password */}
//         <label className="text-gray-700 text-lg font-medium mb-2">Password</label>
//         <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 mb-6">
//           <FaLock className="text-blue-500 mr-3" />
//           <input
//             type={showPassword ? "text" : "password"}
//             className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
//             placeholder="Enter Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           />
//           <button
//             type="button"
//             onClick={() => setShowPassword(!showPassword)}
//             className="text-blue-500 ml-2"
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </button>
//         </div>

//         {/* Login Button */}
//         <button
//           disabled={loading}
//           onClick={handleLogin}
//           className={`w-full py-3 rounded-lg text-white font-bold ${
//             loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
//           } transition duration-300`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;
