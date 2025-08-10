import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import pages and components
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GoalsPage from './pages/GoalPage'; 
import ChecklistsPage from './pages/ChecklistsPage';
import LandingPage from './pages/LandingPage';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      {/* These routes are completely separate and do not use the main Layout */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* --- Protected Routes --- */}
      {/* This is the wrapper for all protected pages. It uses the Layout. */}
      <Route 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/goals" element={<GoalsPage />} />
        <Route path="/checklists" element={<ChecklistsPage />} />
      </Route>
    </Routes>
  );
}

export default App;