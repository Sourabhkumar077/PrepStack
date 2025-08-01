import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const AuthForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLogin, setIsLogin] = useState(true);
  
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  // Function to clear all input fields
  const clearForm = () => {
    setName('');
    setEmail('');
    setPassword('');
  };

  // Handlers for toggling and clearing the form
  const switchToLogin = () => {
    setIsLogin(true);
    clearForm();
  };

  const switchToRegister = () => {
    setIsLogin(false);
    clearForm();
  };

  const handleSubmit = async () => {
    // This is the Register logic
    if (!isLogin) {
      if (!name || !email || !password) return alert('Please fill all fields');
      try {
        const res = await axios.post('/api/auth/register', { name, email, password });
        login(res.data.token);
        navigate('/dashboard');
      } catch (err) {
        alert('Error: ' + err.response.data.msg);
      }
    } 
    // This is the Login logic
    else {
      if (!email || !password) return alert('Please fill email and password');
      try {
        const res = await axios.post('/api/auth/login', { email, password });
        login(res.data.token);
        navigate('/dashboard');
      } catch (err) {
        alert('Error: ' + err.response.data.msg);
      }
    }
  };
  
  return (
    <div className="flex flex-col gap-4">
      
      {/* Toggle buttons now call the new functions */}
      <div className="flex justify-center bg-gray-200 rounded-lg p-1">
        <button onClick={switchToLogin} className={`w-1/2 p-2 rounded-lg font-semibold ${isLogin ? 'bg-white shadow' : ''}`}>Login</button>
        <button onClick={switchToRegister} className={`w-1/2 p-2 rounded-lg font-semibold ${!isLogin ? 'bg-white shadow' : ''}`}>Register</button>
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