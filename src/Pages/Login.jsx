
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import { setAuthCookies } from "../Utlis/cookieHelper";
import Swal from "sweetalert2";
import { FaMobileAlt, FaLock, FaSms } from "react-icons/fa";

const ADMIN_MOBILE = "8999425875"; // ✅ Hardcoded Admin Mobile Number

const Login = () => {
  const [mobileNo, setMobileNo] = useState("");
  const [otp, setOtp] = useState("");
  const [referenceId, setReferenceId] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ Send OTP Function
  const sendOtp = async () => {
    if (!mobileNo || mobileNo.length !== 10) {
      Swal.fire("Invalid Number!", "Enter a valid 10-digit mobile number.", "warning");
      return;
    }

    try {
      setLoading(true);
      console.log("📌 Sending OTP to:", mobileNo);

      const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, {
        mobile_no: mobileNo,
      });

      console.log("📌 OTP Sent Response:", response.data);

      if (response.data.success) {
        setReferenceId(response.data.data.reference_id);
        console.log("📌 Stored Reference ID:", response.data.data.reference_id);

        Swal.fire("OTP Sent!");
        setStep(2);
      } else {
        Swal.fire("Failed!", "Could not send OTP. Try again.", "error");
      }
    } catch (error) {
      console.error("❌ Error sending OTP:", error.response?.data || error.message);
      Swal.fire("Error!", "Something went wrong. Try again later.", "error");
    } finally {
      setLoading(false);
    }
  };

  
 
  // const verifyOtp = async () => {
  //   if (!otp || !referenceId) {
  //     Swal.fire("Error!", "OTP and Reference ID are required.", "error");
  //     return;
  //   }
  
  //   try {
  //     setLoading(true);
  
  //     console.log("📌 Sending OTP Verification Request:", {
  //       mobile_no: mobileNo,
  //       reference_id: referenceId,
  //       otp: otp,
  //     });
  
  //     const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
  //       mobile_no: mobileNo,
  //       reference_id: referenceId,
  //       otp: otp,
  //     });
  
  //     console.log("📌 Full OTP Verification Response:", response.data);
  
  //     if (response.data.success) {
  //       Swal.fire("Success!", "OTP Verified Successfully!", "success");
  
  //       // ✅ Check if API returned user details
  //       if (!response.data.data) {
  //         console.warn("⚠️ API response is missing user details! Fetching manually...");
          
  //         // 🔹 Fetch user details manually (assuming class exists)
  //         const classResponse = await axios.get(`${API_BASE_URL}/api/class/all`);
  //         if (classResponse.data.success && classResponse.data.data.classes) {
  //           const matchedClass = classResponse.data.data.classes.find(cls => cls.contactDetails === mobileNo);
  //           if (matchedClass) {
  //             console.log("📌 Matched Class Found:", matchedClass);
              
  //             // ✅ Store Auth Details
  //             setAuthCookies({
  //               token: "manual-token", // If backend doesn’t return token, store a placeholder
  //               role: "VENDOR",
  //               subrole: "Class",
  //               userId: matchedClass._id,
  //               classId: matchedClass._id,
  //             });
  
  //             navigate("/vendor-class/class-dashboard");
  //             return;
  //           }
  //         }
  
  //         Swal.fire("User Not Found!", "Please register first.", "warning").then(() => {
  //           navigate("/register-class");
  //         });
  //         return;
  //       }
  
  //       // ✅ Store Token & Role from API Response
  //       const { token, role, userId } = response.data.data;
  //       setAuthCookies({ token, role, userId });
  
  //       navigate("/vendor-class/class-dashboard");
  //     } else {
  //       Swal.fire("Failed!", "OTP Verification Failed!", "error");
  //     }
  //   } catch (error) {
  //     console.error("❌ OTP Verification Error:", error.response?.data || error.message);
  //     Swal.fire("Error!", error.response?.data?.message || "Invalid OTP. Try again.", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };


  // const verifyOtp = async () => {
  //   if (!otp || !referenceId) {
  //     Swal.fire("Error!", "OTP and Reference ID are required.", "error");
  //     return;
  //   }
  
  //   try {
  //     setLoading(true);
  //     console.log("📌 Sending OTP Verification Request:", { mobile_no: mobileNo, reference_id: referenceId, otp });
  
  //     let response;
  
  //     // ✅ Admin Login API
  //     if (mobileNo === ADMIN_MOBILE) {
  //       console.log("📌 Admin Login Detected! Using Admin API...");
  //       response = await axios.post(`${API_BASE_URL}/api/auth/signup?role=ADMIN`, {
  //         mobile_no: mobileNo,
  //         reference_id: referenceId,
  //         otp: otp,
  //       });
  //     }
  //     // ✅ Vendor Login API
  //     else {
  //       console.log("📌 Vendor Login Detected! Using Vendor API...");
  //       response = await axios.post(`${API_BASE_URL}/api/auth/signup?role=VENDOR&subrole=Class`, {
  //         mobile_no: mobileNo,
  //         reference_id: referenceId,
  //         otp: otp,
  //       });
  //     }
  
  //     console.log("📌 Full OTP Verification Response:", response.data);
  
  //     if (response.data.success) {
  //       // ✅ Show Success Popup
  //       Swal.fire("Success!", response.data.usrMsg || "OTP Verified Successfully!", "success");
  
  //       // ✅ Extract Data
  //       let { token, role, subrole, userId, classId } = response.data.data || {};
  
  //       // ✅ Fix: Override role if Admin is logging in
  //       if (mobileNo === ADMIN_MOBILE) {
  //         role = "ADMIN";
  //         subrole = undefined; // Admin doesn't need subrole
  //         classId = undefined; // Admin doesn't need classId
  //       }
  
  //       // ✅ If API doesn’t return a token, set a placeholder token
  //       const authToken = token || "manual-token";
  
  //       // ✅ Prepare Auth Details
  //       let authDetails = {
  //         token: authToken,
  //         role,
  //         userId,
  //       };
  
  //       // ✅ If role is Vendor, add subrole & classId
  //       if (role === "VENDOR") {
  //         authDetails.subrole = subrole || "Class";
  //         authDetails.classId = classId || null;
  //       }
  
  //       // ✅ Store Authentication Details
  //       setAuthCookies(authDetails);
  
  //       // ✅ Navigate Based on Role
  //       if (role === "ADMIN") {
  //         navigate("/admin-dashboard");
  //       } else {
  //         navigate("/vendor-class/class-dashboard");
  //       }
  //     } else {
  //       Swal.fire("Failed!", response.data.usrMsg || "OTP Verification Failed!", "error");
  //     }
  //   } catch (error) {
  //     console.error("❌ OTP Verification Error:", error.response?.data || error.message);
  //     Swal.fire("Error!", error.response?.data?.message || "Invalid OTP. Try again.", "error");
  //   } finally {
  //     setLoading(false);
  //   }
  // };
  const verifyOtp = async () => {
    if (!otp || !referenceId) {
      Swal.fire("Error!", "OTP and Reference ID are required.", "error");
      return;
    }
  
    try {
      setLoading(true);
  
      console.log("📌 Sending OTP Verification Request:", {
        mobile_no: mobileNo,
        reference_id: referenceId,
        otp: otp,
      });
  
      let response;
  
      // ✅ Admin Login Handling
      if (mobileNo === ADMIN_MOBILE) {
        console.log("📌 Admin Login Detected! Using Admin API...");
        response = await axios.post(`${API_BASE_URL}/api/auth/signup?role=ADMIN`, {
          mobile_no: mobileNo,
          reference_id: referenceId,
          otp: otp,
        });
      } 
      // ✅ Vendor Login Handling
      else {
        console.log("📌 Vendor Login Detected! Using Vendor API...");
        response = await axios.post(`${API_BASE_URL}/api/auth/signup?role=VENDOR&subrole=Class`, {
          mobile_no: mobileNo,
          reference_id: referenceId,
          otp: otp,
        });
      }
  
      console.log("📌 Full OTP Verification Response:", response.data);
  
      if (response.data.success) {
        Swal.fire("Success!", response.data.usrMsg || "OTP Verified Successfully!", "success");
  
        // ✅ Extract Data
        let { token, role, subrole, userId, classId } = response.data.data || {};
  
        // ✅ Override Role for Admin
        if (mobileNo === ADMIN_MOBILE) {
          role = "ADMIN";
          subrole = undefined; // Remove subrole for Admin
          classId = undefined; // Remove classId for Admin
        }
  
        // ✅ Store Authentication Details
        setAuthCookies({
          token: token || "manual-token",
          role,
          userId,
          ...(role === "VENDOR" ? { subrole, classId } : {}), // ✅ Only include subrole/classId if Vendor
        });
  
        // ✅ Navigation Based on Role
        if (role === "ADMIN") {
          navigate("/dashboard");
          return;
        }
  
        // ✅ If Vendor, Check Registration
        console.log("📌 Checking Vendor Registration...");
        const classResponse = await axios.get(`${API_BASE_URL}/api/class/all`);
  
        if (classResponse.data.success && classResponse.data.data.classes) {
          const matchedClass = classResponse.data.data.classes.find(cls => cls.contactDetails === mobileNo);
  
          if (matchedClass) {
            console.log("📌 Matched Vendor Class Found:", matchedClass);
  
            // ✅ Store Class Details
            setAuthCookies({
              token,
              role: "VENDOR",
              subrole: "Class",
              userId,
              classId: matchedClass._id,
            });
  
            navigate("/vendor-class/class-dashboard");
            return;
          }
        }
  
        // ✅ If No Vendor Found, Redirect to Registration
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
      } else {
        Swal.fire("Failed!", response.data.usrMsg || "OTP Verification Failed!", "error");
      }
    } catch (error) {
      console.error("❌ OTP Verification Error:", error.response?.data || error.message);
      Swal.fire("Error!", error.response?.data?.message || "Invalid OTP. Try again.", "error");
    } finally {
      setLoading(false);
    }
  };
  
  
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-gray-200 to-gray-100 p-6">
      <div className="w-full max-w-md bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-300">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {step === 1 ? "Login with Mobile" : "Enter OTP"}
        </h2>

        {step === 1 && (
          <>
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Mobile Number
            </label>
            <div className="flex items-center bg-white shadow-md p-3 rounded-lg border border-gray-300">
              {/* <FaMobileAlt className="text-gray-500 mr-3" /> */}
              <input
                type="text"
                className="w-full outline-none bg-transparent"
                placeholder="Enter Mobile Number"
                value={mobileNo}
                onChange={(e) => setMobileNo(e.target.value)}
              />
            </div>
            <button
              onClick={sendOtp}
              disabled={loading}
              className="w-full mt-4 bg-gray-800 hover:bg-gray-900 text-white py-3 rounded-lg font-semibold shadow-lg transition"
            >
              
              <FaSms /> {loading ? "Sending..." : "Send OTP"}
            </button>
          </>
        )}

        {step === 2 && (
          <>
            <label className="block text-gray-700 text-lg font-medium mb-2">
              Enter OTP
            </label>
            <div className="flex items-center bg-white shadow-md p-3 rounded-lg border border-gray-300">
              {/* <FaLock className="text-gray-500 mr-3" /> */}
              <input
                type="text"
                className="w-full outline-none bg-transparent"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </div>
            <button
              onClick={verifyOtp}
              disabled={loading}
              className="w-full mt-4 bg-green-600 hover:bg-green-700 cursor-pointer text-white py-3 rounded-lg font-semibold shadow-lg transition"
            >
              <FaLock /> {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;




