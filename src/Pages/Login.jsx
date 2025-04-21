import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { setAuthCookies } from "../Utlis/cookieHelper";
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
import { AnimatePresence, motion } from "framer-motion";

const Login = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("ADMIN");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async () => {
    if (!mobileNo || mobileNo.length !== 10) {
      Swal.fire(
        "Invalid Number!",
        "Enter a valid 10-digit mobile number.",
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
      const response = await axios.post(`${API_BASE_URL}/api/admin/login`, {
        mobile_no: mobileNo,
        password,
        role,
      });

      if (response.data.success) {
        const {
          token,
          role: responseRole,
          subrole,
          userID,
          classID,
        } = response.data.data || {};
        console.log("user id====", response?.data?.data);
        console.log("Response data", response.data);
        console.log("Role ***********", role);

        Swal.fire(
          "Success!",
          response.data.usrMsg || "Logged in successfully!",
          "success"
        ).then(() => {
          console.log("role", role);

          // if (role === "ADMIN") {
          //   setAuthCookies({ token: token || "manual-token", role, userID });

          //   navigate("/dashboard");
          // }

          // ✅ For VENDOR

          if (responseRole === "ADMIN") {
            setAuthCookies({ token: token, role: responseRole, userID });
            navigate("/dashboard");
          } else if (responseRole === "VENDOR") {
            const payload = {
              token: token,
              role: responseRole,
              userID,
              subrole,
              classID,
            };
            setAuthCookies(payload);
            navigate("/vendor-class/class-dashboard");
          }

          // else if (role === "VENDOR") {
          //   // ✅ Store all cookies including classId
          //   const payload = {
          //     token: token,
          //     role: "VENDOR",
          //     userID,
          //     subrole,
          //     classID,
          //   };
          //   console.log("=============", payload);

          //   setAuthCookies(payload);
          //   navigate("/vendor-class/class-dashboard");
          //   return;
          // }
        });
        // ✅ For ADMIN
      } else {
        // ❌ No class found
        Swal.fire({
          title: "User Not Found!",
          text: "No registered class found. Please register first.",
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
        "Warning",
        error.response?.data?.message ||
          error.response?.data?.usrMsg ||
          error.response?.data?.errMsg ||
          "Please Try Again",
        "warning"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-orange-500">
      {/* Floating Icons */}
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
        <label className="text-gray-700 text-lg font-medium mb-2 flex items-center">
          Mobile Number
        </label>
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
        <label className="text-gray-700 text-lg font-medium mb-2">
          Password
        </label>
        <div className="relative bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4 flex items-center">
          <FaLock className="text-purple-600 mr-3" />

          <div className="relative w-full h-6 md:h-8 lg:h-10">
            <AnimatePresence mode="wait">
              {showPassword ? (
                <motion.input
                  key="text"
                  type="text"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-full h-full outline-none bg-transparent text-gray-900 placeholder-gray-500 pr-10 absolute top-0 left-0"
                />
              ) : (
                <motion.input
                  key="password"
                  type="password"
                  value={password}
                  placeholder="Enter Password"
                  onChange={(e) => setPassword(e.target.value)}
                  initial={{ x: 30, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -30, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="w-full h-full outline-none bg-transparent text-gray-900 placeholder-gray-500 pr-10 absolute top-0 left-0"
                />
              )}
            </AnimatePresence>
          </div>

          <span
            className="cursor-pointer text-gray-500 ml-2 z-10"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <div>
          <label className="text-gray-700 text-lg font-medium mb-2 flex items-center">
            Select Role{" "}
          </label>
          <select
            className="w-full bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4 outline-none text-gray-900"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option value="ADMIN">Admin</option>
            <option value="VENDOR">Class</option>
          </select>
        </div>
        <div className="text-center">
          <span>Don't Have Class Account ? </span>
          <button
            type="button"
            onClick={() => navigate("/register-class")}
            className="text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
          >
            Register Here
          </button>
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
