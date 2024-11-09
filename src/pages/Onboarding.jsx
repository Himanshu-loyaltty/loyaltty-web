import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Loader from '../components/Loader';
import logo from '../assets/loyaltty1024x1024.png';

const Onboarding = () => {
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    // return <Loader />;
  }

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[100px]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[310px] w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-4">
        {/* Back Button */}
        <motion.button
          className="absolute top-4 left-4 p-2 rounded-full hover:bg-gray-100 transition-colors border border-gray-200"
          onClick={() => navigate('/')}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <BiArrowBack className="w-6 h-6 text-gray-600" />
        </motion.button>

        <div className="w-full max-w-[420px] mx-auto">
          {/* Logo & Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <img 
              src={logo} 
              alt="Loyaltty" 
              className="w-24 h-26 mx-auto mb-6"
            />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Choose Your Path
            </h1>
            <p className="text-gray-600">
              Select how you want to use Loyaltty
            </p>
          </motion.div>

          {/* Quick Access Buttons */}
          <motion.div 
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {/* Business Button */}
            <motion.div
              className="group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.995 }}
            >
              <button
                onClick={() => navigate('/retailer/login')}
                className="w-full p-6 rounded-xl border-2 border-[#000066] hover:bg-[#000066]/5 transition-all text-left relative group overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-[#000066] mb-2">For Business</h3>
                  <p className="text-gray-600 text-sm">Create and manage loyalty programs</p>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                  →
                </div>
              </button>
            </motion.div>

            {/* Customer Button */}
            <motion.div
              className="group"
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.995 }}
            >
              <button
                onClick={() => navigate('/customer/login')}
                className="w-full p-6 rounded-xl border-2 border-[#000066] hover:bg-[#000066]/5 transition-all text-left relative group overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-[#000066] mb-2">For Customers</h3>
                  <p className="text-gray-600 text-sm">Earn and redeem rewards</p>
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:translate-x-0 translate-x-2">
                  →
                </div>
              </button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default Onboarding;