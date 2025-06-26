import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast, ToastContainer, Slide } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import {
  fetchUniversityById,
  updateUniversity,
  fetchUniversityCategories,
} from "./universityapi";
import EditUniversityForm from "./edit-university-from";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useQueryClient } from "@tanstack/react-query";

const role = Cookies.get("role");
const subrole = Cookies.get("subrole");

// Default district options by state
const districtOptionsByState = {};

const EditUniversity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [universityId, setUniversityId] = useState("");
  // const [stateOptions, setStateOptions] = useState(defaultStateOptions);
  const [districtOptions, setDistrictOptions] = useState([]);
  const queryClient = useQueryClient();

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

  const mutation = useMutation({
    mutationFn: updateUniversity,

    onSuccess: async (data) => {
      await Promise.all([
        queryClient.invalidateQueries(["university", universityId]),
        queryClient.invalidateQueries(["universities"]),
      ]);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "University updated successfully!",
        confirmButtonColor: "#3085d6",
      }).then(() => {
        navigate(
          role === "ADMIN"
            ? "/university-details"
            : role === "VENDOR"
            ? "/vendor-university/university-dashboard"
            : "/" // default fallback
        );
      });
    },
    onError: (error) => {
      console.error("ERROR:", error);
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text:
          error?.response?.data?.usrMsg ||
          error?.message ||
          "Failed to update university",
        confirmButtonColor: "#d33",
      });
    },
  });

  const validationSchema = Yup.object({
    // universityName: Yup.string().required("University Name is required"),
    // category: Yup.string().required("Category is required"),
    // subCategory: Yup.array().min(1, "At least one sub-category is required"),
    // "address.line1": Yup.string().required("Address Line 1 is required"),
    // "address.pincode": Yup.string().required("Pincode is required"),
    // "address.state": Yup.string().required("State is required"),
    // "address.dist": Yup.string().required("District is required"),
    // "address.autorizedName": Yup.string().required("Authorized Person Name is required"),
    // "address.autorizedPhono": Yup.string().required("Authorized Person Phone is required"),
    // "info.description": Yup.string().required("Description is required"),
    // keywords: Yup.array().min(1, "At least one keyword is required"),
  });

  const formik = useFormik({
    initialValues: {
      // universityId: "",
      universityName: "",
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
      // password: "",
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
      isHidden: true,
      role: "VENDOR",
      subrole: "university",
    },
    validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();

      // Append university ID
      // formData.append("universityId", universityId)

      // Append all form fields to formData exactly matching the API response structure
      // formData.append("universityId", values.universityId)
      formData.append("universityName", values.universityName);
      formData.append("category", values.category);

      // Arrays
      if (values.subCategory && values.subCategory.length > 0) {
        values.subCategory.forEach((item, index) => {
          formData.append(`subCategory[${index}]`, item);
        });
      }

      // Address object
      formData.append("address[line1]", values.address.line1);
      formData.append("address[line2]", values.address.line2);
      formData.append("address[pincode]", values.address.pincode);
      formData.append("address[state]", values.address.state);
      formData.append("address[dist]", values.address.dist);
      formData.append("address[taluka]", values.address.taluka);
      formData.append("address[autorizedName]", values.address.autorizedName);
      formData.append("address[autorizedPhono]", values.address.autorizedPhono);
      formData.append(
        "address[nearbyLandmarks]",
        values.address.nearbyLandmarks
      );

      // Basic fields
      formData.append("contactDetails", values.contactDetails);
      // formData.append("password", values.password)
      // formData.append("email_id", values.email_id)
      formData.append("info[description]", values.info.description);
      formData.append("websiteURL", values.websiteURL);
      formData.append("establishedYear", values.establishedYear);
      formData.append("applicationFormURL", values.applicationFormURL);
      formData.append("isHidden", values.isHidden);
      formData.append("role", values.role);
      formData.append("subrole", values.subrole);

      // Arrays
      if (values.keywords && values.keywords.length > 0) {
        values.keywords.forEach((item, index) => {
          formData.append(`keywords[${index}]`, item);
        });
      }

      if (values.accreditation && values.accreditation.length > 0) {
        values.accreditation.forEach((item, index) => {
          formData.append(`accreditation[${index}]`, item);
        });
      }

      if (values.facilities && values.facilities.length > 0) {
        values.facilities.forEach((item, index) => {
          formData.append(`facilities[${index}]`, item);
        });
      }

      if (values.admissionProcess && values.admissionProcess.length > 0) {
        values.admissionProcess.forEach((item, index) => {
          formData.append(`admissionProcess[${index}]`, item);
        });
      }

      if (
        values.entrance_exam_required &&
        values.entrance_exam_required.length > 0
      ) {
        values.entrance_exam_required.forEach((item, index) => {
          formData.append(`entrance_exam_required[${index}]`, item);
        });
      }

      // Admission entrance details
      formData.append(
        "admissionEntranceDetails[admissionStartDate]",
        values.admissionEntranceDetails.admissionStartDate
      );
      formData.append(
        "admissionEntranceDetails[admissionEndDate]",
        values.admissionEntranceDetails.admissionEndDate
      );
      formData.append(
        "admissionEntranceDetails[lastYearCutoffMarks]",
        values.admissionEntranceDetails.lastYearCutoffMarks
      );

      if (
        values.admissionEntranceDetails.scholarshipsAvailable &&
        values.admissionEntranceDetails.scholarshipsAvailable.length > 0
      ) {
        values.admissionEntranceDetails.scholarshipsAvailable.forEach(
          (item, index) => {
            formData.append(
              `admissionEntranceDetails[scholarshipsAvailable][${index}]`,
              item
            );
          }
        );
      }

      if (
        values.admissionEntranceDetails.quotaSystem &&
        values.admissionEntranceDetails.quotaSystem.length > 0
      ) {
        values.admissionEntranceDetails.quotaSystem.forEach((item, index) => {
          formData.append(
            `admissionEntranceDetails[quotaSystem][${index}]`,
            item
          );
        });
      }

      // Image files
      if (values.image instanceof File) {
        formData.append("image", values.image);
      }

      if (values.imageGallery && values.imageGallery.length > 0) {
        values.imageGallery.forEach((file) => {
          if (file instanceof File) {
            formData.append("imageGallery", file);
          }
        });
      }

      // Log the form data for debugging
      console.log("Submitting form data:");
      for (const pair of formData.entries()) {
        console.log(pair[0] + ": " + pair[1]);
      }

      // Call the mutation with the university ID and form data
      mutation.mutate({ id: universityId, data: formData });
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
      navigate(
        role === "ADMIN" ? "/university-details" : "/university-dashboard"
      );
    }
  }, [id, role, navigate]);

  useEffect(() => {
    if (universityData?.data?.university) {
      const university = universityData.data.university;
      const processArrayField = (field) => {
        if (typeof field === "string")
          return field.split(",").map((item) => item.trim());
        if (Array.isArray(field)) return field;
        return [];
      };

      formik.setValues({
        // universityId: university.universityId || "",
        universityName: university.universityName || "",
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
        // password: university.password || "",
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
        isHidden:
          university.isHidden !== undefined ? university.isHidden : true,
        role: university.role || "VENDOR",
        subrole: university.subrole || "university",
      });

      if (university.image) {
        setImagePreview(university.image);
      }

      // Set district options based on state
      if (university.address?.state) {
        const state = university.address.state;
        if (districtOptionsByState[state]) {
          setDistrictOptions(districtOptionsByState[state]);
        } else if (university.address?.dist) {
          // If we don't have predefined districts for this state but have a district value
          setDistrictOptions([university.address.dist]);
        }
      }
    }
  }, [universityData]);

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
        {role === "ADMIN" && (
          <button
            onClick={() => navigate("/university-details")}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <FaArrowLeft /> Back to Universities
          </button>
        )}
      </div>

      <EditUniversityForm
        formik={formik}
        isSubmitting={mutation.isPending}
        handleImageChange={handleImageChange}
        handleImageGalleryChange={handleImageGalleryChange}
        // categoryData={categoryData.categories}
        // filteredBranches={filteredBranches}
        submitButtonText="Update University"
        // stateOptions={stateOptions}
        districtOptions={districtOptions}
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
    </div>
  );
};

export default EditUniversity;
