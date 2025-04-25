import React from "react";
import Swal from "sweetalert2";

const FileUpload = ({ label, name, multiple = false, formik }) => {
  const compressImage = (
    file,
    maxWidth = 800,
    maxHeight = 1000,
    quality = 0.8
  ) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          const ratio = Math.min(maxWidth / img.width, maxHeight / img.height);
          const width = img.width * ratio;
          const height = img.height * ratio;

          canvas.width = width;
          canvas.height = height;

          ctx.drawImage(img, 0, 0, width, height);
          canvas.toBlob(
            (blob) => {
              resolve(blob);
            },
            "image/jpeg",
            quality
          );
        };
      };
      reader.readAsDataURL(file);
    });
  };

  const handleFileChange = async (event) => {
    let files = multiple
      ? Array.from(event.target.files)
      : [event.target.files[0]];

    if (multiple && files.length > 1) {
      Swal.fire({
        icon: "info",
        title: "Limit Exceeded",
        text: "You can upload upto 1 image only.",
        confirmButtonColor: "#3085d6",
        confirmButtonText: "OK",
      });
      // alert("You can upload up to 1 image only.");
      files = files.slice(0, 1);
    }

    // Compress all files
    const compressedFiles = await Promise.all(
      files.map(async (file) => {
        const blob = await compressImage(file);
        return new File([blob], file.name, { type: blob.type });
      })
    );

    // Set in formik
    if (multiple) {
      formik.setFieldValue(name, compressedFiles);
    } else {
      formik.setFieldValue(name, compressedFiles[0]);
    }
  };

  // const handleFileChange = (event) => {
  //   let files = multiple ? Array.from(event.target.files) : event.target.files[0];
  //   if (multiple && files.length > 1) {
  //     alert("You can upload up to 1 images only.");
  //     files = files.slice(0, 1);
  //   }

  //   formik.setFieldValue(name, files);
  // };

  return (
<div className="mb-4">
  <label className="block font-semibold text-blue-800 mb-2">
    {label} <span className="text-red-500">(JPG/JPEG/PNG)</span>
  </label>

  <button
    type="button"
    onClick={() => document.getElementById(name).click()}
    className="bg-blue-600 text-white px-4 py-2 rounded shadow hover:bg-blue-700 transition"
  >
    Upload Image
  </button>

  {/* Hidden File Input */}
  <input
    type="file"
    id={name}
    accept="image/jpeg,image/jpg,image/png"
    multiple={multiple}
    className="hidden"
    onChange={handleFileChange}
  />

  {/* Show Preview */}
  <div className="mt-4">
    {!multiple && formik.values[name] instanceof File && (
      <img
        src={URL.createObjectURL(formik.values[name])}
        alt="Preview"
        className="w-40 h-28 object-cover rounded-lg shadow-md"
      />
    )}

    {multiple && formik.values[name]?.length > 0 && (
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
    )}
  </div>

  {/* Validation Error */}
  {formik.touched[name] && formik.errors[name] && (
    <p className="text-red-500 text-sm mt-2 font-semibold">
      {formik.errors[name]}
    </p>
  )}
</div>

  );
};

export default FileUpload;
