import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

interface LoginProps { }

const Login: React.FC<LoginProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();
  const login = () => {
    // Replace with your actual API call
    useAuthStore((auth) => {
      auth.login({ email, password });
    });
    navigate('/dashboard');
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Login</h2>
      <div className="mb-4">
        <label className="text-gray-600 font-semibold">Email</label>
        <input
          type="email"
          className="rounded-md py-2 px-3 border border-gray-300 focus:outline-blue-500 focus:border-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-600 font-semibold">Password</label>
        <input
          type="password"
          className="rounded-md py-2 px-3 border border-gray-300 focus:outline-blue-500 focus:border-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button
        onClick={login}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-blue-500"
      >
        Login
      </button>
    </div>
  );
};

export default Login;