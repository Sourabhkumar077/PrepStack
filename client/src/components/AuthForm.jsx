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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isLogin) {
      try {
        const res = await axios.post('/api/auth/login', { email, password });
        if (await login(res.data.token)) {
          navigate('/dashboard');
        } else {
          alert('Login failed. Please check your credentials.');
        }
      } catch (err) {
        alert('Invalid Credentials');
      }
    } else {
      try {
        const res = await axios.post('/api/auth/register', { name, email, password });
        if (await login(res.data.token)) {
          navigate('/dashboard');
        } else {
          alert('Could not log you in after registration.');
        }
      } catch (err) {
        alert('Error: ' + err.response.data.msg);
      }
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex bg-slate-200 rounded-lg p-1 mb-6">
        <button 
          type="button"
          onClick={() => setIsLogin(true)} 
          className={`w-1/2 p-2 rounded-md font-semibold text-sm ${isLogin ? 'bg-white shadow text-slate-800' : 'text-slate-600'}`}
        >
          Login
        </button>
        <button 
          type="button"
          onClick={() => setIsLogin(false)} 
          className={`w-1/2 p-2 rounded-md font-semibold text-sm ${!isLogin ? 'bg-white shadow text-slate-800' : 'text-slate-600'}`}
        >
          Register
        </button>
      </div>

      {!isLogin && (
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1">Name</label>
          <input 
            type="text" 
            placeholder="Your Name" 
            className="w-full p-3 border border-slate-300 rounded-lg text-slate-900" // Added text color
            value={name}
            onChange={(e) => setName(e.target.value)}
            required 
          />
        </div>
      )}

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Email</label>
        <input 
          type="email" 
          placeholder="your@email.com" 
          className="w-full p-3 border border-slate-300 rounded-lg text-slate-900" // Added text color
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
        <input 
          type="password" 
          placeholder="••••••••" 
          className="w-full p-3 border border-slate-300 rounded-lg text-slate-900" // Added text color
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>
      
      <div className="pt-2">
        <button type="submit" className="w-full bg-blue-600 text-white font-semibold p-3 rounded-lg hover:bg-blue-700">
          {isLogin ? 'Login' : 'Create Account'}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;