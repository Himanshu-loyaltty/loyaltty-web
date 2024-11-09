import React from 'react';
import Register from '../Register';

const CustomerRegister = () => {
  return (
    <Register 
      userType="customer"
      title="Create Account"
      subtitle="Join to earn rewards"
      redirectPath="/customer/dashboard"
      loginPath="/customer/login"
      fields={[
        {
          name: 'fullName',
          label: 'Full Name',
          placeholder: 'Enter full name',
          type: 'text'
        },
        {
          name: 'emailPhone',
          label: 'Email/Phone Number',
          placeholder: 'Enter email or phone number',
          type: 'text'
        }
      ]}
      socialText="or continue with"
    />
  );
};

export default CustomerRegister; 