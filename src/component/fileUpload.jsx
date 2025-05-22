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
    <div className="mb-4 ">
      {/* Single Image Upload */}
      {!multiple ? (
        <div className="border-2 border-dashed rounded-lg p-5 text-center shadow-md bg-white hover:border-blue-400 transition">
          <label className="block font-semibold text-blue-800 mb-2">
            {label} <span className="text-red-500">(JPG/JPEG/PNG)</span>
          </label>
          <div
            className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:bg-blue-50 transition"
            onClick={() => document.getElementById(name).click()}
          >
            {/* {formik.values[name] ? (
              <img
                src={URL.createObjectURL(formik.values[name])}
                alt="Preview"
                className="w-full h-24 object-cover rounded-lg shadow-md"
              />
            ) : (
              <p className="text-gray-500">Drag & drop an image here or click to upload</p>
            )} */}

            {formik.values[name] && formik.values[name] instanceof File ? (
              <img
                src={URL.createObjectURL(formik.values[name])}
                alt="Preview"
                className="w-full h-24 object-cover rounded-lg shadow-md"
              />
            ) : (
              <p className="text-gray-500">
                Drag & drop an image here or click to upload
              </p>
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
            <p className="text-red-500 text-sm mt-2 font-semibold">
              {formik.errors[name]}
            </p>
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
              <p className="text-gray-500">
                Drag & drop images here or click to upload
              </p>
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
            <p className="text-red-500 text-sm mt-2 font-semibold">
              {formik.errors[name]}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
