


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { setAuthCookies } from "../Utlis/cookieHelper";
import Swal from "sweetalert2";
import { FaMobileAlt, FaLock, FaBook, FaGraduationCap, FaLightbulb } from "react-icons/fa";
import { motion } from "framer-motion";

const Login = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!mobileNo || mobileNo.length !== 10) {
      Swal.fire("Invalid Number!", "Enter a valid 10-digit mobile number.", "warning");
      return;
    }

    if (!password) {
      Swal.fire("Missing Fields!", "Please enter your password.", "warning");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/auth/login`, {
        mobile_no: mobileNo,
        password,
      });

      console.log("Response", response);
      if (response.data.success) {
        const { token, role, subrole, userID} = response.data.data || {};
        console.log("user id====",response?.data?.data);
        console.log("Response data", response.data);
        
        Swal.fire("Success!", response.data.usrMsg || "Logged in successfully!", "success");

        // ✅ For ADMIN
        if (role === "ADMIN") {
          setAuthCookies({ token: token || "manual-token", role, userID
          });
          // window.location.href = "/dashboard";
          navigate("/dashboard");
        }

        // ✅ For VENDOR
        else if (role === "VENDOR") {
          try {
            const classResponse = await axios.get(`${API_BASE_URL}/api/class/all`);
            if (classResponse.data.success && classResponse.data.data.classes) {
              const matchedClass = classResponse.data.data.classes.find(
                (cls) => cls.contactDetails === mobileNo
              );

              if (matchedClass) {
                // ✅ Store all cookies including classId
                setAuthCookies({
                  token: token || "manual-token",
                  role: "VENDOR",
                  userID,
                  subrole,
                  classId: matchedClass._id,
                });
                console.log("Token", token);
                // window.location.href = "/vendor-class/class-dashboard";
                navigate("/vendor-class/class-dashboard");
                return;
              }
            }

            // ❌ No class found
            Swal.fire({
              title: "User Not Found!",
              text: "No registered class found. Please register first.",
              icon: "warning",
              confirmButtonText: "Register Now",
            }).then((result) => {
              if (result.isConfirmed) {
                // window.location.href = "/register-class";
                navigate("/register-class");
              }
            });
          } catch (err) {
            console.error("Error fetching class data:", err);
            Swal.fire( err.response?.data.errMessage || "Error!", "Something went wrong while checking registration.", "error");
          }
        }
      } else {
        Swal.fire("Login Failed!", response.data.usrMsg || error.response?.data.errMessage || "Something went wrong!", "error");
      }
    } catch (error) {
      Swal.fire("Error!", error.response?.data?.message ||  error.response?.data.errMessage || "Server Error", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-orange-500">
      {/* Floating Icons */}
      <div className="absolute inset-0 flex flex-wrap">
        {[FaBook, FaGraduationCap, FaLightbulb, FaBook, FaGraduationCap].map((Icon, i) => (
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
        ))}
      </div>

      {/* Login Box */}
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

        {/* Mobile Number */}
        <label className="text-gray-700 text-lg font-medium mb-2 flex items-center">Mobile Number</label>
        <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4">
          <FaMobileAlt className="text-blue-500 mr-3" />
          <input
            type="text"
            className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
            placeholder="Enter Mobile Number"
            value={mobileNo}
            onChange={(e) => setMobileNo(e.target.value)}
          />
        </div>

        {/* Password */}
        <label className="text-gray-700 text-lg font-medium mb-2">Password</label>
        <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4">
          <FaLock className="text-purple-600 mr-3" />
          <input
            type="password"
            className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        {/* Login Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogin}
          disabled={loading}
          className="w-full mt-4 bg-gradient-to-br from-purple-700 to-orange-500 cursor-pointer text-white py-3 rounded-lg font-semibold shadow-md flex items-center justify-center"
        >
          {loading ? "Submitting..." : "Login"}
        </motion.button>

        {/* Decorations */}
        <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500 opacity-10 rounded-full blur-xl"></div>
      </motion.div>
    </div>
  );
};

export default Login;
