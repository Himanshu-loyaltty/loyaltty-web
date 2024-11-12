import React from 'react';
import { motion } from 'framer-motion';
import logo from '../assets/loyaltty1024x1024.png';

const LoadingState = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.5,
            ease: "easeOut"
          }}
        >
          <img 
            src={logo} 
            alt="Loyaltty" 
            className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
          />
          
          {/* Spinning Ring */}
          <motion.div
            className="absolute -inset-4 sm:-inset-6 border-2 sm:border-4 border-transparent border-t-[#000066]/30 rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          className="mt-6 text-sm sm:text-base text-gray-600 font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          Loading...
        </motion.p>
      </div>
    </div>
  );
};

export default LoadingState; 