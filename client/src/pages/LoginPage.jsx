import React from 'react';
import AuthForm from '../components/AuthForm';
import { CheckSquare } from 'lucide-react';

const LoginPage = () => {
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-6">
          <CheckSquare className="h-12 w-12 mx-auto text-blue-600" />
          <h2 className="text-3xl font-bold mt-2 text-slate-800">
            Welcome to PrepStack
          </h2>
          <p className="text-slate-500 mt-2">Sign in or create an account to continue</p>
        </div>
        <AuthForm />
      </div>
    </div>
  );
};

export default LoginPage;