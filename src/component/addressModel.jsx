import { Formik } from "formik";
import { motion } from "framer-motion";
import * as Yup from "yup";

const AddressModal = ({ open, onClose, onSave, initialData = null }) => {
  //if open is false dont render
  if (!open) return null;

  //validation section
  const addressValidationSchema = Yup.object().shape({
    line1: Yup.string().required("Address Line 1 is required"),
    line2: Yup.string().required("Address Line 2 is required"),
    pincode: Yup.string()
      .matches(/^[0-9]{6}$/, "Enter a valid 6-digit pincode")
      .required("Pincode is required"),
    state: Yup.string().required("State is required"),
    dist: Yup.string().required("District is required"),
    taluka: Yup.string().required("Taluka is required"),
    nearbyLandmarks: Yup.string().required("Landmark is required"),
    autorizedName: Yup.string().required("Authorized Name is required"),
    autorizedPhono: Yup.string()
      .matches(/^[0-9]{10}$/, "Enter a valid 10-digit contact number")
      .required("Phone Number is required"),
  });

  //States
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
    //Blur Background
    <div className="fixed inset-0 bg-opacity-50 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-center overflow-y-auto py-4 sm:py-10">
      <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 p-4 w-full max-w-2xl relative max-h-[90vh] sm:max-h-[95vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>

        {/* Heading */}
        <h3 className="text-2xl sm:text-3xl font-bold text-blue-800 mb-4 sm:mb-6">
          🏠 Add Address
        </h3>

        {/* Initializes Formik with default values, validation schema, and submit logic to save and close the form.  */}
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
          validationSchema={addressValidationSchema}
          onSubmit={(values) => {
            onSave(values); // Pass single address object
            onClose();
          }}
        >
          {/* Gets helper functions and data from Formik to handle form input, validation, and submission. */}
          {({
            values,
            handleChange,
            handleBlur,
            handleSubmit,
            errors,
            touched,
          }) => (
            <form onSubmit={handleSubmit} className="space-y-4">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 10 }}
                exit={{ opacity: 0, y: -10 }}
                className="bg-white p-4 sm:p-6 rounded-lg shadow-md border border-gray-200 space-y-3"
              >
                <div className="grid grid-cols-2 sm:grid-cols-2 gap-4 sm:gap-6">
                  {/* Address Line 1 */}
                  <div className="flex flex-col">
                    <label className="text-blue-700 text-sm">
                      Address Line 1
                    </label>
                    <input
                      name="line1"
                      value={values.line1}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter line 1"
                      className="mt-1 px-3 py-1.5 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.line1 && errors.line1 && (
                      <div className="text-red-500 text-sm">{errors.line1}</div>
                    )}
                  </div>

                  {/* Address Line 2 */}
                  <div className="flex flex-col">
                    <label className="text-blue-700 text-sm">
                      Address Line 2
                    </label>
                    <input
                      name="line2"
                      value={values.line2}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter line 2"
                      className="mt-1 px-3 py-1.5 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.line2 && errors.line2 && (
                      <div className="text-red-500 text-sm">{errors.line2}</div>
                    )}
                  </div>

                  {/* Landmark */}
                  <div className="flex flex-col">
                    <label className="text-blue-700 text-sm">Landmark</label>
                    <input
                      name="nearbyLandmarks"
                      value={values.nearbyLandmarks}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Nearby landmark"
                      className="mt-1 px-3 py-1.5 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.nearbyLandmarks && errors.nearbyLandmarks && (
                      <div className="text-red-500 text-sm">
                        {errors.nearbyLandmarks}
                      </div>
                    )}
                  </div>

                  {/* State (Dropdown) */}
                  <div className="flex flex-col">
                    <label className="text-blue-700 text-sm">State</label>
                    <select
                      name="state"
                      value={values.state}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className="mt-1 px-3 py-1.5 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
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
                    <label className="text-blue-700 text-sm">District</label>
                    <input
                      name="dist"
                      value={values.dist}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="District"
                      className="mt-1 px-3 py-1.5 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.dist && errors.dist && (
                      <div className="text-red-500 text-sm">{errors.dist}</div>
                    )}
                  </div>

                  {/* Taluka */}
                  <div className="flex flex-col">
                    <label className="text-blue-700 text-sm">Taluka</label>
                    <input
                      name="taluka"
                      value={values.taluka}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Taluka"
                      className="mt-1 px-3 py-1.5 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.taluka && errors.taluka && (
                      <div className="text-red-500 text-sm">
                        {errors.taluka}
                      </div>
                    )}
                  </div>

                  {/* Pincode */}
                  <div className="flex flex-col">
                    <label className="text-blue-700 text-sm">Pincode</label>
                    <input
                      name="pincode"
                      value={values.pincode}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Pincode"
                      className="mt-1 px-3 py-1.5 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.pincode && errors.pincode && (
                      <div className="text-red-500 text-sm">
                        {errors.pincode}
                      </div>
                    )}
                  </div>

                  {/* Authorized Name */}
                  <div className="flex flex-col">
                    <label className="text-blue-700 text-sm">
                      Authorized Name
                    </label>
                    <input
                      name="autorizedName"
                      value={values.autorizedName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Authorized Name"
                      className="mt-1 px-3 py-1.5 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.autorizedName && errors.autorizedName && (
                      <div className="text-red-500 text-sm">
                        {errors.autorizedName}
                      </div>
                    )}
                  </div>

                  {/* Authorized Phone */}
                  <div className="flex flex-col">
                    <label className="text-blue-700 text-sm">
                      Authorized Phone Number
                    </label>
                    <input
                      name="autorizedPhono"
                      value={values.autorizedPhono}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter Phone No."
                      className="mt-1 px-3 py-1.5 text-sm border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                    />
                    {touched.autorizedPhono && errors.autorizedPhono && (
                      <div className="text-red-500 text-sm">
                        {errors.autorizedPhono}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>

              {/* Save Button */}
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-green-600 hover:bg-green-800 text-white py-2 px-4 sm:px-6 rounded-lg shadow-lg transition duration-300"
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
