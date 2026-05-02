import React, { FC } from 'react';
import { RouterProvider } from 'react-router-dom';
import { AuthStore } from '../src/store/authStore';
import Navbar from './Navbar';
import { Route } from 'react-router-dom';
import LandingPage from '../src/pages/LandingPage';
import Login from '../src/pages/Login';
import Register from '../src/pages/Register';
import Dashboard from '../src/pages/Dashboard';

interface LayoutProps {}

const Layout: FC<LayoutProps> = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <RouterProvider>
        <Navbar />
        <main className="container mx-auto px-4 py-8">
          <Route path="/" component={LandingPage} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/dashboard" component={Dashboard} />
        </main>
      </RouterProvider>
    </div>
  );
};

export default Layout;