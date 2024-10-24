import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import HomePage from './components/HomePage';
import axios from 'axios';
import Register from './components/Register';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/users/current-user', {
          withCredentials: true,
        });
        if (response.data.user) {
          setIsAuthenticated(true); // User is authenticated
        }
      } catch (err) {
        setIsAuthenticated(false); // User is not authenticated
      }
    };

    checkAuth();
  }, []);

  return (
    <Router>
      <Routes>
      <Route
          path="/"
          element={<Register/>}
         />
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/home" /> : <Login setIsAuthenticated={setIsAuthenticated} />}
         />
        <Route
          path="/home"
          element={isAuthenticated ? <HomePage setIsAuthenticated={setIsAuthenticated} /> : <Navigate to="/" />}
        />
      </Routes>
    </Router>
  );
};

export default App;
