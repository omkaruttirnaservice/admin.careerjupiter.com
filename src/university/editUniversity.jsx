import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
// import { toast , ToastContainer } from "react-toastify";
import { toast, ToastContainer, Slide } from "react-toastify";

// import { ToastContainer } from 'react-toastify';

import { FaArrowLeft } from "react-icons/fa";
import {
  fetchUniversityById,
  updateUniversity,
  fetchUniversityCategories,
} from "./universityapi";
import UniversityForm from "./universityForm";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const role = Cookies.get("role");
const subrole = Cookies.get("subrole");



const EditUniversity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
const [showErrorPopup, setShowErrorPopup] = useState(false);
const [errorMessage, setErrorMessage] = useState("");
const [universityId, setUniversityId] = useState("");

  // const { data: universityData, isLoading: isLoadingUniversity } = useQuery({
  //   queryKey: ["university", id],
  //   queryFn: () => fetchUniversityById(id),
  //   enabled: !!id,
  //   staleTime: 5 * 60 * 1000,
  // });

const { data: universityData, isLoading: isLoadingUniversity } = useQuery({
  queryKey: ["university", universityId],
  queryFn: () => fetchUniversityById(universityId),
  enabled: !!universityId,
  staleTime: 5 * 60 * 1000,
});


  const { data: categoryData = { categories: [] } } = useQuery({
    queryKey: ["universityCategories"],
    queryFn: fetchUniversityCategories,
    staleTime: 5 * 60 * 1000,
  });

  // const mutation = useMutation({
  //   mutationFn: (values) => updateUniversity(id, values),
  //   onSuccess: (data) => {
  //     setShowSuccessPopup(true);
  //   },
  //   onError: (error) => {
  //     console.error("ERROR:", error);
  //     setErrorMessage(error?.message || "Failed to update university");
  //     setShowErrorPopup(true);
  //   },
  // });
  
  const mutation = useMutation({
  mutationFn: (values) => updateUniversity(universityId, values),
  onSuccess: (data) => {
    setShowSuccessPopup(true);
  },
  onError: (error) => {
    console.error("ERROR:", error);
    setErrorMessage(error?.message || "Failed to update university");
    setShowErrorPopup(true);
  },
});


  const formik = useFormik({
    initialValues: {
      universityName: "",
      universityID: "",
      category: "",
      subCategory: [],
      address: {
        line1: "",
        line2: "",
        pincode: "",
        state: "",
        dist: "",
        taluka: "",
        autorizedName: "",
        autorizedPhono: "",
        nearbyLandmarks: "",
      },
      contactDetails: "",
      password: "",
      email_id: "",
      info: {
        description: "",
      },
      keywords: [],
      image: null,
      imageGallery: [],
      websiteURL: "",
      establishedYear: "",
      accreditation: [],
      facilities: [],
      admissionProcess: [],
      entrance_exam_required: [],
      applicationFormURL: "",
      admissionEntranceDetails: {
        admissionStartDate: "",
        admissionEndDate: "",
        lastYearCutoffMarks: "",
        scholarshipsAvailable: [],
        quotaSystem: [],
      },
    },
    validationSchema: Yup.object({
      universityName: Yup.string().required("University Name is required"),
      email_id: Yup.string()
        .email("Invalid email format")
        .required("Email is required"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  
useEffect(() => {
  const universityIdFromCookie = Cookies.get("universityID");
  const idFromParams = id; // from URL if admin

  const finalId = idFromParams || universityIdFromCookie;

  if (finalId) {
    setUniversityId(finalId);
    console.log("University ID for editing:", finalId);

    // Store in cookie if admin comes from URL
    if (role === "ADMIN" && idFromParams) {
      Cookies.set("universityID", finalId, { expires: 1 });
    }
  } else {
    console.warn("University ID not found!");
    toast.error("University ID not found! Please select a university.");
    navigate(role === "ADMIN" ? "/universities" : "/vendor-university");
  }
}, [id, role, navigate]);

  useEffect(() => {
    if (universityData?.data?.university) {
      const university = universityData.data.university;
      const processArrayField = (field) => {
        if (typeof field === "string")
          return field.split(",").map((item) => item.trim());
        return field || [];
      };

      formik.setValues({
        universityName: university.universityName || "",
        universityID: university.universityId || "",
        category: university.category || "",
        subCategory: processArrayField(university.subCategory),
        address: {
          line1: university.address?.line1 || "",
          line2: university.address?.line2 || "",
          pincode: university.address?.pincode || "",
          state: university.address?.state || "",
          dist: university.address?.dist || "",
          taluka: university.address?.taluka || "",
          autorizedName: university.address?.autorizedName || "",
          autorizedPhono: university.address?.autorizedPhono || "",
          nearbyLandmarks: university.address?.nearbyLandmarks || "",
        },
        contactDetails: university.contactDetails || "",
        password: university.password || "",
        email_id: university.email_id || "",
        info: {
          description: university.info?.description || "",
        },
        keywords: processArrayField(university.keywords),
        image: university.image || null,
        imageGallery: university.imageGallery || [],
        websiteURL: university.websiteURL || "",
        establishedYear: university.establishedYear || "",
        accreditation: processArrayField(university.accreditation),
        facilities: processArrayField(university.facilities),
        admissionProcess: processArrayField(university.admissionProcess),
        entrance_exam_required: processArrayField(
          university.entrance_exam_required
        ),
        applicationFormURL: university.applicationFormURL || "",
        admissionEntranceDetails: {
          admissionStartDate: university.admissionEntranceDetails
            ?.admissionStartDate
            ? new Date(university.admissionEntranceDetails.admissionStartDate)
                .toISOString()
                .split("T")[0]
            : "",
          admissionEndDate: university.admissionEntranceDetails
            ?.admissionEndDate
            ? new Date(university.admissionEntranceDetails.admissionEndDate)
                .toISOString()
                .split("T")[0]
            : "",
          lastYearCutoffMarks:
            university.admissionEntranceDetails?.lastYearCutoffMarks || "",
          scholarshipsAvailable: processArrayField(
            university.admissionEntranceDetails?.scholarshipsAvailable
          ),
          quotaSystem: processArrayField(
            university.admissionEntranceDetails?.quotaSystem
          ),
        },
      });

      if (university.image) {
        setImagePreview(university.image);
      }
    }
  }, [universityData]);

  useEffect(() => {
    const selectedCategory = formik.values.category;
    const match = categoryData.categories.find(
      (item) => item.category === selectedCategory
    );
    setFilteredBranches(match ? match.subCategory : []);
  }, [formik.values.category, categoryData.categories]);

  const handleImageChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      formik.setFieldValue("image", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleImageGalleryChange = (event) => {
    const files = Array.from(event.target.files || []);
    if (files.length > 0) {
      formik.setFieldValue("imageGallery", [
        ...formik.values.imageGallery,
        ...files,
      ]);
    }
  };

  if (isLoadingUniversity) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center mb-4">
        <button
          onClick={() => navigate("/university-details")}
          className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
        >
          <FaArrowLeft /> Back to Universities
        </button>
      </div>

      <UniversityForm
        formik={formik}
        isSubmitting={mutation.isPending}
        handleImageChange={handleImageChange}
        handleImageGalleryChange={handleImageGalleryChange}
        categoryData={categoryData.categories}
        filteredBranches={filteredBranches}
        submitButtonText="Update University"
        imagePreview={imagePreview}
      />
      <ToastContainer
        position="top-center"
        autoClose={false}
        hideProgressBar
        newestOnTop
        closeOnClick={false}
        draggable={false}
        pauseOnHover
        transition={Slide}
        theme="colored"
      />

{showSuccessPopup && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
    <div className="bg-white p-10 rounded-xl shadow-2xl text-center w-[400px] animate-bounceIn">
      <div className="text-green-500 text-5xl mb-4">✓</div>
      <h2 className="text-2xl font-bold mb-2">Success</h2>
      <p className="mb-6 text-gray-700">University updated successfully!</p>
      <button
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 text-lg"
        onClick={() => {
          setShowSuccessPopup(false);
          navigate("/university-details");
        }}
      >
        OK
      </button>
    </div>
  </div>
)}

{showErrorPopup && (
  <div className="fixed inset-0 flex items-center justify-center backdrop-blur-sm bg-black/40 z-50">
    <div className="bg-white p-10 rounded-xl shadow-2xl text-center w-[400px] animate-bounceIn">
      <div className="text-red-500 text-5xl mb-4">✕</div>
      <h2 className="text-2xl font-bold mb-2">Error</h2>
      <p className="mb-6 text-gray-700">{errorMessage}</p>
      <button
        className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 text-lg"
        onClick={() => setShowErrorPopup(false)}
      >
        Close
      </button>
    </div>
  </div>
)}


    </div>
  );
};

export default EditUniversity;
