import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const AddTest = () => {
  const initialValues = {
    testName: "",
    category: "",
    duration: "",
    passingMarks: "",
    currentMarks: "",
  };

  const validationSchema = Yup.object({
    testName: Yup.string().required("Required"),
    category: Yup.string().required("Required"),
    duration: Yup.string().required("Required"),
    passingMarks: Yup.number().required("Required"),
    currentMarks: Yup.number().required("Required"),
  });

  const handleSubmit = (values) => {
    console.log("Form submitted:", values);
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg mt-4">
      <h3 className="text-xl font-bold mb-4">Add Test</h3>
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
        <Form className="space-y-4">
          <label>Test Name:</label>
          <Field type="text" name="testName" placeholder="Test Name" className="border p-2 w-full rounded"/>
          <ErrorMessage name="testName" component="div" className="text-red-500" />

          <label>Category:</label>
          <Field as="select" name="category"  className="border p-2 w-full rounded">
            <option value="">Select</option>
            <option value="Diploma">Diploma</option>
            <option value="Engineering">Engineering</option>
          </Field>
          <ErrorMessage name="category" component="div" style={{ color: "red" }} />

          <label>Duration:</label>
          <Field type="text" name="duration"  placeholder="Duration" className="border p-2 w-full rounded"/>
          <ErrorMessage name="duration" component="div"  className="text-red-500"  />

          <label>Passing Marks:</label>
          <Field type="number" name="passingMarks" placeholder="Passing Marks" className="border p-2 w-full rounded"/>
          <ErrorMessage name="passingMarks" component="div"  className="text-red-500" />

          <label>Current Marks:</label>
          <Field type="number" name="currentMarks" className="border p-2 w-full rounded" />
          <ErrorMessage name="currentMarks" component="div"  className="text-red-500"/>

          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
        </Form>
      </Formik>
    </div>
  );
};

export default AddTest;
