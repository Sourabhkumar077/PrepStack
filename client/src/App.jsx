import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

// Import pages directly
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import GoalsPage from './pages/GoalPage'; // FIX 1: Corrected filename from 'GoalPage'
import ChecklistsPage from './pages/ChecklistsPage';

// Import components directly
import ProtectedRoute from './components/ProtectedRoute'; // FIX 2: Direct imports
import Layout from './components/Layout';

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route path="/login" element={<LoginPage />} />

      {/* Parent Protected Route with Layout */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        {/* Child Protected Routes */}
        <Route index element={<Navigate to="/dashboard" />} /> {/* FIX 3: Use 'index' for default route */}
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="goals" element={<GoalsPage />} />
        <Route path="checklists" element={<ChecklistsPage />} />
      </Route>
    </Routes>
  );
}

export default App;