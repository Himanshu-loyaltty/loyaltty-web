import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Analytics = () => {
  const [timeFilter, setTimeFilter] = useState('last 30 days');

  // Quick Stats Data with updated colors
  const quickStats = [
    {
      title: 'Orders',
      value: '3',
      subtitle: 'Number Of Confirmed Orders',
      bgColor: 'bg-[#4A90E2]/10', // Light blue background
      textColor: 'text-[#4A90E2]', // Blue text
      icon: '🛍️'
    },
    {
      title: 'Deals',
      value: '15',
      subtitle: 'Number Of Published Deals',
      bgColor: 'bg-[#F5A623]/10', // Light orange background
      textColor: 'text-[#F5A623]', // Orange text
      icon: '🏷️'
    },
    {
      title: 'Revenue',
      value: '9',
      subtitle: 'Number Of Earned Money',
      bgColor: 'bg-[#9013FE]/10', // Light purple background
      textColor: 'text-[#9013FE]', // Purple text
      icon: '💰'
    }
  ];

  const secondaryStats = [
    {
      title: 'Discount',
      value: '5',
      subtitle: 'Number Of Total Discounts',
      bgColor: 'bg-[#E15B64]/10', // Light red background
      textColor: 'text-[#E15B64]', // Red text
      icon: '🎯'
    },
    {
      title: 'ROI',
      value: '5%',
      subtitle: 'Percentage Of Earned Return',
      bgColor: 'bg-[#2ECC71]/10', // Light green background
      textColor: 'text-[#2ECC71]', // Green text
      icon: '📈'
    },
    {
      title: 'Customers',
      value: '5',
      subtitle: '2 New 3 Repeat',
      bgColor: 'bg-[#00BCD4]/10', // Light cyan background
      textColor: 'text-[#00BCD4]', // Cyan text
      icon: '👥'
    }
  ];

  // Report Links
  const reportLinks = [
    { title: 'Order Report', path: '/order-report' },
    { title: 'Deal Report', path: '/deal-report' },
    { title: 'Customer Report', path: '/customer-report' }
  ];

  return (
    <Layout>
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

        {/* Primary Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`${stat.bgColor} rounded-xl p-6 border border-gray-200/50`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-4xl font-bold ${stat.textColor}`}>{stat.value}</span>
              </div>
              <h3 className={`text-lg font-semibold ${stat.textColor}`}>{stat.title}</h3>
              <p className="text-sm text-gray-500">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>

        {/* Secondary Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {secondaryStats.map((stat, index) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className={`${stat.bgColor} rounded-xl p-6 border border-gray-200/50`}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-2xl">{stat.icon}</span>
                <span className={`text-4xl font-bold ${stat.textColor}`}>{stat.value}</span>
              </div>
              <h3 className={`text-lg font-semibold ${stat.textColor}`}>{stat.title}</h3>
              <p className="text-sm text-gray-500">{stat.subtitle}</p>
            </motion.div>
          ))}
        </div>

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