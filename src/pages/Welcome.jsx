import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, LazyMotion, domAnimation } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from "../assets/loyalttyforweb.png";
import { BiStore, BiQrScan, BiStar, BiRocket, BiSupport, BiMobile, BiPlayCircle } from 'react-icons/bi';

const Welcome = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  // Optimized scroll handler with throttling
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const features = [
    {
      title: 'Smart Digital Menu',
      description: 'Create beautiful digital menus with real-time updates, dynamic pricing, and inventory management.',
      icon: BiStore,
      color: 'bg-blue-50 text-blue-600 border-blue-200'
    },
    {
      title: 'Advanced QR Integration',
      description: 'Generate dynamic QR codes with analytics tracking and customizable landing pages.',
      icon: BiQrScan,
      color: 'bg-purple-50 text-purple-600 border-purple-200'
    },
    {
      title: 'Intelligent Loyaltty System',
      description: 'AI-powered loyaltty program with personalized rewards and customer behavior analytics.',
      icon: BiStar,
      color: 'bg-yellow-50 text-yellow-600 border-yellow-200'
    },
    {
      title: 'Mobile App Integration',
      description: 'Native mobile apps for both customers and business owners with real-time sync.',
      icon: BiMobile,
      color: 'bg-green-50 text-green-600 border-green-200'
    },
    {
      title: '24/7 Support',
      description: 'Dedicated customer success team and comprehensive knowledge base.',
      icon: BiSupport,
      color: 'bg-red-50 text-red-600 border-red-200'
    },
    {
      title: 'Quick Setup',
      description: 'Get started in minutes with our guided onboarding process.',
      icon: BiRocket,
      color: 'bg-indigo-50 text-indigo-600 border-indigo-200'
    }
  ];

  return (
    <LazyMotion features={domAnimation}>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
        {/* Optimized Background Pattern */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:14px_14px] xs:bg-[size:18px_18px] sm:bg-[size:24px_24px]" />
          <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#000066] opacity-[0.12] blur-[100px] sm:blur-[120px] transform-gpu" />
          <div className="absolute -right-32 top-1/4 -z-10 h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#4169E1] opacity-[0.12] blur-[100px] sm:blur-[120px] transform-gpu" />
          <div className="absolute -left-32 bottom-1/4 -z-10 h-[250px] w-[250px] sm:h-[400px] sm:w-[400px] rounded-full bg-[#000066] opacity-[0.12] blur-[100px] sm:blur-[120px] transform-gpu" />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Fixed Header */}
          <header
            className={`fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-lg z-50 transition-all duration-300 ${
              isScrolled ? "shadow-lg" : ""
            }`}
          >
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex justify-between items-center h-16 sm:h-20">
                <motion.div
                  className="flex items-center space-x-3"
                  whileHover={{ scale: 1.02 }}
                  transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                  <img 
                    src={logo} 
                    alt="Loyaltty" 
                    className="w-28 xs:w-32 sm:w-36"
                    loading="eager"
                  />
                </motion.div>
                <div className="flex items-center space-x-3 sm:space-x-8">
                  <Link
                    to="/login"
                    className="text-[#000066] hover:text-[#000066]/80 font-medium transition-colors block"
                  >
                    Log in
                  </Link>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      to="/business-info"
                      className="px-4 py-2 sm:px-6 sm:py-2.5 bg-[#000066] text-white rounded-xl font-medium hover:bg-[#000066]/90 transition-all shadow-md hover:shadow-xl active:shadow-inner"
                    >
                      Get Started
                    </Link>
                  </motion.div>
                </div>
              </div>
            </nav>
          </header>

          {/* Hero Section with Optimized Animations */}
          <div className="pt-28 xs:pt-32 sm:pt-40 lg:pt-48 pb-16 sm:pb-20 lg:pb-28">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center max-w-4xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  className="mb-4"
                >
                  <span className="inline-block px-4 py-1.5 rounded-full text-sm font-medium bg-[#000066]/10 text-[#000066]">
                    New: AI-Powered Analytics Now Available
                  </span>
                </motion.div>
                <motion.h1
                  className="text-3xl xs:text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight bg-clip-text text-transparent bg-gradient-to-r from-[#000066] to-[#4169E1]"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Transform Your Business with Smart Digital Solutions
                </motion.h1>
                <motion.p
                  className="mt-6 text-base xs:text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Elevate your business with our comprehensive digital menu
                  system, AI-driven loyaltty program, and powerful analytics.
                  Perfect for modern restaurants and retail businesses.
                </motion.p>
                <motion.div
                  className="mt-8 sm:mt-10 flex flex-col xs:flex-row justify-center gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      to="/business-info"
                      className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-[#000066] text-white rounded-xl font-semibold hover:bg-[#000066]/90 transition-all shadow-lg hover:shadow-xl active:shadow-inner flex items-center justify-center gap-2"
                    >
                      <span>Get Started for Free</span>
                      <BiRocket className="w-5 h-5" />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  >
                    <Link
                      to="/demo"
                      className="w-full xs:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-[#000066] text-[#000066] rounded-xl font-semibold hover:bg-[#000066]/5 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Watch Demo</span>
                      <BiPlayCircle className="w-5 h-5" />
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>

          {/* Features Section with Optimized Grid */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5 }}
              className="text-center mb-12 sm:mb-16"
            >
              <h2 className="text-2xl xs:text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Everything You Need to Succeed
              </h2>
              <p className="text-base xs:text-lg text-gray-600 max-w-2xl mx-auto">
                Comprehensive tools and features designed to help your business
                thrive in the digital age
              </p>
            </motion.div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50 shadow-lg hover:shadow-xl transition-all"
                >
                  <div
                    className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl ${feature.color} border flex items-center justify-center mb-6`}
                  >
                    <feature.icon className="w-6 h-6 sm:w-7 sm:h-7" />
                  </div>
                  <h3 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-sm xs:text-base text-gray-600">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Responsive Footer */}
          <footer className="bg-white/90 backdrop-blur-md border-t border-gray-200/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
                <div className="col-span-2 xs:col-span-2 sm:col-span-1 space-y-4">
                  <img 
                    src={logo} 
                    alt="Loyaltty" 
                    className="w-28 xs:w-32"
                    loading="lazy"
                  />
                  <p className="text-sm text-gray-600">
                    Empowering businesses with smart digital solutions since 2024.
                  </p>
                  <div className="flex space-x-4">
                    {["twitter", "facebook", "linkedin", "instagram"].map(
                      (social) => (
                        <Link
                          key={social}
                          to={`https://${social}.com`}
                          className="text-gray-400 hover:text-[#000066] transition-colors"
                          aria-label={`Visit our ${social} page`}
                        >
                          <i className={`fab fa-${social} text-xl`}></i>
                        </Link>
                      )
                    )}
                  </div>
                </div>

                {[
                  {
                    title: "Product",
                    items: ["Features", "Pricing", "Demo", "API"]
                  },
                  {
                    title: "Company",
                    items: ["About", "Blog", "Careers", "Contact"]
                  },
                  {
                    title: "Legal",
                    items: ["Privacy", "Terms", "Security", "Cookies"]
                  }
                ].map((section) => (
                  <div key={section.title} className="col-span-1">
                    <h3 className="font-semibold text-gray-900 mb-4">
                      {section.title}
                    </h3>
                    <ul className="space-y-2">
                      {section.items.map((item) => (
                        <li key={item}>
                          <Link
                            to={`/${item.toLowerCase()}`}
                            className="text-sm text-gray-600 hover:text-[#000066] transition-colors"
                          >
                            {item}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>

              <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-gray-200/50">
                <div className="flex flex-col xs:flex-row justify-between items-center gap-4">
                  <p className="text-sm text-gray-600 text-center xs:text-left">
                    © 2024 Loyaltty. All rights reserved.
                  </p>
                  <div className="flex flex-col xs:flex-row items-center gap-4">
                    <select className="text-sm text-gray-600 bg-transparent border border-gray-200 rounded-lg px-3 py-1">
                      <option>English (US)</option>
                      <option>Español</option>
                      <option>Français</option>
                    </select>
                    <select className="text-sm text-gray-600 bg-transparent border border-gray-200 rounded-lg px-3 py-1">
                      <option>USD ($)</option>
                      <option>EUR (€)</option>
                      <option>GBP (£)</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </LazyMotion>
  );
};

export default Welcome;