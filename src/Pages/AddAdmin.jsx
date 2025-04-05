import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import Swal from "sweetalert2";

const AddAdmin = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSaveAdmin = async () => {
    if (!mobileNo || mobileNo.length !== 10) {
      Swal.fire("Invalid Number!", "Enter a valid 10-digit mobile number.", "warning");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/auth/admin/?role=ADMIN`, {
        mobile_no: mobileNo,
      });

      if (response.data.success) {
        Swal.fire("Success!", response.data.usrMsg || "Admin added successfully.", "success");
        setMobileNo(""); // Clear input field
      } else {
        Swal.fire("Error!", response.data.errMsg || "Failed to add admin.", "error");
      }
    } catch (error) {
      console.error("Error adding admin:", error.response?.data || error.message);
      Swal.fire("Error!", error.response?.data?.usrMsg || error.response?.data?.message|| "Something went wrong.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-[#2cacdf] to-[#1d43a1]">
      <div className="bg-white/80 backdrop-blur-md p-8 rounded-2xl shadow-lg w-96 border border-white/50">
        <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Add Admin</h2>
        <input
          type="text"
          className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#4fb7df] text-lg placeholder-gray-500 bg-white"
          placeholder="Enter Admin Mobile Number"
          value={mobileNo}
          onChange={(e) => setMobileNo(e.target.value)}
        />
        <button
          onClick={handleSaveAdmin}
          disabled={loading}
          className="w-full bg-[#2a9cbe] hover:bg-[#3c5566] text-white font-semibold py-3 rounded-lg mt-4 text-lg transition duration-300 ease-in-out shadow-md"
        >
          {loading ? "Saving..." : "Save Admin"}
        </button>
      </div>
    </div>
  );
};

export default AddAdmin;
