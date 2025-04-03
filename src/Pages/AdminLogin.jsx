import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { setAuthCookies } from "../Utlis/cookieHelper";
import Swal from "sweetalert2";
import { FaMobileAlt, FaLock, FaSms } from "react-icons/fa";
import { motion } from "framer-motion";
import Cookies from "js-cookie";

const AdminLogin = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [otp, setOtp] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    Cookies.remove("token");
    Cookies.remove("role");
    Cookies.remove("userId");
  }, []);

  const sendOtp = async () => {
    if (!mobileNo || mobileNo.length !== 10) {
      Swal.fire(
        "Invalid Number!",
        "Enter a valid 10-digit mobile number.",
        "warning"
      );
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/auth/otp`, {
        mobile_no: mobileNo,
      });
      if (response.data.success) {
        setReferenceId(response.data.data.reference_id);
        Swal.fire("OTP Sent!");
        setStep(2);
      } else {
        Swal.fire("Failed!", "Could not send OTP. Try again.", "error");
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Warning",
        text:
          error.response?.data?.message ||
          error.response?.data?.usrMsg ||
          "Something went wrong.",
      });
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp || !referenceId) {
      Swal.fire(
        error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          "Error!",
        "OTP and Reference ID are required.",
        "error"
      );
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/signup?role=ADMIN`,
        {
          mobile_no: mobileNo,
          reference_id: referenceId,
          otp: otp,
        }
      );
      if (response.data.success) {
        Swal.fire("Success!", "OTP Verified Successfully!", "success");
        setAuthCookies({
          token: response.data.data.token,
          role: "ADMIN",
          userId: response.data.data.userId,
        });
        window.location.href = "/dashboard";
      } else {
        Swal.fire(
          "Failed!",
          response.data.message || "OTP Verification Failed!",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error!",
        error.response?.data?.message ||
          error.response?.data?.usrMsg ||
          "Invalid OTP. Try again.",
        "error"
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
          <h2 className="text-3xl font-bold text-purple-800">
            {step === 1 ? "Admin Login" : "Enter OTP"}
          </h2>
          <p className="text-gray-700 mt-1">Secure Admin Access</p>
        </div>

        {step === 1 && (
          <>
            <label className="text-gray-700 text-lg font-medium mb-2 flex items-center">
              Mobile Number
            </label>
            <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 focus-within:ring-2 focus-within:ring-purple-600">
              <FaMobileAlt className="text-purple-600 mr-2" />
              <input
                type="text"
                className="w-full outline-none bg-transparent text-gray-900  placeholder-gray-500"
                placeholder="Enter Admin Mobile Number"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={sendOtp}
              disabled={loading}
              className="w-full mt-6 bg-gradient-to-br from-purple-700 to-orange-500 hover:bg-orange-600 text-white cursor-pointer py-3 rounded-lg font-semibold shadow-md flex items-center justify-center transition"
            >
              <FaSms className="mr-2" /> {loading ? "Sending..." : "Send OTP"}
            </motion.button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="text-gray-700 text-lg font-medium mb-2 flex items-center">
              Enter OTP
            </label>
            <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 focus-within:ring-2 focus-within:ring-green-500">
              <FaLock className="text-green-600 mr-3" />
              <input
                type="text"
                className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={verifyOtp}
              disabled={loading}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md cursor-pointer flex items-center justify-center transition"
            >
              <FaLock className="mr-2" />{" "}
              {loading ? "Verifying..." : "Verify OTP"}
            </motion.button>
          </>
        )}
      </motion.div>
    </div>
  );
};

export default AdminLogin;
