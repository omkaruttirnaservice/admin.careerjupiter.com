import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";

import SingleSelectDropdown from "../singleSelectDropdown";
import MultiSelectDropdown from "../multiSelectDropdown";
const RoadmapPopup = ({ show, onClose, typeOptions, subTypeOptions, onSubmit, isLoading }) => {
  const formik = useFormik({
    initialValues: {
      name: "",
      type: "",
      sub_type: [],
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Roadmap name is required"),
      type: Yup.string().required("Type is required"),
    }),
    onSubmit: (values, { resetForm }) => {
      onSubmit(values);
      resetForm();
    },
  });

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <h2 className="text-lg font-semibold mb-4">Create New Roadmap</h2>
        <form onSubmit={formik.handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Roadmap Name</label>
            <input
              type="text"
              name="name"
              className="w-full border px-3 py-2 rounded-lg"
              value={formik.values.name}
              onChange={formik.handleChange}
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.name}</p>
            )}
          </div>
          
          <SingleSelectDropdown
            label="Type"
            name="type"
            options={typeOptions}
            formik={formik}
            placeholder="Select Type"
          />
          
          <MultiSelectDropdown
            label="SubType"
            name="sub_type"
            options={subTypeOptions}
            formik={formik}
          />

          <div className="flex justify-end gap-3 mt-4">
            <button
              type="button"
              className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500"
              onClick={() => {
                onClose();
                formik.resetForm();
              }}
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 disabled:bg-green-400"
              disabled={!formik.isValid || !formik.dirty || isLoading}
            >
              {isLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RoadmapPopup;