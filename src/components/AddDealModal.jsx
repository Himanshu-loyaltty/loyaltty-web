import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiX } from 'react-icons/bi';

const AddDealModal = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [dealType, setDealType] = useState(null);
  
  // Create initial form state
  const initialFormState = {
    dealName: '',
    dealValue: '',
    startDate: '',
    endDate: '',
    shortDescription: '',
    fullDetails: '',
    termsAndConditions: '',
    repeatDays: {
      Sun: false,
      Mon: false,
      Tue: false,
      Wed: false,
      Thu: false,
      Fri: false,
      Sat: false
    },
    dealPictures: []
  };

  const [formData, setFormData] = useState(initialFormState);

  // Reset form when modal opens
  useEffect(() => {
    if (isOpen) {
      setStep(1);
      setDealType(null);
      setFormData(initialFormState);
    }
  }, [isOpen]);

  const dealTypes = [
    {
      icon: '💵',
      title: '$5 off on minimum purchase of $30',
      template: { type: 'minimum_purchase', amount: 5, minimum: 30 }
    },
    {
      icon: '%',
      title: '10% off on minimum purchase of $50',
      template: { type: 'percentage', amount: 10, minimum: 50 }
    },
    {
      icon: '🎁',
      title: 'Free item worth $5',
      template: { type: 'free_item', worth: 5 }
    },
    {
      icon: '🎭',
      title: 'Buy 1 Get 1 for free',
      template: { type: 'bogo', buy: 1, get: 1 }
    },
    {
      icon: '🏷️',
      title: '$3 off on item',
      template: { type: 'item_discount', amount: 3 }
    }
  ];

  const handleDealTypeSelect = (template) => {
    setDealType(template);
    setStep(2);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => URL.createObjectURL(file));
    setFormData(prev => ({
      ...prev,
      dealPictures: [...prev.dealPictures, ...newImages].slice(0, 3)
    }));
  };

  const validateDates = () => {
    if (!formData.startDate || !formData.endDate) {
      return false;
    }
    const start = new Date(formData.startDate);
    const end = new Date(formData.endDate);
    return start <= end;
  };

  const handleSubmit = () => {
    if (!validateDates()) {
      alert('Please enter valid start and end dates');
      return;
    }
    onSubmit({ ...formData, dealType });
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-white rounded-xl w-full max-w-xl mx-4 overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h2 className="text-lg font-semibold">Add new deal</h2>
              <button
                onClick={onClose}
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <BiX className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="p-4">
              {step === 1 ? (
                <div className="space-y-4">
                  <p className="text-sm text-gray-600">Choose a deal example</p>
                  <button
                    className="w-full p-4 text-left border rounded-xl hover:border-[#000066] flex items-center gap-4"
                    onClick={() => setStep(2)}
                  >
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <span className="text-xl">➕</span>
                    </div>
                    <span>Create your own deal</span>
                  </button>
                  {dealTypes.map((deal, index) => (
                    <button
                      key={index}
                      className="w-full p-4 text-left border rounded-xl hover:border-[#000066] flex items-center gap-4"
                      onClick={() => handleDealTypeSelect(deal.template)}
                    >
                      <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                        <span className="text-xl">{deal.icon}</span>
                      </div>
                      <span>{deal.title}</span>
                    </button>
                  ))}
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Deal Pictures */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Deal pictures
                    </label>
                    <div className="flex gap-2">
                      {formData.dealPictures.map((pic, index) => (
                        <div key={index} className="w-16 h-16 rounded-lg overflow-hidden">
                          <img src={pic} alt="Deal" className="w-full h-full object-cover" />
                        </div>
                      ))}
                      {formData.dealPictures.length < 3 && (
                        <label className="w-16 h-16 border-2 border-dashed rounded-lg flex items-center justify-center cursor-pointer hover:border-[#000066]">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                          <span className="text-2xl text-gray-400">+</span>
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Deal name
                      </label>
                      <input
                        type="text"
                        className="w-full p-2 border rounded-lg"
                        value={formData.dealName}
                        onChange={(e) => setFormData(prev => ({ ...prev, dealName: e.target.value }))}
                        placeholder="Enter deal name"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Start Date *
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full p-2 border rounded-lg"
                          value={formData.startDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          End Date *
                        </label>
                        <input
                          type="date"
                          required
                          className="w-full p-2 border rounded-lg"
                          value={formData.endDate}
                          onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                        />
                      </div>
                    </div>

                    {/* Weekly Repeat Deal */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Weekly Repeat Deal (Optional)
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {Object.entries(formData.repeatDays).map(([day, checked]) => (
                          <button
                            key={day}
                            className={`px-3 py-1 rounded-full text-sm ${
                              checked 
                                ? 'bg-[#000066] text-white' 
                                : 'bg-gray-100 text-gray-600'
                            }`}
                            onClick={() => setFormData(prev => ({
                              ...prev,
                              repeatDays: {
                                ...prev.repeatDays,
                                [day]: !checked
                              }
                            }))}
                          >
                            {day}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Other fields... */}
                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t">
              <div className="flex justify-end gap-4">
                <button
                  onClick={onClose}
                  className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Cancel
                </button>
                {step === 2 && (
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-[#000066] text-white rounded-lg hover:bg-[#000066]/90"
                  >
                    Create Deal
                  </button>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AddDealModal; 