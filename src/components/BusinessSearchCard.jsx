import React from 'react';
import { motion } from 'framer-motion';
import { BiMap, BiPhone, BiStore, BiEdit } from 'react-icons/bi';

const BusinessSearchCard = ({ business, onSelect, isSelected, onEdit, showEditButton = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`p-4 rounded-xl border transition-all cursor-pointer ${
        isSelected 
          ? 'border-[#000066] bg-blue-50/50' 
          : 'border-gray-200 hover:border-[#000066]/30 hover:bg-gray-50'
      }`}
      onClick={() => onSelect(business)}
    >
      <div className="flex items-start gap-3">
        <div className="p-2 bg-blue-50 rounded-lg">
          <BiStore className="text-[#000066] w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-900 truncate">{business.name}</h3>
            {showEditButton && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(business);
                }}
                className="p-1.5 text-[#000066] hover:bg-blue-50 rounded-lg transition-colors"
              >
                <BiEdit size={18} />
              </button>
            )}
          </div>
          <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
            <BiMap className="flex-shrink-0 w-4 h-4" />
            <p className="truncate">{business.address}</p>
          </div>
          {business.phone && (
            <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
              <BiPhone className="flex-shrink-0 w-4 h-4" />
              <p>{business.phone}</p>
            </div>
          )}
          {business.type && (
            <span className="inline-block mt-2 px-2 py-1 bg-blue-50 text-blue-600 text-xs rounded-full">
              {business.type}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default BusinessSearchCard; 