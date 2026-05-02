import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthStore } from '../src/store/authStore';

const Navbar: React.FC = () => {
  const { user, logout } = useAuthStore();

  return (
    <nav className="bg-white shadow-md">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <h1 className="text-xl font-semibold text-gray-800">TaskFlow</h1>
        <div>
          {user ? (
            <>
              <p className="text-gray-600">Welcome, {user.name}</p>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Login
              </Link>
              <Link to="/register" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;