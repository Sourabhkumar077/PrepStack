import React, { useState, useEffect, useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { AuthContext } from '../contexts/AuthContext';
import { 
  CheckSquare, 
  LogOut,
  UserCircle,
  Menu, // Hamburger icon
  X // Close icon
} from 'lucide-react';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  
  // State for mobile menu
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

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

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6">
          {user && (
            <>
              <NavLink to="/dashboard" className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}>
                Dashboard
              </NavLink>
              <NavLink to="/dsa-prep" className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}>
                DSA Prep
              </NavLink>
              <NavLink to="/goals" className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}>
                Goals
              </NavLink>
              <NavLink to="/checklists" className={({ isActive }) => `font-semibold transition-colors ${isActive ? 'text-cyan-400' : 'text-gray-300 hover:text-white'}`}>
                Checklists
              </NavLink>
            </>
          )}
        </div>

        {/* Desktop Action Buttons */}
        <div className="hidden md:flex items-center">
          {user ? (
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
                <li><a onClick={handleLogout} className="text-red-400 hover:bg-red-500/20"><LogOut size={16} />Logout</a></li>
              </ul>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link to="/login" className="text-gray-300 font-semibold hover:text-white transition-colors">Sign In</Link>
              <Link to="/login">
                <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="px-5 py-2 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-semibold shadow-lg hover:shadow-cyan-500/25 transition-shadow">
                  Get Started
                </motion.button>
              </Link>
            </div>
          )}
        </div>
        
        {/* --- HAMBURGER MENU BUTTON --- */}
        <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-white">
                {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
        </div>
      </nav>

      {/* --- MOBILE MENU --- */}
      {isMenuOpen && (
        <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden absolute top-full left-0 w-full bg-slate-900/95 backdrop-blur-md pb-6 px-4"
        >
          <ul className="flex flex-col items-center gap-4">
            {user ? (
                <>
                    <li><NavLink to="/dashboard" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-semibold text-lg ${isActive ? 'text-cyan-400' : 'text-gray-300'}`}>Dashboard</NavLink></li>
                    <li><NavLink to="/dsa-prep" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-semibold text-lg ${isActive ? 'text-cyan-400' : 'text-gray-300'}`}>DSA Prep</NavLink></li>
                    <li><NavLink to="/goals" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-semibold text-lg ${isActive ? 'text-cyan-400' : 'text-gray-300'}`}>Goals</NavLink></li>
                    <li><NavLink to="/checklists" onClick={() => setIsMenuOpen(false)} className={({ isActive }) => `font-semibold text-lg ${isActive ? 'text-cyan-400' : 'text-gray-300'}`}>Checklists</NavLink></li>
                    <li><a onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-red-400 font-semibold text-lg">Logout</a></li>
                </>
            ) : (
                <>
                    <li><Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-gray-300 font-semibold text-lg">Sign In</Link></li>
                    <li>
                        <Link to="/login" onClick={() => setIsMenuOpen(false)}>
                            <button className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-purple-600 rounded-lg text-white font-semibold">Get Started</button>
                        </Link>
                    </li>
                </>
            )}
          </ul>
        </motion.div>
      )}
    </header>
  );
};

export default Navbar;