import React from 'react';
import { motion } from 'framer-motion';
import logo from "../assets/loyaltty1024x1024.png";

const Layout = ({ children, showHeader = true }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      {showHeader && (
        <header className="fixed top-0 left-0 right-0 bg-white border-b z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <img src={logo} alt="Loyaltty" className="h-8 w-auto" />
              </div>
              <nav className="hidden md:flex items-center space-x-8">
                <a href="#features" className="text-gray-600 hover:text-gray-900">Features</a>
                <a href="#pricing" className="text-gray-600 hover:text-gray-900">Pricing</a>
                <a href="#contact" className="text-gray-600 hover:text-gray-900">Contact</a>
              </nav>
            </div>
          </div>
        </header>
      )}
      <main className="pt-16">{children}</main>
    </div>
  );
};

export default Layout; 