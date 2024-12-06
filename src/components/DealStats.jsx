import React from 'react';
import { BiTrendingUp, BiTime, BiCheck, BiX } from 'react-icons/bi';

const DealStats = ({ deals }) => {
  const stats = {
    active: deals.filter(d => d.status === 'Active Deal').length,
    upcoming: deals.filter(d => d.status === 'Upcoming Deal').length,
    expired: deals.filter(d => d.status === 'Past Deal').length,
    totalRedemptions: deals.reduce((acc, deal) => acc + (deal.redemptions || 0), 0)
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Active Deals</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.active}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
            <BiCheck className="w-6 h-6 text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Upcoming Deals</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.upcoming}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <BiTime className="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Expired Deals</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.expired}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
            <BiX className="w-6 h-6 text-gray-600" />
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">Total Redemptions</p>
            <h3 className="text-2xl font-bold text-gray-900 mt-1">{stats.totalRedemptions}</h3>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#000066]/10 flex items-center justify-center">
            <BiTrendingUp className="w-6 h-6 text-[#000066]" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealStats; 