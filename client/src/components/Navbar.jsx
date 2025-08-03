import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const Navbar = () => {
    const { logout } = useContext(AuthContext);
    const linkStyles = "text-lg font-semibold text-gray-700 hover:text-blue-600";
    const activeLinkStyles = { color: '#2563EB' };

    return (
        <nav className="bg-white shadow-md p-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-600">PrepStack</h1>
            <div className="flex gap-8">
                <NavLink to="/dashboard" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>Dashboard</NavLink>
                <NavLink to="/goals" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>Goals</NavLink>
                <NavLink to="/checklists" style={({ isActive }) => isActive ? activeLinkStyles : undefined} className={linkStyles}>Checklists</NavLink>

            </div>
            <button onClick={logout} className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
                Logout
            </button>
        </nav>
    );
};

export default Navbar;