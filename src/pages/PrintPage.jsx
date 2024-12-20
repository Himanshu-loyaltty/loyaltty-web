import React from 'react';
import QRCode from 'react-qr-code';
import logo from "../assets/loyaltty100x100.png";

const PrintPage = ({ storeName, deals = [], qrValue, type = 'store' }) => {
  return (
    <div className="p-8 max-w-2xl mx-auto">
      {/* Store Header */}
      <h1 className="text-2xl font-bold text-center mb-8">{storeName}</h1>

      {/* QR Code Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="w-48 h-48 relative mb-4">
          <QRCode
            value={qrValue}
            size={192}
            level="H"
            className="w-full h-full"
          />
          <img
            src={logo}
            alt="Loyaltty"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12"
          />
        </div>
        <p className="text-gray-600 text-center">
          Scan this QR code to get amazing deals
        </p>
      </div>

      {type === 'store' && (
        <>
          {/* Available Deals Section */}
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Available Deals:</h2>
            <div className="space-y-4">
              {deals.map((deal, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl"
                >
                  <img
                    src={deal.image}
                    alt={deal.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-medium">{deal.name}</h3>
                      <span className="text-[#000066] font-bold">${deal.price}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      From: {deal.startDate} To: {deal.endDate}
                    </p>
                    <p className="text-sm text-[#000066] mt-2">Welcome Deals</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* For more deals QR */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-600 mb-2">For more deals</p>
            <QRCode
              value={qrValue}
              size={96}
              level="H"
              className="mx-auto"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default PrintPage; 