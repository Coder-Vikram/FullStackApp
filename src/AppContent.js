import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import SignInPage from './Pages/SignInPage';
import SignUpPage from './Pages/SignUpPage';
import ChatPage from './Pages/ChatPage';
import Navbar from './Components/Navbar';
import ProtectedRoute from './Services/ProtectedRoute';

function AppContent() {
    const location = useLocation();
    const showNavbar = location.pathname !== '/ChatPage';
  
    return (
      <div>
        {showNavbar && <Navbar />}
        <Routes>
          <Route path="/SignInPage" element={<SignInPage />} />
          <Route path="/SignUpPage" element={<SignUpPage />} />
          <Route path="/ChatPage" element={ <ProtectedRoute> <ChatPage /> </ProtectedRoute>}/>
  
          <Route path="/" element={<Navigate replace to="/SignInPage" />} />
        </Routes>
      </div>
    );
  }

export default AppContent;