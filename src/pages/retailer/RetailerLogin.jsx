import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Login from '../Login';
import { useLoginMutation } from '../../store/api/authApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from '../../store/slices/authSlice';

const RetailerLogin = () => {
  const [login, { isLoading }] = useLoginMutation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState(null);

  const handleSubmit = async (formData) => {
    try {
      const result = await login(formData).unwrap();
      dispatch(setCredentials(result));
      
      // Navigate to the protected page the user tried to visit or dashboard
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    } catch (err) {
      setError(err.data?.message || 'Failed to login');
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
      isLoading={isLoading}
    />
  );
};

export default RetailerLogin; 