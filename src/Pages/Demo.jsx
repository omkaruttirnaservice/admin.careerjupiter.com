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
        Swal.fire("Success!", "Logged in as Admin!", "success").then(()=>{
          const { token, userId } = response.data.data || {};
          setAuthCookies({ token, role: "ADMIN", userId });
    
          window.location.href = "/dashboard";
        });
  
       
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
        Swal.fire("Success!", "Logged in as Vendor!", "success").then(()=>{
          const { token, userId, classId } = vendorResponse.data.data || {};
          setAuthCookies({ token, role: "VENDOR", subrole: "Class", userId, classId });
    
          window.location.href = "/vendor-class/class-dashboard";
        });
  
       
        return;
      }
    } catch (error) {
      console.log("❌ Vendor Login Failed.");
      Swal.fire("Error!", "Invalid OTP or user not found!", "error");
    } finally {
      setLoading(false);
    }
  };
  
  
  // import React, { useState, useEffect } from "react";
// import { Formik, Form, Field, ErrorMessage } from "formik";
// import * as Yup from "yup";
// import * as XLSX from "xlsx";
// import { API_BASE_URL } from "../../Constant/constantBaseUrl";
// import axios from "axios";
// import { useNavigate, useParams } from "react-router-dom";

// const AddTest = ({ onClose }) => {
//   const navigate = useNavigate();
//   const { mainCategoryId } = useParams();
//   const [fileName, setFileName] = useState("");
//   const [selectedQuestions, setSelectedQuestions] = useState([]);
//   const [subCategories, setSubCategories] = useState([]);
//   const [selectedSubOptions, setSelectedSubOptions] = useState([]);

//   console.log("mainCategoryId------",mainCategoryId);

//   const initialValues = {
//     testName: "",
//     category: "",
//     duration: "",
//     passingMarks: "",
//     totalMarks: "",
//     totalQuestions: "",
//     randomQuestions: false,
//     excelFile: null,
//     userType: "0", // Default to Visitor (0)
//     subCategory: [],
//     sub: [],
//   };

//   const validationSchema = Yup.object({
//     testName: Yup.string().required("Test Name is required"),
//     duration: Yup.number().required("Duration is required"),
//     passingMarks: Yup.number().required("Passing Marks are required"),
//     totalMarks: Yup.number().required("Total Marks are required"),
//     totalQuestions: Yup.number()
//       .required("Total Questions are required")
//       .min(1, "Must be at least 1"),
//   });

//   const handleExcelUpload = (event, setFieldValue) => {
//     const file = event.target.files[0];
//     if (file) {
//       setFileName(file.name);
//       setFieldValue("excelFile", file);

//       const reader = new FileReader();
//       reader.readAsArrayBuffer(file);
//       reader.onload = (e) => {
//         const data = new Uint8Array(e.target.result);
//         const workbook = XLSX.read(data, { type: "array" });
//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(sheet);

//         if (jsonData.length === 0) {
//           alert("The uploaded file contains no data!");
//           setSelectedQuestions([]);
//         } else {
//           setSelectedQuestions(jsonData);
//         }
//       };
//     }
//   };

//   const handleSubmit = async (values, { setSubmitting }) => {
//     let finalQuestions = selectedQuestions;
//     const totalQ = Number(values.totalQuestions);

//     if (values.randomQuestions && selectedQuestions.length > totalQ) {
//       const uniqueQuestions = new Set();

//       while (uniqueQuestions.size < totalQ) {
//         const randomIndex = Math.floor(
//           Math.random() * selectedQuestions.length
//         );
//         uniqueQuestions.add(selectedQuestions[randomIndex]);
//       }

//       finalQuestions = Array.from(uniqueQuestions);
//     } else {
//       finalQuestions = selectedQuestions.slice(0, totalQ);
//     }

