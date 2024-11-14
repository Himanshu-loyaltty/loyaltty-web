import React from 'react';
import { motion } from 'framer-motion';
import Navbar from './Navbar';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-4 -right-4 w-72 h-72 bg-[#000066]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-72 h-72 bg-[#000066]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="lg:pl-64">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout; 