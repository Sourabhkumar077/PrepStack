import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar'; // Adjust path if needed

const Layout = () => {
  return (
    <div className="min-h-screen bg-slate-800">
      <Navbar /> 
      <main className="p-8">
        <div className="container mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Layout;