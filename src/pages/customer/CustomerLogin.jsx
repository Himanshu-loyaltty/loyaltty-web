import React from 'react';
import Login from '../Login';

const CustomerLogin = () => {
  return (
    <Login 
      userType="customer"
      title="Welcome Back"
      subtitle="Sign in to your account"
      redirectPath="/customer/dashboard"
      forgotPasswordPath="/customer/forgot-password"
      registerPath="/customer/register"
      socialText="or continue with"
    />
  );
};

export default CustomerLogin; 