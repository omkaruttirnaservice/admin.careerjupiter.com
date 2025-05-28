import { useState, useRef, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createCollege } from "../api/college-api";
import "leaflet/dist/leaflet.css";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import "react-toastify/dist/ReactToastify.css";
import { FaUniversity, FaImage, FaCheckCircle } from "react-icons/fa";
import MultiSelectDropdown from "../component/multiSelectDropdown";
import MultiSelectField from "../component/multiSelectField";
import InputField from "../component/inputField";
import TextAreaField from "../component/textAreaField";
import AddressModal from "../component/addressModel";
import { API_BASE_URL } from "../constant/constantBaseUrl";
import axios from "axios";
// import FileUpload from "../component/fileUpload";
import FileUpload from "../component/fileUpload";
import SingleSelectDropdown from "../component/singleSelectDropdown";
import Swal from "sweetalert2";
import { setAuthCookies } from "../utlis/cookieHelper";
import { useNavigate } from "react-router-dom";
import CollegeFileUpload from "../component/collegeFileUpload";
import CollegeAddressModal from "../component/collegeAddressModal";

// Constant Values for Accreditations
const accreditationOptions = [
  "NAAC A++",
  "NAAC A+",
  "NAAC A",
  "NDA",
  "NBA Accredited",
  "UGC Approved",
  "AICTE Approved",
  "ISO Certified",
  "NIRF Ranked",
];

// Constant Values for College Type
const collegeTypes = [
  "Gov.-Aided (Granted)",
  "Private Unaided (Non-Granted)",
  "Autonomous College",
  "Deemed to be Universities",
  "Private",
  "Distance Learning",
];

// Established Year Dropdown Value
const currentYear = new Date().getFullYear();
const establishedYears = Array.from(
  { length: currentYear - 1980 + 1 },
  (_, i) => 1980 + i
);

