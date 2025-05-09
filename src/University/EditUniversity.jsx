

// import { useState, useEffect } from "react"
// import { useFormik } from "formik"
// import * as Yup from "yup"
// import { useMutation, useQuery } from "@tanstack/react-query"
// import { useParams, useNavigate } from "react-router-dom"
// import { toast } from "react-toastify"
// import { FaArrowLeft } from "react-icons/fa"
// import { fetchUniversityById, updateUniversity, fetchUniversityCategories } from "./Universityapi"
// import UniversityForm from "./Universityfrom"

// const EditUniversity = () => {
//   const { id } = useParams()
//   const navigate = useNavigate()
//   const [filteredBranches, setFilteredBranches] = useState([])
//   const [imagePreview, setImagePreview] = useState(null)

//   // Fetch university data
//   // const { data: universityData, isLoading: isLoadingUniversity } = useQuery({

//   //   queryKey: ["university", id],
//   //   queryFn: () => fetchUniversityById(id),
//   //   enabled: !!id,
//   //   staleTime: 5 * 60 * 1000, // 5 minutes
//   // })
//   const { data: universityData, isLoading: isLoadingUniversity } = useQuery({
//     queryKey: ["university", id],
//     queryFn: () => fetchUniversityById(id),
//     enabled: !!id,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   });
  
//   console.log("🟡 useQuery -> universityData:", universityData);
//   console.log("⏳ useQuery -> isLoadingUniversity:", isLoadingUniversity);
  
//   // Fetch categories
//   const { data: categoryData = { categories: [] } } = useQuery({
//     queryKey: ["universityCategories"],
//     queryFn: fetchUniversityCategories,
//     staleTime: 5 * 60 * 1000, // 5 minutes
//   })

//   // Update university mutation
//   const mutation = useMutation({
//     mutationFn: (values) => updateUniversity(id, values),
//     onSuccess: () => {
//       toast.success("University updated successfully!")
//       navigate("/universities")
//     },
//     onError: (error) => {
//       toast.error(`Error: ${error.message || "Failed to update university"}`)
//     },
//   })

//   // Initialize formik
//   const formik = useFormik({
//     initialValues: {
//       universityName: "",
//       universityID: "",
//       category: "",
//       subCategory: [],
//       address: {
//         line1: "",
//         line2: "",
//         pincode: "",
//         state: "",
//         dist: "",
//         taluka: "",
//         autorizedName: "",
//         autorizedPhono: "",
//         nearbyLandmarks: "",
//       },
//       contactDetails: "",
//       password: "",
//       email_id: "",
//       info: {
//         description: "",
//       },
//       keywords: [],
//       image: null,
//       imageGallery: [],
//       websiteURL: "",
//       establishedYear: "",
//       accreditation: [],
//       facilities: [],
//       admissionProcess: [],
//       entrance_exam_required: [],
//       applicationFormURL: "",
//       admissionEntranceDetails: {
//         admissionStartDate: "",
//         admissionEndDate: "",
//         lastYearCutoffMarks: "",
//         scholarshipsAvailable: [],
//         quotaSystem: [],
//       },
//     },
//     validationSchema: Yup.object({
//       universityName: Yup.string().required("University Name is required"),
//       email_id: Yup.string().email("Invalid email format").required("Email is required"),
//     }),
//     onSubmit: (values) => {
//       mutation.mutate(values)
//     },
//   })

//   // Set form values when university data is loaded
//  useEffect(() => {
//   if (universityData && universityData.data && universityData.data.university) {
//     const university = universityData.data.university;

//     const processArrayField = (field) => {
//       if (typeof field === "string") {
//         return field.split(",").map((item) => item.trim());
//       }
//       return field || [];
//     };

//     formik.setValues({
//       universityName: university.universityName || "",
//       universityID: university.universityId || "",
//       category: university.category || "",
//       subCategory: processArrayField(university.subCategory),
//       address: {
//         line1: university.address?.line1 || "",
//         line2: university.address?.line2 || "",
//         pincode: university.address?.pincode || "",
//         state: university.address?.state || "",
//         dist: university.address?.dist || "",
//         taluka: university.address?.taluka || "",
//         autorizedName: university.address?.autorizedName || "",
//         autorizedPhono: university.address?.autorizedPhono || "",
//         nearbyLandmarks: university.address?.nearbyLandmarks || "",
//       },
//       contactDetails: university.contactDetails || "",
//       password: university.password || "",
//       email_id: university.email_id || "",
//       info: {
//         description: university.info?.description || "",
//       },
//       keywords: processArrayField(university.keywords),
//       image: university.image || null,
//       imageGallery: university.imageGallery || [],
//       websiteURL: university.websiteURL || "",
//       establishedYear: university.establishedYear || "",
//       accreditation: processArrayField(university.accreditation),
//       facilities: processArrayField(university.facilities),
//       admissionProcess: processArrayField(university.admissionProcess),
//       entrance_exam_required: processArrayField(university.entrance_exam_required),
//       applicationFormURL: university.applicationFormURL || "",
//       admissionEntranceDetails: {
//         admissionStartDate: university.admissionEntranceDetails?.admissionStartDate
//           ? new Date(university.admissionEntranceDetails.admissionStartDate).toISOString().split("T")[0]
//           : "",
//         admissionEndDate: university.admissionEntranceDetails?.admissionEndDate
//           ? new Date(university.admissionEntranceDetails.admissionEndDate).toISOString().split("T")[0]
//           : "",
//         lastYearCutoffMarks: university.admissionEntranceDetails?.lastYearCutoffMarks || "",
//         scholarshipsAvailable: processArrayField(university.admissionEntranceDetails?.scholarshipsAvailable),
//         quotaSystem: processArrayField(university.admissionEntranceDetails?.quotaSystem),
//       },
//     });

