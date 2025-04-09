import React from "react";
import { Formik } from "formik";
import { motion } from "framer-motion";

const AddressModal = ({ open, onClose, onSave, initialData = null }) => {
  if (!open) return null;

  const indianStates = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Andaman and Nicobar Islands",
    "Chandigarh",
    "Dadra and Nagar Haveli and Daman and Diu",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
    "Lakshadweep",
    "Puducherry",
  ];

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-start overflow-y-auto py-10">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 p-8 w-full max-w-3xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>

        <h3 className="text-3xl font-bold text-blue-800 mb-6">
          🏠 Add Address
        </h3>

        <Formik
          initialValues={{
            line1: initialData?.line1 || "",
            line2: initialData?.line2 || "",
            pincode: initialData?.pincode || "",
            state: initialData?.state || "",
            dist: initialData?.dist || "",
            taluka: initialData?.taluka || "",
            nearbyLandmarks: initialData?.nearbyLandmarks || "",
            autorizedName: initialData?.autorizedName || "",
            autorizedPhono: initialData?.autorizedPhono || "",
          }}
          onSubmit={(values) => {
            onSave(values); // Pass single address object
            onClose();
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Address Line 1 */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">Address Line 1</label>
                    <input
                      name="line1"
                      value={values.line1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter line 1"
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Address Line 2 */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">Address Line 2</label>
                    <input
                      name="line2"
                      value={values.line2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter line 2"
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Landmark */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">Landmark</label>
                    <input
                      name="nearbyLandmarks"
                      value={values.nearbyLandmarks}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Nearby landmark"
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* State (Dropdown) */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">State</label>
                    <select
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    >
                      <option value="">Select State</option>
                      {indianStates.map((state) => (
                        <option key={state} value={state}>
                          {state}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* District */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">District</label>
                    <input
                      name="dist"
                      value={values.dist}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="District"
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Taluka */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">Taluka</label>
                    <input
                      name="taluka"
                      value={values.taluka}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Taluka"
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Pincode */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">Pincode</label>
                    <input
                      name="pincode"
                      value={values.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Pincode"
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Authorized Name */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">Authorized Name</label>
                    <input
                      name="autorizedName"
                      value={values.autorizedName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Authorized Name"
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>

                  {/* Authorized Phone */}
                  <div className="flex flex-col">
                    <label className="text-blue-700">
                      Authorized Phone Number
                    </label>
                    <input
                      name="autorizedPhono"
                      value={values.autorizedPhono}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Phone No."
                      className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300"
                >
                  ✅ Save Address
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddressModal;
