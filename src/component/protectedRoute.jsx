


import React, { useEffect } from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ roleRequired, subroleRequired }) => {

  const token = Cookies.get("token");
  const role = Cookies.get("role");
  const subrole = Cookies.get("subrole");


  // If the user is authenticated, render the children (protected content); 
  return token && role  ? <Outlet /> : <Navigate to="/" replace /> ;
};

// const ProtectedRoute = ({ roleRequired }) => {
//   const token = Cookies.get("token");
//   const role = Cookies.get("role");

//   const isAuthorized =
//     token && (role === "ADMIN" || role === roleRequired);

//   return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
// };


export default ProtectedRoute;



// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";

// const ProtectedRoute = ({ roleRequired, subroleRequired }) => {
//   const token = Cookies.get("token");
//   const role = Cookies.get("role");
//   const subrole = Cookies.get("subrole");

//   // ✅ Allow access if role is ADMIN or matches required role
//   const isAuthorized =
//     token &&
//     (role === "ADMIN" || role === roleRequired) &&
//     (!subroleRequired || subrole === subroleRequired);

//   return isAuthorized ? <Outlet /> : <Navigate to="/" replace />;
// };

// export default ProtectedRoute;
