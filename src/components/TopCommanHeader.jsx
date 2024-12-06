import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiSearch, BiBell, BiCog, BiChevronDown, BiPackage, BiTime, BiLogOut, BiUser } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';

const TopCommanHeader = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const navigate = useNavigate();

  // Fake notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'deal_redeemed',
      title: 'Welcome Deal Redeemed',
      message: 'John Smith just redeemed your welcome deal',
      time: '2 min ago',
      icon: <BiPackage className="w-8 h-8 text-green-500" />,
      unread: true
    },
    {
      id: 2,
      type: 'deal_expiring',
      title: 'Deal Expiring Soon',
      message: 'Your "Summer Special" deal expires in 2 days',
      time: '1 hour ago',
      icon: <BiTime className="w-8 h-8 text-orange-500" />,
      unread: true
    },
    {
      id: 3,
      type: 'deal_redeemed',
      title: 'Deal Redeemed',
      message: 'Sarah Johnson redeemed "Buy 1 Get 1 Free"',
      time: '3 hours ago',
      icon: <BiPackage className="w-8 h-8 text-green-500" />,
      unread: false
    }
  ]);

  const handleMarkAllAsRead = () => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification => ({
        ...notification,
        unread: false
      }))
    );
  };

  const handleNotificationClick = (notification) => {
    // Mark individual notification as read
    setNotifications(prevNotifications =>
      prevNotifications.map(n =>
        n.id === notification.id ? { ...n, unread: false } : n
      )
    );
    
    // Navigate based on notification type
    if (notification.type === 'deal_redeemed') {
      navigate('/deals');
    } else if (notification.type === 'deal_expiring') {
      navigate('/deals');
    }
  };

  const handleLogout = () => {
    // Add your logout logic here
    navigate('/login');
  };

  return (
    <div className="bg-white border-b border-gray-100 lg:fixed lg:top-0 lg:right-0 lg:left-64 lg:z-40">
      <div className="max-w-[1600px] mx-auto">
        {/* Desktop Header */}
        <div className="hidden lg:flex items-center justify-between h-[72px] px-6">
          {/* Left - Welcome Message */}
          <div>
            <h1 className="text-[20px] font-semibold text-[#15157B]">
              Welcome, John Doe <span className="wave-emoji">👋</span>
            </h1>
          </div>

          {/* Right - Search, Actions & Profile */}
          <div className="flex items-center gap-5">
            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search here..."
                className="w-[300px] xl:w-[400px] pl-11 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15157B]/10 focus:border-[#15157B] transition-colors"
              />
              <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <BiBell className="w-6 h-6" />
                {notifications.some((n) => n.unread) && (
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
                )}
              </button>

              {/* Notifications Dropdown */}
              <AnimatePresence>
                {showNotifications && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-[380px] bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900">
                          Notifications
                        </h3>
                        <button
                          onClick={handleMarkAllAsRead}
                          className="text-xs text-[#15157B] font-medium hover:text-[#15157B]/80"
                        >
                          Mark all as read
                        </button>
                      </div>
                    </div>
                    <div className="max-h-[380px] overflow-y-auto custom-scrollbar">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          onClick={() => handleNotificationClick(notification)}
                          className="p-4 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer"
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0 p-2 bg-gray-50 rounded-lg">
                              {notification.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium text-sm text-gray-900">
                                {notification.title}
                              </p>
                              <p className="text-sm text-gray-500 mt-0.5">
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                {notification.time}
                              </p>
                            </div>
                            {notification.unread && (
                              <span className="w-2 h-2 bg-[#15157B] rounded-full mt-2" />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="p-4 border-t border-gray-100 bg-gray-50">
                      <Link
                        to="/notifications"
                        className="text-sm text-[#15157B] hover:text-[#15157B]/80 font-medium"
                      >
                        View all notifications
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Settings */}
            <button
              onClick={() => navigate("/settings")}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <BiCog className="w-6 h-6" />
            </button>

            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => setShowProfileMenu(!showProfileMenu)}
                className="flex items-center gap-2 p-1 hover:bg-gray-50 rounded-lg transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#000066] text-white flex items-center justify-center flex-shrink-0">
                  <BiUser className="w-5 h-5" />
                </div>
                <BiChevronDown
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                    showProfileMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* Profile Dropdown */}
              <AnimatePresence>
                {showProfileMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden"
                  >
                    <div className="p-4 border-b border-gray-100">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-[#000066] text-white flex items-center justify-center flex-shrink-0">
                          <BiUser className="w-5 h-5" />
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">John Doe</p>
                          <p className="text-sm text-gray-500">
                            John Doe@example.com
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <BiLogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="lg:hidden flex items-center justify-between h-[64px] px-4">
          <h1 className="text-base font-semibold text-[#15157B]">
            Welcome, John <span className="wave-emoji">👋</span>
          </h1>

          {/* Mobile Search Button */}
          <button
            onClick={() => setShowMobileSearch(!showMobileSearch)}
            className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <BiSearch className="w-5 h-5" />
          </button>
        </div>

        {/* Mobile Search Expandable */}
        <AnimatePresence>
          {showMobileSearch && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden px-4 pb-4"
            >
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search here..."
                  className="w-full pl-11 pr-4 py-2.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#15157B]/10 focus:border-[#15157B] transition-colors"
                  autoFocus
                />
                <BiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default TopCommanHeader; 