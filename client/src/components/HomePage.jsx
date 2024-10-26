import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Map from './Map';
import ReportsMap from './ReportsMap';

const HomePage = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/users/current-user', {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to fetch user data');
      }
    };

    fetchCurrentUser();
  }, []);

  // Handle logout
  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:3000/api/v1/users/logout', {}, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      navigate('/login');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to logout');
    }
  };

  // Navigate to report page
  const navigateToReport = () => {
    navigate('/report');
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      {/* Header */}
      <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h1 className="text-lg">Home</h1>
        {user && (
          <div className="flex items-center">
            <span className="mr-4 font-semibold">{user.username}</span>
            <button
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded mr-2"
              onClick={handleLogout}
            >
              Logout
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
              onClick={navigateToReport}
            >
              Go to Report
            </button>
          </div>
        )}
      </header>

      {/* Main Content */}
      <div className="flex flex-grow">
        {/* Sidebar - User's Full Name */}
        <aside className="w-1/4 bg-gray-700 p-4 hidden lg:block">
          {user ? (
            <div>
              <h2 className="text-2xl font-semibold">Welcome, {user.fullName}</h2>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </aside>

        {/* Main Content - Map and Messages */}
        <main className="flex-grow p-4 lg:p-6 bg-gray-100 dark:bg-gray-800">
          {error && (
            <div className="bg-red-500 text-white p-4 rounded mb-4">
              {error}
            </div>
          )}

          {/* Map Component */}
          <div className="flex flex-col items-center justify-center h-full">
            <p className="mb-4">{user ? `You are logged as ${user.username}` : 'Please log in to continue.'}</p>

            {/* Map Container */}
            <div className="w-full h-96 md:h-full lg:h-[80vh] bg-gray-300 dark:bg-gray-700 rounded-lg overflow-hidden">
              {/* <Map /> */}
              <ReportsMap />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
