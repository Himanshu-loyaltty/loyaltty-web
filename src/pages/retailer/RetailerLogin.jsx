import React from 'react';
import Login from '../Login';

const RetailerLogin = () => {
  return (
    <Login
      userType="retailer"
      title="Welcome Back"
      subtitle="Sign in to manage your business"
      redirectPath="/business-info"
      forgotPasswordPath="/forgot-password"
      registerPath="/business-info"
      socialText="or continue with"
    />
  );
};

export default RetailerLogin; 