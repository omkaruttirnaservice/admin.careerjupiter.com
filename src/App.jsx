import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import SideMenu from './Pages/SideMenu';
import Login from './Pages/Login';
import TableDetails from './Pages/TableDetails';
import MultiStepForm from './Pages/AddNewCollege';
import UploadExcel from './Pages/UploadExcel';
import ReportandAnalytics from './Pages/ReportandAnalytics';
import AdminDashboard from './Pages/AdminDashboard';
import ProfilePage from './Pages/ProfilePage';
import CourseForm from './Courses/CollegeCourses';

// Create a QueryClient instance and provide it to your application
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="flex">
        <SideMenu />
        <div className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<AdminDashboard />} />
            <Route path="/colleges" element={<TableDetails />} />
            <Route path="/add-college" element={<MultiStepForm />} />
            <Route path="/upload-excel" element={<UploadExcel />} />
            <Route path="/reports" element={<ReportandAnalytics />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path='/collegeCourses/:id' element={<CourseForm />} />
          </Routes>
        </div>
      </div>
    </QueryClientProvider>
  );
}

export default App;