//     if (university.image) {
//       setImagePreview(university.image);
//     }
//   }
// }, [universityData]);


//   // Update subcategories when category changes
//   useEffect(() => {
//     const selectedCategory = formik.values.category
//     const match = categoryData.categories.find((item) => item.category === selectedCategory)
//     setFilteredBranches(match ? match.subCategory : [])
//   }, [formik.values.category, categoryData.categories])

//   // Handle image change
//   const handleImageChange = (event) => {
//     const file = event.target.files?.[0]
//     if (file) {
//       formik.setFieldValue("image", file)
//       setImagePreview(URL.createObjectURL(file))
//     }
//   }

//   const handleImageGalleryChange = (event) => {
//     const files = Array.from(event.target.files || [])
//     if (files.length > 0) {
//       formik.setFieldValue("imageGallery", [...formik.values.imageGallery, ...files])
//     }
//   }

//   if (isLoadingUniversity) {
//     return (
//       <div className="flex justify-center items-center h-64">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     )
//   }

//   return (
//     <div className="space-y-4">
//       <div className="flex items-center mb-4">
//         <button
//           onClick={() => navigate("/university-details")}
//           className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
//         >
//           <FaArrowLeft /> Back to Universities
//         </button>
//       </div>

//       <UniversityForm
//         formik={formik}
//         isSubmitting={mutation.isPending}
//         handleImageChange={handleImageChange}
//         handleImageGalleryChange={handleImageGalleryChange}
//         categoryData={categoryData.categories}
//         filteredBranches={filteredBranches}
//         submitButtonText="Update University"
//       />
//     </div>
//   )
// }

// export default EditUniversity


import { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { FaArrowLeft } from "react-icons/fa";
import { fetchUniversityById, updateUniversity, fetchUniversityCategories } from "./Universityapi";
import UniversityForm from "./Universityfrom";
import "react-toastify/dist/ReactToastify.css";

const EditUniversity = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [filteredBranches, setFilteredBranches] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);

  const { data: universityData, isLoading: isLoadingUniversity } = useQuery({
    queryKey: ["university", id],
    queryFn: () => fetchUniversityById(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  });

  const { data: categoryData = { categories: [] } } = useQuery({
    queryKey: ["universityCategories"],
    queryFn: fetchUniversityCategories,
    staleTime: 5 * 60 * 1000,
  });

  const mutation = useMutation({
    mutationFn: (values) => updateUniversity(id, values),
    onSuccess: () => {
      const toastId = toast(
        ({ closeToast }) => (
          <div>
            <div className="font-semibold mb-2">🎉 University updated successfully!</div>
            <button
              onClick={() => {
                closeToast();
                navigate("/university-details");
              }}
              className="px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              OK
            </button>
          </div>
        ),
        { autoClose: false }
      );
    },
    onError: (error) => {
      toast.error(`Error: ${error.message || "Failed to update university"}`);
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
      email_id: Yup.string().email("Invalid email format").required("Email is required"),
    }),
    onSubmit: (values) => {
      mutation.mutate(values);
    },
  });

  useEffect(() => {
    if (universityData?.data?.university) {
      const university = universityData.data.university;
      const processArrayField = (field) => {
        if (typeof field === "string") return field.split(",").map((item) => item.trim());
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
        entrance_exam_required: processArrayField(university.entrance_exam_required),
        applicationFormURL: university.applicationFormURL || "",
        admissionEntranceDetails: {
          admissionStartDate: university.admissionEntranceDetails?.admissionStartDate
            ? new Date(university.admissionEntranceDetails.admissionStartDate).toISOString().split("T")[0]
            : "",
          admissionEndDate: university.admissionEntranceDetails?.admissionEndDate
            ? new Date(university.admissionEntranceDetails.admissionEndDate).toISOString().split("T")[0]
            : "",
          lastYearCutoffMarks: university.admissionEntranceDetails?.lastYearCutoffMarks || "",
          scholarshipsAvailable: processArrayField(university.admissionEntranceDetails?.scholarshipsAvailable),
          quotaSystem: processArrayField(university.admissionEntranceDetails?.quotaSystem),
        },
      });

      if (university.image) {
        setImagePreview(university.image);
      }
    }
  }, [universityData]);

  useEffect(() => {
    const selectedCategory = formik.values.category;
    const match = categoryData.categories.find((item) => item.category === selectedCategory);
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
      formik.setFieldValue("imageGallery", [...formik.values.imageGallery, ...files]);
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
    </div>
  );
};

export default EditUniversity;
