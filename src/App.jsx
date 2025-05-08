import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import Root from "./Component/Root";
// import { Navigate } from "react-router-dom";
import Login from "./Pages/Login";
import CollegeTableDetails from "./Pages/CollegeTableDetails";
import MultiStepForm from "./Pages/AddNewCollege";
import ReportandAnalytics from "./Pages/ReportandAnalytics";
import AdminDashboard from "./Pages/AdminDashboard";
import ProfilePage from "./Pages/ProfilePage";
import CollegeCourses from "./Courses/CollegeCourses";
import EditCollegeDetails from "./Component/EditCollegeDetails";
import AddUniversity from "./University/AddUniversity";
import EditUniversity from "./University/EditUniversity";
import UniversityTableDetails from "./Pages/UniversityTableDetails";
import UniversityPlacement from "./Component/UniversityPlacement";

import TableList from "./Component/IQTestPage/TableList";
import AddTest from "./Component/IQTestPage/AddTest.jsx";
import ViewExcelPage from "./Component/IQTestPage/ViewExcelPage.jsx";

import Infrastructure from "./Component/Infrastructure";
import Placement from "./Component/Placement";
import UniversityInfrastructure from "./Component/UniversityInfrastructure";
import IQTest from "./Pages/IQTest";
import ClassForm from "./Pages/RegisterClass/ClassForm.jsx";
import ClassVendorDashboard from "./Pages/ClassVendorDashboard.jsx";
import Cookies from "js-cookie";
import ManageClass from "./Pages/ManageClass.jsx";
import VendorLayout from "./Pages/VendorLayout.jsx";
import ClassTableDetails from "./Pages/ClassTableDetails.jsx";
import FacultyManagement from "./Pages/FacultyManagement.jsx";
import ClassCourses from "./Pages/ClassCourses.jsx";
import ProtectedRoute from "./Component/ProtectedRoute"; // Import the ProtectedRoute
import AddAdmin from "./Pages/AddAdmin.jsx";
import ManageClassCategory from "./Component/ManageClassCategory.jsx";
import ManageCollegeCategory from "./Component/ManageCollegeCategory.jsx";
import ManageUniversityCategory from "./Component/ManageUniversityCategory.jsx";
import AddNewCollege from "./Pages/AddNewCollege";
import ManageCollege from "./Pages/ManageCollege.jsx";
import CollegeVendorDashboard from "./Pages/CollegeVendorDashboard.jsx";
import VendorCollegeLayout from "./Pages/VendorCollegeLayout.jsx";

const queryClient = new QueryClient();

function App() {
  const role = Cookies.get("role");
  const subrole = Cookies.get("subrole");
  const token = Cookies.get("token"); // Ensure user is logged in

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            {/* Public Route */}
            <Route index element={<Login />} />
            <Route path="/add-admin" element={<AddAdmin />} />

            {/* Protected Routes for Admin */}
            <Route element={<ProtectedRoute roleRequired="ADMIN" />}>
              <Route path="/dashboard" element={<AdminDashboard />} />
              <Route path="/colleges" element={<CollegeTableDetails />} />
              <Route
                path="/university-details"
                element={<UniversityTableDetails />}
              />
              <Route
                path="/university/placement/:universityId"
                element={<UniversityPlacement />}
              />
              <Route
                path="/university/infrastructure/:universityId"
                element={<UniversityInfrastructure />}
              />

              <Route path="/class-list" element={<ClassTableDetails />} />
              <Route path="/iq-test" element={<IQTest />} />
              <Route
                path="/add-class-category"
                element={<ManageClassCategory />}
              />
              <Route
                path="add-college-category"
                element={<ManageCollegeCategory />}
              />
              <Route
                path="add-university-category"
                element={<ManageUniversityCategory />}
              />
              <Route
                path="/tests/:category/:mainCategoryId"
                element={<TableList />}
              />
              <Route path="/view-excel/:testId" element={<ViewExcelPage />} />
              <Route path="/add-test/:mainCategoryId" element={<AddTest />} />
              <Route path="/reports" element={<ReportandAnalytics />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route
                path="/colleges/courses/:collegeId"
                element={<CollegeCourses />}
              />
              <Route
                path="/colleges/infrastructure/:collegeId"
                element={<Infrastructure />}
              />
              <Route
                path="/colleges/placement/:collegeId"
                element={<Placement />}
              />
              <Route
                path="/edit-college/:id"
                element={<EditCollegeDetails />}
              />
             
              <Route path="/edit-university/:id" element={<EditUniversity />} />
            </Route>

            {/* Protected Routes for Vendor-Class */}
            {/* <Route element={<ProtectedRoute roleRequired="VENDOR" />}>
              <Route path="/vendor-class" element={<VendorLayout />}>
                <Route index element={<ClassVendorDashboard />} />
                <Route path="class-dashboard" element={<ClassVendorDashboard />} />
                <Route path="edit-vendor-class" element={<ManageClass />} />
                {/* <Route path="class-faculty" element={<FacultyManagement />} /> */}
            {/* <Route path="class-courses" element={<ClassCourses/>}/> */}
            {/* </Route>
              </Route> */}

            {/* Protected Routes for VENDOR - All Subroles */}
            <Route element={<ProtectedRoute roleRequired="VENDOR" />}>
              {subrole === "CLASS" && (
                <Route path="/vendor-class" element={<VendorLayout />}>
                  <Route index element={<ClassVendorDashboard />} />
                  <Route
                    path="class-dashboard"
                    element={<ClassVendorDashboard />}
                  />
                  <Route path="edit-vendor-class" element={<ManageClass />} />
                  {/* Add more class-specific routes */}
                </Route>
              )}

              {subrole === "COLLEGE" && (
                <Route path="/vendor-college" element={<VendorCollegeLayout />}>
                  <Route index element={<CollegeVendorDashboard />} />
                  <Route
                    path="college-dashboard"
                    element={<CollegeVendorDashboard />}
                  />
                  <Route path="edit-college" element={<ManageCollege />} />
                  <Route
                    path="add-college-courses"
                    element={<CollegeCourses />}
                  />
                  <Route
                    path="add-college-infrastructure"
                    element={<Infrastructure />}
                  />
                  <Route
                    path="add-college-placement"
                    element={<Placement />}
                  />
                  {/* Add college-specific vendor pages here */}
                </Route>
              )}

              {subrole === "university" && (
                <Route path="/vendor-university" element={<VendorLayout />}>
                  <Route
                    index
                    element={<div>University Vendor Dashboard</div>}
                  />
                  <Route
                    path="university-dashboard"
                    element={<div>University Dashboard Page</div>}
                  />
                  {/* Add university-specific vendor pages here */}
                </Route>
              )}
            </Route>

            {/* ❌ Redirect Unauthenticated Users to Login */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          {/* ✅ Registration Route for Vendors */}
          <Route path="/register-class" element={<ClassForm />} />
          <Route path="/add-college" element={<AddNewCollege />} />
          <Route path="/university" element={<AddUniversity />} />
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
