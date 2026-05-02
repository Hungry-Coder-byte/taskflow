import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';
import { register } from '../api/client';

interface RegisterProps { }

const Register: React.FC<RegisterProps> = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {
      const response = await register({ email, password, name });
      console.log('Registration successful:', response);
      // Redirect to login page after successful registration
      navigate('/login');
    } catch (error) {
      console.error('Registration failed:', error);
      // Handle registration errors (e.g., display error message)
    }
  };

  return (
    <div className="bg-gray-100 p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Register</h2>
      <div className="mb-4">
        <label className="text-gray-700 font-bold mb-2">Email:</label>
        <input
          type="email"
          className="border rounded-md p-2"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700 font-bold mb-2">Password:</label>
        <input
          type="password"
          className="border rounded-md p-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="mb-4">
        <label className="text-gray-700 font-bold mb-2">Name:</label>
        <input
          type="text"
          className="border rounded-md p-2"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <button
        onClick={handleSubmit}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded-md py-2 px-4"
      >
        Register
      </button>
    </div>
  );
};

export default Register;