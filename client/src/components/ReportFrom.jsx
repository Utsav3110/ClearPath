import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Map from './Map';

const ReportForm = ({ onSubmitSuccess }) => {
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState({ lat: null, lng: null });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handler for map click to set location
  const handleMapClick = (lat, lng) => {
    setLocation({ lat, lng });
  };

  // Handler for form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.lat || !location.lng) {
      setError('Please select a location on the map.');
      setSuccess('');
      return;
    }
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/v1/users/report',
        {
          description,
          location: {
            type: 'Point',
            coordinates: [location.lng, location.lat],
          },
        },
        { withCredentials: true }
      );

      setSuccess("Your Report was created successfully. This page will reload in 5 seconds.");
      setTimeout(() => {
        window.location.reload();
      }, 5000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit report.');
      setSuccess('');
    } finally {
      setLoading(false);
    }
  };

  // Navigate to home page
  const navigateToHome = () => {
    navigate('/home');
  };

  return (
    <div className="dark:bg-gray-900 dark:text-white min-h-screen p-6">
      <h2 className="text-2xl font-semibold mb-4">Report Incident</h2>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Map Section */}
        <div className="flex-grow h-96 lg:h-[70vh] rounded-lg overflow-hidden">
          <Map onMapClick={handleMapClick} />
        </div>

        {/* Form Section */}
        <form
          onSubmit={handleSubmit}
          className="lg:w-1/3 p-4 bg-gray-800 rounded-lg dark:bg-gray-800 flex flex-col space-y-4"
        >
          <label className="text-sm">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            maxLength={250}
            className="p-2 rounded bg-gray-700 text-white"
            placeholder="Describe the incident..."
          />

          <div className="text-sm">
            <p>Latitude: {location.lat || 'Not selected'}</p>
            <p>Longitude: {location.lng || 'Not selected'}</p>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          {success && <p className="text-green-500 text-sm">{success}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 rounded disabled:bg-gray-600"
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>

          {/* Button to navigate to home */}
          <button
            type="button"
            onClick={navigateToHome}
            className="mt-4 bg-gray-600 hover:bg-gray-700 text-white py-2 rounded"
          >
            Go to Home
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReportForm;
