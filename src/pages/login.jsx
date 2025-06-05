import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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
import { API_BASE_URL } from "../constant/constantBaseUrl";
import { setAuthCookies } from "../utlis/cookieHelper";

const Login = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  //Handled the login process
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
          subRole: "class",
        };
      } else {
        payload = {
          mobile_no: mobileNo,
          password,
          role: mainRole,
        };
        // Add subrole to payload only if mainRole is 'VENDOR' and subrole exists
        if (mainRole === "VENDOR" && subrole) payload.subrole = subrole;
      }

      // Dynamically send api and payload as per role and subrole
      const response = await axios.post(endpoint, payload);

      // If success = extract data from the response
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
          // After confirmation = store authentication details in cookies
          setAuthCookies({
            token,
            role: responseRole,
            userID,
            classID,
            collegeID: collegeId,
            universityID: universityId,
            subrole: responseSubrole ?? "class",
          });

          const normalizedSubrole = (responseSubrole ?? "class").toLowerCase();

          if (responseRole === "ADMIN") {
            navigate("/dashboard");
          } else if (responseRole === "VENDOR") {
            switch (responseSubrole.toLowerCase()) {
              case "class":
                console.log("subrole ********", responseSubrole);
                window.location.href = "/vendor-class/class-dashboard";
                break;
              case "college":
                console.log("subrole ********", responseSubrole);
                window.location.href = "/vendor-college/college-dashboard";
                break;
              case "university":
                console.log("subrole ********", responseSubrole);
                window.location.href =
                  "/vendor-university/university-dashboard";
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
          error.response?.data?.errMessage ||
          "Please try again.",
        "warning"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    // <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-orange-500">
    <div
      className="relative flex justify-center items-center min-h-screen overflow-hidden"
      style={{
        backgroundImage: "linear-gradient(to bottom right, #6B21A8, #F97316)",
      }}
    >
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
        className="relative md:w-full w-95 max-w-md p-8 rounded-xl shadow-2xl bg-white text-gray-900 border-2 border-gray-300"
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
            ? "College DTE Code / College ID"
            : role === "VENDOR-university"
            ? "University ID Number"
            : "Mobile Number"}
        </label>
        <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4">
          <FaMobileAlt className="text-purple-500 mr-3" />
          <input
            type="text"
            className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
            placeholder={
              role === "VENDOR-college"
                ? "Enter College DTE Code / College ID"
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
          <FaLock className="text-purple-500 mr-3" />
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
            className="cursor-pointer text-gray-500 ml-2 z-10"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        {/* Dynamic Register Link */}
        <div className="text-center mb-2 flex flex-col">
          {role === "VENDOR-class" && (
            <div>
              <span>Don't have a class account? </span>
              <button
                type="button"
                onClick={() => navigate("/register-class")}
                className="text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
              >
                Register Here
              </button>
            </div>
          )}

          {role === "VENDOR-college" && (
            <div>
              <span>Don't have a college account? </span>
              <button
                type="button"
                onClick={() => navigate("/add-college")}
                className="text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
              >
                Register Here
              </button>
            </div>
          )}

          {role === "VENDOR-university" && (
            <div>
              <span>Don't have a university account? </span>
              <button
                type="button"
                onClick={() => navigate("/university")}
                className="text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
              >
                Register Here
              </button>
            </div>
          )}
        </div>

        {/* Login Button */}
        <button
          disabled={loading}
          onClick={handleLogin}
          className={`w-full py-3 rounded-lg text-white font-bold cursor-pointer ${
            loading
              ? "bg-gradient-to-br from-orange-500 to-purple-700"
              : "w-full mt-4 bg-gradient-to-br from-purple-700 to-orange-500"
          } transition duration-300`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </motion.div>
    </div>
  );
};

export default Login;
