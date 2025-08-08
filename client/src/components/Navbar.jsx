import React, { useContext } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { LogOut, UserCircle } from 'lucide-react';

const Navbar = () => {
    const { user, logout } = useContext(AuthContext);

    return (
        <div className="navbar bg-base-100 border-b border-base-300 px-4">
            <div className="navbar-start">
                <Link to="/app/dashboard" className="btn btn-ghost text-xl">PrepStack</Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    <li><NavLink to="/dashboard">Dashboard</NavLink></li>
                    <li><NavLink to="/goals">Goals</NavLink></li>
                    <li><NavLink to="/checklists">Checklists</NavLink></li>
                </ul>
            </div>
            <div className="navbar-end">
                <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 rounded-full">
                            {/* Placeholder for a user avatar */}
                            <UserCircle size={40} />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        <li className="p-2">
                            <span className="font-semibold">{user?.name}</span>
                            <span className="text-xs text-base-content/60">{user?.email}</span>
                        </li>
                        <li>
                            <a onClick={logout}>
                                <LogOut size={16} />
                                Logout
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;