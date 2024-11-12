import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { FiTwitter, FiFacebook, FiInstagram } from 'react-icons/fi';
import logo from "../assets/loyaltty1024x1024.png";
import BorderedBackButton from '../components/BorderedBackButton';

const ComingSoon = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      setError('Please enter your email');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    setError('');
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 3000);
  };

  const socialLinks = [
    { name: 'Twitter', icon: <FiTwitter size={20} />, url: '#twitter' },
    { name: 'Facebook', icon: <FiFacebook size={20} />, url: '#facebook' },
    { name: 'Instagram', icon: <FiInstagram size={20} />, url: '#instagram' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern - Adjusted for better responsiveness */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
      </div>

      {/* Main Content - Improved responsive layout */}
      <div className="relative min-h-screen flex items-center justify-center px-3 sm:px-4 py-16 sm:py-20">
        <motion.div 
          className="w-full max-w-[340px] xs:max-w-[400px] sm:max-w-[480px] mx-auto backdrop-blur-md bg-white/40 rounded-2xl sm:rounded-3xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] relative"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Replace custom back button with BorderedBackButton */}
          <BorderedBackButton onClick={() => navigate('/get-started')} />

          <div className="p-6 xs:p-8 sm:p-12 text-center mt-8 sm:mt-6">
            {/* Logo - Responsive sizing */}
            <motion.div 
              className="inline-block relative mb-8 sm:mb-12"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ 
                type: "spring",
                stiffness: 260,
                damping: 20 
              }}
            >
              <img
                className="w-20 h-20 xs:w-24 xs:h-24 sm:w-32 sm:h-32 object-contain relative z-10"
                src={logo}
                alt="Loyaltty"
              />
              <motion.div
                className="absolute inset-0 bg-[#000066]/10 rounded-full z-0 blur-lg sm:blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 0.3, 0.5]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>

            {/* Text Content - Responsive typography */}
            <motion.div
              className="space-y-6 sm:space-y-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h1 className="text-3xl xs:text-4xl sm:text-5xl font-bold text-gray-900 tracking-tight">
                Coming Soon
              </h1>
              <p className="text-base xs:text-lg text-gray-700 max-w-[280px] xs:max-w-sm mx-auto">
                We're working hard to bring you something amazing. Stay tuned!
              </p>

              {/* Email Form - Improved responsive layout */}
              <motion.form 
                className="mt-8 sm:mt-12"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <div className="flex flex-col gap-3 max-w-[280px] xs:max-w-md mx-auto sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="Enter your email"
                    className="flex-1 px-4 sm:px-5 py-3 sm:py-3.5 text-sm sm:text-base rounded-xl border border-gray-200 bg-white/80 backdrop-blur-sm focus:outline-none focus:border-[#000066] focus:ring-2 focus:ring-[#000066]/20 transition-all placeholder-gray-500 text-gray-900 shadow-sm"
                  />
                  <motion.button
                    type="submit"
                    className="px-5 sm:px-7 py-3 sm:py-3.5 bg-[#000066] text-white rounded-xl font-semibold hover:bg-[#000066]/90 transition-all disabled:opacity-50 shadow-sm hover:shadow-md text-sm sm:text-base whitespace-nowrap"
                    disabled={isSubmitted}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isSubmitted ? 'Subscribed!' : 'Notify Me'}
                  </motion.button>
                </div>

                {/* Error Message */}
                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="text-xs sm:text-sm text-red-500 mt-3"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.form>

              {/* Social Links - Responsive sizing */}
              <motion.div 
                className="flex justify-center gap-4 sm:gap-6 mt-8 sm:mt-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
              >
                {socialLinks.map(({ name, icon, url }, index) => (
                  <motion.a
                    key={name}
                    href={url}
                    className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-gray-200 bg-white/80 backdrop-blur-sm flex items-center justify-center text-gray-600 hover:bg-white hover:text-[#000066] hover:border-[#000066]/30 transition-all shadow-sm hover:shadow-md"
                    title={name}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    {React.cloneElement(icon, { 
                      size: window.innerWidth < 640 ? 16 : 20 
                    })}
                  </motion.a>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ComingSoon;