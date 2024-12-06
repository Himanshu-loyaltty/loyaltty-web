import React, { createContext, useState, useContext } from 'react';

const DealsContext = createContext();

export const DealsProvider = ({ children }) => {
  const [deals, setDeals] = useState([
    {
      id: 1,
      dealName: "Summer Special Discount",
      description: "Get amazing discounts on our summer collection. Perfect for the season!",
      longDescription: "Beat the heat with our exclusive summer deals! Enjoy premium quality products at unbeatable prices. This offer includes our entire summer collection, from refreshing beverages to seasonal specialties.",
      dealValue: 30,
      dealType: "percentage",
      startDate: "2024-03-01",
      endDate: "2024-06-30",
      status: "Active Deal",
      image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c",
      redemptions: 45,
      maxRedemptions: 100,
      terms: [
        "Valid only during specified dates",
        "Cannot be combined with other offers",
        "Subject to availability",
        "Valid for dine-in only",
        "One redemption per customer"
      ],
      categories: ["Summer", "Seasonal", "Featured"],
      priority: "high"
    },
    {
      id: 2,
      dealName: "Buy 1 Get 1 Free Coffee",
      description: "Start your day with our premium coffee. Buy one and get another one free!",
      longDescription: "Enjoy our signature coffee with this special BOGO offer. Choose from our wide range of coffee options including espresso, latte, cappuccino, and more.",
      dealValue: 0,
      dealType: "bogo",
      startDate: "2024-03-15",
      endDate: "2024-04-15",
      status: "Active Deal",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085",
      redemptions: 28,
      maxRedemptions: 50,
      terms: [
        "Valid on all coffee beverages",
        "Second drink must be of equal or lesser value",
        "Valid Monday through Friday",
        "Cannot be combined with other offers"
      ],
      categories: ["Coffee", "Beverages", "Popular"],
      priority: "medium"
    },
    {
      id: 3,
      dealName: "Holiday Season Special",
      description: "Exclusive holiday deals coming soon! Register now for early access.",
      longDescription: "Get ready for the most wonderful time of the year with our special holiday promotions. Featuring festive favorites and seasonal specialties.",
      dealValue: 25,
      dealType: "percentage",
      startDate: "2024-12-01",
      endDate: "2024-12-31",
      status: "Upcoming Deal",
      image: "https://images.unsplash.com/photo-1435245037538-5d1c0a19b2f0",
      redemptions: 0,
      maxRedemptions: 200,
      terms: [
        "Early access for registered customers",
        "Valid on all holiday menu items",
        "Cannot be combined with other promotions",
        "Subject to availability"
      ],
      categories: ["Holiday", "Seasonal", "Special"],
      priority: "high"
    },
    {
      id: 4,
      dealName: "Spring Break Offer",
      description: "Special spring menu items at discounted prices!",
      longDescription: "Welcome spring with fresh flavors and special prices. A perfect blend of seasonal ingredients and amazing value.",
      dealValue: 20,
      dealType: "fixed",
      startDate: "2024-05-01",
      endDate: "2024-05-31",
      status: "Upcoming Deal",
      image: "https://images.unsplash.com/photo-1556040220-4096d522378d",
      redemptions: 0,
      maxRedemptions: 150,
      terms: [
        "Valid only on spring menu items",
        "One offer per customer per visit",
        "Valid for both dine-in and takeout"
      ],
      categories: ["Spring", "Seasonal"],
      priority: "medium"
    },
    {
      id: 5,
      dealName: "Valentine's Day Special",
      description: "Special couples menu with romantic settings and exclusive offers",
      longDescription: "Our Valentine's Day special featured a curated menu for couples, including complimentary champagne and dessert.",
      dealValue: 50,
      dealType: "fixed",
      startDate: "2024-02-14",
      endDate: "2024-02-14",
      status: "Past Deal",
      image: "https://images.unsplash.com/photo-1518291344630-4857135fb581",
      redemptions: 75,
      maxRedemptions: 75,
      terms: [
        "Valid only on February 14th",
        "Reservation required",
        "Special menu items only"
      ],
      categories: ["Special Occasion", "Limited Time"],
      priority: "high"
    },
    {
      id: 6,
      dealName: "New Year Kickoff",
      description: "Started the year with amazing deals and offers",
      longDescription: "Celebrated the new year with special promotions across our entire menu, including our signature dishes and drinks.",
      dealValue: 40,
      dealType: "percentage",
      startDate: "2024-01-01",
      endDate: "2024-01-15",
      status: "Past Deal",
      image: "https://images.unsplash.com/photo-1498837167922-ddd27525d352",
      redemptions: 120,
      maxRedemptions: 150,
      terms: [
        "Valid for the first two weeks of January",
        "Minimum purchase required",
        "Cannot be combined with other offers"
      ],
      categories: ["New Year", "Special"],
      priority: "high"
    }
  ]);

  // Add helper functions for deal management
  const addDeal = (newDeal) => {
    setDeals(prev => [...prev, { ...newDeal, id: Date.now() }]);
  };

  const updateDeal = (updatedDeal) => {
    setDeals(prev => prev.map(deal => 
      deal.id === updatedDeal.id ? updatedDeal : deal
    ));
  };

  const deleteDeal = (dealId) => {
    setDeals(prev => prev.filter(deal => deal.id !== dealId));
  };

  const getDealById = (dealId) => {
    return deals.find(deal => deal.id === dealId);
  };

  return (
    <DealsContext.Provider value={{ 
      deals, 
      setDeals,
      addDeal,
      updateDeal,
      deleteDeal,
      getDealById
    }}>
      {children}
    </DealsContext.Provider>
  );
};

export const useDeals = () => {
  const context = useContext(DealsContext);
  if (!context) {
    throw new Error('useDeals must be used within a DealsProvider');
  }
  return context;
}; 