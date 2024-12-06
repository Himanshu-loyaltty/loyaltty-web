import React from "react";

const getFilteredStats = (timeFilter) => {
  // This is mock data - in a real app, you would fetch this from your backend
  const statsData = {
    week: {
      orders: '3',
      deals: '15',
      revenue: '9',
      discount: '5',
      roi: '5%',
      customers: '5'
    },
    month: {
      orders: '12',
      deals: '45',
      revenue: '27',
      discount: '18',
      roi: '7%',
      customers: '15'
    },
    all: {
      orders: '156',
      deals: '234',
      revenue: '189',
      discount: '67',
      roi: '12%',
      customers: '89'
    }
  };

  return statsData[timeFilter] || statsData.week;
};

const AnalyticsCards = ({ timeFilter = 'week' }) => {
  const stats = getFilteredStats(timeFilter);

  const quickStats = [
    {
      title: 'Orders',
      value: stats.orders,
      subtitle: 'Confirmed Orders',
      bgColor: 'bg-white',
      textColor: 'text-[#4A90E2]',
      borderColor: 'border-gray-200',
      icon: '🛍️'
    },
    {
      title: 'Deals',
      value: stats.deals,
      subtitle: 'Published Deals',
      bgColor: 'bg-white',
      textColor: 'text-[#F5A623]',
      borderColor: 'border-gray-200',
      icon: '🏷️'
    },
    {
      title: 'Revenue',
      value: stats.revenue,
      subtitle: 'Earned Money',
      bgColor: 'bg-white',
      textColor: 'text-[#9013FE]',
      borderColor: 'border-gray-200',
      icon: '💰'
    }
  ];

  const secondaryStats = [
    {
      title: 'Discount',
      value: stats.discount,
      subtitle: 'Total Discounts',
      bgColor: 'bg-white',
      textColor: 'text-[#E15B64]',
      borderColor: 'border-gray-200',
      icon: '🎯'
    },
    {
      title: 'ROI',
      value: stats.roi,
      subtitle: 'Return Rate',
      bgColor: 'bg-white',
      textColor: 'text-[#2ECC71]',
      borderColor: 'border-gray-200',
      icon: '📈'
    },
    {
      title: 'Customers',
      value: stats.customers,
      subtitle: '2 New 3 Repeat',
      bgColor: 'bg-white',
      textColor: 'text-[#00BCD4]',
      borderColor: 'border-gray-200',
      icon: '👥'
    }
  ];

  const StatCard = ({ stat }) => (
    <div className={`${stat.bgColor} rounded-lg p-3 border ${stat.borderColor} shadow-sm`}>
      <div className="flex flex-col h-full">
        <div className="flex items-center gap-1.5 mb-2">
          <span className="text-lg">
            {stat.icon}
          </span>
          <h3 className={`text-sm font-medium ${stat.textColor}`}>
            {stat.title}
          </h3>
        </div>
        
        <div>
          <div className="flex items-baseline gap-1">
            <span className={`text-xl font-bold ${stat.textColor}`}>
              {stat.value}
            </span>
          </div>
          <p className="text-xs text-gray-500">
            {stat.subtitle}
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-2 mb-4">
      {/* Primary Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        {quickStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>

      {/* Secondary Stats Grid */}
      <div className="grid grid-cols-3 gap-2">
        {secondaryStats.map((stat) => (
          <StatCard key={stat.title} stat={stat} />
        ))}
      </div>
    </div>
  );
};

export default AnalyticsCards;