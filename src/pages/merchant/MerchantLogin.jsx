import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from '../Login';

const RetailerLogin = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      // TODO: Implement actual login logic here
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError('Failed to login');
    }
  };

  return (
    <Login
      userType="retailer" 
      title="Welcome Back"
      subtitle="Sign in to manage your business"
      redirectPath="/business-info"
      forgotPasswordPath="/forgot-password"
      registerPath="/business-info"
      socialText="or continue with"
      onSubmit={handleSubmit}
      error={error}
      isLoading={false}
    />
  );
};

export default RetailerLogin;