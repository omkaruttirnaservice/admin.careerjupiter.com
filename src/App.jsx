import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "leaflet/dist/leaflet.css";
import Root from "./component/root";
import Login from "./pages/login";
import CollegeTableDetails from "./pages/collegeTableDetails";
import ReportandAnalytics from "./pages/reportandAnalytics";
import AdminDashboard from "./pages/adminDashboard";
import ProfilePage from "./pages/profilePage";
import CollegeCourses from "./courses/collegeCourses";
import AddUniversity from "./university/addUniversity";
import UniversityList from "./university/universityList.jsx";
import UniversityPlacement from "./component/universityPlacement";
import Infrastructure from "./component/infrastructure";
import Placement from "./component/placement";
import UniversityInfrastructure from "./component/universityInfrastructure";
import IQTest from "./pages/iQTest";
import ClassForm from "./pages/registerClass/classForm.jsx";
import ClassVendorDashboard from "./pages/classVendorDashboard.jsx";
import Cookies from "js-cookie";
import ManageClass from "./pages/manageClass.jsx";
import VendorClassLayout from "./pages/vendorClassLayout.jsx";
import ClassTableDetails from "./pages/classTableDetails.jsx";
import ProtectedRoute from "./component/protectedRoute";
import AddAdmin from "./pages/addAdmin.jsx";
import ManageCollegeCategory from "./component/manageCollegeCategory.jsx";
import ManageUniversityCategory from "./component/manageUniversityCategory.jsx";
import AddNewCollege from "./pages/addNewCollege";
import ManageCollege from "./pages/manageCollege.jsx";
import CollegeVendorDashboard from "./pages/collegeVendorDashboard.jsx";
import VendorCollegeLayout from "./pages/vendorCollegeLayout.jsx";
import EditUniversity from "./university/editUniversity.jsx";
import UniversityVendorDashboard from "./pages/universityVendorDashboard.jsx";
import VendorUniversityLayout from "./pages/vendorUniversityLayout.jsx";
import ViewExcelPage from "./component/iqTestPage/viewExcelPage.jsx";
import AddTest from "./component/iqTestPage/addTest.jsx";
import TableList from "./component/iqTestPage/tableList.jsx";
import EditCollegeDetails from "./component/editCollegeDetails.jsx";
import ManageClassCategory from "./component/manageClassCategory.jsx";
import TypeList from "./component/roadmap/typeList.jsx";
import ManageRoadmapForm from "./component/roadmap/manageRoadmapFrom.jsx";
import UniversityCourses from "./courses/universityCourses.jsx";
// import UploadCollegeExcel from "./pages/uploadCollegeExcel.jsx";
import CollegeCutoffForm from "./pages/collegeCutoffForm.jsx";
import CutoffTable from "./pages/cutoffTable.jsx";
import ManageCaste from "./pages/manageCaste.jsx";


const queryClient = new QueryClient();

function App() {
  const role = Cookies.get("role");
  const subrole = Cookies.get("subrole");
  const token = Cookies.get("token");
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
              <Route path="/university-details" element={<UniversityList />} />
              <Route path="/university/placement/:universityId" element={<UniversityPlacement />} />
              <Route path="/university/infrastructure/:universityId" element={<UniversityInfrastructure />} />
              <Route path="/university/courses/:universityId" element={<UniversityCourses />} />
              <Route path="/class-list" element={<ClassTableDetails />} />
              <Route path="/iq-test" element={<IQTest />} />
              <Route path="/add-class-category" element={<ManageClassCategory />} />
              <Route path="add-college-category" element={<ManageCollegeCategory />} />
              <Route path="add-university-category" element={<ManageUniversityCategory />} />
              <Route path="/tests/:category/:mainCategoryId" element={<TableList />} />
              <Route path="/view-excel/:testId" element={<ViewExcelPage />} />
              <Route path="/add-test/:mainCategoryId" element={<AddTest />} />
              <Route path="/reports" element={<ReportandAnalytics />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/add-cutoff-eligibility" element={<CollegeCutoffForm/>} />
              <Route path="/colleges/courses/:collegeId" element={<CollegeCourses />} />
              <Route path="/colleges/edit/:id" element={<ManageCollege />} />
              <Route path="/colleges/infrastructure/:collegeId" element={<Infrastructure />} />
              <Route path="/colleges/placement/:collegeId" element={<Placement />} />
              <Route path="/edit-college/:id" element={<EditCollegeDetails />} />
              <Route path="/edit-university/:id" element={<EditUniversity />} />
              <Route path="/manage-type" element={<TypeList />} />
              <Route path="/manage-roadmap" element={<ManageRoadmapForm />} />
               <Route path="/cutoff-table" element={<CutoffTable />} />
                        <Route path="/add-caste-category" element={<ManageCaste />} />
            </Route>

            {/* Protected Routes for VENDOR - All Subroles */}
            <Route element={<ProtectedRoute roleRequired="VENDOR" />}>
              {subrole === "CLASS" && (
                <Route path="/vendor-class" element={<VendorClassLayout />}>
                  <Route index element={<ClassVendorDashboard />} />
                  <Route
                    path="class-dashboard"
                    element={<ClassVendorDashboard />}
                  />
                  <Route path="edit-vendor-class" element={<ManageClass />} />
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
                  <Route path="add-college-placement" element={<Placement />} />
                </Route>
              )}

              {subrole === "UNIVERSITY" && (
                <Route
                  path="/vendor-university"
                  element={<VendorUniversityLayout />}
                >
                  <Route index element={<UniversityVendorDashboard />} />
                  <Route
                    path="university-dashboard"
                    element={<UniversityVendorDashboard />}
                  />
                  <Route path="edit-university" element={<EditUniversity />} />
                  <Route
                    path="add-university-placement"
                    element={<UniversityPlacement />}
                  />
                  <Route
                    path="add-university-courses"
                    element={<UniversityCourses />}
                  />
                  <Route
                    path="add-university-infrastructure"
                    element={<UniversityInfrastructure />}
                  />
                </Route>
              )}
            </Route>

            {/* ❌ Redirect Unauthenticated Users to Login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
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
