import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


const Login = () => {
  const [formData, setFormData] = useState({
    identifier: '',  // Can be either email or username
    password: ''
  });
  const [error, setError] = useState('');
  const [serverError, setServerError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();


  // Handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Validate form
  const validateForm = () => {
    const { identifier, password } = formData;
    if (!identifier || !password) {
      setError('Username or Email and Password are required.');
      return false;
    }
    setError('');
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    setServerError('');

    try {
      const response = await axios.post('http://localhost:3000/api/v1/users/login', {
        email: formData.identifier, // assuming your backend supports email/username
        username: formData.identifier,
        password: formData.password
      },
      {    
        withCredentials: true  // This ensures cookies (like accessToken, refreshToken) are handled properly 
      }
    );
      console.log('User logged in successfully:', response.data);
      window.location.reload();
      navigate('/home');
      // Handle successful login, redirect, or store token
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred during login';
      setServerError(errorMessage);  // Ensure it's a string message
    }
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 dark:bg-gray-900">
      <div className="max-w-md w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">Login</h2>
        <form onSubmit={handleSubmit}>
          {/* Email or Username */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Username or Email</label>
            <input
              type="text"
              name="identifier"
              value={formData.identifier}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200"
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 mb-4">{error}</p>}
          {serverError && <p className="text-red-500 mb-4">{serverError}</p>}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Redirect to Register */}
        <div className="mt-4 text-center">
          <p className="text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <Link to="/" className="text-blue-500 hover:underline">
              Register
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
