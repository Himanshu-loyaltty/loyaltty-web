import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Onboarding from './pages/Onboarding';
import RetailerLogin from './pages/retailer/RetailerLogin';
import RetailerRegister from './pages/retailer/RetailerRegister';
import CustomerLogin from './pages/customer/CustomerLogin';
import CustomerRegister from './pages/customer/CustomerRegister';
import ForgotPassword from './pages/ForgotPassword';
import BusinessInfo from './pages/BusinessInfo';
import Home from './pages/Home';
import QRMenu from './components/QRMenu';
import ComingSoon from './pages/ComingSoon';
import LoadingState from './components/LoadingState';

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingState />}>
        <Routes>
          {/* Main Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<Onboarding />} />

          {/* Retailer Routes */}
          <Route path="/retailer">
            <Route path="login" element={<RetailerLogin />} />
            <Route path="register" element={<RetailerRegister />} />
            <Route path="forgot-password" element={<ForgotPassword userType="retailer" />} />
            <Route path="business-info" element={<BusinessInfo />} />
            <Route path="dashboard" element={<Home userType="retailer" />} />
            <Route path="menu/:businessId" element={<QRMenu />} />
          </Route>

          {/* Customer Routes */}
          <Route path="/customer">
            {/* Coming Soon Route */}
            <Route path="coming-soon" element={<ComingSoon />} />
            {/* <Route path="login" element={<CustomerLogin />} />
            <Route path="register" element={<CustomerRegister />} />
            <Route path="forgot-password" element={<ForgotPassword userType="customer" />} />
            <Route path="dashboard" element={<Home userType="customer" />} /> */}
          </Route>

          {/* Public Menu Routes */}
          <Route path="/menu/:businessId" element={<QRMenu />} />
          <Route path="/store/:businessId" element={<QRMenu />} />

          {/* Quick Access Routes */}
          <Route path="/login" element={<Navigate to="/get-started" replace />} />
          <Route path="/register" element={<Navigate to="/get-started" replace />} />
          <Route path="/business" element={<Navigate to="/retailer/login" replace />} />
          <Route path="/rewards" element={<Navigate to="/customer/login" replace />} />


          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
