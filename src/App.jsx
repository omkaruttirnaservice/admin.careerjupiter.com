import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'; // Import React Router
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // Import React Query
import Root from './Component/Root'; // Import Root component
import Login from './Pages/Login'; // Import Login page
import TableDetails from './Pages/TableDetails'; // Import TableDetails page
import MultiStepForm from './Pages/AddNewCollege';
import UploadExcel from './Pages/UploadExcel'; // Import UploadExcel page
import ReportandAnalytics from './Pages/ReportandAnalytics'; // Import ReportandAnalytics page
import AdminDashboard from './Pages/AdminDashboard'; // Import AdminDashboard page
import ProfilePage from './Pages/ProfilePage'; // Import ProfilePage
import CollegeCourses from './Courses/CollegeCourses'; // Import CollegeCourses page
import EditCollege from './Pages/EditCollege';


const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}> {/* Provide React Query context */}
      <Router>
        <Routes>
          {/* Define the Root route and nested routes */}
          <Route path="/" element={<Root />} >
            <Route index element={<Login />} /> {/* Default route */}
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="colleges" element={<TableDetails />} />
            <Route path="add-college" element={<MultiStepForm />} />
            <Route path="upload-excel" element={<UploadExcel />} />
            <Route path="reports" element={<ReportandAnalytics />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="collegeCourses" element={<CollegeCourses />} />
            <Route path="/edit-college/:id" element={<EditCollege />} />

            

          </Route>
        </Routes>
      </Router>
    </QueryClientProvider>
  );
}

export default App;


