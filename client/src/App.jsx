// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ExternalNewsPage from './pages/ExternalNews';
import UniversityNewsPage from './pages/UniversityNews';
import AboutPage from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import EventsPage from './pages/Events';
import VerifyOTP from './pages/VerifyEmail';
import { AuthProvider } from './context/AuthContext';
import './App.css';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for react-toastify

function App() {
  return (
    <Router>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/externalNews" element={<ExternalNewsPage />} />
          <Route path="/universityNews" element={<UniversityNewsPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/verifyOTP" element={<VerifyOTP />} />
        </Routes>
        <ToastContainer
                  position="top-right"
                  autoClose={3000}
                  hideProgressBar={true} // No progress bar
                  closeOnClick
                  pauseOnHover
                  draggable          
        /> {/* Add ToastContainer here */}
      </AuthProvider>
    </Router>
  );
}

export default App;
