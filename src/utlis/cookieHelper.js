import Cookies from "js-cookie";

// ✅ Function to store all cookies
export const setAuthCookies = ({
  token,
  role,
  subrole,
  userID,
  classID,
  collegeID,
  universityID,
}) => {
  console.log("🚀 Storing Cookies:", {
    token,
    role,
    subrole,
    userID,
    classID,
    collegeID,
    universityID,
  });

  Cookies.set("token", token, { expires: 1 }); // 1 hour
  Cookies.set("role", role, { expires: 1 });
  Cookies.set("userID", userID, { expires: 1 });

  // Optional cookies only if they exist
  if (subrole) Cookies.set("subrole", subrole, { expires: 1 });
  if (classID) Cookies.set("classId", classID, { expires: 1 });
  if (collegeID) Cookies.set("collegeID", collegeID, { expires: 1 });
  if (universityID) Cookies.set("universityID", universityID, { expires: 1 });
};

// ✅ Function to get a specific cookie
export const getCookie = (key) => Cookies.get(key);

// ✅ Function to clear all auth cookies
export const clearAuthCookies = () => {
  Cookies.remove("token");
  Cookies.remove("role");
  Cookies.remove("subrole");
  Cookies.remove("userID");
  Cookies.remove("classId");
  Cookies.remove("collegeID");
  Cookies.remove("universityID");
};
