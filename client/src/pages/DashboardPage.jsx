import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

const DashboardPage = () => {
  const { logout } = useContext(AuthContext);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to your Dashboard!</h1>
        <p className="mb-6">You are successfully logged in.</p>
        <button
          onClick={logout}
          className="px-6 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default DashboardPage;