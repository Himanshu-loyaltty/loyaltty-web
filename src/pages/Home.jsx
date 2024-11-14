import React, { useState, Suspense, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BiQrScan, BiPlus, BiEdit, BiX } from 'react-icons/bi';
import Layout from '../components/Layout';
import QRCode from 'react-qr-code';
import logo from "../assets/loyaltty100x100.png";
import { useReactToPrint } from 'react-to-print';
import ReactDOM from 'react-dom';

const QRCodeWithFallback = ({ value, size }) => {
  return (
    <Suspense fallback={
      <div className="w-full h-full bg-gray-100 rounded-lg animate-pulse flex items-center justify-center">
        <span className="text-gray-400">Loading QR Code...</span>
      </div>
    }>
      <div className="p-6 bg-white rounded-xl border border-gray-200">
        <QRCode 
          value={value} 
          size={size}
          level="H"
          style={{ height: "auto", maxWidth: "100%", width: "100%" }}
        />
      </div>
    </Suspense>
  );
};

// Create a PrintView component for the store information
const PrintView = React.forwardRef(({ type, storeName, deals }, ref) => {
  return (
    <div ref={ref} className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-8">{storeName}</h1>
      
      {/* QR Code Section */}
      <div className="flex flex-col items-center mb-8">
        <QRCode
          value="https://example.com/menu"
          size={200}
          level="H"
          className="mb-4"
        />
        <p className="text-gray-600 text-center">
          Scan this QR code to get amazing deals
        </p>
      </div>

      {type === 'store' && (
        <div className="space-y-6">
          <h2 className="text-xl font-semibold">Available Deals:</h2>
          <div className="space-y-4">
            {deals.map((deal) => (
              <div 
                key={deal.id}
                className="flex gap-4 p-4 border border-gray-200 rounded-xl"
              >
                <img
                  src={deal.image}
                  alt={deal.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{deal.name}</h3>
                      <p className="text-sm text-gray-500">
                        From: {deal.from} To: {deal.to}
                      </p>
                    </div>
                    <span className="font-bold">${deal.price}</span>
                  </div>
                  <p className="text-sm text-[#000066] mt-2">{deal.type}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
});

const Home = () => {
  const [activeTab, setActiveTab] = useState('Active Deals');
  const [qrError, setQrError] = useState(false);
  const printRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const handlePrintAction = (type) => {
    // Set up print content
    const printContent = (
      <PrintView
        ref={printRef}
        type={type}
        storeName="Store Name"
        deals={deals}
      />
    );

    // Render print content
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Print ${type === 'qr' ? 'QR Code' : 'Store'}</title>
          <link href="${window.location.origin}/index.css" rel="stylesheet" />
          <style>
            @media print {
              body { margin: 0; padding: 20mm; }
              img { max-width: 100%; }
            }
          </style>
        </head>
        <body>
          <div id="print-content"></div>
        </body>
      </html>
    `);

    // Render and print
    ReactDOM.render(printContent, printWindow.document.getElementById('print-content'), () => {
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
      }, 500);
    });
  };

  const deals = [
    {
      id: 1,
      name: 'Burger deal',
      price: 20,
      image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=3270&auto=format&fit=crop',
      from: '1/1/2023',
      to: '1/2/2023',
      type: 'Welcome Deals',
      status: 'active'
    }
  ];

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Store Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Store Name</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - QR Code & Quick Actions */}
          <div className="space-y-8">
            {/* QR Code Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex flex-col items-center">
                {!qrError ? (
                  <QRCodeWithFallback value="https://example.com/menu" size={200} />
                ) : (
                  <div className="text-red-500">Failed to generate QR code</div>
                )}
                
                <p className="text-center text-gray-600 mt-6 mb-6">
                  Scan this QR code to get amazing deals
                </p>
                
                <div className="flex gap-4 w-full">
                  <button 
                    onClick={() => handlePrintAction('store')}
                    className="flex-1 px-4 py-2 border border-[#000066] text-[#000066] rounded-lg hover:bg-[#000066]/5 transition-colors"
                  >
                    Print Store
                  </button>
                  <button 
                    onClick={() => handlePrintAction('qr')}
                    className="flex-1 px-4 py-2 bg-[#000066] text-white rounded-lg hover:bg-[#000066]/90 transition-colors"
                  >
                    Print QR
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-4">
              <button className="p-4 bg-blue-50 rounded-xl text-blue-600 font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 border-[1.5px] border-blue-300 hover:border-blue-400">
                <span>🎟️</span>
                Give Stamps
              </button>
              <button className="p-4 bg-yellow-50 rounded-xl text-yellow-600 font-medium hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2 border-[1.5px] border-yellow-200 hover:border-yellow-300">
                <span>⭐</span>
                Give Points
              </button>
            </div>
          </div>

          {/* Right Column - Deals */}
          <div className="lg:col-span-2">
            {/* Deals Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {['Active Deals', 'Upcoming Deals', 'Past Deals'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-full whitespace-nowrap ${
                      activeTab === tab 
                        ? 'bg-[#000066] text-white' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    } transition-colors`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Deals List */}
              <div className="space-y-4">
                {deals.map((deal) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-4 p-4 border border-gray-200 rounded-xl hover:border-[#000066]/30 transition-colors"
                  >
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-gray-900">{deal.name}</h3>
                          <p className="text-sm text-gray-500">
                            From: {deal.from} To: {deal.to}
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-[#000066] font-bold">${deal.price}</span>
                          <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors">
                            <BiEdit className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-sm text-[#000066]">{deal.type}</span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Add Deal Button */}
                <button className="w-full flex items-center justify-center gap-2 p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#000066] hover:text-[#000066] transition-colors">
                  <BiPlus className="w-5 h-5" />
                  Add Deals
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Print Content */}
      <div style={{ display: 'none' }}>
        <PrintView ref={printRef} type="store" storeName="Store Name" deals={deals} />
      </div>
    </Layout>
  );
};

export default Home;