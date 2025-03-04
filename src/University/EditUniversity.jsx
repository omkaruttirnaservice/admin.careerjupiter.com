import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import { getUniversityById, updateUniversity } from "../api/University-api";
import { toast } from "react-toastify";

const EditUniversity = () => {
  const { id } = useParams(); // Get university ID from URL
  const navigate = useNavigate();
  const [location, setLocation] = useState({ lat: 0, lan: 0 });
  const [galleryImages, setGalleryImages] = useState([]);
  const [image, setImage] = useState(null);

  // Fetch university details
  const { data: universityData, isLoading } = useQuery({
    queryKey: ["university", id],
    queryFn: () => getUniversityById(id),
    enabled: !!id, // Fetch only if ID exists
  });

  // Mutation for updating university
  const mutation = useMutation({
    mutationFn: (values) => updateUniversity(id, values),
    onSuccess: () => {
      toast.success("University updated successfully!");
      navigate("/universities"); // Redirect after update
    },
    onError: (error) => {
      toast.error(`Error: ${error.message}`);
    },
  });

  const formik = useFormik({
    initialValues: {
      universityName: "",
      Category: "",
      lat: location.lat,
      lan: location.lan,
      address_line1: "",
      address_line2: "",
      pincode: "",
      state: "Maharashtra",
      dist: "Mumbai",
      contactDetails: "",
      info: "",
      websiteURL: "",
      establishedYear: "",
      accreditation: "",
      admissionProcess: "",
      applicationFormURL: "",
      email_id: "",
      facilities: "",
      keywords: [],
      image: null,
    },
    validationSchema: Yup.object({
      universityName: Yup.string().required("University Name is required"),
      Category: Yup.string().required("University Category is required"),
      lat: Yup.number().required("Latitude is required"),
      lan: Yup.number().required("Longitude is required"),
      contactDetails: Yup.string().matches(/^[0-9]{10}$/, "Invalid contact number").required(),
      websiteURL: Yup.string().url("Invalid URL format").required(),
      email_id: Yup.string().email("Invalid email format").required(),
      image: Yup.mixed().nullable(),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach((key) => {
        if (key === "image" && values.image) {
          formData.append("image", values.image);
        } else {
          formData.append(key, values[key]);
        }
      });
      mutation.mutate(formData);
    },
  });

  // Prefill form data when fetched
  useEffect(() => {
    if (universityData) {
      formik.setValues(universityData);
      setLocation({ lat: universityData.lat, lan: universityData.lan });
      setGalleryImages(universityData.imageGallery || []);
      setImage(universityData.image || null);
    }
  }, [universityData]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Edit University</h2>
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
        <div className="mb-4">
          <label className="block text-sm font-medium">University Name</label>
          <input
            type="text"
            name="universityName"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.universityName}
          />
          {formik.errors.universityName && <p className="text-red-500">{formik.errors.universityName}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">Category</label>
          <input
            type="text"
            name="Category"
            className="w-full p-2 border rounded"
            onChange={formik.handleChange}
            value={formik.values.Category}
          />
          {formik.errors.Category && <p className="text-red-500">{formik.errors.Category}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium">University Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="w-full p-2 border rounded"
            onChange={(event) => {
              formik.setFieldValue("image", event.currentTarget.files[0]);
            }}
          />
          {image && <img src={image} alt="University" className="mt-2 w-32 h-32 object-cover" />}
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Update University</button>
      </form>
    </div>
  );
};

export default EditUniversity;
