import React, { useState } from "react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "John Doe",
    email: "admin@example.com",
    phone: "9876543210",
    designation: "Super Admin",
    institution: "XYZ Education Board",
    profilePic:
      "https://static.vecteezy.com/system/resources/previews/029/156/453/non_2x/admin-business-icon-businessman-business-people-male-avatar-profile-pictures-man-in-suit-for-your-web-site-design-logo-app-ui-solid-style-illustration-design-on-white-background-eps-10-vector.jpg",
    bio: "Helping students with college admissions and issues.",
  });

  const handleChange = (e) => {
    setAdminData({ ...adminData, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setAdminData({ ...adminData, profilePic: imageUrl });
    }
  };

  return (
    <div className="max-w-4xl mx-auto bg-gradient-to-br from-white via-gray-50 to-gray-100 shadow-xl rounded-2xl p-8 mt-12">
      <div className="flex flex-col items-center text-center">
        <label htmlFor="profilePic" className="cursor-pointer relative">
          <img
            src={adminData.profilePic}
            alt="Profile"
            className="w-36 h-36 rounded-full object-cover border-4 border-white shadow-md hover:opacity-90 transition"
          />
          {isEditing && (
            <input
              type="file"
              id="profilePic"
              className="hidden"
              onChange={handleImageUpload}
            />
          )}
        </label>
        <h2 className="text-2xl font-bold text-gray-800 mt-4">
          {adminData.name}
        </h2>
        <p className="text-sm text-gray-600 font-medium mt-1">
          {adminData.designation} at{" "}
          <span className="italic">{adminData.institution}</span>
        </p>
      </div>

      <div className="mt-8">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={adminData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Full Name"
            />
            <input
              type="email"
              name="email"
              value={adminData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Email"
            />
            <input
              type="text"
              name="phone"
              value={adminData.phone}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Phone Number"
            />
            <input
              type="text"
              name="designation"
              value={adminData.designation}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Designation"
            />
            <input
              type="text"
              name="institution"
              value={adminData.institution}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Institution"
            />
            <textarea
              name="bio"
              value={adminData.bio}
              onChange={handleChange}
              rows="4"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Short Bio"
            ></textarea>
          </div>
        ) : (
          <div className="space-y-3 text-gray-700 leading-relaxed">
            <p>
              <strong>Email:</strong> {adminData.email}
            </p>
            <p>
              <strong>Phone:</strong> {adminData.phone}
            </p>
            <p>
              <strong>Designation:</strong> {adminData.designation}
            </p>
            <p>
              <strong>Institution:</strong> {adminData.institution}
            </p>
            <p>
              <strong>Bio:</strong> {adminData.bio}
            </p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
            >
              Cancel
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Save
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-blue-500 cursor-pointer text-white rounded-lg hover:bg-blue-600 transition"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
