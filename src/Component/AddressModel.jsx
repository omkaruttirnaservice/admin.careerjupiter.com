import React from "react";
import { Formik, FieldArray } from "formik";
import { motion } from "framer-motion";
import { Trash, Plus } from "lucide-react";

const AddressModal = ({ open, onClose, onSave }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-opacity-50 bg-black/50 backdrop-blur-sm z-50 flex justify-center items-start overflow-y-auto py-10">
    <div className="bg-gradient-to-br from-blue-50 to-white rounded-xl shadow-xl border border-blue-200 p-8 w-full max-w-5xl relative">
      
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-600 hover:text-red-800 text-2xl font-bold cursor-pointer"
        >
          &times;
        </button>

        <h3 className="text-3xl font-bold text-blue-800 mb-6">🏠 Add Address</h3>

        <Formik
          initialValues={{
            address: [
              {
                line1: "",
                line2: "",
                pincode: "",
                state: "",
                dist: "",
                taluka: "",
                nearbyLandmarks: "",
                autorizedName: "",
                autorizedPhono: "",
              },
            ],
          }}
          onSubmit={(values) => {
            onSave(values.address);
            onClose();
          }}
        >
          {({ values, handleChange, handleBlur, handleSubmit }) => (
            <form onSubmit={handleSubmit} className="space-y-6">
              <FieldArray name="address">
                {({ push, remove }) => (
                  <>
                    {values.address.map((_, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 10 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="bg-white p-6 rounded-lg shadow-md border border-gray-200 space-y-4"
                      >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="flex flex-col">
                            <label className="text-blue-700">Address Line 1</label>
                            <input
                              name={`address[${index}].line1`}
                              value={values.address[index].line1 || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter line 1"
                              className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-blue-700">Address Line 2</label>
                            <input
                              name={`address[${index}].line2`}
                              value={values.address[index].line2 || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter line 2"
                              className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-blue-700">Landmark</label>
                            <input
                              name={`address[${index}].nearbyLandmarks`}
                              value={values.address[index].nearbyLandmarks || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Nearby landmark"
                              className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-blue-700">State</label>
                            <input
                              name={`address[${index}].state`}
                              value={values.address[index].state || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="State"
                              className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-blue-700">District</label>
                            <input
                              name={`address[${index}].dist`}
                              value={values.address[index].dist || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="District"
                              className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-blue-700">Taluka</label>
                            <input
                              name={`address[${index}].taluka`}
                              value={values.address[index].taluka || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Taluka"
                              className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-blue-700">Pincode</label>
                            <input
                              name={`address[${index}].pincode`}
                              value={values.address[index].pincode || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Pincode"
                              className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-blue-700">Authorized Name</label>
                            <input
                              name={`address[${index}].autorizedName`}
                              value={values.address[index].autorizedName || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter line 2"
                              className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                          <div className="flex flex-col">
                            <label className="text-blue-700">Autorized Phone Number</label>
                            <input
                              name={`address[${index}].autorizedPhono`}
                              value={values.address[index].autorizedPhono || ""}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              placeholder="Enter line 2"
                              className="mt-1 px-4 py-2 border border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                            />
                          </div>
                        </div>

                        {/* Delete Address Button */}
                        {values.address.length > 1 && (
                          <div className="flex justify-end">
                            <button
                              type="button"
                              onClick={() => remove(index)}
                              className="flex items-center bg-red-600 hover:bg-red-800 text-white px-4 py-2 rounded-lg shadow-md transition duration-300"
                            >
                              <Trash className="mr-2" size={20} /> Delete Address
                            </button>
                          </div>
                        )}
                      </motion.div>
                    ))}

                    <div className="mt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={() =>
                          push({
                            line1: "",
                            line2: "",
                            nearbyLandmarks: "",
                            state: "",
                            dist: "",
                            taluka: "",
                            pincode: "",
                          })
                        }
                        className="flex items-center bg-blue-600 hover:bg-blue-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300"
                      >
                        <Plus className="mr-2" size={20} /> Add Another
                      </button>

                      <button
                        type="submit"
                        className="bg-green-600 hover:bg-green-800 text-white py-2 px-6 rounded-lg shadow-lg transition duration-300"
                      >
                        ✅ Save Address
                      </button>
                    </div>
                  </>
                )}
              </FieldArray>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddressModal;
