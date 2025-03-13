

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; 
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

// Importing the new components
import Infrastructure from "../src/Component/Infrastructure"; 
import Placement from "../src/Component/Placement"; 
import UniversityInfrastructure from "../src/Component/UniversityInfrastructure"
import IQTest from "./Pages/IQTest";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<Login />} /> 
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="colleges" element={<CollegeTableDetails />} />
            <Route path="university-details" element={<UniversityTableDetails />} />
            <Route path="/university/placement/:universityId" element={<UniversityPlacement />} />
            <Route path="/university/infrastructure/:universityId" element={<UniversityInfrastructure />} />
            <Route path="add-college" element={<MultiStepForm />} />
            <Route path="iq-test" element={<IQTest />} />
            <Route path="reports" element={<ReportandAnalytics />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="colleges/courses/:collegeId" element={<CollegeCourses />} />
            <Route path="/colleges/infrastructure/:collegeId" element={<Infrastructure />} />
            <Route path="/colleges/placement/:collegeId" element={<Placement />} />
            <Route path="collegeCourses" element={<CollegeCourses />} />
            <Route path="/edit-college/:id" element={<EditCollegeDetails />} />
            <Route path="university" element={<AddUniversity />} />
            <Route path="/edit-university/:id" element={<EditUniversity />} />
          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
