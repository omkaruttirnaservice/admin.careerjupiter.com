import React, { useEffect, useState } from 'react';
import { FaBook } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL } from '../constant/constantBaseUrl';
import { getCookie } from '../utlis/cookieHelper';
// import { getCookie } from '../utils/cookieUtils'; // Make sure this util exists or use a helper directly

const CollegeTestPage = () => {
  const [collegeID, setCollegeID] = useState(null);
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // 1. Get college ID from cookie on mount
  useEffect(() => {
    const id = getCookie('collegeID');
    if (id) {
      setCollegeID(id);
    } else {
      console.warn('College ID not found in cookies!');
      setLoading(false);
    }
  }, []);

  // 2. Fetch tests when college ID is available
  useEffect(() => {
    if (!collegeID) return;

    const fetchTests = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/api/college/test/${collegeID}`);
        const filtered = res.data?.data?.tests?.filter((test) => test?.title) || [];
        setTests(filtered);
      } catch (err) {
        console.error(err);
        setError('Failed to fetch tests. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [collegeID]);

  if (loading) {
    return <p className="text-center mt-8 text-blue-600 font-semibold">Loading tests...</p>;
  }

  if (error) {
    return <p className="text-center mt-8 text-red-600 font-semibold">{error}</p>;
  }

  return (
    <div className="max-w-7xl mx-auto h-screen">
      {tests?.length > 0 ? (
        <div className="bg-gray-50 rounded-xl shadow-md h-full flex flex-col">
          {/* Sticky Header */}
          <div className="sticky top-0 bg-gray-50 z-10 border-b px-6 py-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FaBook className="text-blue-600 text-2xl" />
                <h2 className="text-2xl font-bold text-blue-800">Assigned Tests</h2>
              </div>
              <p className="text-blue-700 font-bold text-lg">
                {tests.length} {tests.length === 1 ? 'Test' : 'Tests'}
              </p>
            </div>
          </div>

          {/* Scrollable Cards Section */}
          <div className="overflow-y-auto px-6 py-4 flex-1">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
              {tests.map((test, idx) => {
                const studentCount = test?.collegeWiseTestStats?.length || 0;

                return (
                  <div
                    key={test._id || idx}
                    onClick={() => navigate(`/vendor-college/test/${test._id}`, { state: { test } })}
                    className="relative bg-gradient-to-br from-blue-50 to-purple-100 rounded-xl border-2 border-blue-200 p-4 shadow hover:shadow-md transition cursor-pointer"
                  >
                    <h3 className="text-lg font-semibold text-blue-800 mb-2 truncate">{test.title}</h3>

                    {test.testDuration && (
                      <p className="text-sm text-gray-600 mb-2">
                        Duration: {test.testDuration.minutes} min {test.testDuration.seconds || 0} sec
                      </p>
                    )}

                    {test.main_category && (
                      <p className="text-xs text-gray-500">Category: {test.main_category}</p>
                    )}

                    {/* Student Count Tooltip */}
                    <div title={`Student Count: ${studentCount}`} className="absolute top-3 right-3">
                      <div className="flex items-center justify-center bg-blue-600 text-white text-sm font-bold rounded-full w-8 h-8">
                        {studentCount}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center mt-8 text-gray-600">No tests assigned to this college.</p>
      )}
    </div>
  );
};

export default CollegeTestPage;
