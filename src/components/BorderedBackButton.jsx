import React from 'react';
import { motion } from 'framer-motion';
import { BiArrowBack } from 'react-icons/bi';
import { Link } from 'react-router-dom';

const BorderedBackButton = ({ onClick }) => (
  <motion.div
    className="absolute top-4 left-4 sm:top-6 sm:left-6 z-50"
    initial={{ opacity: 0, x: -20 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.2 }}
  >
    <div
      onClick={onClick}
      className="group flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
    >
      <div className="p-1.5 sm:p-2 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm hover:border-gray-300 hover:bg-white/90 transition-all duration-200">
        <BiArrowBack size={16} className="sm:w-[18px] sm:h-[18px]" />
      </div>
      <span className="text-xs sm:text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        Back
      </span>
    </div>
  </motion.div>
);

export default BorderedBackButton;