const AddNewCollege = () => {
  const [keywordInput, setKeywordInput] = useState("");
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressIndex, setEditingAddressIndex] = useState(null);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [verifiedOtp, setVerifiedOtp] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [referenceId, setReferenceId] = useState("");
  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastContactDetails, setLastContactDetails] = useState("");
  const navigate = useNavigate();
  const [entranceExams, setEntranceExams] = useState([]); // Store the entrance exams based on selected category
  const [emailOtpSent, setEmailOtpSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailOtp, setEmailOtp] = useState("");
  const [emailReferenceId, setEmailReferenceId] = useState("");
  const [lastEmailId, setLastEmailId] = useState("");

  // used Mutation for api calling from createCollege component
  const mutation = useMutation({
    mutationFn: createCollege,
    onSuccess: (data) => {
      toast.success("College created successfully!");
      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "College Created Successfully",
        confirmButtonColor: "#3085d6",
        background: "#f9f9f9",
      }).then(() => {
        // resetForm();
        window.location.href = "/";
      });

      console.log("API Response:+++++++++", data);

      // Set the _id from the API response to collegeId
      const collegeId = data?.data?.college?._id;
      console.log(
        "API Response clg id ------------:",
        data?.data?.college?._id
      );

      // Store collegeId in cookies
      setAuthCookies({
        collegeId: collegeId,
      });

      // the form gets reset and fields gets empty
      formik.resetForm();
      setKeywordInput("");
    },
    // If Submission Fail = shows error message
    onError: (error) => {
      console.log(
        "API Error:////////////",
        error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          error.response?.data.errMessage
      );

     
    },
  });

  // Validation section
  const validationSchema = Yup.object().shape({
    collegeId: Yup.string().required("College ID is required"),
    collegeName: Yup.string().required("College Name is required"),
    affiliatedUniversity: Yup.string().required(
      "Affiliated University is required"
    ),
    contactDetails: Yup.string()
      .matches(/^\d{10}$/, "Contact number must be exactly 10 digits")
      .required("Contact Details are required"),
    // websiteURL: Yup.string().url("Website URL must be a valid URL"),
    info: Yup.object().shape({
      description: Yup.string().required("Description is required"),
    }),
    email_id: Yup.string().email("Invalid email").required("Email is required"),
    keywords: Yup.array()
      .of(Yup.string())
      .min(1, "At least one keyword is required"),
    establishedYear: Yup.number().required("Established Year is required"),
    accreditation: Yup.string().required("Accreditation is required"),
    subCategory: Yup.array()
      .of(Yup.string())
      .min(1, "At least one branch must be selected")
      .required("Branch is required"),
    entrance_exam_required: Yup.array().min(
      1,
      "At least one entrance exam is required"
    ),
    collegeType: Yup.string().required("College Type is required"),
    category: Yup.string().required("Category is required"),
    image: Yup.mixed()
      .required("Image is required")
      .test("fileType", "Only JPG, JPEG, or PNG files are allowed", (file) =>
        file
          ? ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
          : true
      )
      .test("fileSize", "Image size must be less than 100KB", (file) =>
        file ? file.size <= 102400 : true
      ),
    password: Yup.string()
      .min(4, "Password must be at least 4 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    logo: Yup.mixed()
      .required("Logo is required")
      .test("fileType", "Only JPG, JPEG, or PNG files are allowed", (file) =>
        file
          ? ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
          : true
      )
      .test("fileSize", "Logo size must be less than 100KB", (file) =>
        file ? file.size <= 102400 : true
      ),
    gallery_image: Yup.array()
      .required("Image gallery is required")
      .min(1, "At least one image is required")
      //   // .max(2, "You can upload up to 2 images only") // Optional max limit
      .of(
        Yup.mixed()
          .test(
            "fileType",
            "Only JPG, JPEG, or PNG files are allowed",
            (file) =>
              file
                ? ["image/jpeg", "image/jpg", "image/png"].includes(file.type)
                : true
          )
          .test("fileSize", "Each image must be less than 100KB", (file) =>
            file ? file.size <= 102400 : true
          )
      ),
  });

  // formik Initial Value
  const formik = useFormik({
    initialValues: {
      collegeName: "",
      affiliatedUniversity: "",
      category: "",
      subCategory: [],
      collegeType: "",
      collegeTypeOther: "",
      address: [],
      contactDetails: "",
      info: { description: "" },
      keywords: [],
      email_id: "",
      isEmailVerified: false,
      websiteURL: "",
      establishedYear: "",
      accreditation: "",
      accreditationOther: "",
      accreditationYears: [],
      collegeId: "",
      admissionProcess: "",
      applicationFormURL: "",
      image: null,
      logo: null,
      password: "",
      confirmPassword: "",
      gallery_image: [],
      imageGallery: [],
      entrance_exam_required: [],
    },
    validationSchema,

    // Handled Submit = OnSubmit
    onSubmit: async (values) => {
      console.log("Submitting Form Data:", values);

      try {
        const formData = new FormData();

        // If not verified the show this error
        if (!verifiedOtp) {
          Swal.fire({
            icon: "warning",
            title: "OTP Not Verified",
            text: "Please verify your mobile number and OTP before submitting the form.",
            confirmButtonColor: "#f0ad4e",
          });
          return false;
        }

        // Append data to backend
        formData.append("collegeId", values.collegeId);
        formData.append("collegeName", values.collegeName);
        formData.append("affiliatedUniversity", values.affiliatedUniversity);
        formData.append("category", values.category);
        const finalCollegeType =
          values.collegeType === "Other" && values.collegeTypeOther
            ? values.collegeTypeOther
            : values.collegeType;
        formData.append("collegeType", finalCollegeType);
        formData.append("email_id", values.email_id);
        formData.append("contactDetails", values.contactDetails);
        formData.append("info[description]", values.info.description);
        formData.append("websiteURL", values.websiteURL);
        formData.append("establishedYear", values.establishedYear);

const { accreditation, accreditationOther, accreditationYears } = formik.values;

let finalAccreditation = accreditation;

if (accreditation === "Other") {
  finalAccreditation = accreditationOther.trim(); // use user input
} else if (isNaacOrNba(accreditation)) {
  const durationText = accreditationYears.join(", ") || accreditationOther.trim();
  finalAccreditation = `${accreditation} (${durationText || "Not specified"})`;
}

formData.append("accreditation", finalAccreditation);


        formData.append("admissionProcess", values.admissionProcess);

        values.subCategory.forEach((item) => {
          formData.append("subCategory", item);
        });
        formData.append("password", values.password);

        // Value of Keywords
        values.keywords.forEach((keyword, index) => {
          if (keyword.trim()) {
            formData.append(`keywords[${index}]`, keyword);
          }
        });

        // Value of Entrance Exams
        values.entrance_exam_required.forEach(
          (entrance_exam_required, index) => {
            if (entrance_exam_required.trim()) {
              formData.append(
                `entrance_exam_required[${index}]`,
                entrance_exam_required
              );
            }
          }
        );

        // Append address fields
        values.address.forEach((address, idx) => {
          formData.append(`address[${idx}][line1]`, address.line1);
          formData.append(`address[${idx}][line2]`, address.line2);
          formData.append(`address[${idx}][taluka]`, address.taluka);
          formData.append(`address[${idx}][pincode]`, address.pincode);
          formData.append(`address[${idx}][state]`, address.state);
          formData.append(`address[${idx}][dist]`, address.dist);
          formData.append(
            `address[${idx}][nearbyLandmarks]`,
            address.nearbyLandmarks
          );
          formData.append(
            `address[${idx}][autorizedName]`,
            address.autorizedName
          );
          formData.append(
            `address[${idx}][autorizedPhono]`,
            address.autorizedPhono
          );
          formData.append(`address[${idx}][designation]`, address.designation);
        });

        // Append Logo Image
        if (values.logo) {
          formData.append("logo", values.logo);
        }

        // Append Hero Image
        if (values.image) {
          formData.append("image", values.image);
        }

        // Append Gallery images
        if (values.gallery_image && values.gallery_image.length > 0) {
          values.gallery_image.forEach((file, index) => {
            formData.append(`imageGallery`, file);
          });
        } else if (values.imageGallery && values.imageGallery.length > 0) {
          values.imageGallery.forEach((file, index) => {
            formData.append(`imageGallery`, file);
          });
        }

        console.log("Final FormData being sent:", Object.fromEntries(formData));

        // Use the mutation to send the data
        mutation.mutate(formData);
      } catch (error) {
        console.error(
          "API Error:******",
          error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            error.response?.data.errMessage
        );
        Swal.fire({
          icon: "warning",
          title: "Submission Failed",
          text:
            error.response?.data?.usrMsg ||
            error.response?.data?.message ||
            error.response?.data.errMessage ||
            "Please Try Again",
          confirmButtonColor: "#d33",
        });

        if (error.response?.data?.errors) {
          console.log("Validation Errors:", error.response.data.errors);
          Swal.fire({
            icon: "warning",
            title: "Validation Errors",
            html: `<ul style="text-align:left;">${error.response.data.errors
              .map((e) => `<li>${e}</li>`)
              .join("")}</ul>`,
            confirmButtonColor: "#f0ad4e",
          });
        }
      }
    },
  });

  // Handle Gallery Image
  const handleGalleryImageChange = (event) => {
    const files = Array.from(event.target.files);
    formik.setFieldValue("gallery_image", files);
  };

  // Handle Address Modal
  const handleAddAddress = () => {
    setEditingAddressIndex(null);
    setShowAddressModal(true);
  };

  const isVerified = formik.values.isVerified;

  useEffect(() => {
    if (
      formik.values.contactDetails !== lastContactDetails ||
      formik.values.email_id !== lastEmailId
    ) {
      // Reset OTP-related states
      setOtpSent(false);
      setOtp("");
      setReferenceId("");

      setEmailOtpSent(false);
      setEmailOtp("");
      setEmailReferenceId("");

      // Update trackers
      setLastContactDetails(formik.values.contactDetails);
      setLastEmailId(formik.values.email_id);
    }
  }, [
    formik.values.contactDetails,
    formik.values.email_id,
    lastContactDetails,
    lastEmailId,
  ]);

  // SEND OTP Function
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
      setLoading(true);
      const response = await axios.post(`${API_BASE_URL}/api/auth/otp1`, {
        // Api call for send otp
        contactDetails: formik.values.contactDetails,
        role: "VENDOR",
      });

      if (response.data.success) {
        setReferenceId(response.data.data.reference_id);
        setOtpSent(true);
        Swal.fire({
          icon: "success",
          title: "OTP Sent!",
          html: `<p>Your OTP has been sent to <strong>${formik.values.contactDetails}</strong></p>`,
          confirmButtonColor: "#3085d6",
        });
      } else {
        Swal.fire(
          "Failed!",
          response.data.usrMsg ||
            error.response?.data?.message ||
            error.response?.data.errMessage ||
            "Could not send OTP.",
          "warning"
        );
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Warning!",
        text:
          error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          error.response?.data?.errMessage ||
          "Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  // VERIFY OTP Function
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
      Swal.fire({
        icon: "warning",
        title: "Reference ID missing!",
        text: "Please request a new OTP.",
      });
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${API_BASE_URL}/api/auth/vendor-verify`, // Api for verifying otp
        {
          contactDetails: formik.values.contactDetails,
          reference_id: referenceId,
          otp: otp,
        }
      );

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "OTP Verified!",
          text: "Your OTP has been successfully verified.",
          confirmButtonColor: "#3085d6",
        });
        formik.setFieldValue("otp", otp);
        formik.setFieldValue("reference_id", referenceId);
        formik.setFieldValue("isVerified", true);
        setVerifiedOtp(response.data.success);
        setOtpSent(false);
        setOtp("");
      } else {
        Swal.fire({
          icon: "warning",
          title: "Invalid OTP!",
          text: response.data.usrMsg || "Please enter the correct OTP.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "warning",
        title: "Verification Failed!",
        text:
          error.response?.data?.usrMsg ||
          error.response?.data?.message ||
          error.response?.data.errMessage ||
          "Invalid OTP.",
      });
    } finally {
      setLoading(false);
    }
  };

  
  const sendEmailOtp = async () => {
    if (!formik.values.email_id || !formik.values.email_id.includes("@")) {
      Swal.fire("Invalid Email", "Please enter a valid email.", "warning");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_BASE_URL}/api/auth/sendOtp`, {
        email_id: formik.values.email_id, // ✅ use the correct key here
      });

      if (response.data.success) {
        setEmailReferenceId(response.data.data.reference_id);
        setEmailOtpSent(true);
        Swal.fire(
          "OTP Sent",
          `OTP sent to ${formik.values.email_id}`,
          "success"
        );
      } else {
        Swal.fire(
          "Failed",
          response.data.usrMsg || "Could not send OTP",
          "error"
        );
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.usrMsg || "Try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const verifyEmailOtp = async () => {
    if (!emailOtp || emailOtp.length !== 6 || !emailReferenceId) {
      Swal.fire("Enter OTP", "Please enter the 6-digit OTP", "warning");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(`${API_BASE_URL}/api/auth/verifyOtp`, {
        email_id: formik.values.email_id, // ✅ Corrected key
        otp: emailOtp,
        reference_id: emailReferenceId,
      });

      if (response.data.success) {
        setEmailVerified(true);
        formik.setFieldValue("isEmailVerified", true);
        setEmailOtp("");
        setEmailOtpSent(false);

        Swal.fire("Verified", "Email OTP verified successfully!", "success");
      } else {
        Swal.fire("Failed", response.data.usrMsg || "Incorrect OTP", "error");
      }
    } catch (error) {
      Swal.fire(
        "Error",
        error?.response?.data?.usrMsg || "Try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // Function to open modal to edit existing address
  const handleEditAddress = (index) => {
    setEditingAddressIndex(index); // Sets index of the address being edited
    setShowAddressModal(true);
  };

  useEffect(() => {
    // Fetch college categories once when the component mounts
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/college/all-college-category`
        );
        const categories = response.data.categories || [];
        setCategoryData(categories);
      } catch (error) {
        console.error("Failed to fetch college categories", error);
      }
    };

    fetchCategories();
  }, []);

  
  // Update entrance exams when category is selected
  useEffect(() => {
    const selectedCategory = formik.values.category; // Assuming category is being managed in Formik
    const category = categoryData.find(
      (item) => item.category === selectedCategory
    );

    // Set entrance exams based on the selected category
    if (category) {
      setEntranceExams(category.entrance_exam_required || []);
    }
  }, [formik.values.category, categoryData]); // Dependency array ensures this runs when category or categoryData changes

  const isNaacOrNba = (value) =>
    ["NAAC A++", "NAAC A+", "NAAC A", "NBA Accredited"].includes(value);

  return (
   <div className="min-h-screen flex items-center justify-center relative bg-[url('https://wallpapers.com/images/hd/virtual-classroom-background-xl1p59ku6y834y02.jpg')] bg-cover bg-center bg-fixed"
    >
       <div className="absolute inset-0 bg-opacity-50 bg-black/50 backdrop-blur-sm"></div>
      <div className="w-full max-w-5xl bg-white shadow-lg p-3 border border-blue-500 lg:my-4 sm:my-2 sm:p-6 lg:p-6 relative z-10">
        <div className="text-right mb-4">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-600 underline hover:text-blue-800 transition cursor-pointer"
          >
            College Login
          </button>
        </div>
        <div className="flex justify-between items-center bg-gradient-to-r from-blue-700 to-blue-500 text-white p-5 rounded-t-lg shadow-lg">
          <h2 className="text-3xl font-bold flex items-center gap-4">
            <FaUniversity
              className="text-black bg-white p-2 rounded-md shadow-md"
              size={40}
            />
            Add New College
          </h2>
        </div>

        <form onSubmit={formik.handleSubmit} className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* College ID  */}
            <InputField
              label="College DTE code / College ID"
              name="collegeId"
              type="text"
              placeholder="Enter College ID"
              formik={formik}
            />

            {/* college Name */}
            <InputField
              label="College Name"
              name="collegeName"
              type="text"
              placeholder="Enter College Name"
              formik={formik}
            />

            {/* Affiliated University */}
            <InputField
              label="Affiliated University"
              name="affiliatedUniversity"
              type="text"
              placeholder="Enter University"
              formik={formik}
            />

            {/* College Category */}
            <div className="mb-4 w-full">
              <label className="block text-blue-800 font-semibold mb-2">
                College Streams
              </label>
              <select
                {...formik.getFieldProps("category")}
                onChange={(e) => {
                  const selected = e.target.value;
                  formik.setFieldValue("category", selected);

                  const selectedCategory = categoryData.find(
                    (item) => item.category === selected
                  );

                  // Reset subCategory based on selection
                  formik.setFieldValue("subCategory", "");
                  setSubCategories(selectedCategory?.subCategory || []);
                }}
                className={`w-full px-4 py-3 rounded-lg border shadow-sm focus:outline-none transition-all ${
                  formik.touched.category && formik.errors.category
                    ? "focus:ring-0"
                    : "border-gray-300 focus:ring-2 focus:ring-blue-400"
                }`}
              >
                <option value="" disabled>
                  Select College Stream
                </option>
                {categoryData.map((item, index) => (
                  <option key={index} value={item.category}>
                    {item.category}
                  </option>
                ))}
              </select>

              {formik.touched.category && formik.errors.category && (
                <p className="text-red-500 text-sm mt-2 font-semibold">
                  {formik.errors.category}
                </p>
              )}
            </div>

            {/* Sub Category */}
            <div className="mb-3">
              <MultiSelectDropdown
                label="Branch"
                name="subCategory"
                options={subCategories}
                formik={formik}
              />
            </div>

            {/* College Type */}
            <SingleSelectDropdown
              label="College Type"
              name="collegeType"
              options={collegeTypes}
              formik={formik}
              placeholder="Select a College Type"
            />

            <div className="p-1 flex flex-col gap-4">
              {/* Mobile Input + Send OTP */}
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
                        <span className="text-sm whitespace-nowrap">
                          Verified
                        </span>
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
                {formik.touched.contactDetails &&
                  formik.errors.contactDetails && (
                    <p className="text-red-500 text-sm mt-2 font-semibold">
                      {formik.errors.contactDetails}
                    </p>
                  )}
              </div>

              {/* OTP Input + Verify Button */}
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

           
            {/* <div className="p-1 col-span-full grid md:grid-cols-2 sm:grid-cols-1 gap-4"> */}
            <div className="p-1 flex flex-col gap-4">


              {/* Email Input + Send OTP Button */}
              <div className="mb-2">
                <label className="text-blue-900 font-semibold block mb-2 text-lg">
                  Email Address
                </label>
                <div className="flex rounded-lg shadow-md overflow-hidden border border-blue-300 focus-within:ring-2 focus-within:ring-blue-500">
                  <input
                    type="email"
                    name="email_id"
                    placeholder="Enter Email Address"
                    value={formik.values.email_id}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={emailVerified}
                    className={`flex-grow px-4 py-3 focus:outline-none ${
                      emailVerified ? "bg-gray-200 cursor-not-allowed" : ""
                    }`}
                  />

                  <div className="flex items-center">
                    {emailVerified ? (
                      <div className="flex items-center gap-2 px-4 text-green-600 font-semibold">
                        <FaCheckCircle size={20} />
                        <span className="text-sm whitespace-nowrap">
                          Verified
                        </span>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={sendEmailOtp}
                        disabled={emailOtpSent || emailVerified}
                        className="px-4 py-3 h-full bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
                      >
                        {emailOtpSent ? "OTP Sent" : "Send OTP"}
                      </button>
                    )}
                  </div>
                </div>
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500 text-sm mt-2 font-semibold">
                    {formik.errors.email}
                  </p>
                )}
              </div>

              {/* Email OTP Input + Verify Button */}
              {emailOtpSent && (
                <div className="mb-2">
                  <label className="text-blue-900 font-semibold block mb-2 text-lg">
                    Enter Email OTP
                  </label>
                  <div className="flex rounded-lg shadow-md overflow-hidden border border-blue-300 focus-within:ring-2 focus-within:ring-blue-500">
                    <input
                      type="text"
                      placeholder="Enter OTP"
                      value={emailOtp}
                      onChange={(e) => setEmailOtp(e.target.value)}
                      className="flex-grow px-4 py-3 focus:outline-none"
                    />
                    <div className="flex items-center">
                      <button
                        type="button"
                        onClick={verifyEmailOtp}
                        className="px-4 py-3 h-full bg-blue-500 text-white hover:bg-blue-600 transition cursor-pointer"
                      >
                        Verify OTP
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

             <div className="col-span-full grid grid-cols-2 gap-4">
              {/* Set Password  */}
              <InputField
                label="Set Password"
                type="password"
                name="password"
                formik={formik}
              />

              {/* Confirm Password  */}
              <InputField
                label="Confirm Password"
                type="password"
                name="confirmPassword"
                formik={formik}
              />
            </div>


            {/* Website URL  */}
            <InputField
              label="Website URL"
              name="websiteURL"
              type="text"
              placeholder="Enter website URL"
              formik={formik}
            />

            {/* Description  */}
            <TextAreaField
              label="Description"
              name="info.description"
              formik={formik}
            />

            {/* Keyword  */}
            <MultiSelectField
              label="Keywords (Max 5)"
              name="keywords"
              formik={formik}
            />

            {/* Established Year  */}
            <SingleSelectDropdown
              label="Established Year"
              name="establishedYear"
              options={establishedYears}
              formik={formik}
              placeholder="Select an Established Year"
            />

            {/* Accreditation  */}
            {/* <SingleSelectDropdown */}
            <div className="row align-items-start">
              {/* Left: Accreditation Dropdown */}
              <div className="col-md-6 mb-2">
                <SingleSelectDropdown
                  label="Accreditation"
                  name="accreditation"
                  options={accreditationOptions}
                  formik={formik}
                  placeholder="Select an Accreditation"
                />
              </div>
              {/* Right: Conditional Durations + Other Field */}
              {isNaacOrNba(formik.values.accreditation) && (
                <div className="w-full  mb-5 p-4 border border-blue-300 rounded-xl shadow-lg bg-white">
                  <label className="text-blue-900 font-semibold block mb-3 text-lg">
                    Select Accreditation Duration
                  </label>

                  {/* Checkbox Options */}
                  <div className="flex gap-3 flex-wrap">
                    {["3 Years", "5 Years"].map((option, index) => (
                      <label
                        key={index}
                        className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-blue-50 shadow-md hover:bg-blue-100 transition-all duration-200"
                      >
                        <input
                          type="checkbox"
                          name="accreditationYears"
                          value={option}
                          checked={formik.values.accreditationYears.includes(
                            option
                          )}
                          onChange={(e) => {
                            const { value, checked } = e.target;
                            let updated = [...formik.values.accreditationYears];
                            if (checked) updated.push(value);
                            else
                              updated = updated.filter(
                                (item) => item !== value
                              );
                            formik.setFieldValue("accreditationYears", updated);
                          }}
                          className="accent-blue-500 w-5 h-5"
                        />
                        <span className="text-gray-700 font-medium">
                          {option}
                        </span>
                      </label>
                    ))}
                  </div>

                  {/* Other Field */}
                  <div className="mt-4">
                    <input
                      type="text"
                      name="accreditationOther"
                      placeholder="Other (Specify duration)"
                      value={formik.values.accreditationOther}
                      onChange={formik.handleChange}
                       onBlur={formik.handleBlur}
                      className={
                        "w-full px-4 py-3 border rounded-lg shadow-md focus:outline-none transition-all duration-200 border-blue-300 focus:ring-2 focus:ring-blue-500"
                      }
                    />
                    {formik.touched.accreditationOther &&
                      formik.errors.accreditationOther && (
                        <div className="text-red-600 mt-2 text-sm font-semibold">
                          {formik.errors.accreditationOther}
                        </div>
                      )}
                  </div>
                </div>
              )}
            </div>

            {/* Entrance Exam Required */}
            <MultiSelectDropdown
              label="Entrance Exams Required"
              name="entrance_exam_required"
              options={entranceExams}
              formik={formik}
            />

            {/* Logo  */}
            <FileUpload
              label="College Logo (JPG/JPEG/PNG)"
              name="logo"
              formik={formik}
            />

            {/* Hero Image  */}
            <FileUpload
              label="College Banner Cover Image (JPG/JPEG/PNG)"
              name="image"
              multiple={false}
              formik={formik}
            />

            {/* Image Gallery  */}
            <CollegeFileUpload
              label="Gallery Images"
              name="gallery_image"
              multiple
              formik={formik}
            />
          </div>

          {/* Address Section */}
          <div className="col-span-full justify-end">
            <div className="flex justify-between items-center col-span-full gap-4">
              <label
                htmlFor="Address"
                className="text-blue-900 font-semibold block text-lg"
              >
                Address
              </label>
              <button
                type="button"
                onClick={() => {
                  setEditingAddressIndex(null); // Add new address
                  setShowAddressModal(true);
                }}
                className="cursor-pointer flex items-center gap-2 px-5 py-2 rounded-lg bg-gradient-to-r from-gray-500 to-gray-700 text-white font-medium shadow-md hover:shadow-lg hover:from-gray-400 hover:to-gray-500 transition-all duration-200"
              >
                <span className="font-extrabold">+</span> Add Address
              </button>
            </div>
          </div>

          {/* Conditionally Render Saved Addresses */}
          {formik.values.address &&
            formik.values.address.length > 0 &&
            formik.values.address.some(
              (addr) =>
                addr.line1 ||
                addr.line2 ||
                addr.pincode ||
                addr.state ||
                addr.dist
            ) && (
              <div className="col-span-full mt-4">
                <h4 className="text-xl font-semibold text-blue-800 mb-6 flex items-center gap-2">
                  <span>📌</span> Saved Addresses
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {formik.values.address.map((addr, idx) => (
                    <div
                      key={idx}
                      className="relative bg-white border border-blue-200 rounded-2xl p-5 shadow-md hover:shadow-lg transition duration-300 col-span-full"
                    >
                      <div className="space-y-1 text-gray-800 text-sm">
                        <p className="font-medium">
                          🏠 {addr.line1}, {addr.line2}
                        </p>
                        {addr.nearbyLandmarks && (
                          <p>📍 Nearby: {addr.nearbyLandmarks}</p>
                        )}
                        <p>
                          🗺️ {addr.taluka}, {addr.dist}, {addr.state} -{" "}
                          {addr.pincode}
                        </p>
                        <p className="text-gray-600 text-xs mt-1">
                          👤 {addr.autorizedName}{" "}
                          {addr.designation && (
                            <span className="ml-1 italic text-gray-500">
                              ({addr.designation})
                            </span>
                          )}
                          &nbsp; 📞 {addr.autorizedPhono}
                        </p>
                      </div>

                      <div className="flex justify-end gap-3 mt-4">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingAddressIndex(idx);
                            setShowAddressModal(true);
                          }}
                          className="bg-yellow-500 text-white text-xs px-4 py-1.5 rounded-md shadow-sm hover:bg-yellow-600 transition flex items-center gap-1 cursor-pointer"
                        >
                          ✏️ Edit
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const updated = [...formik.values.address];
                            updated.splice(idx, 1);
                            formik.setFieldValue("address", updated);
                          }}
                          className="bg-red-500 text-white text-xs px-4 py-1.5 rounded-md shadow-sm hover:bg-red-600 transition flex items-center gap-1 cursor-pointer"
                        >
                          🗑️ Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className="mt-4 flex justify-end gap-4">
            {/* Reset Button  */}
            <motion.button
              type="button"
              className="px-6 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => formik.resetForm()}
            >
              Reset
            </motion.button>

            {/* Submit Button  */}
            <motion.button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              disabled={formik.isSubmitting || mutation.isPending}
              onClick={(e) => {
                // Show error if contact number not verified
                if (!verifiedOtp) {
                  e.preventDefault();
                  Swal.fire({
                    icon: "warning",
                    title: "OTP Not Verified",
                    text: "Please verify your mobile number and OTP before submitting the form.",
                    confirmButtonColor: "#f0ad4e",
                  });
                  return;
                }

                 if (!verifiedOtp) {
                  e.preventDefault();
                  Swal.fire({
                    icon: "warning",
                    title: "OTP Not Verified",
                    text: "Please verify your mobile number and OTP before submitting the form.",
                    confirmButtonColor: "#f0ad4e",
                  });
                  return;
                }

                // Show error if address not entered
                if (
                  !formik.values.address ||
                  !Array.isArray(formik.values.address) ||
                  formik.values.address.length === 0
                ) {
                  e.preventDefault();
                  Swal.fire({
                    icon: "warning",
                    title: "Address Required",
                    text: "Please add at least one address before submitting.",
                    confirmButtonColor: "#f0ad4e",
                  });
                }
              }}
            >
              {formik.isSubmitting || mutation.isPending
                ? "Submitting..."
                : "Submit"}
            </motion.button>
          </div>
        </form>

        {/* Address Modal */}
        <CollegeAddressModal
          open={showAddressModal}
          onClose={() => setShowAddressModal(false)}
          initialData={
            editingAddressIndex !== null
              ? formik.values.address[editingAddressIndex]
              : null
          }
          onSave={(newAddress) => {
            const updated = [...formik.values.address];
            if (editingAddressIndex !== null) {
              updated[editingAddressIndex] = newAddress; // Edit existing address
            } else {
              updated.push(newAddress); // Add new address
            }
            formik.setFieldValue("address", updated); // Update Formik state
            setShowAddressModal(false); // Close modal
            setEditingAddressIndex(null); // Reset editing index
          }}
        />
      </div>
    </div>
  );
};

export default AddNewCollege;
