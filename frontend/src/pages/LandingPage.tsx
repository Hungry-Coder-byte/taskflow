import React from 'react';
import { Navigate, View } from 'react-router-dom';
import LoginForm from '../components/LoginForm';

interface LandingPageProps {}

const LandingPage: React.FC<LandingPageProps> = () => {
  return (
    <View className="flex items-center justify-center h-screen">
      <LoginForm />
    </View>
  );
};

export default LandingPage;