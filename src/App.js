import React, { Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/Welcome';
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
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';

function App() {
  return (
    <Router>
      <Suspense fallback={<LoadingState />}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Welcome />} />
          <Route path="/get-started" element={<Onboarding />} />

          {/* Auth Routes */}
          <Route path="/login" element={<RetailerLogin />} />
          <Route path="/register" element={<RetailerRegister />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/business-info" element={<BusinessInfo />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<Home />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />

          {/* Retailer Routes */}
          <Route path="/retailer">
            <Route path="login" element={<RetailerLogin />} />
            <Route path="register" element={<RetailerRegister />} />
            <Route
              path="forgot-password"
              element={<ForgotPassword userType="retailer" />}
            />
            <Route path="business-info" element={<BusinessInfo />} />
            <Route path="dashboard" element={<Home userType="retailer" />} />
          </Route>

          {/* Customer Routes */}
          <Route path="/customer">
            <Route path="coming-soon" element={<ComingSoon />} />
            <Route path="login" element={<CustomerLogin />} />
            <Route path="register" element={<CustomerRegister />} />
          </Route>

          {/* Public Menu Routes */}
          <Route path="/menu/:businessId" element={<QRMenu />} />
          <Route path="/store/:businessId" element={<QRMenu />} />

          {/* Catch all route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
