import Cookies from "js-cookie";

// ✅ Function to store all cookies
export const setAuthCookies = ({ token, role, subrole, userId, classId }) => {
  console.log("🚀 Storing Cookies:", { token, role, subrole, userId, classId });
  
  Cookies.set("token", token, { expires: 1 / 24 }); // 1 hour expiration
  Cookies.set("role", role, { expires: 1 / 24 });
  Cookies.set("subrole", subrole, { expires: 1 / 24 });
  Cookies.set("userId", userId, { expires: 1 / 24 });
  Cookies.set("classId", classId, { expires: 1 / 24 });
  // Cookies.set("iqTestToken", iqTestAuthToken, {expires: 1/24});
};

// ✅ Function to retrieve a specific cookie
export const getCookie = (key) => Cookies.get(key);

// ✅ Function to remove all auth cookies
export const clearAuthCookies = () => {
  Cookies.remove("token");
  Cookies.remove("role");
  Cookies.remove("subrole");
  Cookies.remove("userId");
  Cookies.remove("classId");
  // Cookies.remove("iqTestToken");
};
