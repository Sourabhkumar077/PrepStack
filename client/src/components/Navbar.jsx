import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';
import { 
  CheckSquare, 
  LogOut,
  UserCircle
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State to track if the user has scrolled
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Set state to true if user has scrolled more than 10px, else false
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Add scroll event listener when the component mounts
    window.addEventListener('scroll', handleScroll);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  // Conditionally set the navbar style based on scroll state
  const navbarClasses = `
    sticky top-0 z-50 transition-all duration-300
    ${isScrolled ? 'bg-slate-900/80 backdrop-blur-md border-b border-cyan-500/20' : 'bg-transparent border-b border-transparent'}
  `;

  return (
    <header className={navbarClasses}>
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <CheckSquare className="h-8 w-8 text-cyan-400" />
          <span className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-100 to-white bg-clip-text text-transparent">
            PrepStack
          </span>
        </Link>

        {/* Navigation Links - Show for logged-in users */}
        {user && (
          <div className="hidden md:flex items-center gap-6">
            <NavLink to="/dashboard" className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}>
              Dashboard
            </NavLink>
            <NavLink to="/goals" className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}>
              Goals
            </NavLink>
            <NavLink to="/checklists" className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}>
              Checklists
            </NavLink>
          </div>
        )}

        {/* Action Buttons */}
        <div>
          {user ? (
            // User Dropdown for logged-in users
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring-2 ring-cyan-500/50">
                   <UserCircle className="text-gray-300" size={40}/>
                </div>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-slate-800 border border-cyan-500/20 rounded-box w-52">
                <li className="p-2">
                    <span className="font-semibold text-white">{user.name}</span>
                    <span className="text-xs text-gray-400">{user.email}</span>
                </li>
                <li>
                    <a onClick={handleLogout} className="text-red-400 hover:bg-red-500/20">
                        <LogOut size={16} />
                        Logout
                    </a>
                </li>
              </ul>
            </div>
          ) : (
            // Buttons for logged-out users
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-300 font-semibold hover:text-white transition-colors">
                Sign In
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-shadow"
                >
                  Get Started
                </motion.button>
              </Link>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;