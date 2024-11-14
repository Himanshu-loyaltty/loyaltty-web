import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Layout from '../components/Layout';
import { BiCheck, BiX, BiDollar, BiTime } from 'react-icons/bi';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'purchase',
      customerName: 'Kathryn Murphy',
      phoneNumber: '(406) 555-0120',
      time: '04:30',
      date: '1/1/2023',
      status: 'pending',
      deal: {
        name: 'Burger deal',
        price: 20,
        image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?q=80&w=3270&auto=format&fit=crop',
        from: '1/1/2023',
        to: '1/2/2023',
        type: 'Welcome Deals'
      },
      amountSpent: null,
      stamps: null
    },
    {
      id: 2,
      type: 'stamps',
      customerName: 'Kathryn Murphy',
      phoneNumber: '(406) 555-0120',
      time: '04:30',
      date: '1/1/2023',
      status: 'pending',
      deal: {
        name: 'Burger deal',
        price: 20,
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?q=80&w=3272&auto=format&fit=crop',
        from: '1/1/2023',
        to: '1/2/2023',
        type: 'Welcome Deals'
      },
      amountSpent: null,
      stamps: 0
    },
    {
      id: 3,
      type: 'purchase',
      customerName: 'Kathryn Murphy',
      phoneNumber: '(406) 555-0120',
      time: '04:30',
      date: '1/1/2023',
      status: 'approved',
      deal: {
        name: 'Burger deal',
        price: 20,
        image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?q=80&w=3270&auto=format&fit=crop',
        from: '1/1/2023',
        to: '1/2/2023',
        type: 'Welcome Deals'
      },
      amountSpent: 20,
      stamps: null
    }
  ]);

  const handleAction = (id, action) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id 
          ? { ...notif, status: action === 'approve' ? 'approved' : 'rejected' }
          : notif
      )
    );
  };

  const NotificationCard = ({ notification }) => {
    const isPending = notification.status === 'pending';

    return (
      <motion.div
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden"
      >
        {/* Header */}
        <div className="p-4 border-b border-gray-100">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                {notification.time} • {notification.date}
              </p>
              <h3 className="font-medium text-gray-900 mt-1">
                Someone is trying to purchase a deal
              </h3>
            </div>
            {!isPending && (
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                notification.status === 'approved' 
                  ? 'bg-green-100 text-green-600'
                  : 'bg-red-100 text-red-600'
              }`}>
                {notification.status === 'approved' ? 'Approved' : 'Rejected'}
              </span>
            )}
          </div>
        </div>

        {/* Customer Info */}
        <div className="p-4 bg-gray-50">
          <h4 className="font-medium text-gray-900">{notification.customerName}</h4>
          <p className="text-sm text-gray-500">{notification.phoneNumber}</p>
        </div>

        {/* Deal Info */}
        <div className="p-4">
          <div className="flex gap-4">
            <img
              src={notification.deal.image}
              alt={notification.deal.name}
              className="w-20 h-20 object-cover rounded-lg"
            />
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <h4 className="font-medium text-gray-900">{notification.deal.name}</h4>
                <span className="text-[#000066] font-bold">${notification.deal.price}</span>
              </div>
              <p className="text-sm text-gray-500 mt-1">
                From: {notification.deal.from} To: {notification.deal.to}
              </p>
              <p className="text-sm text-[#000066] mt-2">{notification.deal.type}</p>
            </div>
          </div>

          {/* Additional Info Based on Type */}
          {notification.type === 'stamps' && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Add Stamps</span>
                <div className="flex items-center gap-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <BiX className="w-5 h-5" />
                  </button>
                  <span className="font-medium">0</span>
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                    <BiCheck className="w-5 h-5" />
                  </button>
                </div>
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Tip: Add more stamps for when customer spends more
              </p>
            </div>
          )}

          {notification.type === 'purchase' && notification.amountSpent && (
            <div className="mt-4 border-t border-gray-100 pt-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">Amount Spent</span>
                <span className="font-medium text-[#000066]">${notification.amountSpent}</span>
              </div>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        {isPending && (
          <div className="flex border-t border-gray-200">
            <button
              onClick={() => handleAction(notification.id, 'reject')}
              className="flex-1 px-4 py-3 text-red-600 hover:bg-red-50 transition-colors font-medium"
            >
              Reject
            </button>
            <button
              onClick={() => handleAction(notification.id, 'approve')}
              className="flex-1 px-4 py-3 text-[#000066] hover:bg-[#000066]/5 transition-colors font-medium"
            >
              Approve
            </button>
          </div>
        )}
      </motion.div>
    );
  };

  return (
    <Layout>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900">Notifications</h1>
          <p className="text-gray-600 mt-2">Manage your customer requests and updates</p>
        </div>

        {/* Notifications List */}
        <div className="space-y-6">
          <AnimatePresence mode="popLayout">
            {notifications.map(notification => (
              <NotificationCard key={notification.id} notification={notification} />
            ))}
          </AnimatePresence>
        </div>

        {/* Empty State */}
        {notifications.length === 0 && (
          <div className="text-center py-12">
            <BiTime className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notifications</h3>
            <p className="text-gray-500">You're all caught up! Check back later for updates.</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Notifications; 