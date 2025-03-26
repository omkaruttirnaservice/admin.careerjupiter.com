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
// import UploadExcel from "./Pages/UploadExcel";
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
// import IQTest from "./Pages/IQTest";
import ViewExcelPage from "./Component/IQTestPage/ViewExcelPage.jsx";

// Importing the new components
import Infrastructure from "../src/Component/Infrastructure";
import Placement from "../src/Component/Placement";
import UniversityInfrastructure from "../src/Component/UniversityInfrastructure";
import IQTest from "./Pages/IQTest";
import ClassForm from "./Pages/RegisterClass/ClassForm.jsx";
import ClassVendorDashboard from "./Pages/ClassVendorDashboard.jsx";
import Cookies from "js-cookie";
import ManageClass from "./Pages/ManageClass.jsx";
import { useNavigate } from "react-router-dom";
import VendorLayout from "./Pages/VendorLayout.jsx";
import ClassTableDetails from "./Pages/ClassTableDetails.jsx";

const queryClient = new QueryClient();
// const role = Cookies.get("role");
// const subrole = Cookies.get("subrole");

function App() {
  const role = Cookies.get("role");
  const subrole = Cookies.get("subrole");
  const token = Cookies.get("token"); // Check if user is logged in

  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Login />} />

            {/* ✅ Only show Admin pages if logged in as Admin */}
            {/* {role === "ADMIN" && ( */}
              <>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="colleges" element={<CollegeTableDetails />} />
                <Route
                  path="university-details"
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
                <Route path="add-college" element={<MultiStepForm />} />
                {/* <Route path="add-class" element={<ClassForm/>}/> */}
                {/* <Route path="iq-test" element={<IQTest />} /> */}
                <Route path="/class-list" element={<ClassTableDetails />} />;
                <Route path="/iq-test" element={<IQTest />} />
                <Route path="/tests/:category" element={<TableList />} />
                <Route path="/view-excel/:testId" element={<ViewExcelPage />} />
                <Route path="/add-test/:category" element={<AddTest />} />{" "}
                {/* ✅ New Route */}
                <Route path="reports" element={<ReportandAnalytics />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route
                  path="colleges/courses/:collegeId"
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
                <Route path="collegeCourses" element={<CollegeCourses />} />
                <Route
                  path="/edit-college/:id"
                  element={<EditCollegeDetails />}
                />
                <Route path="university" element={<AddUniversity />} />
                <Route
                  path="/edit-university/:id"
                  element={<EditUniversity />}
                />
              </>
             {/* )}  */}

            

            {/* ✅ Vendor-Class Routes (Only if Authorized) */}
            {role === "VENDOR" && subrole === "Class" ? (
              <Route path="/vendor-class" element={<VendorLayout />}>
                <Route index element={<ClassVendorDashboard />} />
                <Route
                  path="class-dashboard"
                  element={<ClassVendorDashboard />}
                />
                <Route path="edit-vendor-class" element={<ManageClass />} />
              </Route>
            ) : null}

            {/* ❌ Redirect Unauthorized Users */}
            {/* <Route
              path="/vendor-class/*"
              element={<Navigate to="/" replace />}
            /> */}

            {/* ❌ Redirect Unknown Routes to Vendor Dashboard */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
          {/* ✅ Class Registration Route */}
          <Route path="/register-class" element={<ClassForm />} />

        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;

// import React from "react";
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import Cookies from "js-cookie";

// // ✅ Import Components
// import Root from "./Component/Root";
// import Login from "./Pages/Login";
// import AdminDashboard from "./Pages/AdminDashboard";
// import CollegeTableDetails from "./Pages/CollegeTableDetails";
// import MultiStepForm from "./Pages/AddNewCollege";
// import ReportandAnalytics from "./Pages/ReportandAnalytics";
// import ProfilePage from "./Pages/ProfilePage";
// import CollegeCourses from "./Courses/CollegeCourses";
// import EditCollegeDetails from "./Component/EditCollegeDetails";
// import AddUniversity from "./University/AddUniversity";
// import EditUniversity from "./University/EditUniversity";
// import UniversityTableDetails from "./Pages/UniversityTableDetails";
// import UniversityPlacement from "./Component/UniversityPlacement";
// import UniversityInfrastructure from "./Component/UniversityInfrastructure";
// import Infrastructure from "./Component/Infrastructure";
// import Placement from "./Component/Placement";

// import IQTest from "./Pages/IQTest";
// import TableList from "./Component/IQTestPage/TableList";
// import AddTest from "./Component/IQTestPage/AddTest";
// import ViewExcelPage from "./Component/IQTestPage/ViewExcelPage";

// import ClassForm from "./Pages/RegisterClass/ClassForm";
// import VendorLayout from "./Pages/VendorLayout";
// import ClassVendorDashboard from "./Pages/ClassVendorDashboard";
// import ManageClass from "./Pages/ManageClass";

// const queryClient = new QueryClient();

// function App() {
//   const role = Cookies.get("role");
//   const subrole = Cookies.get("subrole");
//   const token = Cookies.get("token"); // ✅ Check if user is logged in

//   return (
//     <QueryClientProvider client={queryClient}>
//       <Router>
//         <Routes>
//           {/* ✅ If NOT logged in, show LOGIN page at '/' */}
//           {/* {!token ? (
//             <>
//               <Route path="/" element={<Login />} />
//               <Route path="*" element={<Navigate to="/" replace />} />
//             </>
//           ) : ( */}
//             <>
//               {/* ✅ Once logged in, Redirect '/' to Dashboard */}
//               {/* <Route path="/" element={<Navigate to="/dashboard" replace />} /> */}

//               {/* ✅ PROTECTED ROUTES (Require Login) */}
//               <Route path="/" element={<Root />}>
//                 <Route path="dashboard" element={<AdminDashboard />} />
//                 <Route path="colleges" element={<CollegeTableDetails />} />
//                 <Route path="add-college" element={<MultiStepForm />} />
//                 <Route path="reports" element={<ReportandAnalytics />} />
//                 <Route path="profile" element={<ProfilePage />} />
//                 <Route path="colleges/courses/:collegeId" element={<CollegeCourses />} />
//                 <Route path="edit-college/:id" element={<EditCollegeDetails />} />
//                 <Route path="university" element={<AddUniversity />} />
//                 <Route path="edit-university/:id" element={<EditUniversity />} />
//                 <Route path="university-details" element={<UniversityTableDetails />} />
//                 <Route path="university/placement/:universityId" element={<UniversityPlacement />} />
//                 <Route path="university/infrastructure/:universityId" element={<UniversityInfrastructure />} />
//                 <Route path="colleges/infrastructure/:collegeId" element={<Infrastructure />} />
//                 <Route path="colleges/placement/:collegeId" element={<Placement />} />
//                 <Route path="/iq-test" element={<IQTest />} />
//                 <Route path="/tests/:category" element={<TableList />} />
//                 <Route path="/view-excel/:testId" element={<ViewExcelPage />} />
//                 <Route path="/add-test/:category" element={<AddTest />} />
//               </Route>

//               {/* ✅ CLASS REGISTRATION (Public Route) */}
//               <Route path="/register-class" element={<ClassForm />} />

//               {/* ✅ VENDOR-CLASS ROUTES (Only if Authorized) */}
//               {role === "VENDOR" && subrole === "Class"  (
//                 <Route path="/vendor-class" element={<VendorLayout />}>
//                   <Route index element={<ClassVendorDashboard />} />
//                   <Route path="class-dashboard" element={<ClassVendorDashboard />} />
//                   <Route path="edit-vendor-class" element={<ManageClass />} />
//                 </Route>
//               // ) : (
//               //   <Route path="/vendor-class/*" element={<Navigate to="/dashboard" replace />} />
//               // )
// )}

//               {/* ❌ Redirect Unknown Routes to Dashboard */}
//               {/* <Route path="*" element={<Navigate to="/dashboard" replace />} /> */}
//             </>
//            {/* )}  */}
//         </Routes>
//       </Router>
//     </QueryClientProvider>
//   );
// }

// export default App;
