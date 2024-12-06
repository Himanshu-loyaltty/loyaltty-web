import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Onboarding from './pages/Onboarding';
import MerchantLogin from './pages/merchant/MerchantLogin';
import MerchantRegister from './pages/merchant/MerchantRegister';
import BusinessInfo from './pages/BusinessInfo';
import ForgotPassword from './pages/ForgotPassword';
import Home from './pages/Home';
import Settings from './pages/Settings';
import Analytics from './pages/Analytics';
import Notifications from './pages/Notifications';
import Deals from './pages/Deals';
import DealDetail from './pages/DealDetail';
import { DealsProvider } from './context/DealsContext';
import Store, { persistor } from "./store/store";
import {Provider} from 'react-redux';
import { PersistGate } from "redux-persist/integration/react";

function App() {
  return (
    <Provider store={Store}>
      <PersistGate loading={null} persistor={persistor}>
        <DealsProvider>
          <Router>
            <Routes>
              <Route path="/" element={<Welcome />} />
              <Route path="/login" element={<MerchantLogin />} />
              <Route path="/register" element={<MerchantRegister />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/business-info" element={<BusinessInfo />} />
              <Route path="/dashboard" element={<Home />} />
              <Route path="/deals" element={<Deals />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/deals/:id" element={<DealDetail />} />
            </Routes>
          </Router>
        </DealsProvider>
      </PersistGate>
    </Provider>
  );
}

export default App;
