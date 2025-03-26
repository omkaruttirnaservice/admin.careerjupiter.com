
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Root from "./Component/Root";
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
            <Route index element={<Login />} />

            {/* ✅ Admin Routes */}
            {role === "ADMIN" && token && (
              <>
                <Route path="/dashboard" element={<AdminDashboard />} />
                <Route path="/colleges" element={<CollegeTableDetails />} />
                <Route path="/university-details" element={<UniversityTableDetails />} />
                <Route path="/university/placement/:universityId" element={<UniversityPlacement />} />
                <Route path="/university/infrastructure/:universityId" element={<UniversityInfrastructure />} />
                <Route path="/add-college" element={<MultiStepForm />} />
                <Route path="/class-list" element={<ClassTableDetails />} />
                <Route path="/iq-test" element={<IQTest />} />
                <Route path="/tests/:category" element={<TableList />} />
                <Route path="/view-excel/:testId" element={<ViewExcelPage />} />
                <Route path="/add-test/:category" element={<AddTest />} />
                <Route path="/reports" element={<ReportandAnalytics />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/colleges/courses/:collegeId" element={<CollegeCourses />} />
                <Route path="/colleges/infrastructure/:collegeId" element={<Infrastructure />} />
                <Route path="/colleges/placement/:collegeId" element={<Placement />} />
                <Route path="/edit-college/:id" element={<EditCollegeDetails />} />
                <Route path="/university" element={<AddUniversity />} />
                <Route path="/edit-university/:id" element={<EditUniversity />} />
              </>
            )}

            {/* ✅ Vendor-Class Routes */}
            {role === "VENDOR" && subrole === "Class" && token ? (
              <Route path="/vendor-class" element={<VendorLayout />}>
                <Route index element={<ClassVendorDashboard />} />
                <Route path="class-dashboard" element={<ClassVendorDashboard />} />
                <Route path="edit-vendor-class" element={<ManageClass />} />
              </Route>
            ) : null}

            {/* ✅ Registration Route for Vendors */}
            <Route path="/register-class" element={<ClassForm />} />

            {/* ❌ Redirect Unauthenticated Users to Login */}
            {!token && <Route path="*" element={<Navigate to="/" replace />} />}
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
