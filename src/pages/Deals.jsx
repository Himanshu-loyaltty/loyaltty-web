import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiEdit, BiTrash, BiPlus, BiX } from 'react-icons/bi';
import Layout from '../components/Layout';
import AddDealModal from '../components/AddDealModal';
import EditDealModal from '../components/EditDealModal';
import { useNavigate } from 'react-router-dom';
import { useDeals } from '../context/DealsContext';
import DealStats from '../components/DealStats';

const DeleteConfirmationModal = ({ isOpen, onClose, onConfirm, dealName }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6"
        >
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <BiX className="h-6 w-6" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
              <BiTrash className="h-6 w-6 text-red-600" />
            </div>
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
              <h3 className="text-lg font-semibold leading-6 text-gray-900">
                Delete Deal
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to delete "{dealName}"? This action cannot be undone.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse gap-3">
            <button
              onClick={onConfirm}
              className="inline-flex w-full justify-center rounded-lg bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:w-auto"
            >
              Delete
            </button>
            <button
              onClick={onClose}
              className="mt-3 inline-flex w-full justify-center rounded-lg bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
            >
              Cancel
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const Deals = () => {
  const { deals, setDeals } = useDeals();
  const [activeTab, setActiveTab] = useState('All Deal');
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [showEditDeal, setShowEditDeal] = useState(false);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);
  const [dealToDelete, setDealToDelete] = useState(null);
  const navigate = useNavigate();

  const tabs = ['All Deal', 'Active Deal', 'Upcoming Deal', 'Past Deal'];

  const handleAddDeal = (dealData) => {
    setDeals(prevDeals => [...prevDeals, {
      id: Date.now(),
      ...dealData,
      status: 'Active Deal'
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

  const getStatusClass = (status) => {
    const statusClasses = {
      'Active Deal': 'bg-green-100 text-green-800',
      'Upcoming Deal': 'bg-blue-100 text-blue-800',
      'Past Deal': 'bg-gray-100 text-gray-800'
    };
    return statusClasses[status] || 'bg-gray-100 text-gray-800';
  };

  const filteredDeals = deals.filter(deal => 
    activeTab === 'All Deal' || deal.status === activeTab
  );

  const handleDeleteDeal = (deal) => {
    setDealToDelete(deal);
    setShowDeleteConfirmation(true);
  };

  const confirmDelete = () => {
    setDeals(prevDeals => prevDeals.filter(deal => deal.id !== dealToDelete.id));
    setShowDeleteConfirmation(false);
    setDealToDelete(null);
  };

  return (
    <Layout>
      <div className="p-6">
        {/* Header with Tabs */}
        <div className="bg-[#000066] text-white px-6 py-4 rounded-lg mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-2xl font-bold mb-1">Deals</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-2 bg-white/10 p-1 rounded-lg">
              {tabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                    activeTab === tab
                      ? 'bg-white text-[#000066]'
                      : 'text-white/80 hover:bg-white/20'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
            <button
              onClick={() => setShowAddDeal(true)}
              className="px-4 py-2 bg-white text-[#000066] rounded-lg hover:bg-white/90 transition-colors flex items-center gap-2 text-sm font-medium"
            >
              <BiPlus className="w-5 h-5" />
              Add Deal
            </button>
          </div>
        </div>

        {/* Stats Section */}
        <DealStats deals={deals} />

        {/* Deals Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredDeals.map((deal) => (
            <motion.div
              key={deal.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-xl p-4 flex gap-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="w-32 h-32 rounded-lg overflow-hidden flex-shrink-0">
                <img
                  src={deal.image}
                  alt={deal.dealName}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {deal.dealName}
                      <span className={`ml-2 inline-block px-2 py-1 text-xs rounded-full ${getStatusClass(deal.status)}`}>
                        {deal.status}
                      </span>
                    </h3>
                    <div className="text-xs text-gray-500">
                      From: {deal.startDate} To: {deal.endDate}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setSelectedDeal(deal);
                        setShowEditDeal(true);
                      }}
                      className="p-1.5 text-gray-400 hover:text-[#000066] rounded-lg hover:bg-gray-50"
                    >
                      <BiEdit className="w-5 h-5" />
                    </button>
                    <button 
                      onClick={() => handleDeleteDeal(deal)}
                      className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-gray-50"
                    >
                      <BiTrash className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                
                <p className="text-sm text-gray-600 mb-3">
                  {deal.description}
                </p>
                
                <div className="text-lg font-semibold text-[#ff6b6b]">
                  ${deal.dealValue} Off
                </div>
                
                <button 
                  onClick={() => navigate(`/deals/${deal.id}`)}
                  className="mt-2 text-sm text-[#000066] font-medium hover:underline"
                >
                  View Full Detail
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredDeals.length === 0 && (
          <div className="bg-white rounded-xl p-8 text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No deals found</h3>
            <p className="text-gray-500 mb-4">Get started by creating your first deal</p>
            <button
              onClick={() => setShowAddDeal(true)}
              className="inline-flex items-center px-4 py-2 bg-[#000066] text-white rounded-lg hover:bg-[#000066]/90"
            >
              <BiPlus className="w-5 h-5 mr-2" />
              Add New Deal
            </button>
          </div>
        )}

        {/* Modals */}
        <AnimatePresence>
          {showDeleteConfirmation && (
            <DeleteConfirmationModal
              isOpen={showDeleteConfirmation}
              onClose={() => {
                setShowDeleteConfirmation(false);
                setDealToDelete(null);
              }}
              onConfirm={confirmDelete}
              dealName={dealToDelete?.dealName}
            />
          )}
        </AnimatePresence>

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
      </div>
    </Layout>
  );
};

export default Deals; 