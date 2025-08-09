import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages directly
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GoalsPage from './pages/GoalPage'; 
import ChecklistsPage from './pages/ChecklistsPage';
import LandingPage from './pages/LandingPage';

// Import components directly
import ProtectedRoute from './components/ProtectedRoute'; // FIX 2: Direct imports
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* Parent Protected Route */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Child Protected Routes */}
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="goals" element={<GoalsPage />} />
        <Route path="checklists" element={<ChecklistsPage />} />
      </Route>
    </Routes>
  );
}

export default App;