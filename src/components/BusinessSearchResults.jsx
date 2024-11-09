import React from 'react';
import { motion } from 'framer-motion';
import { BiStore, BiMap } from 'react-icons/bi';

const BusinessSearchResults = ({ results, onSelect }) => {
  return (
    <div className="mt-4 space-y-2">
      {results.map((result, index) => (
        <motion.button
          key={index}
          onClick={() => onSelect(result)}
          className="w-full p-4 bg-gray-50 hover:bg-gray-100 rounded-lg text-left transition-colors"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-start gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <BiStore className="text-[#000066]" size={20} />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-gray-900 truncate">{result.name}</h3>
              <div className="flex items-center gap-1 mt-1 text-sm text-gray-600">
                <BiMap className="flex-shrink-0" />
                <p className="truncate">{result.address}</p>
              </div>
              <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
                {result.type}
              </span>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  );
};

export default BusinessSearchResults; 