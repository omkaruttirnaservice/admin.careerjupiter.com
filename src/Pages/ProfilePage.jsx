import React, { useState } from "react";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [adminData, setAdminData] = useState({
    name: "John Doe",
    email: "admin@example.com",
    phone: "9876543210",
    designation: "Super Admin",
    institution: "XYZ Education Board",
    profilePic: "https://via.placeholder.com/150",
    bio: "Helping students with college admissions and issues."
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
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <div className="flex flex-col items-center">
        <label htmlFor="profilePic" className="cursor-pointer">
          <img src={adminData.profilePic} alt="Profile" className="w-32 h-32 rounded-full object-cover border-2 border-gray-300" />
          {isEditing && <input type="file" id="profilePic" className="hidden" onChange={handleImageUpload} />}
        </label>
        <h2 className="text-xl font-semibold mt-3">{adminData.name}</h2>
        <p className="text-gray-500">{adminData.designation} - {adminData.institution}</p>
      </div>

      <div className="mt-6">
        {isEditing ? (
          <div className="space-y-4">
            <input type="text" name="name" value={adminData.name} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Full Name" />
            <input type="email" name="email" value={adminData.email} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Email" />
            <input type="text" name="phone" value={adminData.phone} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Phone Number" />
            <input type="text" name="designation" value={adminData.designation} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Designation" />
            <input type="text" name="institution" value={adminData.institution} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Institution" />
            <textarea name="bio" value={adminData.bio} onChange={handleChange} className="w-full p-2 border rounded" placeholder="Short Bio"></textarea>
          </div>
        ) : (
          <div className="space-y-3">
            <p><strong>Email:</strong> {adminData.email}</p>
            <p><strong>Phone:</strong> {adminData.phone}</p>
            <p><strong>Designation:</strong> {adminData.designation}</p>
            <p><strong>Institution:</strong> {adminData.institution}</p>
            <p><strong>Bio:</strong> {adminData.bio}</p>
          </div>
        )}
      </div>

      <div className="mt-6 flex justify-end gap-3">
        {isEditing ? (
          <>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-gray-300 rounded cursor-pointer">Cancel</button>
            <button onClick={() => setIsEditing(false)} className="px-4 py-2 bg-blue-500 text-white rounded cursor-pointer">Save</button>
          </>
        ) : (
          <button onClick={() => setIsEditing(true)} className="px-4 py-2 bg-green-500 text-white rounded cursor-pointer">Edit Profile</button>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
