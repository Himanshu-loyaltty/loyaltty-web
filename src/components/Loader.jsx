// Loader.jsx
import React, { memo, useEffect } from "react";
import logo from "../assets/loyaltty.png";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import "./LogoLoader.css";

const LoadingBar = () => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      scaleX: [0, 0.5, 1],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: [0.4, 0.0, 0.2, 1],
        times: [0, 0.4, 1]
      }
    });
  }, [controls]);

  return (
    <div className="progress-container">
      <div className="progress-wrapper">
        <motion.div 
          className="loading-bar"
          initial={{ scaleX: 0 }}
          animate={controls}
          style={{ originX: 0 }}
        />
      </div>
    </div>
  );
};

const LoadingText = () => {
  const textVariants = {
    animate: {
      opacity: [0.6, 1, 0.6],
      transition: {
        duration: 2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div
      className="loading-text-container"
      variants={textVariants}
      animate="animate"
    >
      <span className="loading-text">Loading</span>
      <motion.span 
        className="loading-dots"
        animate={{
          opacity: [1, 0.3, 1],
        }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        ...
      </motion.span>
    </motion.div>
  );
};

const Logo = () => {
  const logoVariants = {
    initial: { y: -10, opacity: 0 },
    animate: { 
      y: 0,
      opacity: 1,
      transition: { 
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1]
      }
    },
    hover: { 
      scale: 1.02,
      transition: { type: "spring", stiffness: 400 }
    }
  };

  return (
    <motion.div 
      className="logo-container"
      variants={logoVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <motion.img 
        src={logo} 
        alt="Loyaltty Logo" 
        className="logo"
        loading="eager"
        draggable="false"
      />
    </motion.div>
  );
};

const Loader = () => {
  return (
    <AnimatePresence>
      <motion.div 
        className="loader-wrapper"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div 
          className="loader-content"
          initial={{ scale: 0.98, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ 
            duration: 0.6,
            ease: [0.23, 1, 0.32, 1]
          }}
        >
          <div className="logo-section">
            <Logo />
          </div>

          <div className="loader-bottom">
            <motion.div 
              className="loading-bar-container"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <LoadingBar />
              <LoadingText />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default memo(Loader);
