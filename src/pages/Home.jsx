import React from 'react';
import { motion } from 'framer-motion';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout';
import QRMenu from '../components/QRMenu';

const Home = ({ userType }) => {
  const { businessId } = useParams();

  // If viewing a menu
  if (userType === 'customer-menu' || businessId) {
    return <QRMenu businessId={businessId} />;
  }

  // If viewing retailer dashboard
  if (userType === 'retailer') {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* Business Stats */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              {/* Add stats content */}
            </div>

            {/* QR Code Preview */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Your Menu QR Code</h3>
              <div className="aspect-square bg-gray-50 rounded-lg flex items-center justify-center">
                {/* Add QR code preview */}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white p-6 rounded-xl shadow-sm">
              <h3 className="text-lg font-semibold mb-4">Recent Activity</h3>
              {/* Add activity content */}
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  // Main landing page
  return (
    <Layout>
      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:pt-32 sm:pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <motion.h1 
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
              >
                Digital Menu & <br />
                Loyalty Program <br />
                Made Simple
              </motion.h1>
              <motion.p 
                className="mt-6 text-lg text-gray-600 max-w-lg"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                Create digital menus with QR codes and reward your loyal customers. Perfect for restaurants and retail businesses.
              </motion.p>
              <motion.div 
                className="mt-8 flex flex-wrap gap-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Link
                  to="/get-started"
                  className="px-8 py-3 bg-[#000066] text-white rounded-full font-semibold hover:bg-[#000066]/90 transition-colors"
                >
                  Get Started
                </Link>
                <Link
                  to="/menu/demo"
                  className="px-8 py-3 border-2 border-[#000066] text-[#000066] rounded-full font-semibold hover:bg-[#000066]/5 transition-colors"
                >
                  View Demo Menu
                </Link>
              </motion.div>
            </div>

            {/* Preview Section */}
            <div className="relative">
              <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="relative z-10"
              >
                <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
                  <QRMenu isPreview businessId="demo" />
                </div>
              </motion.div>
              {/* Background decoration */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        {/* ... Features content ... */}
      </section>
    </Layout>
  );
};

export default Home;