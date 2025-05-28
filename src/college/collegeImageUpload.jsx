import { useState } from "react";
import { useFormik } from "formik";
import { useDropzone } from "react-dropzone";
import { X } from "lucide-react"; 
import toast from "react-hot-toast";

// Component to handle single and multiple college image uploads
const CollegeImageUpload = () => {
  const [image, setImage] = useState(null);
  const [galleryImages, setGalleryImages] = useState([]);

  const formik = useFormik({
    initialValues: {
      image: null,
      gallery_image: [],
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  const onDropSingle = (acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.size <= 102400) {
      setImage(file);
      formik.setFieldValue("image", file);
    } else {
      toast.error("Image must be JPG/JPEG/PNG and under 100KB");
    }
  };

  const onDropMultiple = (acceptedFiles) => {
    setGalleryImages((prevImages) => [...prevImages, ...acceptedFiles]);
    formik.setFieldValue("gallery_image", [...formik.values.gallery_image, ...acceptedFiles]);
  };

  const removeImage = () => {
    setImage(null);
    formik.setFieldValue("image", null);
  };

  const removeGalleryImage = (index) => {
    const newImages = galleryImages.filter((_, i) => i !== index);
    setGalleryImages(newImages);
    formik.setFieldValue("gallery_image", newImages);
  };

  const { getRootProps: getSingleRootProps, getInputProps: getSingleInputProps } = useDropzone({
    onDrop: onDropSingle,
    accept: "image/jpeg, image/jpg, image/png",
    maxFiles: 1,
  });

  const { getRootProps: getMultiRootProps, getInputProps: getMultiInputProps } = useDropzone({
    onDrop: onDropMultiple,
    accept: "image/jpeg, image/jpg, image/png",
    multiple: true,
  });

  return (
    <div className="flex gap-4">
      {/* College Image Upload */}
      <div className="border-2 border-dashed rounded-lg p-4 text-center w-1/2">
        <label className="block font-medium mb-2">
          College Image <span className="text-red-500">(Max: 100KB, JPG/JPEG/PNG)</span>
        </label>
        <div
          {...getSingleRootProps()}
          className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition relative"
        >
          <input {...getSingleInputProps()} />
          {image ? (
            <div className="relative">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-full h-12 object-cover rounded"
              />
              <button
                className="absolute cursor-pointer top-0 right-0 bg-red-500 text-white rounded-full p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  removeImage();
                }}
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Drag & drop an image here or click to upload</p>
          )}
        </div>
      </div>

      {/* Gallery Images Upload */}
      <div className="border-2 border-dashed rounded-lg p-4 text-center w-1/2">
        <label className="block font-medium mb-2">
          Gallery Images <span className="text-red-500">(JPG/JPEG/PNG)</span>
        </label>
        <div
          {...getMultiRootProps()}
          className="border border-gray-300 p-6 rounded-lg cursor-pointer hover:border-blue-500 transition"
        >
          <input {...getMultiInputProps()} />
          {galleryImages.length > 0 ? (
            <div className="flex flex-wrap gap-2">
              {galleryImages.map((file, index) => (
                <div key={index} className="relative">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="w-20 h-12 object-cover rounded"
                  />
                  <button
                    className="absolute top-0 right-0 bg-red-500 text-white rounded-full p-1 cursor-pointer"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeGalleryImage(index);
                    }}
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 h-4">Drag & drop images here or click to upload</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CollegeImageUpload;
