import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { BiChevronDown, BiX } from 'react-icons/bi';
import MenuGrid from './MenuGrid';

// Sample menu items with categories
const SAMPLE_ITEMS = {
  "Burger Deals": [
    {
      name: "Burger Deal 1",
      price: "20",
      description: "Classic beef burger with cheese, lettuce, tomato, and special sauce. Served with fries.",
      image: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500"
    },
    {
      name: "Burger Deal 2",
      price: "25",
      description: "Double beef patty with bacon, cheddar, onion rings, and BBQ sauce. Served with fries.",
      image: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=500"
    }
  ],
  "Sides": [
    {
      name: "French Fries",
      price: "5",
      description: "Crispy golden fries with our special seasoning",
      image: "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=500"
    },
    {
      name: "Onion Rings",
      price: "6",
      description: "Crispy battered onion rings served with dipping sauce",
      image: "https://images.unsplash.com/photo-1639024471283-03518883512d?w=500"
    }
  ]
};

const QRMenu = ({ businessId = '', isPreview = false }) => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const menuUrl = `${window.location.origin}/menu/${businessId}`;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="sticky top-0 bg-white border-b z-40">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-lg font-semibold text-gray-900">Store Name</h1>
            <div className="flex items-center gap-4">
              <span className="text-sm text-green-600 bg-green-50 px-2 py-1 rounded-full">
                Open
              </span>
              <QRCodeSVG 
                value={menuUrl}
                size={32}
                level="H"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Category Navigation */}
      <div className="sticky top-16 bg-white border-b z-30">
        <div className="max-w-2xl mx-auto px-4">
          <div className="py-3 -mx-4 px-4 overflow-x-auto">
            <div className="flex gap-2 min-w-max">
              {Object.keys(SAMPLE_ITEMS).map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category
                      ? 'bg-[#000066] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Menu Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <MenuGrid 
          items={selectedCategory ? SAMPLE_ITEMS[selectedCategory] : SAMPLE_ITEMS["Burger Deals"]}
          showTerms={true}
        />
      </div>

    </div>
  );
};

export default QRMenu;