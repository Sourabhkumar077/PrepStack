import React, { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

// Import static components
import LoginPage from './pages/LoginPage';
import LandingPage from './pages/LandingPage';
import { ProtectedRoute, Layout } from './components';

// Lazily import pages that are behind the login wall
const DashboardPage = lazy(() => import('./pages/DashboardPage'));
const DSAPage = lazy(() => import('./pages/DSAPage'));
const GoalsPage = lazy(() => import('./pages/GoalPage'));
const ChecklistsPage = lazy(() => import('./pages/ChecklistsPage'));

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
        {/* Use Suspense to show a fallback while pages are loading */}
        <Route path="dashboard" element={<Suspense fallback={<div>Loading...</div>}><DashboardPage /></Suspense>} />
        <Route path="dsa-prep" element={<Suspense fallback={<div>Loading...</div>}><DSAPage /></Suspense>} />
        <Route path="goals" element={<Suspense fallback={<div>Loading...</div>}><GoalsPage /></Suspense>} />
        <Route path="checklists" element={<Suspense fallback={<div>Loading...</div>}><ChecklistsPage /></Suspense>} />
      </Route>
    </Routes>
  );
}

export default App;