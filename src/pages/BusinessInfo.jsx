import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { BiArrowBack, BiSearch, BiStore, BiMap, BiPhone } from 'react-icons/bi';
import FormInput from '../components/FormInput';

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
      navigate('/dashboard');
    } else if (step === 3) {
      navigate('/dashboard');
    } else {
      setStep(prev => prev + 1);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // ... your existing submit logic ...

    // Set the navigation flag before redirecting
    sessionStorage.setItem('fromBusinessInfo', 'true');
    navigate('/dashboard');
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
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Find Your Business
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Search for your business or create a new listing if it doesn't exist.
            </p>
            <div className="relative">
              <FormInput
                type="text"
                value={businessName}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Enter business name or address"
                className="pl-10"
              />
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
            </div>

            <AnimatePresence>
              {searchResults.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-4"
                >
                  {searchResults.map((business, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center space-x-4 p-4 rounded-xl border border-gray-200 hover:border-[#000066] hover:bg-[#000066]/5 transition-colors cursor-pointer"
                      onClick={() => {
                        setSelectedBusiness(business);
                        setStep(2);
                      }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="flex-shrink-0">
                        <BiStore className="w-8 h-8 sm:w-10 sm:h-10 text-[#000066]" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900 text-sm sm:text-base">{business.name}</h3>
                        <p className="text-xs sm:text-sm text-gray-500">{business.address}</p>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            {businessName.length > 2 && searchResults.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-6 sm:py-8 bg-gray-50 rounded-xl border border-gray-200"
              >
                <BiStore className="mx-auto h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
                <h3 className="mt-2 text-sm sm:text-base font-medium text-gray-900">No results found</h3>
                <p className="mt-1 text-xs sm:text-sm text-gray-500">
                  We couldn't find any business matching your search.
                </p>
                <div className="mt-4 sm:mt-6">
                  <button
                    onClick={() => setStep(3)}
                    className="inline-flex items-center px-3 py-2 sm:px-4 sm:py-2 border border-transparent shadow-sm text-xs sm:text-sm font-medium rounded-md text-white bg-[#000066] hover:bg-[#000066]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000066]"
                  >
                    Create a new business
                  </button>
                </div>
              </motion.div>
            )}
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
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Confirm Your Business
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Is this your business? You can add more locations later.
            </p>

            <div className="bg-white shadow overflow-hidden sm:rounded-xl border border-gray-200">
              <div className="px-4 py-4 sm:px-6 border-b border-gray-200">
                <h3 className="text-base sm:text-lg leading-6 font-medium text-gray-900">
                  Business Details
                </h3>
              </div>
              <div className="px-4 py-4 sm:p-6">
                <dl className="grid grid-cols-1 gap-x-4 gap-y-4 sm:gap-y-6 sm:grid-cols-2">
                  <div>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">Business name</dt>
                    <dd className="mt-1 text-sm sm:text-base text-gray-900">{selectedBusiness?.name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">Address</dt>
                    <dd className="mt-1 text-sm sm:text-base text-gray-900">{selectedBusiness?.address}</dd>
                  </div>
                  <div>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">Phone</dt>
                    <dd className="mt-1 text-sm sm:text-base text-gray-900">{selectedBusiness?.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-xs sm:text-sm font-medium text-gray-500">Category</dt>
                    <dd className="mt-1 text-sm sm:text-base text-gray-900">{selectedBusiness?.type}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="flex justify-end space-x-3 sm:space-x-4">
              <button
                onClick={() => setStep(3)}
                className="px-3 py-2 sm:px-4 sm:py-2 border border-gray-300 rounded-md shadow-sm text-xs sm:text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000066]"
              >
                Edit
              </button>
              <button
                onClick={handleContinue}
                className="px-3 py-2 sm:px-4 sm:py-2 border border-transparent rounded-md shadow-sm text-xs sm:text-sm font-medium text-white bg-[#000066] hover:bg-[#000066]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000066]"
              >
                Confirm
              </button>
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
            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              Business Details
            </h2>
            <p className="text-sm sm:text-base text-gray-600">
              Please provide the following information about your business.
            </p>

            <form className="space-y-6">
              <FormInput
                label="Business name"
                value={formData.businessName}
                onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                placeholder="Enter business name"
              />

              <FormInput
                label="Country"
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                placeholder="Select a country"
                isSelect
                options={[
                  { value: 'US', label: 'United States' },
                  { value: 'CA', label: 'Canada' },
                  { value: 'MX', label: 'Mexico' }
                ]}
              />

              <FormInput
                label="Business address"
                value={formData.businessAddress}
                onChange={(e) => setFormData({ ...formData, businessAddress: e.target.value })}
                placeholder="Enter full address"
              />

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <FormInput
                  label="ZIP / Postal code"
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  placeholder="Enter postal code"
                />

                <FormInput
                  label="Business category"
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  placeholder="Select a category"
                  isSelect
                  options={[
                    { value: 'Food', label: 'Food & Beverage' },
                    { value: 'Retail', label: 'Retail' },
                    { value: 'Services', label: 'Services' }
                  ]}
                />
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">
                  Business phone number
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-xs sm:text-sm">
                    +1
                  </span>
                  <input
                    type="tel"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    className="flex-1 min-w-0 block w-full px-3 py-2 rounded-none rounded-r-md focus:ring-[#000066] focus:border-[#000066] text-xs sm:text-sm border-gray-300"
                    placeholder="(555) 987-6543"
                  />
                </div>
              </div>
            </form>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-4 -right-4 w-72 h-72 bg-[#000066]/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.2, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-4 -left-4 w-72 h-72 bg-[#000066]/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.3, 0.2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Main Content */}
      <main className="relative z-10 max-w-3xl mx-auto py-6 sm:py-10 px-4 sm:px-6 lg:px-8 min-h-screen flex flex-col sm:block">
        <div className="bg-white/70 backdrop-blur-xl shadow-xl rounded-2xl border border-white/30 my-auto">
          {/* Header moved inside the form container */}
          <div className="border-b border-gray-200/50 px-4 sm:px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <button
                  onClick={() => step > 1 ? setStep(step - 1) : navigate(-1)}
                  className="mr-3 sm:mr-4 p-1.5 sm:p-2 rounded-full hover:bg-gray-100 transition-colors"
                >
                  <BiArrowBack className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900">Business Information</h1>
              </div>
              <div className="flex flex-col items-end gap-1.5">
                <div className="flex items-center gap-2">
                  {[...Array(3)].map((_, index) => (
                    <motion.div
                      key={index}
                      className={`h-1.5 rounded-full ${
                        index + 1 <= step ? 'bg-[#000066]' : 'bg-gray-200'
                      }`}
                      style={{ width: index + 1 === step ? 24 : 16 }}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: index * 0.1 }}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-600">
                  Step {step} of 3
                </span>
              </div>
            </div>
          </div>

          {/* Form Content */}
          <div className="p-4 sm:p-6 md:p-8">
            <AnimatePresence mode="wait">
              {renderStepContent()}
            </AnimatePresence>

            {step === 3 && (
              <motion.div
                className="mt-6 sm:mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
              >
                <button
                  onClick={handleContinue}
                  className="w-full py-2.5 sm:py-3 bg-[#000066] text-white rounded-xl font-medium hover:bg-[#000066]/90 transition-colors text-sm sm:text-base shadow-sm hover:shadow-md"
                >
                  Save and Continue
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default BusinessInfo;