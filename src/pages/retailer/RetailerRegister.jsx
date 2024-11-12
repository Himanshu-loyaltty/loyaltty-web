import React from 'react';
import Register from '../Register';

const RetailerRegister = () => {
  return (
    <Register 
      userType="retailer"
      title="Create Account"
      subtitle="Get started with your business"
      redirectPath="/retailer/business-info"
      loginPath="/retailer/login"
      fields={[
        {
          name: 'businessName',
          label: 'Business Name',
          placeholder: 'Enter business name',
          type: 'text'
        },
        {
          name: 'emailPhone',
          label: 'Email/Phone Number',
          placeholder: 'Enter email or phone number',
          type: 'text'
        }
      ]}
    />
  );
};

export default RetailerRegister; 