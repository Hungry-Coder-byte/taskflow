import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from './api/client';
import { jwtDecode } from 'jwt-decode';

interface User {
  _id: string;
  email: string;
  firstName?: string;
  lastName?: string;
  projects?: string[];
}

const useAuth = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  const authSlice = useSelector((state) => state.auth);

  useEffect(() => {
    const decodeToken = () => {
      try {
        const token = localStorage.getItem('token');
        if (token) {
          const decoded = jwtDecode(token);
          setUser(decoded as User);
        }
      } catch (err) {
        console.error("Error decoding token:", err);
        setError("Failed to decode token");
      }
    };

    if (authSlice.isAuthenticated) {
      decodeToken();
    }

    setLoading(false);
  }, [authSlice.isAuthenticated]);

  useEffect(() => {
    if (user) {
      axios.get<string[]>(`api/projects?userId=${user._id}`)
        .then(response => {
          setUser(prevUser => ({ ...prevUser, projects: response }));
        })
        .catch(err => {
          console.error("Error fetching projects:", err);
          setError("Failed to fetch projects");
        });
    }
  }, [user]);

  return { loading, error, user };
};

export default useAuth;