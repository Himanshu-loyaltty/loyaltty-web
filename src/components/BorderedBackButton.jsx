import React from 'react';
import { motion } from 'framer-motion';
import { BiArrowBack } from 'react-icons/bi';

const BorderedBackButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="absolute left-4 sm:left-8 top-6 sm:top-8 p-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
    whileTap={{ scale: 0.95 }}
  >
    <BiArrowBack 
      size={18} 
      className="text-gray-500 group-hover:text-gray-700 transition-colors" 
    />
  </motion.button>
);

export default BorderedBackButton; 