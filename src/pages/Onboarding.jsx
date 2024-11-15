import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
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
        <motion.div
          className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Link
            to="/"
            className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <div className="p-1.5 sm:p-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:border-gray-300 hover:bg-white/90 transition-all duration-200">
              <BiArrowBack size={16} className="sm:w-[18px] sm:h-[18px]" />
            </div>
            <span className="text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              Back to Home
            </span>
          </Link>
        </motion.div>

        <div className="w-full max-w-[420px] mx-auto">
          {/* Logo & Header */}
          <motion.div
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <img src={logo} alt="Loyaltty" className="w-24 h-26 mx-auto mb-6" />
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-3">
              Choose Your Path
            </h1>
            <p className="text-gray-600">Select how you want to use Loyaltty</p>
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
                onClick={() => navigate("/retailer/login")}
                className="w-full p-6 rounded-xl border-2 border-[#000066] hover:bg-[#000066]/5 transition-all text-left relative group overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-[#000066] mb-2">
                    For Business
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Create and manage loyaltty programs
                  </p>
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
                onClick={() => navigate("/customer/coming-soon")}
                className="w-full p-6 rounded-xl border-2 border-[#000066] hover:bg-[#000066]/5 transition-all text-left relative group overflow-hidden"
              >
                <div className="relative z-10">
                  <h3 className="text-lg font-semibold text-[#000066] mb-2">
                    For Customers
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Earn and redeem rewards
                  </p>
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