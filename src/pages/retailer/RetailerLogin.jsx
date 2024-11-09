import React from 'react';
import Login from '../Login';

const RetailerLogin = () => {
  return (
    <Login 
      userType="retailer" 
      title="Welcome Back"
      subtitle="Sign in to manage your business"
      redirectPath="/retailer/business-info"
      forgotPasswordPath="/retailer/forgot-password"
      registerPath="/retailer/register"
      socialText="or continue with"
    />
  );
};

export default RetailerLogin; 