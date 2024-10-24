import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = ({ setIsAuthenticated }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();  // Hook to programmatically navigate

  // Fetch current user
  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/users/current-user', {
          withCredentials: true, // To include cookies in the request
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
        withCredentials: true, // To include cookies in the request
      });
      
      // Set authentication state to false and redirect to login
      setIsAuthenticated(false);
      navigate('/login');  // Redirect to login after successful logout
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to logout');
    }
  };

  return (
    <div className="min-h-screen flex flex-col dark:bg-gray-900 dark:text-white">
      <header className="bg-gray-800 text-white p-4 flex justify-between">
        <h1 className="text-lg">Home</h1>
        {user && (
          <div className="flex items-center">
            <span className="mr-4">{user.username}</span>
            <button 
              className="bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </header>

      <div className="flex flex-grow">
        {/* Left Side - User's Full Name */}
        <aside className="w-1/4 bg-gray-700 p-4">
          {user ? (
            <div>
              <h2 className="text-2xl font-semibold">Welcome, {user.fullName}</h2>
            </div>
          ) : (
            <p>Loading user information...</p>
          )}
        </aside>

        {/* Main Content - Messages or Error */}
        <main className="flex-grow p-6">
          {error && (
            <div className="bg-red-500 text-white p-4 rounded mb-4">
              {error}
            </div>
          )}

          {/* Main content goes here */}
          <div className="text-center">
            <p>{user ? 'You are logged in!' : 'Please log in to continue.'}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default HomePage;
