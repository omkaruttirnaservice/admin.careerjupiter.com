import { useFormik } from "formik";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../constant/constantBaseUrl";
// const API_URL = "http://192.168.1.9:5000/api/college";

const fetchCollege = async (id) => {
  const response = await axios.get(`${API_BASE_URL}/${id}`);
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.usrMsg);
  }
};

const updateCollege = async ({ id, updatedData }) => {
  const response = await axios.put(`${API_BASE_URL}/${id}`, updatedData);
  return response.data;
};

const EditCollege = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch College Data
  const { data: collegeData, isLoading } = useQuery(["college", id], () => fetchCollege(id), { enabled: !!id });

  // Update College Mutation
  const mutation = useMutation(updateCollege, {
    onSuccess: () => {
      alert("College updated successfully!");
      navigate("/colleges");
    },
    onError: (error) => {
      console.error("Failed to update college:", error);
    },
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      collegeName: collegeData?.collegeName || "",
      affiliatedUniversity: collegeData?.affiliatedUniversity || "",
      collegeCategory: collegeData?.collegeCategory || "",
      collegeType: collegeData?.collegeType || "",
      contactDetails: collegeData?.contactDetails || "",
      websiteURL: collegeData?.websiteURL || "",
      address: {
        line1: collegeData?.address?.line1 || "",
        line2: collegeData?.address?.line2 || "",
        pincode: collegeData?.address?.pincode || "",
        state: collegeData?.address?.state || "",
        dist: collegeData?.address?.dist || "",
      },
      admissionProcess: collegeData?.admissionProcess || "",
      applicationFormURL: collegeData?.applicationFormURL || "",
      accreditation: collegeData?.accreditation || "",
      establishedYear: collegeData?.establishedYear || "",
    },
    onSubmit: async (values) => {
      mutation.mutate({ id, updatedData: values });
    },
  });

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4 bg-white max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Edit College</h1>
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* College Details */}
        <input type="text" name="collegeName" placeholder="College Name" {...formik.getFieldProps("collegeName")} className="w-full p-2 border rounded" />
        <input type="text" name="affiliatedUniversity" placeholder="Affiliated University" {...formik.getFieldProps("affiliatedUniversity")} className="w-full p-2 border rounded" />
        <input type="text" name="collegeCategory" placeholder="College Category" {...formik.getFieldProps("collegeCategory")} className="w-full p-2 border rounded" />
        <input type="text" name="collegeType" placeholder="College Type" {...formik.getFieldProps("collegeType")} className="w-full p-2 border rounded" />

        {/* Contact & Website */}
        <input type="text" name="contactDetails" placeholder="Contact Details" {...formik.getFieldProps("contactDetails")} className="w-full p-2 border rounded" />
        <input type="text" name="websiteURL" placeholder="Website URL" {...formik.getFieldProps("websiteURL")} className="w-full p-2 border rounded" />

        {/* Address */}
        <input type="text" name="address.line1" placeholder="Address Line 1" {...formik.getFieldProps("address.line1")} className="w-full p-2 border rounded" />
        <input type="text" name="address.line2" placeholder="Address Line 2" {...formik.getFieldProps("address.line2")} className="w-full p-2 border rounded" />
        <input type="text" name="address.pincode" placeholder="Pincode" {...formik.getFieldProps("address.pincode")} className="w-full p-2 border rounded" />
        <input type="text" name="address.state" placeholder="State" {...formik.getFieldProps("address.state")} className="w-full p-2 border rounded" />
        <input type="text" name="address.dist" placeholder="District" {...formik.getFieldProps("address.dist")} className="w-full p-2 border rounded" />

        {/* Admission Details */}
        <input type="text" name="admissionProcess" placeholder="Admission Process" {...formik.getFieldProps("admissionProcess")} className="w-full p-2 border rounded" />
        <input type="text" name="applicationFormURL" placeholder="Application Form URL" {...formik.getFieldProps("applicationFormURL")} className="w-full p-2 border rounded" />

        {/* Accreditation & Year */}
        <input type="text" name="accreditation" placeholder="Accreditation" {...formik.getFieldProps("accreditation")} className="w-full p-2 border rounded" />
        <input type="number" name="establishedYear" placeholder="Established Year" {...formik.getFieldProps("establishedYear")} className="w-full p-2 border rounded" />

        {/* Submit Button */}
        <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded cursor-pointer">
          {mutation.isLoading ? "Updating..." : "Update College"}
        </button>
      </form>
    </div>
  );
};

export default EditCollege;
