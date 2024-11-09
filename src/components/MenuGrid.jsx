import React from 'react';
import MenuItem from './MenuItem';

const MenuGrid = ({ items, showEditButton, showTerms }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {items.map((item, index) => (
        <MenuItem 
          key={index}
          {...item}
          showEditButton={showEditButton}
          showTerms={showTerms}
        />
      ))}
    </div>
  );
};

export default MenuGrid; 