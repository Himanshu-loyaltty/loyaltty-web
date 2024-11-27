import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiX, BiPlus, BiChevronLeft } from 'react-icons/bi';

const EditDealModal = ({ isOpen, onClose, onSubmit, deal }) => {
  const [formData, setFormData] = useState({
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
  });

  const isWelcomeDeal = deal?.type === 'Welcome Deal';

  useEffect(() => {
    if (deal) {
      setFormData({
        dealName: deal.name || '',
        dealValue: deal.price || '',
        startDate: deal.from || '',
        endDate: deal.to || '',
        shortDescription: deal.description || '',
        fullDetails: deal.fullDetails || '',
        termsAndConditions: deal.terms || '',
        repeatDays: deal.repeatDays || {
          Sun: false,
          Mon: false,
          Tue: false,
          Wed: false,
          Thu: false,
          Fri: false,
          Sat: false
        },
        dealPictures: deal.image ? [{ url: deal.image }] : []
      });
    }
  }, [deal]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file
    }));
    setFormData(prev => ({
      ...prev,
      dealPictures: [...prev.dealPictures, ...newImages].slice(0, 3)
    }));
  };

  const removeImage = (id) => {
    setFormData(prev => ({
      ...prev,
      dealPictures: prev.dealPictures.filter(img => img.id !== id)
    }));
  };

  const handleSubmit = () => {
    // Remove date-related fields for Welcome Deal
    const submitData = {
      ...formData,
      id: deal.id,
      type: deal.type
    };

    if (isWelcomeDeal) {
      delete submitData.startDate;
      delete submitData.endDate;
      delete submitData.repeatDays;
    }

    onSubmit(submitData);
    onClose();
  };
 
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[60] overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm"
              onClick={onClose}
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white rounded-xl w-full max-w-xl overflow-hidden shadow-lg"
            >
              {/* Header */}
              <div className="p-4 border-b border-gray-200">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <h2 className="text-lg font-semibold text-gray-900">
                      Edit {isWelcomeDeal ? 'Welcome Deal' : 'Deal'}
                    </h2>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                  >
                    <BiX className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 max-h-[calc(100vh-200px)] overflow-y-auto">
                <div className="space-y-4">
                  {/* Deal Pictures */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-2">
                      Deal pictures
                    </label>
                    <div className="flex gap-2">
                      {formData.dealPictures.map((image, index) => (
                        <div key={index} className="relative group">
                          <div className="w-16 h-16 rounded-lg overflow-hidden border border-gray-200">
                            <img
                              src={image.url}
                              alt="Deal"
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <button
                            onClick={() => removeImage(image.id)}
                            className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-sm hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                          >
                            <BiX className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {formData.dealPictures.length < 3 && (
                        <label className="w-16 h-16 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#000066] hover:bg-[#000066]/5 transition-all">
                          <BiPlus className="w-4 h-4 text-gray-400" />
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            multiple
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Deal Name */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Deal name
                    </label>
                    <input
                      type="text"
                      value={formData.dealName}
                      onChange={(e) => setFormData(prev => ({ ...prev, dealName: e.target.value }))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
                      placeholder="Enter deal name"
                    />
                  </div>

                  {/* Deal Value */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Deal value
                    </label>
                    <div className="relative">
                      <select
                        className="absolute left-3 top-1/2 -translate-y-1/2 border-0 bg-transparent pr-2 text-gray-500 focus:ring-0 text-sm"
                        value="USD"
                      >
                        <option value="USD">USD</option>
                      </select>
                      <input
                        type="number"
                        value={formData.dealValue}
                        onChange={(e) => setFormData(prev => ({ ...prev, dealValue: e.target.value }))}
                        className="w-full pl-16 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
                        placeholder="Enter deal value"
                      />
                    </div>
                  </div>

                  {/* Date Range - Only for Regular Deals */}
                  {!isWelcomeDeal && (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            Start Date
                          </label>
                          <input
                            type="date"
                            value={formData.startDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5">
                            End Date
                          </label>
                          <input
                            type="date"
                            value={formData.endDate}
                            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
                          />
                        </div>
                      </div>

                      {/* Weekly Repeat */}
                      <div>
                        <label className="block text-xs font-medium text-gray-700 mb-2">
                          Weekly Repeat Deal (Optional)
                        </label>
                        <div className="flex gap-2 flex-wrap">
                          {Object.entries(formData.repeatDays).map(([day, checked]) => (
                            <button
                              key={day}
                              type="button"
                              onClick={() => setFormData(prev => ({
                                ...prev,
                                repeatDays: {
                                  ...prev.repeatDays,
                                  [day]: !checked
                                }
                              }))}
                              className={`px-3 py-1 rounded-full text-sm ${
                                checked 
                                  ? 'bg-[#000066] text-white' 
                                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                              }`}
                            >
                              {day}
                            </button>
                          ))}
                        </div>
                      </div>
                    </>
                  )}

                  {/* Short Description */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Short description
                    </label>
                    <textarea
                      value={formData.shortDescription}
                      onChange={(e) => setFormData(prev => ({ ...prev, shortDescription: e.target.value }))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
                      rows={2}
                      placeholder="Enter a short description for your deal"
                    />
                  </div>

                  {/* Full Details */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Full details
                    </label>
                    <textarea
                      value={formData.fullDetails}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullDetails: e.target.value }))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
                      rows={3}
                      placeholder="Enter full details about your deal"
                    />
                  </div>

                  {/* Terms and Conditions */}
                  <div>
                    <label className="block text-xs font-medium text-gray-700 mb-1.5">
                      Terms and conditions
                    </label>
                    <textarea
                      value={formData.termsAndConditions}
                      onChange={(e) => setFormData(prev => ({ ...prev, termsAndConditions: e.target.value }))}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
                      rows={3}
                      placeholder="Enter terms and conditions for your deal"
                    />
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-4 border-t border-gray-200 bg-gray-50">
                <div className="flex justify-end gap-3">
                  <button
                    onClick={onClose}
                    className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 text-sm bg-[#000066] text-white rounded-lg hover:bg-[#000066]/90 transition-colors"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default EditDealModal; 