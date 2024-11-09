import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';
import logo from "../assets/loyaltty1024x1024.png";

const BorderedBackButton = ({ onClick }) => (
  <motion.button
    onClick={onClick}
    className="absolute left-4 sm:left-8 top-6 sm:top-8 p-2 rounded-full border border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 group"
    whileTap={{ scale: 0.95 }}
  >
    <BiArrowBack 
      size={18} 
      className="text-gray-500 group-hover:text-gray-700 transition-colors" 
    />
  </motion.button>
);

const ForgotPassword = ({ userType }) => {
  const [emailPhone, setEmailPhone] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState({
    new: false,
    confirm: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (error) setError('');
  }, [emailPhone, otp, newPassword, confirmPassword]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^[0-9]*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    } else if (e.key === 'ArrowLeft' && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    } else if (e.key === 'ArrowRight' && index < 3) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const validateForm = () => {
    if (!emailPhone.trim()) {
      setError('Please enter your email or phone number');
      return false;
    }
    if (otp.some(digit => !digit)) {
      setError('Please enter the complete OTP');
      return false;
    }
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters long');
      return false;
    }
    if (newPassword !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      navigate(`/${userType}/login`);
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden flex flex-col justify-center py-4 sm:py-6 md:py-8 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[100px]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[310px] w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[310px] w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[100px]"></div>
      </div>

      {/* Content */}
      <div className="w-full max-w-[420px] mx-auto relative z-10">
        <motion.div 
          className="bg-white/70 backdrop-blur-xl py-6 sm:py-8 px-4 sm:px-8 md:px-10 shadow-xl rounded-2xl w-full border border-gray-100 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          {/* Back Button - Updated with BorderedBackButton component */}
          <BorderedBackButton onClick={() => navigate(-1)} />

          {/* Logo & Header - Adjusted margin to account for back button */}
          <div className="text-center mb-6 mt-2">
            <motion.div 
              className="flex justify-center mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <img
                className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
                src={logo}
                alt="Loyaltty"
              />
            </motion.div>
            <motion.h1 
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              Reset Password
            </motion.h1>
            <motion.p
              className="text-sm text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Enter your email to receive a password reset code
            </motion.p>
          </div>

          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Email/Phone Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-900">
                Email/Phone Number
              </label>
              <input
                type="text"
                value={emailPhone}
                onChange={(e) => setEmailPhone(e.target.value)}
                placeholder="Enter your email or phone number"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066] transition-all shadow-sm"
                disabled={isLoading}
              />
            </div>

            {/* OTP Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-900">
                4-digit Code
              </label>
              <div className="flex gap-2 sm:gap-3 justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    id={`otp-${index}`}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(index, e)}
                    className="w-12 h-12 sm:w-14 sm:h-14 text-center text-lg font-medium rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066] transition-all shadow-sm"
                    disabled={isLoading}
                  />
                ))}
              </div>
            </div>

            {/* New Password Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-900">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.new ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Enter new password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066] transition-all shadow-sm"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, new: !prev.new }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword.new ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
            </div>

            {/* Confirm Password Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-900">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword.confirm ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066] transition-all shadow-sm"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(prev => ({ ...prev, confirm: !prev.confirm }))}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword.confirm ? <IoEyeOffOutline size={20} /> : <IoEyeOutline size={20} />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-red-500 text-sm bg-red-50 p-3 rounded-xl flex items-start"
                >
                  <span className="mr-2">⚠️</span>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] sm:h-[48px] text-sm sm:text-base bg-[#000066] text-white rounded-xl font-semibold hover:bg-[#000066]/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-[#000066]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </motion.div>
              ) : 'Reset Password'}
            </button>

            {/* Back to Login */}
            <div className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link
                to={`/${userType}/login`}
                className="text-[#000066] font-semibold hover:text-[#000066]/90 transition-colors"
              >
                Back to login
              </Link>
            </div>
          </motion.form>
        </motion.div>
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
    </motion.div>
  );
};

export default ForgotPassword;