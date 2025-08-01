import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AuthContext } from '../contexts/AuthContext.jsx';

const AuthForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);

  const navigate = useNavigate(); // Hook for navigation
  const { login } = useContext(AuthContext); // Get login

  const handleSubmit = async () => {
    if (!isLogin) {
      // --- Register Logic (Already working) ---
      try {
        const res = await axios.post('/api/auth/login', { email, password });
        login(res.data.token); // Use context's login function
        navigate('/dashboard'); // Navigate to dashboard after login
      } catch (err) {
        console.error('Login error:', err.response.data);
        alert('Error: ' + err.response.data.msg);
      }
    } else {
      // --- Login Logic (We are testing this now) ---
      if (!email || !password) {
        return alert('Please fill email and password');
      }
      try {
        const res = await axios.post('/api/auth/register', { name, email, password });
        login(res.data.token); // Use context's login function
        navigate('/dashboard'); // Navigate to dashboard after register
      } catch (err) {
        console.error('Login error:', err.response.data);
        alert('Error: ' + err.response.data.msg);
      }
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Toggle UI */}
      <div className="flex justify-center bg-gray-200 rounded-lg p-1">
        <button onClick={() => setIsLogin(true)} className={`w-1/2 p-2 rounded-lg font-semibold ${isLogin ? 'bg-white shadow' : ''}`}>Login</button>
        <button onClick={() => setIsLogin(false)} className={`w-1/2 p-2 rounded-lg font-semibold ${!isLogin ? 'bg-white shadow' : ''}`}>Register</button>
      </div>

      <h3 className="text-center text-2xl font-bold mt-4">{isLogin ? 'Login to your account' : 'Create a new account'}</h3>

      {!isLogin && (
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      )}

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="flex justify-around mt-2">
        <button
          onClick={handleSubmit}
          className="w-full px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </div>
    </div>
  );
};

export default AuthForm;