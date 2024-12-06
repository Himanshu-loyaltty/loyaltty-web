import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import AnalyticsCards from '../components/AnalyticsCards';
import TopCommanHeader from '../components/TopCommanHeader';

const Analytics = () => {
  const [timeFilter, setTimeFilter] = useState('last 30 days');


  // Report Links
  const reportLinks = [
    { title: 'Order Report', path: '/order-report' },
    { title: 'Deal Report', path: '/deal-report' },
    { title: 'Customer Report', path: '/customer-report' }
  ];

  return (
    <Layout>
      <TopCommanHeader />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header with Time Filter */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Analytics</h1>
          <div className="inline-flex rounded-full p-1 bg-gray-100">
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                timeFilter === 'last 30 days' 
                  ? 'bg-[#000066] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setTimeFilter('last 30 days')}
            >
              last 30 days
            </button>
            <button
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                timeFilter === 'Life Time' 
                  ? 'bg-[#000066] text-white' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setTimeFilter('Life Time')}
            >
              Life Time
            </button>
          </div>
        </div>

        <AnalyticsCards />

        {/* Report Links */}
        <div className="space-y-4">
          {reportLinks.map((report, index) => (
            <motion.div
              key={report.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm hover:border-[#000066]/30 hover:shadow-md transition-all cursor-pointer"
            >
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-900">{report.title}</span>
                <span className="text-gray-400">→</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Analytics; 