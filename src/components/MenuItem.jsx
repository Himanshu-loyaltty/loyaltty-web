import React from 'react';
import { motion } from 'framer-motion';
import { BiPencil } from 'react-icons/bi';

const MenuItem = ({ 
  name, 
  price, 
  image, 
  description, 
  onEdit, 
  showEditButton = false,
  showTerms = false 
}) => {
  return (
    <motion.div 
      className="bg-white rounded-lg overflow-hidden"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Item Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
        {showEditButton && (
          <button
            onClick={onEdit}
            className="absolute top-2 right-2 p-2 bg-white/90 rounded-full hover:bg-white transition-colors"
          >
            <BiPencil className="w-4 h-4 text-gray-700" />
          </button>
        )}
      </div>

      {/* Item Details */}
      <div className="p-3">
        <div className="flex justify-between items-start gap-2 mb-1">
          <h3 className="font-medium text-gray-900 line-clamp-1">{name}</h3>
          <span className="font-semibold text-[#000066] whitespace-nowrap">
            ${price}
          </span>
        </div>
        
        {description && (
          <p className="text-sm text-gray-600 line-clamp-2 mb-2">
            {description}
          </p>
        )}

        {showTerms && (
          <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-100">
            <button className="text-xs text-[#000066] hover:underline">
              Terms And Conditions
            </button>
            <button className="text-xs text-[#000066] hover:underline">
              View Details
            </button>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default MenuItem; 