import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { 
  BiUser, 
  BiLock, 
  BiStore, 
  BiGroup, 
  BiMessageDetail, 
  BiGift, 
  BiPhone, 
  BiBookOpen, 
  BiUserPlus,
  BiChevronRight,
  BiPencil 
} from 'react-icons/bi';

const Settings = () => {
  const settingsSections = [
    {
      id: 'personal-info',
      title: 'Personal Info',
      icon: BiUser,
      path: '/settings/personal-info'
    },
    {
      id: 'change-password',
      title: 'Change Password',
      icon: BiLock,
      path: '/settings/change-password'
    },
    {
      id: 'business-info',
      title: 'Business Info',
      icon: BiStore,
      path: '/settings/business-info'
    },
    {
      id: 'add-employees',
      title: 'Add Employees',
      icon: BiGroup,
      path: '/settings/employees'
    },
    {
      id: 'shout-out',
      title: 'Shout out',
      icon: BiMessageDetail,
      path: '/settings/shout-out'
    },
    {
      id: 'loyaltty-reward',
      title: 'Loyaltty Reward',
      icon: BiGift,
      path: '/settings/loyaltty-reward'
    },
    {
      id: 'contact-us',
      title: 'Contact Us',
      icon: BiPhone,
      path: '/settings/contact'
    },
    {
      id: 'terms',
      title: 'Terms of Use and Privacy Policy',
      icon: BiBookOpen,
      path: '/settings/terms'
    },
    {
      id: 'refer',
      title: 'Refer a Friend',
      icon: BiUserPlus,
      path: '/settings/refer'
    }
  ];

  // Store profile image or placeholder
  const storeImage = null; // Replace with actual store image path

  return (
    <Layout>
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        </div>

        {/* Store Profile Section */}
        <div className="mb-8 relative">
          <div className="w-24 h-24 mx-auto bg-gray-200 rounded-full flex items-center justify-center relative">
            {storeImage ? (
              <img 
                src={storeImage} 
                alt="Store" 
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <BiStore className="w-12 h-12 text-gray-400" />
            )}
            <button className="absolute bottom-0 right-0 p-1.5 bg-[#000066] text-white rounded-full shadow-lg">
              <BiPencil className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Settings List */}
        <div className="space-y-2">
          {settingsSections.map((section, index) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Link
                to={section.path}
                className="flex items-center justify-between p-4 bg-white rounded-xl border border-gray-200 hover:border-[#000066]/30 hover:shadow-sm transition-all group"
              >
                <div className="flex items-center gap-3">
                  <section.icon className="w-5 h-5 text-gray-500 group-hover:text-[#000066] transition-colors" />
                  <span className="font-medium text-gray-900 group-hover:text-[#000066] transition-colors">
                    {section.title}
                  </span>
                </div>
                <BiChevronRight className="w-5 h-5 text-gray-400 group-hover:text-[#000066] transition-colors" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Version Info */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">Version 1.0.0</p>
        </div>
      </div>
    </Layout>
  );
};

export default Settings; 