import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeCanvas } from 'qrcode.react';
import { 
  BiArrowBack, 
  BiCalendar, 
  BiEdit, 
  BiTrash, 
  BiShare,
  BiQr,
  BiCheck,
  BiX,
  BiDownload
} from 'react-icons/bi';
import Layout from '../components/Layout';
import { useDeals } from '../context/DealsContext';
import EditDealModal from '../components/EditDealModal';

// Add this function back before the DealDetail component
const getStatusColor = (status) => {
  switch (status) {
    case 'Active Deal': return 'bg-green-500';
    case 'Upcoming Deal': return 'bg-blue-500';
    case 'Past Deal': return 'bg-gray-500';
    default: return 'bg-gray-500';
  }
};

// Reuse DeleteConfirmationModal from Deals page
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

// Add QR Modal Component
const QRCodeModal = ({ isOpen, onClose, dealName, dealUrl }) => {
  if (!isOpen) return null;

  const handleDownload = () => {
    const canvas = document.getElementById('qr-code');
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    const downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${dealName}-qr.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
        <div className="fixed inset-0 bg-black/30 transition-opacity" onClick={onClose} />

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6"
        >
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              onClick={onClose}
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none"
            >
              <BiX className="h-6 w-6" />
            </button>
          </div>

          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              QR Code for {dealName}
            </h3>
            
            <div className="flex justify-center mb-4">
              <QRCodeCanvas
                id="qr-code"
                value={dealUrl}
                size={200}
                level="H"
                includeMargin={true}
                className="border p-2 rounded-lg"
              />
            </div>

            <p className="text-sm text-gray-500 mb-4">
              Scan this QR code to access the deal directly
            </p>

            <button
              onClick={handleDownload}
              className="inline-flex items-center justify-center w-full px-4 py-2 bg-[#000066] text-white rounded-lg hover:bg-[#000066]/90"
            >
              <BiDownload className="mr-2" />
              Download QR Code
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

const DealDetail = () => {
  const { deals, updateDeal, deleteDeal } = useDeals();
  const { id } = useParams();
  const navigate = useNavigate();
  const [showCopied, setShowCopied] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const deal = deals.find(d => d.id === parseInt(id));

  // Get the full URL for the deal
  const dealUrl = window.location.href;

  const handleShare = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setShowCopied(true);
    setTimeout(() => setShowCopied(false), 2000);
  };

  const handleEditDeal = (updatedDeal) => {
    updateDeal(updatedDeal);
    setShowEditModal(false);
  };

  const handleDeleteDeal = () => {
    deleteDeal(deal.id);
    setShowDeleteModal(false);
    navigate('/deals');
  };

  if (!deal) {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-white rounded-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Deal Not Found</h2>
            <p className="text-gray-500 mb-4">The deal you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/deals')}
              className="inline-flex items-center px-4 py-2 bg-[#000066] text-white rounded-lg hover:bg-[#000066]/90"
            >
              <BiArrowBack className="mr-2" /> Back to Deals
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6">
        {/* Header with Breadcrumb */}
        <div className="bg-[#000066] text-white px-6 py-4 rounded-lg mb-6">
          <div className="flex items-center gap-2 text-sm text-white/80">
            <button 
              onClick={() => navigate('/dashboard')}
              className="hover:text-white"
            >
              Dashboard
            </button>
            <span>/</span>
            <button 
              onClick={() => navigate('/deals')}
              className="hover:text-white"
            >
              Deals
            </button>
            <span>/</span>
            <span className="text-white font-medium">{deal.dealName}</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6">
          {/* Deal Header Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-xl shadow-sm overflow-hidden"
          >
            <div className="relative h-64 sm:h-80">
              <img
                src={deal.image}
                alt={deal.dealName}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex justify-between items-end">
                  <div>
                    <h1 className="text-3xl font-bold mb-2">{deal.dealName}</h1>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        deal.status === 'Active Deal' ? 'bg-green-500' :
                        deal.status === 'Upcoming Deal' ? 'bg-blue-500' :
                        'bg-gray-500'
                      }`}>
                        {deal.status}
                      </span>
                      <div className="flex items-center text-sm">
                        <BiCalendar className="mr-1" />
                        {deal.startDate} - {deal.endDate}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="border-t border-gray-100 p-4">
              <div className="flex flex-wrap gap-3">
                <button 
                  onClick={() => setShowEditModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-[#000066] text-white rounded-lg hover:bg-[#000066]/90"
                >
                  <BiEdit className="mr-2" /> Edit Deal
                </button>
                <button 
                  onClick={() => setShowDeleteModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
                >
                  <BiTrash className="mr-2" /> Delete Deal
                </button>
                <button 
                  onClick={handleShare}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <BiShare className="mr-2" />
                  {showCopied ? 'Copied!' : 'Share Deal'}
                </button>
                <button 
                  onClick={() => setShowQRModal(true)}
                  className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
                >
                  <BiQr className="mr-2" /> Generate QR
                </button>
              </div>
            </div>
          </motion.div>

          {/* Deal Description */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Deal Description</h2>
            <p className="text-gray-600 mb-6">{deal.longDescription}</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Terms & Conditions</h3>
              <ul className="space-y-2">
                {deal.terms.map((term, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-600">
                    <BiCheck className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-xl font-semibold mb-4">Categories</h2>
            <div className="flex flex-wrap gap-2">
              {deal.categories.map((category, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                >
                  {category}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Modals */}
        <AnimatePresence>
          {showDeleteModal && (
            <DeleteConfirmationModal
              isOpen={showDeleteModal}
              onClose={() => setShowDeleteModal(false)}
              onConfirm={handleDeleteDeal}
              dealName={deal.dealName}
            />
          )}
        </AnimatePresence>

        <EditDealModal
          isOpen={showEditModal}
          onClose={() => setShowEditModal(false)}
          onSubmit={handleEditDeal}
          deal={deal}
        />

        {/* Add QR Modal */}
        <AnimatePresence>
          {showQRModal && (
            <QRCodeModal
              isOpen={showQRModal}
              onClose={() => setShowQRModal(false)}
              dealName={deal.dealName}
              dealUrl={dealUrl}
            />
          )}
        </AnimatePresence>
      </div>
    </Layout>
  );
};

export default DealDetail; 