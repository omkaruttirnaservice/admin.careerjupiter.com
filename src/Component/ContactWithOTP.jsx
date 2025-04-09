import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaSms } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert
import { API_BASE_URL } from "../Constant/constantBaseUrl";
import InputField from "./InputField";
import ButtonComponent from "./Button";
import Cookies from "js-cookie";


const ContactWithOTP = ({ formik }) => {
  const [otpSent, setOtpSent] = useState(false); // ✅ Controls OTP input visibility
  const [referenceId, setReferenceId] = useState(""); // ✅ Stores reference ID
  const [otp, setOtp] = useState(""); // ✅ Stores OTP input
  const [loading, setLoading] = useState(false); // ✅ Loading state for buttons
  // const [isVerified, setIsVerified] = useState(false);
  const [lastContactDetails, setLastContactDetails] = useState(""); // ✅ Track last mobile number


    // ✅ Use Formik value for isVerified
    const isVerified = formik.values.isVerified;

    // Track changes in the mobile number field
  useEffect(() => {
    if (formik.values.contactDetails !== lastContactDetails) {
      setOtpSent(false); // Hide OTP section
      setOtp(""); // Clear OTP input
      setReferenceId(""); // Clear reference ID
      setLastContactDetails(formik.values.contactDetails); // Update last contact details
    }
  }, [formik.values.contactDetails, lastContactDetails]);

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
          confirmButtonText: '<span class="cursor-pointer">OK</span>', // ✅ Tailwind class applied
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
        text: error.response?.data?.usrMsg ||error.response?.data?.message ||  error.response?.data.errMessage || "Something went wrong. Please try again.",
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
        text: error.response?.data?.usrMsg ||error.response?.data?.message ||  error.response?.data.errMessage,
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
          confirmButtonText: '<span class="cursor-pointer">OK</span>', // ✅ Tailwind class applied
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
          text: response.data.usrMsg || response.data?.message || "Please enter the correct OTP.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error("❌ Error verifying OTP:", error.response?.data || error.message);
      Swal.fire({
        icon: "error",
        title: "Verification Failed!",
        text: error.response?.data?.usrMsg || error.response?.data?.message ||  error.response?.data.errMessage || "Invalid OTP or Reference ID.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false); // ✅ Hide loading
    }
  };

  return (
    <div className="p-1 col-span-full grid md:grid-cols-2 sm:grid-cols-1 gap-4">
      {/* Contact Details Input + Send OTP Button */}
      <div className="w-full flex items-center mb-2">
        <div className="relative flex-grow">
          <input
            type="text"
            className="form-input pl-4 py-2 w-full border border-gray-300 focus:ring-2 focus:ring-blue-500 rounded-md"
            placeholder="Enter Mobile Number"
            value={formik.values.contactDetails}
            onChange={(e) => formik.setFieldValue("contactDetails", e.target.value)}
            disabled={isVerified} // Disable after verification
          />
          <div className="absolute inset-y-0 right-0 flex items-center">
            {isVerified ? (
              <div className="flex  items-center gap-2 text-green-600 font-semibold">
                <FaCheckCircle size={20} />
                <span>Mobile No Verified</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={sendOtp}
                disabled={isVerified}
                className="px-4 py-2 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 rounded-md"
              >
                Send OTP
              </button>
            )}
          </div>
        </div>
      </div>
  
      {otpSent && (
        <div className="flex items-center w-full">
          <div className="relative flex-grow">
            <input
              type="text"
              className="form-input pl-4 pr-12 py-2 w-full border border-gray-300  focus:ring-2 focus:ring-blue-500 rounded-md"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <div className="absolute inset-y-0 right-0 flex items-center ">
              <button
                type="button"
                onClick={verifyOtp}
                className="px-4 py-2 cursor-pointer bg-blue-500 text-white hover:bg-blue-600 rounded-md"
              >
                Verify OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
  
  
};

export default ContactWithOTP;
