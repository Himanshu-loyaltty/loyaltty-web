import React, { useState } from 'react';
import { IoClose } from 'react-icons/io5';
import stampIcon from '../assets/stamp-icon.svg';

const QuickActionPopup = ({ isOpen, onClose, title }) => {
  const [step, setStep] = useState(1);
  const [mobileNumber, setMobileNumber] = useState('');

  if (!isOpen) return null;

  const handleMobileNumberClick = () => {
    setStep(2);
  };

  const handleSubmit = () => {
    console.log('Mobile number submitted:', mobileNumber);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#F5F7FF] rounded-2xl w-[90%] max-w-md relative">
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute right-4 top-4 text-gray-500 hover:text-gray-700 bg-white rounded-full p-2"
        >
          <IoClose size={24} />
        </button>

        {step === 1 ? (
          // First Step UI
          <div className="p-8">
            <div className="text-center">
              {/* Stamp Icon */}
              <div className="mb-4 flex justify-center">
                <img src={stampIcon} alt="Stamp" className="w-16 h-16" />
              </div>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Give Stamps/Give Points</h2>
              <p className="text-gray-500 mb-8">To get stamps or points, choose any of them</p>
            </div>

            {/* Buttons */}
            <div className="space-y-4">
              <button 
                onClick={handleMobileNumberClick}
                className="w-full py-3 px-6 bg-[#0A0F5C] text-white rounded-full font-medium hover:bg-opacity-90 transition-all"
              >
                Enter Mobile No.
              </button>

              <button 
                className="w-full py-3 px-6 bg-[#0A0F5C] text-white rounded-full font-medium hover:bg-opacity-90 transition-all"
              >
                Scan QR Code
              </button>
            </div>
          </div>
        ) : (
          // Second Step UI
          <div className="p-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Mobile Number</h2>
            </div>

            {/* Mobile Number Input */}
            <div className="space-y-4">
              <input
                type="tel"
                placeholder="Enter mobile number"
                className="w-full py-3 px-6 rounded-lg border border-gray-200 focus:outline-none focus:border-[#0A0F5C] text-gray-600"
                value={mobileNumber}
                onChange={(e) => setMobileNumber(e.target.value)}
              />

              <button 
                onClick={handleSubmit}
                className="w-full py-3 px-6 bg-[#0A0F5C] text-white rounded-full font-medium hover:bg-opacity-90 transition-all"
              >
                Submit
              </button>

              <button 
                className="w-full text-center text-[#0A0F5C] underline font-medium"
                onClick={() => setStep(1)}
              >
                Scan QR Code
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickActionPopup; 