import React, { useState, useEffect } from "react";
import { FaCheckCircle, FaSms } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ Import SweetAlert
import { API_BASE_URL } from "../constant/constantBaseUrl";


const ContactWithOTP = ({ formik, setVerifiedOtp }) => {
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
    if (
      !formik.values.contactDetails ||
      formik.values.contactDetails.length !== 10
    ) {
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

      const response = await axios.post(`${API_BASE_URL}/api/auth/otp`, {
        contactDetails: formik.values.contactDetails, // ✅ Takes mobile number from form
        role: "VENDOR",
      });

      console.log("📌 OTP Sent Response:", response.data);
      if (response.data.success) {
        setReferenceId(response.data.data.reference_id); // ✅ Store reference ID
        setOtpSent(true); // ✅ Show OTP input field

        // ✅ Popup for OTP Sent
        Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          html: `<p>Your OTP has been sent to <strong>${formik.values.contactDetails}</strong></p>`,
          confirmButtonColor: "#3085d6",
          confirmButtonText: '<span class="cursor-pointer">OK</span>',
        });
      } else {
        console.log("📌 Stored Reference ID:", response.data.data.reference_id);
        Swal.fire(
          "Failed!",
          response.data.usrMsg || "Could not send OTP.",
          "warning"
        );
      }
    } catch (error) {
      console.error(
        "❌ Error sending OTP:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text:
          error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          error.response?.data.errMessage ||
          "Please try again.",
        confirmButtonColor: "#d33",
        confirmButtonText: '<span class="cursor-pointer">OK</span>',
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
        icon: "warning",
        title: "Warning!",
        text:
          error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          error.response?.data.errMessage ||
          "A required field is missing. Please check your input.",
      });
      return;
    }

    try {
      setLoading(true); // ✅ Show loading
      console.log("📌 Verifying OTP:", {
        contactDetails: formik.values.contactDetails,
        referenceId,
        otp,
      });

      const response = await axios.post(
        `${API_BASE_URL}/api/auth/vendor-verify`,
        {
          contactDetails: formik.values.contactDetails,
          reference_id: referenceId,
          otp: otp,
        }
      );

      console.log("📌 OTP Verification Response:------", response.data);

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
        setVerifiedOtp(response.data.success);

        setOtpSent(false);
        setOtp("");
        // formik.setFieldValue("isVerified", true);
      } else {
        Swal.fire({
          icon: "Warning",
          title: "Invalid OTP!",
          text:
            response.data.usrMsg ||
            response.data?.message ||
            "Please enter the correct OTP.",
          confirmButtonColor: "#d33",
        });
      }
    } catch (error) {
      console.error(
        "❌ Error verifying OTP:",
        error.response?.data || error.message
      );
      Swal.fire({
        icon: "error",
        title: "Verification Failed!",
        text:
          error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          error.response?.data.errMessage ||
          "Invalid OTP or Reference ID.",
        confirmButtonColor: "#d33",
      });
    } finally {
      setLoading(false); // ✅ Hide loading
    }
  };

  return (
    <div className="p-1 col-span-full grid md:grid-cols-2 sm:grid-cols-1 gap-4">
      {/* Mobile Number Input + Send OTP */}
      <div className="mb-2">
        <label className="text-blue-900 font-semibold block mb-2 text-lg">
          Mobile Number
        </label>
        <div className="flex rounded-lg shadow-md overflow-hidden border border-blue-300 focus-within:ring-2 focus-within:ring-blue-500">
          <input
            type="text"
            name="contactDetails"
            placeholder="Enter Mobile Number"
            value={formik.values.contactDetails}
            onChange={(e) =>
              formik.setFieldValue("contactDetails", e.target.value)
            }
            onBlur={formik.handleBlur}
            disabled={isVerified}
            className={`flex-grow px-4 py-3 focus:outline-none ${
              isVerified ? "bg-gray-200 cursor-not-allowed" : ""
            }`}
          />
          <div className="flex items-center">
            {isVerified ? (
              <div className="flex items-center gap-2 px-4 text-green-600 font-semibold">
                <FaCheckCircle size={20} />
                <span className="text-sm whitespace-nowrap">Verified</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={sendOtp}
                disabled={isVerified}
                className="px-4 py-3 h-full bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
              >
                Send OTP
              </button>
            )}
          </div>
        </div>
        {formik.touched.contactDetails && formik.errors.contactDetails && (
          <p className="text-red-500 text-sm mt-2 font-semibold">
            {formik.errors.contactDetails}
          </p>
        )}
      </div>

      {/* OTP Input + Verify */}
      {otpSent && (
        <div className="mb-2">
          <label className="text-blue-900 font-semibold block mb-2 text-lg">
            Enter OTP
          </label>
          <div className="flex rounded-lg shadow-md overflow-hidden border border-blue-300 focus-within:ring-2 focus-within:ring-blue-500">
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="flex-grow px-4 py-3 focus:outline-none"
            />
            <div className="flex items-center">
              <button
                type="button"
                onClick={verifyOtp}
                className="px-4 py-3 h-full bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
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
