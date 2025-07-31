import { Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';

import './App.css'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<LoginPage />} />
      {/* We'll add a /register route that also uses LoginPage or a new page */}
    </Routes>
    </>
  )
}

export default App
