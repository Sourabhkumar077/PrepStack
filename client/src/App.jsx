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
import DSAPage from './pages/DSAPage';

function App() {
  return (
    <Routes>
      {/* --- Public Routes --- */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />

      {/* --- Protected Routes (Under /app) --- */}
      <Route 
        path="/app" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="dsa-prep" element={<DSAPage />} />
        <Route path="goals" element={<GoalsPage />} />
        <Route path="checklists" element={<ChecklistsPage />} />
      </Route>
    </Routes>
  );
}

export default App;