import React from "react";

const FileUpload = ({ label, name, multiple = false, formik }) => {
  // const handleFileChange = (event) => {
  //   const files = multiple ? Array.from(event.target.files) : event.target.files[0];
  //   formik.setFieldValue(name, files);
  // };

  const handleFileChange = (event) => {
    let files = multiple ? Array.from(event.target.files) : event.target.files[0];
  
    // Apply the limit only for multiple uploads
    if (multiple && files.length > 1) {
      alert("You can upload up to 1 images only.");
      files = files.slice(0, 1);
    }
  
    formik.setFieldValue(name, files);
  };
  

  return (
    <div className="mb-4 ">
      {/* Single Image Upload */}
      {!multiple ? (
        <div className="border-2 border-dashed rounded-lg p-5 text-center shadow-md bg-white hover:border-blue-400 transition">
          <label className="block font-semibold text-blue-800 mb-2">
            {label} <span className="text-red-500">(Max: 100KB, JPG/JPEG/PNG)</span>
          </label>
          <div
            className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-blue-50 transition"
            onClick={() => document.getElementById(name).click()}
          >
            {formik.values[name] ? (
              <img
                src={URL.createObjectURL(formik.values[name])}
                alt="Preview"
                className="w-full h-24 object-cover rounded-lg shadow-md"
              />
            ) : (
              <p className="text-gray-500">Drag & drop an image here or click to upload</p>
            )}
          </div>
          <input
            type="file"
            id={name}
            accept="image/jpeg,image/jpg,image/png"
            className="hidden"
            onChange={handleFileChange}
          />
          {formik.touched[name] && formik.errors[name] && (
            <p className="text-red-500 text-sm">{formik.errors[name]}</p>
          )}
        </div>
      ) : (
        // Multiple Image Upload
        <div className="border-2 border-dashed rounded-lg p-5 text-center shadow-md bg-white hover:border-blue-400 transition">
          <label className="block font-semibold text-blue-800 mb-2">
            {label} <span className="text-red-500">(JPG/JPEG/PNG)</span>
          </label>
          <div
            className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-blue-50 transition"
            onClick={() => document.getElementById(name).click()}
          >
            {formik.values[name]?.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {formik.values[name].map((file, index) => (
                  <img
                    key={index}
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-16 object-cover rounded-lg shadow-md"
                  />
                ))}
              </div>
            ) : (
              <p className="text-gray-500">Drag & drop images here or click to upload</p>
            )}
          </div>
          <input
            type="file"
            id={name}
            accept="image/jpeg,image/jpg,image/png"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          {formik.touched[name] && formik.errors[name] && (
            <p className="text-red-500 text-sm">{formik.errors[name]}</p>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