//     const requestData = {
//       title: values.testName,
//       testLevel: mainCategoryId,
//       testDuration: {
//         minutes: Math.floor(Number(values.duration)),
//         seconds: 0,
//       },
//       totalMarks: Number(values.totalMarks),
//       userType: String(values.userType), // Ensure it is sent as a string
//       questions: finalQuestions,
//       subCategory: values.subCategory,
//       sub: values.sub,
//     };

//     console.log("Sending requestData to API:", requestData);

//     try {
//       const response = await axios.post(
//         `${API_BASE_URL}/api/iqtest`,
//         requestData
//       );

//       console.log("API Response:", response.data); // Log full response
//       alert("Test added successfully!");
//       onClose();
//     } catch (error) {
//       console.error("API Error:", error.response?.data || error.message);
//       alert(
//         error.response?.data?.usrMsg ||
//           error.response?.data?.message ||
//           error.response?.data.errMsg ||
//           "Failed to add test"
//       );
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   useEffect(() => {
//     const fetchSubCategories = async () => {
//       try {
//         const response = await axios.get(
//           `${API_BASE_URL}/api/iq_category/${mainCategoryId}`
//         );

//         console.log(mainCategoryId);
//         setSubCategories(response.data?.sub_category || []);
//         // console.log(maincategoryid);
//       } catch (error) {
//         console.error("Failed to fetch subcategories:", error);
//       }
//     };

//     fetchSubCategories();
//   }, [mainCategoryId]);

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 bg-black/50 backdrop-blur-sm overflow-y-auto z-50">
//       <div className="bg-white p-6 rounded-lg shadow-xl w-[800px] relative animate-fadeIn z-50 overflow-y-auto max-h-[90vh]">
//         <h3 className="text-2xl font-bold mb-4 text-center text-gray-700">
//           ➕ Add New Test
//         </h3>

//         <Formik
//           initialValues={initialValues}
//           validationSchema={validationSchema}
//           onSubmit={handleSubmit}
//         >
//           {({ isSubmitting, setFieldValue }) => (
//             <Form className="flex flex-col space-y-4">
//               <div>
//                 <label className="block text-md font-semibold text-gray-600">
//                   Test Name:
//                 </label>
//                 <Field
//                   type="text"
//                   name="testName"
//                   className="w-full border p-2 rounded-md focus:outline-blue-500"
//                 />
//                 <ErrorMessage
//                   name="testName"
//                   component="div"
//                   className="text-red-500 text-xs"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 {/* Subcategory Dropdown */}
//                 <label>Select Sub Category</label>
//                 <Field
//                   as="select"
//                   name="subCategory"
//                   onChange={(e) => {
//                     const selected = e.target.value;
//                     setFieldValue("subCategory", selected);
//                     const selectedSub = subCategories.find(
//                       (cat) => cat.name === selected
//                     );
//                     setSelectedSubOptions(selectedSub?.sub || []);
//                     setFieldValue("sub", "");
//                   }}
//                 >
//                   {subCategories.map((item) => (
//                     <option value={item.name}>{item.name}</option>
//                   ))}
//                 </Field>

//                   <label>Select Type</label>
//                 <Field as="select" name="sub">
//                   {selectedSubOptions.map((sub) => (
//                     <option value={sub}>{sub}</option> // 👈 uses `sub` array
//                   ))}
//                 </Field>

//                 <div>
//                   <label className="block text-md font-semibold text-gray-600">
//                     Duration (min):
//                   </label>
//                   <Field
//                     type="number"
//                     name="duration"
//                     step="any"
//                     className="w-full border p-2 rounded-md focus:outline-blue-500"
//                   />
//                   <ErrorMessage
//                     name="duration"
//                     component="div"
//                     className="text-red-500 text-xs"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-md font-semibold text-gray-600">
//                     Passing Marks:
//                   </label>
//                   <Field
//                     type="number"
//                     name="passingMarks"
//                     step="any"
//                     className="w-full border p-2 rounded-md focus:outline-blue-500"
//                   />
//                   <ErrorMessage
//                     name="passingMarks"
//                     component="div"
//                     className="text-red-500 text-xs"
//                   />
//                 </div>

//                 <div>
//                   <label className="block text-md font-semibold text-gray-600">
//                     Total Marks:
//                   </label>
//                   <Field
//                     type="number"
//                     name="totalMarks"
//                     step="any"
//                     className="w-full border p-2 rounded-md focus:outline-blue-500"
//                   />
//                   <ErrorMessage
//                     name="totalMarks"
//                     component="div"
//                     className="text-red-500 text-xs"
//                   />
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-md font-semibold text-gray-600">
//                   Total Questions Required:
//                 </label>
//                 <Field
//                   type="number"
//                   name="totalQuestions"
//                   step="any"
//                   className="w-full border p-2 rounded-md focus:outline-blue-500"
//                 />
//                 <ErrorMessage
//                   name="totalQuestions"
//                   component="div"
//                   className="text-red-500 text-xs"
//                 />
//               </div>

//               <div className="flex items-center gap-2">
//                 <Field
//                   type="checkbox"
//                   name="randomQuestions"
//                   className="w-4 h-4"
//                 />
//                 <label className="text-gray-600">Random Questions</label>
//               </div>

//               <div>
//                 <label className="block text-md font-semibold text-gray-600">
//                   User Type:
//                 </label>
//                 <div className="flex gap-4">
//                   <label className="flex items-center gap-2">
//                     <Field
//                       type="radio"
//                       name="userType"
//                       value="0"
//                       className="w-4 h-4"
//                     />
//                     <span className="text-gray-600">Without Login</span>
//                   </label>
//                   <label className="flex items-center gap-2">
//                     <Field
//                       type="radio"
//                       name="userType"
//                       value="1"
//                       className="w-4 h-4"
//                     />
//                     <span className="text-gray-600">With Login</span>
//                   </label>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-md font-semibold text-gray-600">
//                   Upload Excel:
//                 </label>
//                 <div className="flex items-center gap-4">
//                   <input
//                     type="file"
//                     accept=".xlsx, .xls"
//                     className="border p-2 rounded-md"
//                     onChange={(e) => handleExcelUpload(e, setFieldValue)}
//                   />
//                   <a
//                     href="/IQTest_Sample.xlsx" // Path to your sample file
//                     download="sample.xlsx"
//                     className="text-blue-500 hover:underline text-sm"
//                   >
//                     Download Sample Excel
//                   </a>
//                 </div>
//                 {fileName && (
//                   <p className="text-gray-500 text-sm">
//                     Selected File: {fileName}
//                   </p>
//                 )}
//               </div>

//               <div className="flex justify-between mt-4 gap-12">
//                 <button
//                   type="submit"
//                   disabled={isSubmitting}
//                   className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600 transition-all w-1/2 cursor-pointer"
//                 >
//                   {isSubmitting ? "Saving..." : "Save"}
//                 </button>
//                 <button
//                   type="button"
//                   onClick={onClose}
//                   className="bg-gray-400 text-white px-2 py-2 rounded-md hover:bg-gray-500 transition-all w-1/2 cursor-pointer"
//                 >
//                   Close
//                 </button>
//               </div>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   );
// };

// export default AddTest;


 // const validationSchema = Yup.object({
  //   infrastructure: Yup.array().of(
  //     Yup.object().shape({
  //       campusArea: Yup.string().required("Campus area is required"),
  //       numberOfClassrooms: Yup.number()
  //         .min(1, "Must have at least 1 classroom")
  //         .required("Required"),
  //       numberOfLabs: Yup.number()
  //         .min(1, "Must have at least 1 lab")
  //         .required("Required"),
  //       sportsFacilities: Yup.array().min(1, "Select at least one sports facility"),
  //       hostelAvailability: Yup.boolean().required("Select hostel availability"),
  //       hostelDetails: Yup.string().when("hostelAvailability", {
  //         is: true,
  //         then: (schema) => schema.required("Provide hostel details"),
  //         otherwise: (schema) => schema.notRequired(),
  //       }),
  //       canteenAndFoodServices: Yup.boolean().required("Select canteen availability"),
  //       medicalFacilities: Yup.boolean().required("Select medical facilities"),
  //       transportFacility: Yup.array().min(1, "Select at least one transport option"),
  //       library: Yup.string().required("Library details are required"),
  //     })
  //   ),
  // });

  // const validationSchema = Yup.object({
  //   // infrastructure: Yup.array().of(
  //   //   Yup.object().shape({
  //   //     campusArea: Yup.string().required("Campus area is required"),
  //   //     numberOfClassrooms: Yup.number()
  //   //       .min(1, "Must have at least 1 classroom")
  //   //       .required("Required"),
  //   //     numberOfLabs: Yup.number()
  //   //       .min(1, "Must have at least 1 lab")
  //   //       .required("Required"),
  //   //     sportsFacilities: Yup.array()
  //   //       .min(1, "Select at least one sports facility")
  //   //       .required("Required"),
  //   //     hostelAvailability: Yup.boolean().required(
  //   //       "Select hostel availability"
  //   //     ),
  //   //     hostelDetails: Yup.string().when("hostelAvailability", {
  //   //       is: true,
  //   //       then: (schema) =>
  //   //         schema.required(
  //   //           "Hostel details are required when hostel is available"
  //   //         ),
  //   //     }),
  //   //     canteenAndFoodServices: Yup.boolean().required(
  //   //       "Select canteen availability"
  //   //     ),
  //   //     medicalFacilities: Yup.boolean().required("Select medical facilities"),
  //   //     transportFacility: Yup.array()
  //   //       .min(1, "Select at least one transport option")
  //   //       .required("Required"),
  //   //     library: Yup.string().required("Library details are required"),
  //   //   })
  //   // ),
  // });

  // Login page 

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

//   // const getLoginEndpoint = (mainRole, subrole) => {
//   //   if (mainRole === "VENDOR") {
//   //     if (subrole === "college") return "/api/admin/login-college";
//   //     if (subrole === "university") return "/api/admin/login-university";
//   //   }
//   //   return "/api/admin/login";
//   // };

//   const handleLogin = async () => {
//     if (
//       !mobileNo ||
//       (role !== "VENDOR-college" &&
//         role !== "VENDOR-university" &&
//         role !== "VENDOR-class" &&
//         mobileNo.length !== 10)
//     ) {
//       Swal.fire(
//         "Invalid Input!",
//         "Please provide a valid ID or 10-digit mobile number.",
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
//       const [mainRole, subrole] = role.split("-");

//       // Default endpoint
//       let endpoint = `${API_BASE_URL}/api/admin/login`;

//       // Determine specific endpoint for college/university
//       if (role === "VENDOR-college")
//         endpoint = `${API_BASE_URL}/api/admin/login-college`;
//       else if (role === "VENDOR-university")
//         endpoint = `${API_BASE_URL}/api/admin/login-university`;
//       // class uses default endpoint

//       // Payload build based on role
//       let payload = {};
//       if (role === "VENDOR-college") {
//         payload = {
//           collegeId: mobileNo,
//           password,
//           role: "Vendor",
//           subrole: "college",
//         };
//       } else if (role === "VENDOR-university") {
//         payload = {
//           universityId: mobileNo,
//           password,
//           role: "Vendor",
//           subrole: "university",
//         };
//       } else if (role === "VENDOR-class") {
//         payload = {
//           mobile_no: mobileNo,
//           password,
//           role: "VENDOR",
//           subRole: "class", // Note: backend expects camelCase subRole here
//         };
//       } else {
//         payload = {
//           mobile_no: mobileNo,
//           password,
//           role: mainRole,
//         };
//         if (mainRole === "VENDOR" && subrole) payload.subrole = subrole;
//       }

//       const response = await axios.post(endpoint, payload);

//       if (response.data.success) {
//         const {
//           token,
//           role: responseRole,
//           subrole: responseSubrole,
//           userID,
//           classID,
//           collegeId,
//           universityId,
//         } = response.data.data || {};

//         Swal.fire(
//           "Success!",
//           response.data.usrMsg || "Logged in successfully!",
//           "success"
//         ).then(() => {
//           setAuthCookies({
//             token,
//             role: responseRole,
//             userID,
//             classID,
//             collegeID: collegeId,
//             universityID: universityId,
//             subrole: responseSubrole ?? "class", // handle null subrole from response
//           });

//           const normalizedSubrole = (responseSubrole ?? "class").toLowerCase();

//           if (responseRole === "ADMIN") {
//             navigate("/dashboard");
//           } else if (responseRole === "VENDOR") {
//             switch ((responseSubrole ?? "class").toLowerCase()) {
//               case "class":
//                 console.log("Subrole****** class", subrole);
//                 // navigate("/vendor-class/class-dashboard");
//                 window.location.href = "/vendor-class/class-dashboard";
//                 break;
//               case "college":
//                 console.log("subrole ********", responseSubrole);
//                 window.location.href = "/vendor-college/college-dashboard";
//                 break;
//               case "university":
//                 window.location.href = "/vendor-university/university-dashboard";
//                 // navigate("/vendor-university/university-dashboard");
//                 break;
//               default:
//                 Swal.fire(
//                   "Unknown Role",
//                   "We couldn't determine your access level.",
//                   "warning"
//                 );
//             }
//           }
//         });
//       } else {
//         Swal.fire({
//           title: "User Not Found!",
//           text: "No registered record found. Please register first.",
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
//         error.response?.data?.message ||
//           error.response?.data?.usrMsg ||
//           "Please try again.",
//         "warning"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen overflow-hidden bg-gradient-to-br from-purple-700 to-orange-500">
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
//         <label className="text-gray-700 text-lg font-medium mb-2">
//           Select Role
//         </label>
//         <select
//           className="w-full bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4 outline-none text-gray-900"
//           value={role}
//           onChange={(e) => setRole(e.target.value)}
//         >
//           <option value="" disabled>
//             Select Role
//           </option>
//           <option value="ADMIN">Admin</option>
//           <option value="VENDOR-class">Class</option>
//           <option value="VENDOR-college">College</option>
//           <option value="VENDOR-university">University</option>
//         </select>

//         {/* Mobile No or ID */}
//         <label className="text-gray-700 text-lg font-medium mb-2">
//           {role === "VENDOR-college"
//             ? "College ID Number"
//             : role === "VENDOR-university"
//             ? "University ID Number"
//             : "Mobile Number"}
//         </label>
//         <div className="flex items-center bg-gray-100 p-3 rounded-lg border border-gray-400 mb-4">
//           <FaMobileAlt className="text-blue-500 mr-3" />
//           <input
//             type="text"
//             className="w-full outline-none bg-transparent text-gray-900 placeholder-gray-500"
//             placeholder={
//               role === "VENDOR-college"
//                 ? "Enter College ID"
//                 : role === "VENDOR-university"
//                 ? "Enter University ID"
//                 : "Enter Mobile Number"
//             }
//             value={mobileNo}
//             maxLength={
//               role === "ADMIN" || role === "VENDOR-class" ? 10 : undefined
//             }
//             onChange={(e) => setMobileNo(e.target.value)}
//           />
//         </div>

//         {/* Password */}
//         <label className="text-gray-700 text-lg font-medium mb-2">
//           Password
//         </label>
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
//         <button
//           disabled={loading}
//           onClick={handleLogin}
//           className={`w-full py-3 rounded-lg text-white font-bold ${
//             loading ? "bg-gray-400" : "w-full mt-4 bg-gradient-to-br from-purple-700 to-orange-500 hover:bg-purple-700"
//           } transition duration-300`}
//         >
//           {loading ? "Logging in..." : "Login"}
//         </button>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;

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
