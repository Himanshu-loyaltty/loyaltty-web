import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  BiHomeAlt, 
  BiBell, 
  BiLineChart, 
  BiCog, 
  BiMenu, 
  BiX, 
  BiUser,
  BiLogOut,
  BiStore,
  BiChevronDown
} from 'react-icons/bi';
import logo from "../assets/loyalttyforweb.png";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileProfileOpen, setIsMobileProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { 
      name: 'Dashboard', 
      icon: BiHomeAlt, 
      path: '/dashboard',
      description: 'Overview of your business'
    },
    { 
      name: 'Deals', 
      icon: BiStore, 
      path: '/deals',
      description: 'Manage your deals and offers',
      badge: 2
    },
    { 
      name: 'Notifications', 
      icon: BiBell, 
      path: '/notifications',
      description: 'View your alerts',
      badge: 3
    },
    { 
      name: 'Analytics', 
      icon: BiLineChart, 
      path: '/analytics',
      description: 'Business insights and reports'
    },
    { 
      name: 'Settings', 
      icon: BiCog, 
      path: '/settings',
      description: 'Manage your preferences'
    },
  ];

  const handleLogout = () => {
    navigate('/login');
  };

  const isActive = (path) => location.pathname === path;

  const ProfileDropdown = ({ onClose, isMobile = false }) => (
    <div className={`${isMobile ? 'absolute top-16 left-0 right-0 mx-4' : 'absolute bottom-full left-0 right-0 mb-2'} bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden`}>
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 rounded-full bg-[#000066] text-white flex items-center justify-center">
            <BiUser className="w-5 h-5" />
          </div>
          <div>
            <p className="font-medium text-gray-900">John Doe</p>
            <p className="text-sm text-gray-500">john@example.com</p>
          </div>
        </div>
        <div className="text-xs text-gray-500">
          Store: <span className="font-medium text-gray-700">My Store Name</span>
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
    </div>
  );

  return (
    <>
      {/* Desktop Navbar */}
      <nav className="hidden lg:flex fixed left-0 top-0 h-screen w-64 bg-white border-r border-gray-200">
        <div className="w-full flex flex-col">
          {/* Logo Section */}
          <div className="px-6 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-3">
              <img src={logo} alt="Loyaltty Logo" className="w-34" />
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 p-4 space-y-1">
            {navigationItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all group relative ${
                  isActive(item.path)
                    ? 'bg-[#000066] text-white'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <item.icon className={`w-5 h-5 transition-colors ${
                  isActive(item.path) ? 'text-white' : 'text-gray-400 group-hover:text-[#000066]'
                }`} />
                <div className="flex-1">
                  <span className="font-medium">{item.name}</span>
                  <p className={`text-xs ${
                    isActive(item.path) ? 'text-white/80' : 'text-gray-400'
                  }`}>
                    {item.description}
                  </p>
                </div>
                {item.badge && (
                  <span className={`px-2 py-0.5 rounded-full text-xs ${
                    isActive(item.path)
                      ? 'bg-white text-[#000066]'
                      : 'bg-[#000066] text-white'
                  }`}>
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* User Profile Section */}
          <div className="p-4 border-t border-gray-100">
            <div className="relative">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-[#000066] text-white flex items-center justify-center flex-shrink-0">
                  <BiUser className="w-5 h-5" />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-medium text-gray-900">John Doe</p>
                  <p className="text-xs text-gray-500">Store Manager</p>
                </div>
                <BiChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${
                  isProfileOpen ? 'rotate-180' : ''
                }`} />
              </button>

              {isProfileOpen && (
                <ProfileDropdown onClose={() => setIsProfileOpen(false)} />
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navbar */}
      <div className="lg:hidden">
        {/* Top Bar */}
        <div className="fixed top-0 left-0 right-0 h-16 bg-white border-b border-gray-200 px-4 flex items-center justify-between z-50">
          <Link to="/" className="flex items-center gap-2">
            <img src={logo} alt="Loyaltty Logo" className="w-20" />
          </Link>
          <div className="flex items-center gap-2">
            <Link to="/notifications" className="relative p-2">
              <BiBell className="w-6 h-6 text-gray-600" />
              {navigationItems.find(item => item.name === 'Notifications')?.badge && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-[#000066] text-white text-xs rounded-full flex items-center justify-center">
                  {navigationItems.find(item => item.name === 'Notifications')?.badge}
                </span>
              )}
            </Link>
            <button
              onClick={() => setIsMobileProfileOpen(!isMobileProfileOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors relative"
            >
              <BiUser className="w-6 h-6 text-gray-600" />
            </button>
          </div>
          
          {isMobileProfileOpen && (
            <ProfileDropdown 
              onClose={() => setIsMobileProfileOpen(false)} 
              isMobile={true}
            />
          )}
        </div>

        {/* Content Padding for Fixed Header */}
        <div className="pt-2 pb-14"></div>

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50">
          <div className="flex justify-around items-center h-16">
            {navigationItems.filter(item => item.name !== 'Notifications').map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex flex-col items-center justify-center flex-1 h-full relative"
              >
                <item.icon className={`w-5 h-5 ${
                  isActive(item.path) ? 'text-[#000066]' : 'text-gray-400'
                }`} />
                <span className={`text-xs mt-1 ${
                  isActive(item.path) ? 'text-[#000066] font-medium' : 'text-gray-600'
                }`}>
                  {item.name}
                </span>
                {item.badge && (
                  <span className="absolute top-1 right-1/4 px-1.5 py-0.5 rounded-full text-[10px] bg-[#000066] text-white">
                    {item.badge}
                  </span>
                )}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;