import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiPlus, BiSearch } from 'react-icons/bi';
import Layout from '../components/Layout';
import WelcomeDealModal from '../components/WelcomeDealModal';
import AddDealModal from '../components/AddDealModal';
import EditDealModal from '../components/EditDealModal';

const Deals = () => {
  const [activeTab, setActiveTab] = useState('Active');
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [showEditDeal, setShowEditDeal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [deals, setDeals] = useState([]);

  const tabs = ['Active', 'Scheduled', 'Expired'];

  const handleAddDeal = (dealData) => {
    setDeals(prevDeals => [...prevDeals, {
      id: Date.now(),
      ...dealData,
      status: 'active'
    }]);
    setShowAddDeal(false);
  };

  const handleEditDeal = (dealData) => {
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === dealData.id ? { ...deal, ...dealData } : deal
      )
    );
    setShowEditDeal(false);
    setSelectedDeal(null);
  };

  const filteredDeals = deals.filter(deal => {
    const matchesSearch = deal.dealName?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = (
      (activeTab === 'Active' && deal.status === 'active') ||
      (activeTab === 'Scheduled' && new Date(deal.startDate) > new Date()) ||
      (activeTab === 'Expired' && new Date(deal.endDate) < new Date())
    );
    return matchesSearch && matchesTab;
  });

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Deals</h1>
            <p className="text-sm text-gray-500 mt-1">Manage your deals and offers</p>
          </div>
          <button
            onClick={() => setShowAddDeal(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-[#000066] hover:bg-[#000066]/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#000066]"
          >
            <BiPlus className="-ml-1 mr-2 h-5 w-5" />
            Add New Deal
          </button>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-xl border border-gray-200 p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search deals..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-[#000066] focus:border-[#000066]"
              />
              <BiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>
            
            {/* Tabs */}
            <div className="flex gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${
                    activeTab === tab
                      ? 'bg-[#000066] text-white'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Deals List */}
        <div className="space-y-4">
          {filteredDeals.map((deal) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl border border-gray-200 p-4 hover:border-[#000066]/30 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={deal.dealPictures?.[0] || 'default-image-url'}
                    alt={deal.dealName}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{deal.dealName}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {deal.shortDescription}
                  </p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm font-medium text-[#000066]">
                      ${deal.dealValue}
                    </span>
                    {deal.startDate && deal.endDate && (
                      <span className="text-xs text-gray-500">
                        {new Date(deal.startDate).toLocaleDateString()} - {new Date(deal.endDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => {
                    setSelectedDeal(deal);
                    setShowEditDeal(true);
                  }}
                  className="px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                  Edit
                </button>
              </div>
            </motion.div>
          ))}

          {filteredDeals.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No deals found</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <AddDealModal
        isOpen={showAddDeal}
        onClose={() => setShowAddDeal(false)}
        onSubmit={handleAddDeal}
      />

      <EditDealModal
        isOpen={showEditDeal}
        onClose={() => {
          setShowEditDeal(false);
          setSelectedDeal(null);
        }}
        onSubmit={handleEditDeal}
        deal={selectedDeal}
      />
    </Layout>
  );
};

export default Deals; 