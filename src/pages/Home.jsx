import React, { useState, Suspense, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { BiQrScan, BiPlus, BiEdit, BiX, BiCalendar } from 'react-icons/bi';
import Layout from '../components/Layout';
import QRCode from 'react-qr-code';
import logo from "../assets/loyaltty100x100.png";
import { useReactToPrint } from 'react-to-print';
import ReactDOM from 'react-dom';
import WelcomeDealModal from '../components/WelcomeDealModal';
import AddDealModal from '../components/AddDealModal';
import EditDealModal from '../components/EditDealModal';
import TopCommanHeader from '../components/TopCommanHeader';
import AnalyticsCards from '../components/AnalyticsCards';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import QuickActionPopup from '../components/QuickActionPopup';
import { FaStamp, FaCoins } from 'react-icons/fa';

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

const redemptionData = [
  { period: '01', redemptions: 4000 },
  { period: '02', redemptions: 6000 },
  { period: '03', redemptions: 4000 },
  { period: '04', redemptions: 8000 },
  { period: '05', redemptions: 6000 },
  { period: '06', redemptions: 4000 },
  { period: '07', redemptions: 6000 },
  { period: '08', redemptions: 8000 },
  { period: '09', redemptions: 6000 },
];

const Home = () => {
  const [activeTab, setActiveTab] = useState('Active Deals');
  const [qrError, setQrError] = useState(false);
  const printRef = useRef();
  const [showWelcomeDeal, setShowWelcomeDeal] = useState(true);
  const [showAddDeal, setShowAddDeal] = useState(false);
  const [hasWelcomeDeal, setHasWelcomeDeal] = useState(false);
  const [deals, setDeals] = useState([]);
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [showEditDeal, setShowEditDeal] = useState(false);
  const [timeFilter, setTimeFilter] = useState('week');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isQuickActionOpen, setIsQuickActionOpen] = useState(false);
  const [quickActionTitle, setQuickActionTitle] = useState('');

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

  useEffect(() => {
    const welcomeDealStatus = localStorage.getItem('welcomeDealStatus');
    const isFromBusinessInfo = sessionStorage.getItem('fromBusinessInfo');
    
    // Show welcome deal modal only if coming from business info and no welcome deal exists
    if (isFromBusinessInfo === 'true' && welcomeDealStatus !== 'created') {
      setShowWelcomeDeal(true);
      // Clear the navigation flag
      sessionStorage.removeItem('fromBusinessInfo');
    }

    if (welcomeDealStatus === 'created') {
      setHasWelcomeDeal(true);
    }
  }, []);

  const handleAddDealClick = () => {
    // Check if welcome deal exists
    const welcomeDealExists = deals.some(deal => deal.type === 'Welcome Deal');
    const welcomeDealStatus = localStorage.getItem('welcomeDealStatus');

    if (!welcomeDealExists && welcomeDealStatus !== 'created') {
      // If no welcome deal, show welcome deal modal
      setShowWelcomeDeal(true);
    } else {
      // If welcome deal exists, show regular deal modal
      setShowAddDeal(true);
    }
  };

  const handleCreateWelcomeDeal = (dealData) => {
    console.log('Creating welcome deal:', dealData);
    const welcomeDeal = {
      id: Date.now(),
      name: dealData.dealName || 'Welcome Deal',
      price: dealData.value,
      image: dealData.images?.[0]?.url || 'default-image-url',
      type: 'Welcome Deal',
      status: 'active'
    };

    // Update deals list
    setDeals(prevDeals => {
      // Remove any existing welcome deals first
      const regularDeals = prevDeals.filter(deal => deal.type !== 'Welcome Deal');
      return [welcomeDeal, ...regularDeals];
    });
    
    // Mark welcome deal as created
    localStorage.setItem('welcomeDealStatus', 'created');
    setHasWelcomeDeal(true);
    setShowWelcomeDeal(false);
  };

  const handleCreateDeal = (dealData) => {
    console.log('Creating new deal:', dealData);
    // Create a new deal object with the submitted data
    const newDeal = {
      id: Date.now(),
      name: dealData.dealName,
      price: dealData.dealValue,
      image: dealData.dealPictures[0] || 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=3270&auto=format&fit=crop',
      from: dealData.startDate,
      to: dealData.endDate,
      type: 'Regular Deal',
      status: 'active'
    };

    // Add the new deal to the deals list
    setDeals(prevDeals => [...prevDeals, newDeal]);
    
    // Close the modal
    setShowAddDeal(false);
  };

  const handleEditDeal = (dealData) => {
    setDeals(prevDeals => 
      prevDeals.map(deal => 
        deal.id === dealData.id 
          ? {
              ...deal,
              name: dealData.dealName,
              price: dealData.dealValue,
              image: dealData.dealPictures[0]?.url || deal.image,
              from: dealData.startDate,
              to: dealData.endDate,
              description: dealData.shortDescription,
              fullDetails: dealData.fullDetails,
              terms: dealData.termsAndConditions,
              repeatDays: dealData.repeatDays
            }
          : deal
      )
    );
  };

  const handleEditClick = (deal, e) => {
    e.stopPropagation();
    setSelectedDeal(deal);
    setShowEditDeal(true);
  };

  const filteredDeals = deals.filter(deal => {
    const today = new Date();
    const startDate = deal.from ? new Date(deal.from) : null;
    const endDate = deal.to ? new Date(deal.to) : null;

    switch (activeTab) {
      case 'Active Deals':
        return deal.type === 'Welcome Deal' || 
          (startDate <= today && endDate >= today);
      case 'Upcoming Deals':
        return startDate && startDate > today;
      case 'Past Deals':
        return endDate && endDate < today;
      default:
        return true;
    }
  });

  const handleTimeFilterChange = (filter) => {
    setTimeFilter(filter);
    if (filter !== 'custom') {
      setShowDatePicker(false);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setShowDatePicker(false);
    setTimeFilter('custom');
  };

  const handleQuickAction = (title) => {
    setQuickActionTitle(title);
    setIsQuickActionOpen(true);
  };

  return (
    <Layout>
      {/* <TopCommanHeader /> */}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-8">
        {/* Store Header */}
        <div className="bg-[#000066] text-white px-4 py-3 rounded-lg mb-4 sm:mb-8">
          <h1 className="text-xl sm:text-2xl font-bold">Dashboard</h1>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-8">
          {/* Left Column - Analytics Counts */}
          <div className="lg:col-span-1">
            <div className="w-full flex flex-wrap sm:flex-nowrap justify-between rounded-full p-1 bg-gray-100 mb-4">
              <button
                onClick={() => handleTimeFilterChange("week")}
                className={`flex-1 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  timeFilter === "week"
                    ? "bg-[#000066] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Last Week
              </button>
              <button
                onClick={() => handleTimeFilterChange("month")}
                className={`flex-1 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  timeFilter === "month"
                    ? "bg-[#000066] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                Last Month
              </button>
              <button
                onClick={() => handleTimeFilterChange("all")}
                className={`flex-1 px-3 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors ${
                  timeFilter === "all"
                    ? "bg-[#000066] text-white"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                All
              </button>
              <div className="relative">
                <button
                  onClick={() => setShowDatePicker(!showDatePicker)}
                  className={`p-2 rounded-full transition-colors ${
                    timeFilter === "custom"
                      ? "bg-[#000066] text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  <BiCalendar className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                {showDatePicker && (
                  <div className="absolute right-0 mt-2 z-10">
                    <DatePicker
                      selected={selectedDate}
                      onChange={handleDateChange}
                      inline
                      calendarClassName="bg-white shadow-lg rounded-lg border border-gray-200"
                    />
                  </div>
                )}
              </div>
            </div>
            <AnalyticsCards timeFilter={timeFilter} />
            {/* Quick Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-4">
              <button
                onClick={() => handleQuickAction("Give Stamps")}
                className="p-3 sm:p-4 bg-blue-50 rounded-xl text-blue-600 text-sm sm:text-base font-medium hover:bg-blue-100 transition-colors flex items-center justify-center gap-2 border-[1.5px] border-blue-300 hover:border-blue-400"
              >
                <span>🎟️</span>
                Give Stamps
              </button>
              <button
                onClick={() => handleQuickAction("Give Stamps")}
                className="p-3 sm:p-4 bg-yellow-50 rounded-xl text-yellow-600 text-sm sm:text-base font-medium hover:bg-yellow-100 transition-colors flex items-center justify-center gap-2 border-[1.5px] border-yellow-200 hover:border-yellow-300"
              >
                <span>⭐</span>
                Give Points
              </button>
            </div>
          </div>

          {/* Right Column - Deals */}
          <div className="lg:col-span-1">
            {/* Deals Tabs */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
              <div className="flex gap-2 mb-4 sm:mb-6 overflow-x-auto scrollbar-hide">
                {["Active Deals", "Upcoming Deals", "Past Deals"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 sm:px-4 py-2 rounded-full whitespace-nowrap text-xs sm:text-sm ${
                      activeTab === tab
                        ? "bg-[#000066] text-white"
                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                    } transition-colors`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Deals List */}
              <div className="space-y-3 sm:space-y-4">
                {filteredDeals.map((deal) => (
                  <motion.div
                    key={deal.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-3 sm:gap-4 p-3 sm:p-4 border border-gray-200 rounded-xl hover:border-[#000066]/30 transition-colors"
                  >
                    <img
                      src={deal.image}
                      alt={deal.name}
                      className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="min-w-0">
                          <h3 className="font-medium text-sm sm:text-base text-gray-900 truncate">
                            {deal.name}
                          </h3>
                          <p className="text-xs sm:text-sm text-gray-500 truncate">
                            From: {deal.from} To: {deal.to}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 ml-2">
                          <span className="text-[#000066] font-bold text-sm sm:text-base whitespace-nowrap">
                            ${deal.price}
                          </span>
                          <button
                            onClick={(e) => handleEditClick(deal, e)}
                            className="p-1 hover:bg-gray-100 rounded-lg transition-colors"
                          >
                            <BiEdit className="w-4 h-4 text-gray-600" />
                          </button>
                        </div>
                      </div>
                      <div className="mt-2">
                        <span className="text-xs sm:text-sm text-[#000066]">
                          {deal.type}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Add Deal Button */}
                <button
                  onClick={handleAddDealClick}
                  className="w-full flex items-center justify-center gap-2 p-3 sm:p-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-[#000066] hover:text-[#000066] transition-colors text-sm sm:text-base"
                >
                  <BiPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                  {!hasWelcomeDeal ? "Add Welcome Deal" : "Add Deal"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Analytics Graphs */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4 sm:mb-6">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                  Overview of Redemption Overtime
                </h2>
                <select
                  className="px-3 sm:px-4 py-2 border border-gray-200 rounded-lg text-sm sm:text-base text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#000066]/20"
                  defaultValue="this-week"
                >
                  <option value="this-week">This Week</option>
                  <option value="this-month">This Month</option>
                  <option value="this-year">This Year</option>
                </select>
              </div>

              <div className="h-[250px] sm:h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={redemptionData}
                    margin={{
                      top: 10,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <defs>
                      <linearGradient
                        id="redemptionGradient"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#000066"
                          stopOpacity={0.1}
                        />
                        <stop
                          offset="95%"
                          stopColor="#000066"
                          stopOpacity={0.01}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#E5E7EB"
                    />
                    <XAxis
                      dataKey="period"
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280", fontSize: 11 }}
                      dy={10}
                    />
                    <YAxis
                      axisLine={false}
                      tickLine={false}
                      tick={{ fill: "#6B7280", fontSize: 11 }}
                      dx={-10}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #E5E7EB",
                        borderRadius: "8px",
                        boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="redemptions"
                      stroke="#000066"
                      strokeWidth={2}
                      fill="url(#redemptionGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          {/* Left Column - QR Code & Quick Actions */}
          <div className="lg:col-span-1">
            {/* QR Code Section */}
            <div className="bg-white rounded-xl border border-gray-200 p-4 sm:p-6">
              <div className="flex flex-col items-center">
                <div className="w-full max-w-[200px] sm:max-w-[250px]">
                  {!qrError ? (
                    <QRCodeWithFallback
                      value="https://example.com/menu"
                      size={200}
                    />
                  ) : (
                    <div className="text-red-500 text-sm sm:text-base">
                      Failed to generate QR code
                    </div>
                  )}
                </div>

                <p className="text-center text-gray-600 text-sm sm:text-base mt-4 sm:mt-6 mb-4 sm:mb-6">
                  Scan this QR code to get amazing deals
                </p>

                <div className="flex gap-3 sm:gap-4 w-full">
                  <button
                    onClick={() => handlePrintAction("store")}
                    className="flex-1 px-3 sm:px-4 py-2 border border-[#000066] text-[#000066] text-sm sm:text-base rounded-lg hover:bg-[#000066]/5 transition-colors"
                  >
                    Print Store
                  </button>
                  <button
                    onClick={() => handlePrintAction("qr")}
                    className="flex-1 px-3 sm:px-4 py-2 bg-[#000066] text-white text-sm sm:text-base rounded-lg hover:bg-[#000066]/90 transition-colors"
                  >
                    Print QR
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Print Content */}
      <div style={{ display: "none" }}>
        <PrintView
          ref={printRef}
          type="store"
          storeName="Store Name"
          deals={deals}
        />
      </div>

      {/* Welcome Deal Modal */}
      <WelcomeDealModal
        isOpen={showWelcomeDeal}
        onClose={() => {
          setShowWelcomeDeal(false);
          localStorage.setItem("welcomeDealStatus", "skipped");
        }}
        onSubmit={handleCreateWelcomeDeal}
      />

      <AddDealModal
        isOpen={showAddDeal}
        onClose={() => setShowAddDeal(false)}
        onSubmit={handleCreateDeal}
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

      {/* Quick Action Popup */}
      <QuickActionPopup
        isOpen={isQuickActionOpen}
        onClose={() => setIsQuickActionOpen(false)}
        title={quickActionTitle}
      />
    </Layout>
  );
};

export default Home;