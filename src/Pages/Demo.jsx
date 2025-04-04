  // const handleCheckboxChange = (e, field) => {
  //   const { value, checked } = e.target;
  //   formik.setFieldValue(
  //     field,
  //     checked
  //       ? [...formik.values[field], value] // Add value if checked
  //       : formik.values[field].filter((item) => item !== value) // Remove if unchecked
  //   );
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const payload = {
  //     admissionStartDate: formData.admissionStartDate,
  //     admissionEndDate: formData.admissionEndDate,
  //     lastYearCutoffMarks: parseInt(formData.lastYearCutoffMarks) || 0,
  //     scholarshipsAvailable: formData.scholarshipsAvailable, // Array
  //     quotaSystem: formData.quotaSystem // Array
  //   };

  //   console.log("📢 Final Payload to API:", payload);

  //   axios.post(`${API_BASE_URL}/api/college/create`, payload)
  //     .then(response => {
  //       console.log("✅ College Created Successfully", response.data);
  //       alert("🎉 College Created Successfully!");

  //           // Reset Form After Success
  //     setFormData({
  //       admissionStartDate: "",
  //       admissionEndDate: "",
  //       lastYearCutoffMarks: "",
  //       scholarshipsAvailable: [],
  //       quotaSystem: []
  //     });
  //     })
  //     .catch(error => {
  //       console.error("❌ Error Creating College", error.response?.data || error);
  //       // ❌ Show Error Alert
  //     alert(`❌ Error: ${error.response?.data?.message || "Failed to create college"}`);

  //     });
  // };

  //   const handleSubmit = async (values) => {
  //     // Ensure all required fields are present
  //     const validData = {
  //       name: values.name || "", // Add default values if empty
  //       email_id: values.email_id || "",
  //       Category: values.Category || "General",
  //       collegeType: values.collegeType || "Private",
  //       establishedYear: values.establishedYear || new Date().getFullYear(),
  //       accreditation: values.accreditation || "NAAC A+", // Check allowed values
  //       admissionProcess: values.admissionProcess || "Online",
  //       admissionEntranceDetails: {
  //         lastYearCutoffMarks:
  //           values.admissionEntranceDetails?.lastYearCutoffMarks || 0,
  //         admissionStartDate:
  //           values.admissionEntranceDetails?.admissionStartDate || "",
  //         admissionEndDate:
  //           values.admissionEntranceDetails?.admissionEndDate || "",
  //       },
  //       image: typeof values.image === "string" ? values.image : "", // Ensure it's a string
  //     };

  //     // Check if any required field is empty
  //     if (!validData.email_id || !validData.name || !validData.Category) {
  //       toast.error("Please fill all required fields.");
  //       return;
  //     }
  //     // ✅ Append Gallery Images (if present)
  // if (values.imageGallery && values.imageGallery.length > 0) {
  //   values.imageGallery.forEach((file, index) => {
  //     if (file instanceof File) {
  //       formData.append(`imageGallery`, file); // ✅ Sends multiple images
  //     }
  //   });
  // }

  //     try {
  //       await createCollege(validData);
  //       toast.success("College created successfully!");
  //     } catch (error) {
  //       toast.error("Failed to create college. Check form fields.");
  //       console.error("Submit Error:", error);
  //     }
  //   };

  // const mutation = useMutation({
  //   mutationFn: createCollege,
  //   onMutate: () => {
  //     toast.info("Submitting college details...");
  //   },
  //   onSuccess: () => {
  //     toast.success("College created successfully!");
  //     alert("Successfully saved");
  //     formik.resetForm();
  //     setLocation(defaultLocation);
  //   },
  //   onError: (error) => {
  //     toast.error(error.response?.data?.message || "Submission failed");
  //   },
  // });

  // const searchLocation = (locationName) => {
  //   if (!locationName) {
  //     toast.error("Please enter a location to search");
  //     return;
  //   }



  
  // import React, { useState } from "react";
  // import axios from "axios";
  // import { useNavigate } from "react-router-dom";
  // import { API_BASE_URL } from "../Constant/constantBaseUrl";
  // import { setAuthCookies } from "../Utlis/cookieHelper";
  // import Swal from "sweetalert2";
  // import { FaMobileAlt, FaLock, FaSms, FaBook, FaGraduationCap, FaLightbulb} from "react-icons/fa";
  // import { NavLink } from "react-router-dom";
  // import { motion } from "framer-motion";
  
  // const ADMIN_MOBILE = "8999425275"; // ✅ Hardcoded Admin Mobile Number
  
  // const Login = () => {
  //   const [mobileNo, setMobileNo] = useState("");
  //   const [otp, setOtp] = useState("");
  //   const [referenceId, setReferenceId] = useState("");
  //   const [step, setStep] = useState(1);
  //   const [loading, setLoading] = useState(false);
  //   const navigate = useNavigate();
  
  //   // ✅ Send OTP Function
  //   // const sendOtp = async () => {
  //   //   if (!mobileNo || mobileNo.length !== 10) {
  //   //     Swal.fire("Invalid Number!", "Enter a valid 10-digit mobile number.", "warning");
  //   //     return;
  //   //   }
  
  //   //   try {
  //   //     setLoading(true);
  //   //     console.log("📌 Sending OTP to:", mobileNo);
  
  //   //     const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, {
  //   //       mobile_no: mobileNo,
  //   //     });
  
  //   //     console.log("📌 OTP Sent Response:", response.data);
  
  //   //     if (response.data.success) {
  //   //       setReferenceId(response.data.data.reference_id);
  //   //       console.log("📌 Stored Reference ID:", response.data.data.reference_id);
  
  //   //       Swal.fire("OTP Sent!");
  //   //       setStep(2);
  //   //     } else {
  //   //       Swal.fire("Failed!", "Could not send OTP. Try again.", "error");
  //   //     }
  //   //   } catch (error) {
  //   //     console.error("❌ Error sending OTP:", error.response?.data 
  //   //       || error.message);
  //   //       Swal.fire("Error!", error.response?.data?.message || "Something went wrong", "error"); 
  //   //   } finally {
  //   //     setLoading(false);
  //   //   }
  //   // };
  
  //   const sendOtp = async () => {
  //     if (!mobileNo || mobileNo.length !== 10) {
  //       Swal.fire("Invalid Number!", "Enter a valid 10-digit mobile number.", "warning");
  //       return;
  //     }
    
  //     try {
  //       setLoading(true);
  //       console.log("📌 Sending OTP to:", mobileNo);
    
  //       const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, {
  //         mobile_no: mobileNo,
  //       });
    
  //       console.log("📌 OTP Sent Response:", response.data);
    
  //       if (response.data.success) {
  //         setReferenceId(response.data.data.reference_id);
  //         Swal.fire("OTP Sent!", "Please enter the OTP.", "success");
  //         showOtpVerificationPopup(response.data.data.reference_id);
  //       }
  //     } catch (error) {
  //       console.error("❌ OTP Request Error:", error.response?.data || error.message);
    
  //       if (error.response?.status === 400 && error.response?.data?.usrMsg === "Mobile number already used") {
  //         Swal.fire({
  //           title: "Mobile Number Exists!",
  //           text: "This number is already registered. Do you want to log in?",
  //           icon: "warning",
  //           showCancelButton: true,
  //           confirmButtonText: "Login",
  //           cancelButtonText: "Cancel",
  //         }).then((result) => {
  //           if (result.isConfirmed) {
  //             showOtpVerificationPopup(null); // Open OTP popup without reference ID
  //           }
  //         });
  //       } else {
  //         Swal.fire("Error!", error.response?.data?.usrMsg || "Something went wrong!", "error");
  //       }
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  //   // Function to show OTP verification popup
  //   const showOtpVerificationPopup = (referenceId) => {
  //     Swal.fire({
  //       title: "Verify OTP",
  //       input: "text",
  //       inputPlaceholder: "Enter OTP",
  //       showCancelButton: true,
  //       confirmButtonText: "Verify",
  //       cancelButtonText: "Cancel",
  //       inputValidator: (value) => {
  //         if (!value) return "Please enter OTP!";
  //       },
  //     }).then((result) => {
  //       if (result.isConfirmed) {
  //         verifyOtp(result.value);
  //       }
  //     });
  //   };
    
  //   // const verifyOtp = async () => {
  //   //   if (!otp || !referenceId) {
  //   //     Swal.fire("Error!", "OTP and Reference ID are required.", "error");
  //   //     return;
  //   //   }
    
  //   //   try {
  //   //     setLoading(true);
    
  //   //     console.log("📌 Sending OTP Verification Request:", {
  //   //       mobile_no: mobileNo,
  //   //       reference_id: referenceId,
  //   //       otp: otp,
  //   //     });
    
  //   //     let response;
    
  //   //     // ✅ Admin Login Handling
  //   //     if (mobileNo === ADMIN_MOBILE) {
  //   //       console.log("📌 Admin Login Detected! Using Admin API...");
  //   //       response = await axios.post(`${API_BASE_URL}/api/auth/signup?role=ADMIN`, {
  //   //         mobile_no: mobileNo,
  //   //         reference_id: referenceId,
  //   //         otp: otp,
  //   //       });
  //   //     } 
  //   //     // ✅ Vendor Login Handling
  //   //     else {
  //   //       console.log("📌 Vendor Login Detected! Using Vendor API...");
  //   //       response = await axios.post(`${API_BASE_URL}/api/auth/signup?role=VENDOR&subrole=Class`, {
  //   //         mobile_no: mobileNo,
  //   //         reference_id: referenceId,
  //   //         otp: otp,
  //   //       });
  //   //     }
    
  //   //     console.log("📌 Full OTP Verification Response:", response.data);
    
  //   //     if (response.data.success) {
  //   //       Swal.fire("Success!", response.data.usrMsg || "OTP Verified Successfully!", "success");
    
  //   //       // ✅ Extract Data
  //   //       let { token, role, subrole, userId, classId } = response.data.data || {};
    
  //   //       // ✅ Override Role for Admin
  //   //       if (mobileNo === ADMIN_MOBILE) {
  //   //         role = "ADMIN";
  //   //         subrole = undefined; // Remove subrole for Admin
  //   //         classId = undefined; // Remove classId for Admin
  //   //       }
    
  //   //       // ✅ Store Authentication Details
  //   //       setAuthCookies({
  //   //         token: token || "manual-token",
  //   //         role,
  //   //         userId,
  //   //         ...(role === "VENDOR" ? { subrole, classId } : {}), // ✅ Only include subrole/classId if Vendor
  //   //       });
    
  //   //       // ✅ Navigation Based on Role
  //   //       if (role === "ADMIN") {
  //   //         navigate("/dashboard");
  //   //         return;
  //   //       }
    
  //   //       // ✅ If Vendor, Check Registration
  //   //       console.log("📌 Checking Vendor Registration...");
  //   //       const classResponse = await axios.get(`${API_BASE_URL}/api/class/all`);
    
  //   //       if (classResponse.data.success && classResponse.data.data.classes) {
  //   //         const matchedClass = classResponse.data.data.classes.find(cls => cls.contactDetails === mobileNo);
    
  //   //         if (matchedClass) {
  //   //           console.log("📌 Matched Vendor Class Found:", matchedClass);
    
  //   //           // ✅ Store Class Details
  //   //           setAuthCookies({
  //   //             token,
  //   //             role: "VENDOR",
  //   //             subrole: "Class",
  //   //             userId,
  //   //             classId: matchedClass._id,
  //   //           });
    
  //   //           navigate("/vendor-class/class-dashboard");
  //   //           return;
  //   //         }
  //   //       }
    
  //   //       // ✅ If No Vendor Found, Redirect to Registration
  //   //       Swal.fire({
  //   //         title: "User Not Found!",
  //   //         text: "No registered class found. Please register first.",
  //   //         icon: "warning",
  //   //         confirmButtonText: "Register Now",
  //   //       }).then((result) => {
  //   //         if (result.isConfirmed) {
  //   //           navigate("/register-class");
  //   //         }
  //   //       });
  //   //     } else {
  //   //       Swal.fire("Failed!", response.data.usrMsg || "OTP Verification Failed!", "error");
  //   //     }
  //   //   } catch (error) {
  //   //     console.error("❌ OTP Verification Error:", error.response?.data || error.message);
  //   //     Swal.fire("Error!", error.response?.data?.message || "Invalid OTP. Try again.", "error");
  //   //   } finally {
  //   //     setLoading(false);
  //   //   }
  //   // };
    
  
  //   // const verifyOtp = async () => {
  //   //   if (!otp || !referenceId) {
  //   //     Swal.fire("Error!", "OTP and Reference ID are required.", "error");
  //   //     return;
  //   //   }
    
  //   //   try {
  //   //     setLoading(true);
  
  //   //     console.log("📌 Sending OTP Verification Request:", {
  //   //       mobile_no: mobileNo,
  //   //       reference_id: referenceId,
  //   //       otp: otp,
  //   //     });
    
  //   //     let response;
    
  //   //     // ✅ Admin Login Handling
  //   //     if (mobileNo === ADMIN_MOBILE) {
  //   //       console.log("📌 Admin Login Detected! Using Admin API...");
  //   //       response = await axios.post(`${API_BASE_URL}/api/auth/signup?role=ADMIN`, {
  //   //         mobile_no: mobileNo,
  //   //         reference_id: referenceId,
  //   //         otp: otp,
  //   //       });
  //   //     } 
  //   //     // ✅ Vendor Login Handling
  //   //     else {
  //   //       console.log("📌 Vendor Login Detected! Using Vendor API...");
  //   //       response = await axios.post(`${API_BASE_URL}/api/auth/signup?role=VENDOR&subrole=Class`, {
  //   //         mobile_no: mobileNo,
  //   //         reference_id: referenceId,
  //   //         otp: otp,
  //   //       });
  //   //     }
    
  //   //     console.log("📌 Full OTP Verification Response:", response.data);
    
  //   //     if (response.data.success) {
  //   //       Swal.fire("Success!", response.data.usrMsg || "OTP Verified Successfully!", "success");
    
  //   //       // ✅ Extract Data
  //   //       let { token, role, subrole, userId, classId } = response.data.data || {};
    
  //   //       // ✅ Override Role for Admin
  //   //       if (mobileNo === ADMIN_MOBILE) {
  //   //         role = "ADMIN";
  //   //         subrole = undefined; // Remove subrole for Admin
  //   //         classId = undefined; // Remove classId for Admin
  //   //       }
    
  //   //       // ✅ Store Authentication Details
  //   //       setAuthCookies({
  //   //         token: token || "manual-token",
  //   //         role,
  //   //         userId,
  //   //         ...(role === "VENDOR" ? { subrole, classId } : {}), // ✅ Only include subrole/classId if Vendor
  //   //       });
    
  //   //       // ✅ Redirect Admin to Dashboard
  //   //       if (role === "ADMIN") {
  //   //         window.location.href = "/dashboard"; // ✅ Ensure full reload for Admin
  //   //         return;
  //   //       }
    
  //   //       // ✅ Vendor: Check if Registered in GET API
  //   //       console.log("📌 Checking Vendor Registration...");
  //   //       const classResponse = await axios.get(`${API_BASE_URL}/api/class/all`);
    
  //   //       if (classResponse.data.success && classResponse.data.data.classes) {
  //   //         const matchedClass = classResponse.data.data.classes.find(cls => cls.contactDetails === mobileNo);
    
  //   //         if (matchedClass) {
  //   //           console.log("📌 Matched Vendor Class Found:", matchedClass);
    
  //   //           // ✅ Store Vendor Class Details
  //   //           setAuthCookies({
  //   //             token,
  //   //             role: "VENDOR",
  //   //             subrole: "Class",
  //   //             userId,
  //   //             classId: matchedClass._id,
  //   //           });
    
  //   //           window.location.href = "/vendor-class/class-dashboard"; // ✅ Redirect Vendor
  //   //           return;
  //   //         }
  //   //       }
    
  //   //       // ✅ If No Vendor Found, Redirect to Registration
  //   //       Swal.fire({
  //   //         title: "User Not Found!",
  //   //         text: "No registered class found. Please register first.",
  //   //         icon: "warning",
  //   //         confirmButtonText: "Register Now",
  //   //       }).then((result) => {
  //   //         if (result.isConfirmed) {
  //   //           window.location.href = "/register-class"; // ✅ Redirect to Register Page
  //   //         }
  //   //       });
  //   //     } else {
  //   //       Swal.fire("Failed!", response.data.usrMsg || "OTP Verification Failed!", "error");
  //   //     }
  //   //   } catch (error) {
  //   //     console.error("❌ OTP Verification Error:", error.response?.data || error.message);
  //   //     Swal.fire("Error!", error.response?.data?.message || "Invalid OTP. Try again.", "error");
  //   //   } finally {
  //   //     setLoading(false);
  //   //   }
  //   // };
    
  
  //   const verifyOtp = async (enteredOtp) => {
  //     if (!enteredOtp || !referenceId) {
  //       Swal.fire("Error!", "OTP and Reference ID are required.", "error");
  //       return;
  //     }
    
  //     try {
  //       setLoading(true);
  //       console.log("📌 Verifying OTP:", enteredOtp);
    
  //       const response = await axios.post(
  //         `${API_BASE_URL}/api/auth/signup?role=${mobileNo === ADMIN_MOBILE ? "ADMIN" : "VENDOR&subrole=Class"}`, 
  //         { mobile_no: mobileNo, reference_id: referenceId, otp: enteredOtp }
  //       );
    
  //       if (response.data.success) {
  //         Swal.fire("Success!", response.data.usrMsg || "OTP Verified Successfully!", "success");
    
  //         let { token, role, subrole, userId, classId } = response.data.data || {};
    
  //         setAuthCookies({ token, role, userId, ...(role === "VENDOR" ? { subrole, classId } : {}) });
    
  //         if (role === "ADMIN") {
  //           navigate("/dashboard", { replace: true });
  //         } else {
  //           navigate("/vendor-class/class-dashboard", { replace: true });
  //         }
  //       } else {
  //         Swal.fire("Failed!", response.data.usrMsg || "OTP Verification Failed!", "error");
  //       }
  //     } catch (error) {
  //       Swal.fire("Error!", error.response?.data?.message || "Invalid OTP. Try again.", "error");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
    
  
  //   return (
  //     <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-orange-500">
  //       {/* 🔹 Floating Education Icons */}
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
  
  //       {/* 🔹 Solid Login Box */}
  //       <motion.div
  //         initial={{ opacity: 0, y: -20 }}
  //         animate={{ opacity: 1, y: 0 }}
  //         transition={{ duration: 0.5 }}
  //         className="relative w-full max-w-md p-8 rounded-xl shadow-2xl bg-white text-gray-900 border-2 border-gray-300"
  //       >
        
  //       {/* <div className="w-full max-w-md bg-white/30 backdrop-blur-lg shadow-xl rounded-2xl p-8 border border-gray-300"> */}
  //       <div className="text-center mb-6">
  //         <h2 className="text-3xl font-bold text-purple-800">
  //           {step === 1 ? "Login with Mobile" : "Enter OTP"}
  //         </h2>
  //         <p className="text-gray-700 mt-1">Your journey towards success starts here!</p>
  //         </div>
  
  //         {step === 1 && (
  //           <>
  //             <label className=" text-gray-700 text-lg font-medium mb-2 flex items-center">
  //               Mobile Number
  //             </label>
  //             <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 focus-within:ring-2 focus-within:ring-purple-600">
  //             <FaMobileAlt className="text-purple-600 mr-2" />
  //               <input
  //                 type="text"
  //                 className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
  //                 placeholder="Enter Mobile Number"
  //                 value={mobileNo}
  //                 onChange={(e) => setMobileNo(e.target.value)}
  //               />
  //             </div>
  //             {/* Send OTP Button */}
  //             <motion.button 
  //               whileHover={{ scale: 1.05 }} 
  //               whileTap={{ scale: 0.95 }} 
  //               onClick={sendOtp} 
  //               disabled={loading}
  //               className="w-full mt-6 bg-gradient-to-br from-purple-700 to-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold shadow-md flex items-center justify-center transition"
  //             >
  //               <FaSms className="mr-2" /> {loading ? "Sending..." : "Send OTP"}
  //             </motion.button>
  //           </>
  //         )}
  
  //         {step === 2 && (
  //           <>
  //             <label className=" text-gray-700 text-lg font-medium mb-2 flex items-center">
  //               Enter OTP
  //             </label>
  //             <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 focus-within:ring-2 focus-within:ring-green-500">
  //             <FaLock className="text-green-600 mr-3" />
  //               <input
  //                 type="text"
  //                 className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
  //                 placeholder="Enter OTP"
  //                 value={otp}
  //                 onChange={(e) => setOtp(e.target.value)}
  //               />
  //             </div>
  //             <motion.button 
  //               whileHover={{ scale: 1.05 }} 
  //               whileTap={{ scale: 0.95 }} 
  //               onClick={verifyOtp} 
  //               disabled={loading}
  //               className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold shadow-md flex items-center justify-center transition"
  //             >
  //               <FaLock className="mr-2" /> {loading ? "Verifying..." : "Verify OTP"}
  //             </motion.button>
  //           </>
  //         )}
  //          {/* Bottom Decorative Elements */}
  //          <div className="absolute top-0 left-0 w-20 h-20 bg-blue-500 opacity-10 rounded-full blur-xl"></div>
  //         <div className="absolute bottom-0 right-0 w-24 h-24 bg-purple-500 opacity-10 rounded-full blur-xl"></div>
  
  //         </motion.div>
  //       {/* </div> */}
  //     </div>
  //   );
  // };
  
  // export default Login;
  
  

  const verifyOtp = async () => {
    if (!otp || !referenceId) {
      Swal.fire("Error!", "OTP and Reference ID are required.", "error");
      return;
    }
  
    try {
      setLoading(true);
  
      let endpoint = `${API_BASE_URL}/api/auth/signup?role=ADMIN`;
  
      console.log("📌 Trying Admin Signup...");
  
      let response = await axios.post(endpoint, {
        mobile_no: mobileNo,
        reference_id: referenceId,
        otp: otp,
      });
  
      if (response.data.success) {
        console.log("✅ Admin Login Success");
        Swal.fire("Success!", "Logged in as Admin!", "success");
  
        const { token, userId } = response.data.data || {};
        setAuthCookies({ token, role: "ADMIN", userId });
  
        window.location.href = "/dashboard";
        return;
      }
    } catch (error) {
      console.log("⚠️ Admin Login Failed. Trying Vendor...");
    }
  
    try {
      let vendorEndpoint = `${API_BASE_URL}/api/auth/signup?role=VENDOR&subrole=Class`;
      console.log("📌 Trying Vendor Signup...");
  
      let vendorResponse = await axios.post(vendorEndpoint, {
        mobile_no: mobileNo,
        reference_id: referenceId,
        otp: otp,
      });
  
      if (vendorResponse.data.success) {
        console.log("✅ Vendor Login Success");
        Swal.fire("Success!", "Logged in as Vendor!", "success");
  
        const { token, userId, classId } = vendorResponse.data.data || {};
        setAuthCookies({ token, role: "VENDOR", subrole: "Class", userId, classId });
  
        window.location.href = "/vendor-class/class-dashboard";
        return;
      }
    } catch (error) {
      console.log("❌ Vendor Login Failed.");
      Swal.fire("Error!", "Invalid OTP or user not found!", "error");
    } finally {
      setLoading(false);
    }
  };
  
  
  