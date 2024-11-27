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
import ProtectedRoute from './components/ProtectedRoute';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from './store/store';
import Deals from './pages/Deals';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingState />} persistor={persistor}>
        <Router>
          <Suspense fallback={<LoadingState />}>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Welcome />} />
              <Route path="/get-started" element={<Onboarding />} />
              <Route path="/login" element={<RetailerLogin />} />
              <Route path="/register" element={<RetailerRegister />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/business-info" element={<BusinessInfo />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />

              {/* Protected Dashboard Routes */}
              {/* <Route
                path="/dashboard"
                element={
                  <ProtectedRoute allowedRoles={['retailer']}>
                    <Home />
                  </ProtectedRoute>
                }
              /> */}
              {/* <Route
                path="/notifications"
                element={
                  <ProtectedRoute>
                    <Notifications />
                  </ProtectedRoute>
                }
              /> */}
              {/* ... other protected routes */}

              {/* Rest of your routes */}
            </Routes>
          </Suspense>
        </Router>
      </PersistGate>
    </Provider>
  );
}

export default App;
