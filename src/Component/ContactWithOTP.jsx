import React, { useState } from "react";
import { FaCheckCircle, FaSms } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import InputField from "./InputField";
import ButtonComponent from "./Button";

const ContactWithOTP = ({ formik }) => {
  const [otpSent, setOtpSent] = useState(false); // ✅ Controls OTP input visibility
  const [referenceId, setReferenceId] = useState(""); // ✅ Stores reference ID
  const [otp, setOtp] = useState(""); // ✅ Stores OTP input
  const [loading, setLoading] = useState(false); // ✅ Loading state for buttons
  // const [isVerified, setIsVerified] = useState(false);

    // ✅ Use Formik value for isVerified
    const isVerified = formik.values.isVerified;

  // ✅ Send OTP Function
  const sendOtp = async () => {
    if (!formik.values.contactDetails || formik.values.contactDetails.length !== 10) {
      Swal.fire({
        icon: "warning",
        title: "Invalid Mobile Number!",
        text: "Enter a valid 10-digit mobile number before requesting OTP.",
      });
      return;
    }

    try {
      setLoading(true); // ✅ Show loading
      console.log("📌 Sending OTP to:", formik.values.contactDetails);

      const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, {
        mobile_no: formik.values.contactDetails, // ✅ Takes mobile number from form
      });

      console.log("📌 OTP Sent Response:", response.data);
      if (response.data.success) {
        setReferenceId(response.data.data.reference_id); // ✅ Store reference ID
        setOtpSent(true); // ✅ Show OTP input field

        // ✅ SweetAlert Popup for OTP Sent
        Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          html: `<p>Your OTP has been sent to <strong>${formik.values.contactDetails}</strong></p>`,
          confirmButtonColor: "#3085d6",
        });
      } else {
        console.log("📌 Stored Reference ID:", response.data.data.reference_id); // ✅ Debugging
        Swal.fire("Failed!", response.data.usrMsg || "Could not send OTP.", "error");
      }
    } catch (error) {
      console.error("❌ Error sending OTP:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Something went wrong. Please try again.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false); // ✅ Hide loading
    }
  };

  // ✅ Verify OTP Function
  const verifyOtp = async () => {
    if (!otp || otp.length !== 6) {
      Swal.fire({
        icon: "warning",
        title: "Enter OTP!",
        text: "Please enter the 6-digit OTP received before verifying.",
      });
      return;
    }

    if (!referenceId) {
      console.error("❌ Missing Reference ID! API request will fail.");
      Swal.fire({
        icon: "error",
        title: "Error!",
        text: "Please request a new OTP.",
      });
      return;
    }

    try {
      setLoading(true); // ✅ Show loading
      console.log("📌 Verifying OTP:", { mobile_no: formik.values.contactDetails, referenceId, otp });

      const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
        mobile_no: formik.values.contactDetails,
        reference_id: referenceId,
        otp: otp,
      });

      console.log("📌 OTP Verification Response:", response.data);
      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "OTP Verified!",
          text: "Your OTP has been successfully verified.",
          confirmButtonColor: "#3085d6",
        });
        // setIsVerified(true);
       

        // ✅ Store OTP and Reference ID in Formik before submitting
      formik.setFieldValue("otp", otp);
      formik.setFieldValue("reference_id", referenceId);
      formik.setFieldValue("isVerified", true);

      setOtpSent(false);
      setOtp("");
        // ✅ Disable mobile number input after successful verification
        // formik.setFieldValue("isVerified", true);
      } else {
        Swal.fire({
          icon: "error",
          title: "Invalid OTP!",
          text: "Please enter the correct OTP.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("❌ Error verifying OTP:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Verification Failed!",
        text: "Invalid OTP or Reference ID.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false); // ✅ Hide loading
    }
  };

  return (
    <div className="p-4 col-span-full grid md:grid-cols-2 sm:grid-col-2 gap-4">
      {/* 🔹 Contact Details Input + Send OTP Button */}
      <div className="flex flex-col md:flex-row gap-4 items-center w-full">
        <InputField
          label="Enter Mobile Number"
          type="text"
          name="contactDetails"
          placeholder="Enter Mobile Number"
          formik={formik}
          disabled={isVerified} // ✅ Disable after verification
          className="w-full md:w-auto"
        />
        {isVerified ? (
          <div className="flex items-center gap-2 text-green-600 font-semibold">
            <FaCheckCircle size={20} />
            <span>Mobile No Verified</span>
          </div>
        ) : (
          <ButtonComponent onClick={sendOtp} loading={loading} text="Send OTP" disabled={isVerified} className="w-full md:w-auto text-sm py-2 px-3" />
        )}
      </div>

      {otpSent && (
        <div className="flex flex-col md:flex-row gap-4 items-center mt-4 w-full">
          <InputField
            label="Enter OTP"
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full md:w-auto"
          />
          <ButtonComponent onClick={verifyOtp} loading={loading} text="Verify OTP" className="w-full md:w-auto text-sm py-2 px-3 " />
        </div>
      )}
    </div>
  );
};

export default ContactWithOTP;

// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import InputField from "./InputField";
// import ButtonComponent from "./Button";
// import { useNavigate } from "react-router-dom";

// const ContactWithOTP = ({ mobileNumber, onClose, onSuccess }) => {
//   const [otp, setOtp] = useState("");
//   const [referenceId, setReferenceId] = useState("");
//   const [loading, setLoading] = useState(false);
//   const navigate = useNavigate();

//   // Send OTP when popup opens
//   React.useEffect(() => {
//     sendOtp();
//   }, []);

//   const sendOtp = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, {
//         mobile_no: mobileNumber,
//       });
//       if (response.data.success) {
//         setReferenceId(response.data.data.reference_id);
//         Swal.fire("OTP Sent!", `OTP sent to ${mobileNumber}`, "success");
//       } else {
//         Swal.fire("Failed!", response.data.usrMsg || "Could not send OTP.", "error");
//       }
//     } catch (error) {
//       Swal.fire("Error!", "Something went wrong. Please try again.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const verifyOtp = async () => {
//     if (!otp || otp.length !== 6) {
//       Swal.fire("Enter OTP!", "Please enter the 6-digit OTP.", "warning");
//       return;
//     }
//     try {
//       setLoading(true);
//       const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
//         mobile_no: mobileNumber,
//         reference_id: referenceId,
//         otp: otp,
//       });
//       if (response.data.success) {
//         Swal.fire("Success!", "OTP Verified!", "success");
//         onSuccess(); // Call parent function to proceed with registration
//         navigate("/vendor-dashboard"); // Redirect to vendor dashboard
//       } else {
//         Swal.fire("Invalid OTP!", "Please enter the correct OTP.", "error");
//       }
//     } catch (error) {
//       Swal.fire("Verification Failed!", "Invalid OTP or Reference ID.", "error");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
//         <h2 className="text-lg font-semibold mb-4">Enter OTP</h2>
//         <InputField
//           label="OTP"
//           type="text"
//           value={otp}
//           onChange={(e) => setOtp(e.target.value)}
//           placeholder="Enter 6-digit OTP"
//         />
//         <div className="flex justify-between mt-4">
//           <ButtonComponent text="Verify OTP" onClick={verifyOtp} loading={loading} />
//           <ButtonComponent text="Cancel" onClick={onClose} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ContactWithOTP;

