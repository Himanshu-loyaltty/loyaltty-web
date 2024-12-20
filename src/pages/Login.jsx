import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { IoEyeOffOutline, IoEyeOutline } from 'react-icons/io5';
import { BiArrowBack } from 'react-icons/bi';
import { FcGoogle } from 'react-icons/fc';
import { AiFillApple } from 'react-icons/ai';
import logo from "../assets/loyaltty1024x1024.png";
import BorderedBackButton from '../components/BorderedBackButton';
import { useLoginMutation } from '../store/services/retailerService';

const Login = ({ 
  userType,
  title,
  subtitle,
  redirectPath,
  forgotPasswordPath,
  registerPath,
  socialText
}) => {
  const [emailPhone, setEmailPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [usePassword, setUsePassword] = useState(false);
  const [otpMode, setOtpMode] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [login, { data, error: loginError }] = useLoginMutation();

  // Reset error when input changes
  useEffect(() => {
    if (error) setError('');
  }, [emailPhone, password, otp, usePassword, error]);

  // Handle OTP input with improved validation
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

  // Enhanced OTP keyboard navigation
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

  // Form validation
  const validateForm = () => {
    if (!emailPhone.trim()) {
      setError('Please enter your email or phone number');
      return false;
    }
    if (usePassword && !password) {
      setError('Please enter your password');
      return false;
    }
    if (otpMode && otp.some(digit => !digit)) {
      setError('Please enter the complete OTP');
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    setError('');

    try {
      const credentials = { emailPhone, password, otp };
      const response = await login(credentials).unwrap();
      if (response) {
        navigate(userType === 'retailer' ? '/retailer/home' : '/customer/home');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Get button text based on state
  const getButtonText = () => {
    if (usePassword) return 'Login';
    if (otpMode) return 'Login';
    return 'Send OTP';
  };

  const handleGoogleLogin = () => {
    // Implement Google login logic
    console.log('Google login');
  };

  const handleAppleLogin = () => {
    // Implement Apple login logic
    console.log('Apple login');
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
          {/* Back Button */}
          <BorderedBackButton onClick={() => navigate('/')} />

          {/* Logo & Header */}
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
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-1 sm:mb-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {title}
            </motion.h1>
            <motion.p
              className="text-sm sm:text-base text-gray-600"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              {subtitle}
            </motion.p>
          </div>

          {/* Main Form */}
          <motion.form 
            onSubmit={handleSubmit} 
            className="space-y-4 sm:space-y-5"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {/* Email/Phone Input */}
            <div className="space-y-1.5">
              <label className="block text-sm font-medium text-gray-900">
                Email/Phone Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  value={emailPhone}
                  onChange={(e) => setEmailPhone(e.target.value)}
                  placeholder="Enter your business email or phone"
                  className="w-full pl-4 pr-10 py-2.5 sm:py-3 text-sm sm:text-base rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066] transition-all shadow-sm"
                  disabled={isLoading}
                />
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <motion.div 
                    className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${emailPhone ? 'bg-green-500' : 'bg-gray-300'}`}
                    animate={{ scale: emailPhone ? [1, 1.2, 1] : 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </div>

            {/* OTP Input Section */}
            <AnimatePresence>
              {otpMode && !usePassword && (
                <motion.div className="space-y-1.5">
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
                </motion.div>
              )}
            </AnimatePresence>

            {/* Password Toggle */}
            <div className="flex items-center justify-between py-1">
              <label className="text-sm font-medium text-gray-900">
                Use Password
              </label>
              <button
                type="button"
                onClick={() => setUsePassword(!usePassword)}
                className={`w-12 h-6 rounded-full p-1 transition-all duration-200 ease-in-out ${
                  usePassword ? "bg-[#000066]" : "bg-gray-200"
                }`}
                disabled={isLoading}
              >
                <div
                  className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-200 ease-in-out ${
                    usePassword ? "translate-x-6" : "translate-x-0"
                  }`}
                />
              </button>
            </div>

            {/* Password Input */}
            <AnimatePresence>
              {usePassword && (
                <motion.div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="block text-sm font-medium text-gray-900">
                      Password
                    </label>
                    <Link
                      to={forgotPasswordPath}
                      className="text-sm text-[#000066] hover:text-[#000066]/80 transition-colors font-medium"
                    >
                      Forgot password?
                    </Link>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter password"
                      className="w-full pl-4 pr-10 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066] transition-all shadow-sm"
                      disabled={isLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                      disabled={isLoading}
                    >
                      {showPassword ? (
                        <IoEyeOffOutline size={20} />
                      ) : (
                        <IoEyeOutline size={20} />
                      )}
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div className="text-red-500 text-sm bg-red-50 p-3 rounded-xl flex items-start">
                  <span className="mr-2">⚠️</span>
                  {error}
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-[44px] sm:h-[48px] text-sm sm:text-base bg-[#000066] text-white rounded-xl font-semibold hover:bg-[#000066]/90 transition-all shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed relative overflow-hidden"
            >
              {isLoading ? (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center bg-[#000066]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </motion.div>
              ) : (
                getButtonText()
              )}
            </button>

            {/* Sign Up Link */}
            <div className="text-center text-sm sm:text-base text-gray-600">
              Don't have an account?{" "}
              <Link
                to={registerPath}
                className="text-[#000066] font-semibold hover:text-[#000066]/90 transition-colors"
              >
                Register
              </Link>
            </div>

            {/* Social Login Section */}
            <div className="relative my-4 sm:my-5">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center text-sm sm:text-base">
                <span className="px-2 bg-white text-gray-500">{socialText}</span>
              </div>
            </div>

            {/* Social Login Buttons */}
            <div className="space-y-2 sm:space-y-3">
              <button
                type="button"
                onClick={handleGoogleLogin}
                className="w-full h-[40px] sm:h-[44px] px-4 text-sm sm:text-base border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 relative group"
              >
                <FcGoogle className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-gray-700 font-medium">Google</span>
              </button>

              <button
                type="button"
                onClick={handleAppleLogin}
                className="w-full h-[40px] sm:h-[44px] px-4 text-sm sm:text-base border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors flex items-center justify-center gap-3 relative group"
              >
                <AiFillApple className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="text-gray-700 font-medium">Apple</span>
              </button>
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

export default Login;