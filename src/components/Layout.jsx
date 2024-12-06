import React from 'react';
import Navbar from './Navbar';
import TopCommanHeader from './TopCommanHeader';

const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:16px_16px] sm:bg-[size:24px_24px]"></div>
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
        <div className="absolute right-0 top-0 -z-10 h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 -z-10 h-[200px] w-[200px] sm:h-[310px] sm:w-[310px] rounded-full bg-[#000066] opacity-[0.15] blur-[80px] sm:blur-[100px]"></div>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <div className="lg:pl-64">
          <TopCommanHeader />
          <main className="pt-4 sm:py-14">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Layout;