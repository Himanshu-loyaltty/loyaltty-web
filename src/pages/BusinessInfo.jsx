import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiSearch, BiStore, BiMap, BiPhone } from 'react-icons/bi';
import BorderedBackButton from '../components/BorderedBackButton';
import BusinessSearchCard from '../components/BusinessSearchCard';

const BusinessInfo = () => {
  const [step, setStep] = useState(1);
  const [businessName, setBusinessName] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBusiness, setSelectedBusiness] = useState(null);
  const [formData, setFormData] = useState({
    businessName: '',
    country: '',
    businessAddress: '',
    postalCode: '',
    category: '',
    phoneNumber: '',
    countryCode: 'US'
  });

  const navigate = useNavigate();

  const handleSearch = (query) => {
    setBusinessName(query);
    if (query.length > 2) {
      const mockResults = [
        {
          name: 'Hub61 The Indian Bistro',
          address: 'Serra Way, Milpitas, CA, USA',
          type: 'Food',
          phone: '9081248924'
        }
      ];

      const filteredResults = mockResults.filter(business => 
        business.name.toLowerCase().includes(query.toLowerCase())
      );
      setSearchResults(filteredResults);
    } else {
      setSearchResults([]);
    }
  };

  const handleContinue = () => {
    if (step === 1 && !selectedBusiness) {
      setFormData(prev => ({
        ...prev,
        businessName: businessName
      }));
      setStep(3);
    } else if (step === 2) {
      navigate('/retailer/home');
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleSelectBusiness = (business) => {
    setSelectedBusiness(business);
    setBusinessName(business.name);
    setSearchResults([]);
    setStep(2);
  };

  const handleEditBusiness = () => {
    setFormData({
      businessName: selectedBusiness.name,
      businessAddress: selectedBusiness.address,
      phoneNumber: selectedBusiness.phone,
      category: selectedBusiness.type
    });
    setStep(3);
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            key="step1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  What is your business name?
                </h2>
                <p className="text-sm text-gray-500">
                  Search for your business or add a new one
                </p>
              </div>

              <div className="relative">
                <input
                  type="text"
                  value={businessName}
                  onChange={(e) => handleSearch(e.target.value)}
                  placeholder="e.g. Seaside Cafe, 1234 Ocean Avenue"
                  className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066] transition-all shadow-sm"
                />
                <div className="absolute right-3 top-1/2 -translate-y-1/2">
                  <BiSearch className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Search Results */}
              <AnimatePresence>
                {searchResults.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-3 overflow-hidden"
                  >
                    {searchResults.map((business, index) => (
                      <BusinessSearchCard
                        key={index}
                        business={business}
                        onSelect={handleSelectBusiness}
                        isSelected={selectedBusiness?.name === business.name}
                      />
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* No Results Message */}
              {businessName.length > 2 && searchResults.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-6 bg-gray-50 rounded-xl border border-gray-200"
                >
                  <p className="text-gray-600 mb-2">No business found with this name</p>
                  <p className="text-sm text-gray-500">
                    Click continue to add your business information
                  </p>
                </motion.div>
              )}
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            key="step2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <div className="space-y-2">
                <h2 className="text-xl font-semibold text-gray-900">
                  Is this your Business?
                </h2>
                <p className="text-sm text-gray-500">
                  You can add more locations later
                </p>
              </div>

              <BusinessSearchCard
                business={selectedBusiness}
                onSelect={() => {}}
                isSelected={true}
                onEdit={handleEditBusiness}
                showEditButton={true}
              />
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            key="step3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-gray-900">
                Edit Business Info
              </h2>

              <div className="space-y-4">
                {/* Business Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Business name
                  </label>
                  <input
                    type="text"
                    value={formData.businessName}
                    onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066]"
                  />
                </div>

                {/* Country */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066]"
                  >
                    <option value="">Choose Country</option>
                    <option value="US">United States</option>
                  </select>
                </div>

                {/* Business Address */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Business address
                  </label>
                  <input
                    type="text"
                    value={formData.businessAddress}
                    onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066]"
                  />
                </div>

                {/* Postal Code */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Postal code
                  </label>
                  <input
                    type="text"
                    value={formData.postalCode}
                    onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066]"
                  />
                </div>

                {/* Business Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Business category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066]"
                  >
                    <option value="">Choose category</option>
                    <option value="Food">Food</option>
                    <option value="Retail">Retail</option>
                  </select>
                </div>

                {/* Business Contact */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-900">
                    Business contact number <span className="text-gray-500">(optional)</span>
                  </label>
                  <div className="flex gap-2">
                    <select
                      value={formData.countryCode}
                      onChange={(e) => setFormData({ ...formData, countryCode: e.target.value })}
                      className="w-[100px] px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066]"
                    >
                      <option value="US">🇺🇸 +1</option>
                    </select>
                    <input
                      type="tel"
                      value={formData.phoneNumber}
                      onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                      placeholder="Phone number"
                      className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b sticky top-0 z-50">
        <div className="max-w-2xl mx-auto px-4">
          <div className="flex items-center h-16">
            {/* Back Button and Title */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <BiArrowBack className="w-5 h-5 text-gray-600" />
              </button>
              <h1 className="text-lg font-medium text-gray-900">Business Info</h1>
            </div>

            {/* Progress Bar */}
            <div className="ml-auto w-16 h-1 bg-[#000066] rounded-full" />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 py-6">
        <AnimatePresence mode="wait">
          {renderStepContent()}
        </AnimatePresence>

        {/* Continue Button */}
        <motion.div 
          className="mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <button
            onClick={handleContinue}
            className="w-full h-[52px] bg-[#000066] text-white rounded-full font-semibold hover:bg-[#000066]/90 transition-colors"
          >
            Continue
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default BusinessInfo;