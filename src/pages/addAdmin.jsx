import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import Swal from "sweetalert2";

const AddAdmin = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveAdmin = async () => {
    if (!mobileNo || mobileNo.length !== 10) {
      Swal.fire(
        "Invalid Number!",
        "Enter a valid 10-digit mobile number.",
        "warning"
      );
      return;
    }

    if (!password || password.length < 4) {
      Swal.fire(
        "Invalid Password!",
        "Password should be at least 4 characters.",
        "warning"
      );
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/admin/add`, {
        mobile_no: mobileNo,
        password: password,
      });

      if (response.data.success) {
        Swal.fire(
          "Success!",
          response.data.errMsg || "Admin added successfully.",
          "success"
        ).then(() => {
          setMobileNo("");
          setPassword("");
        });
      } else {
        Swal.fire(
          response.data.errMsg || "Failed to add admin.",
          "warning"
        );
      }
    } catch (error) {
      console.error(
        "Failed to add admin:",
        error.response?.data || error.message
      );
      Swal.fire(
        "Warning!",
        error.response?.data?.errMsg ||
          error.response?.data?.message ||
          "Please Try Again.",
        "warning"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#2cacdf] to-[#1d43a1]">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96 border border-white/50">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Add Admin
        </h2>

        <input
          type="text"
          className="w-full p-4 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fb7df] text-lg placeholder-gray-500 bg-white"
          placeholder="Enter Admin Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />

        <input
          type="password"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fb7df] text-lg placeholder-gray-500 bg-white"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleSaveAdmin}
          disabled={loading}
          className="w-full bg-[#2a9cbe] hover:bg-[#3c5566] text-white font-semibold py-3 rounded-lg mt-4 text-lg transition duration-300 ease-in-out shadow-md cursor-pointer"
        >
          {loading ? "Saving..." : "Save Admin"}
        </button>
      </div>
    </div>
  );
};

export default AddAdmin;
