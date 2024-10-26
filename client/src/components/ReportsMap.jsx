import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

const ReportsMap = () => {
  const [reports, setReports] = useState([]);
  
  // Function to fetch user details based on user ID
  const fetchUser = async (userId) => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/getUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: userId }), // Sending user ID
      });
      const data = await response.json();
      return data.user; // Return user details
    } catch (error) {
      console.error('Error fetching user:', error);
      return null; // Return null if there's an error
    }
  };

  // Fetch reports from the backend
  const fetchReports = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/v1/users/all-Report');
      const data = await response.json();
      const reportsWithUsernames = await Promise.all(data.reports.map(async (report) => {
        const user = await fetchUser(report.reportedBy); // Fetch user details for each report
        return { ...report, username: user ? user.username : 'Unknown' }; // Add username to report
      }));
      setReports(reportsWithUsernames); // Set updated reports
    } catch (error) {
      console.error('Error fetching reports:', error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <MapContainer
      center={[22.3039,70.8022 ]} // Center the map (Tokyo coordinates)
      zoom={13}
      style={{ height: '100vh', width: '100%' }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {reports.map((report) => (
        <Marker
          key={report._id}
          position={[report.location.coordinates[1], report.location.coordinates[0]]} // Latitude and Longitude
        >
          <Popup>
            <div>
              <h3>Report Description:</h3>
              <p>{report.description}</p>
              <p>Reported By: {report.username}</p> {/* Display username */}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ReportsMap;
