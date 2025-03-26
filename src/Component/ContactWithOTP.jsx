// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2"; // ✅ Import SweetAlert
// import { API_BASE_URL } from "../Constant/constantBaseUrl";
// import InputField from "./InputField";
// import ButtonComponent from "./Button";

// const ContactWithOTP = ({ formik }) => {
//   const [otpSent, setOtpSent] = useState(false); // ✅ Controls OTP input visibility
//   const [referenceId, setReferenceId] = useState(""); // ✅ Stores reference ID
//   const [otp, setOtp] = useState(""); // ✅ Stores OTP input
//   const [loading, setLoading] = useState(false); // ✅ Loading state for buttons

//   // ✅ Send OTP Function
//   const sendOtp = async () => {
//     if (!formik.values.contactDetails) {
//       Swal.fire({
//         icon: "warning",
//         title: "Mobile Number Required!",
//         text: "Please enter a valid mobile number before requesting OTP.",
//       });
//       return;
//     }

//     try {
//       setLoading(true); // ✅ Show loading
//       const response = await axios.post(`${API_BASE_URL}/api/auth/send-otp`, {
//         mobile_no: formik.values.contactDetails, // ✅ Takes mobile number from form
//       });

//       console.log("📌 OTP Sent Response:", response.data);
//       if (response.data.success) {
//         setReferenceId(response.data.data.reference_id);
//         setOtpSent(true); // ✅ Show OTP input field

//         // ✅ SweetAlert Popup for OTP Sent
//         Swal.fire({
//           icon: "success",
//           title: "OTP Sent!",
//           html: `<p>Your OTP has been sent to <strong>${formik.values.contactDetails}</strong></p>
//                    <p><strong>OTP:</strong> ${response.data.data.otp}</p>`, // ✅ Show OTP here
//           confirmButtonColor: "#3085d6",
//         });
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Failed!",
//           text: "OTP could not be sent. Try again!",
//           confirmButtonColor: "#d33",
//         });
//       }
//     } catch (error) {
//       console.error("❌ Error sending OTP:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Error!",
//         text: "Something went wrong. Please try again.",
//         confirmButtonColor: "#d33",
//       });
//     } finally {
//       setLoading(false); // ✅ Hide loading
//     }
//   };

//   // ✅ Verify OTP Function
//   const verifyOtp = async () => {
//     if (!otp) {
//       Swal.fire({
//         icon: "warning",
//         title: "Enter OTP!",
//         text: "Please enter the OTP received before verifying.",
//       });
//       return;
//     }

//     try {
//       setLoading(true); // ✅ Show loading
//       const response = await axios.post(`${API_BASE_URL}/api/auth/verify-otp`, {
//         mobile_no: formik.values.contactDetails,
//         reference_id: referenceId,
//         otp: otp,
//       });

//       console.log("📌 OTP Verification Response:", response.data);
//       if (response.data.success) {
//         // ✅ Success SweetAlert
//         Swal.fire({
//           icon: "success",
//           title: "OTP Verified!",
//           text: "Your OTP has been successfully verified.",
//           confirmButtonColor: "#3085d6",
//         });

//         setOtpSent(false); // ✅ Hide OTP field after verification
//         setOtp(""); // ✅ Clear OTP input
//       } else {
//         Swal.fire({
//           icon: "error",
//           title: "Invalid OTP!",
//           text: "Please enter the correct OTP.",
//           confirmButtonColor: "#d33",
//         });
//       }
//     } catch (error) {
//       console.error("❌ Error verifying OTP:", error);
//       Swal.fire({
//         icon: "error",
//         title: "Verification Failed!",
//         text: "Invalid OTP or Reference ID.",
//         confirmButtonColor: "#d33",
//       });
//     } finally {
//       setLoading(false); // ✅ Hide loading
//     }
//   };

//   return (
//     <div className="p-4 col-span-full grid grid-cols-2 gap-4">
//       {/* 🔹 Contact Details Input + Send OTP Button */}
//       <div className="flex gap-4 items-center">
//         <InputField
//           label="Enter Mobile Number"
//           type="text"
//           name="contactDetails"
//           placeholder="Enter Mobile Number" // ✅ Now includes a placeholder
//           formik={formik}
//         />
//      <ButtonComponent 
//   onClick={sendOtp} 
//   loading={loading} 
//   text="Send OTP" 
// />
//       </div>

//       {/* 🔹 OTP Input + Verify OTP Button (Visible after OTP is Sent) */}
//       {otpSent && (
//         <div className="flex gap-4 items-center mt-4">
//           <InputField
//             label="Enter OTP"
//             type="text"
//             name="otp"
//             placeholder="Enter OTP"
//             value={otp}
//             onChange={(e) => setOtp(e.target.value)}
//           />
//           <ButtonComponent onClick={verifyOtp} loading={loading} text="Verify OTP" />

//         </div>
//       )}
//     </div>
//   );
// };

// export default ContactWithOTP;

import React, { useState } from "react";
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
          html: `<p>Your OTP has been sent to <strong>${formik.values.contactDetails}</strong></p>
                   <p><strong>OTP:</strong> ${response.data.data.otp}</p>`, // ✅ Show OTP here
          confirmButtonColor: "#3085d6",
        });

        console.log("📌 Stored Reference ID:", response.data.data.reference_id); // ✅ Debugging
      } else {
        Swal.fire({
          icon: "error",
          title: "Failed!",
          text: "OTP could not be sent. Try again!",
          confirmButtonColor: "#d33",
        });
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
        text: "Reference ID is missing. Please request a new OTP.",
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

        // ✅ Store OTP and Reference ID in Formik before submitting
      formik.setFieldValue("otp", otp);
      formik.setFieldValue("reference_id", referenceId);
      formik.setFieldValue("isVerified", true);
    

        setOtpSent(false); // ✅ Hide OTP field after verification
        setOtp(""); // ✅ Clear OTP input

        // ✅ Disable mobile number input after successful verification
        formik.setFieldValue("isVerified", true);
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
    <div className="p-4 col-span-full grid grid-cols-2 gap-4">
      {/* 🔹 Contact Details Input + Send OTP Button */}
      <div className="flex gap-4 items-center">
        <InputField
          label="Enter Mobile Number"
          type="text"
          name="contactDetails"
          placeholder="Enter Mobile Number"
          formik={formik}
          disabled={formik.values.isVerified} // ✅ Disable after verification
        />
        <ButtonComponent onClick={sendOtp} loading={loading} text="Send OTP" disabled={formik.values.isVerified} />
      </div>

      {/* 🔹 OTP Input + Verify OTP Button (Visible after OTP is Sent) */}
      {otpSent && (
        <div className="flex gap-4 items-center mt-4">
          <InputField
            label="Enter OTP"
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <ButtonComponent onClick={verifyOtp} loading={loading} text="Verify OTP" />
        </div>
      )}
    </div>
  );
};

export default ContactWithOTP;





