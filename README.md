# ClearPath

## Overview

ClearPath is a web-based platform that allows users to report locations where police are checking for speeding or conducting regular check-ups. The application provides users with an interactive map to view reports and contributes to community awareness.

## Features

- User authentication (registration, login, logout)
- Interactive map displaying reported locations
- Clickable markers that show descriptions of reports
- User-friendly interface with dark theme support
- Responsive design for mobile and desktop use

## Technologies Used

### Frontend
- React
- React Router
- Axios
- Tailwind CSS
- Material Tailwind
- React Leaflet

### Backend
- Node.js
- Express
- MongoDB

### Additional Tools
- CORS
- JWT for authentication

## Installation

### Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (latest LTS version)
- npm (Node Package Manager)
- MongoDB

### Getting Started

1. Clone the repository
```bash
git clone https://github.com/yourusername/ClearPath.git
cd ClearPath
```

2. Server Setup
```bash
# Navigate to server directory
cd server

# Install dependencies
npm install

# Create .env file and add your environment variables
MONGO_URL = your_mongodb_connection_string 
DB_NAME = your_mongodb_name
PORT = your_port
CORS_ORIGIN = your_frontend_url
ACCESS_TOKEN_SECRET = your_access_token_secret
ACCESS_TOKEN_EXPIRY = your_access_token_expiry
REFRESH_TOKEN_SECRET = your_refresh_token_secret
REFRESH_TOKEN_EXPIRY = your_refreshs_token_expiry


# Start the server
npm run dev
```

3. Client Setup
```bash
# Navigate to client directory
cd client

# Install dependencies
npm install

# Start the client application
npm run dev
```
