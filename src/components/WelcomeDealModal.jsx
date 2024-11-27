import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BiX, BiImage, BiChevronLeft, BiPlus, BiCheck } from 'react-icons/bi';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';

// Import actual images
import discountImage from '../assets/welcome_deal/discount.png';
import freeItemImage from '../assets/welcome_deal/free.png';
import bogoImage from '../assets/welcome_deal/buy1get1.png';
import itemDiscountImage from '../assets/welcome_deal/3off.png';
import fixedDiscountImage from '../assets/welcome_deal/image.png';

const DealCard = ({ type, selected, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.01, y: -1 }}
      whileTap={{ scale: 0.99 }}
      className={`w-full group relative overflow-hidden ${
        selected 
          ? 'bg-[#000066]/5 border border-[#000066] shadow-sm' 
          : 'bg-white border border-gray-100 hover:border-[#000066]/30 hover:shadow-sm'
      } rounded-lg transition-all duration-200`}
    >
      <div className="flex items-stretch p-3 gap-3">
        {/* Image Container - Made smaller */}
        <div className={`relative w-14 h-14 sm:w-16 sm:h-16 flex-shrink-0 rounded-lg overflow-hidden ${
          type.id === 'custom' 
            ? 'border border-dashed border-gray-300 bg-gray-50' 
            : 'shadow-sm'
        }`}>
          {type.id === 'custom' ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <BiPlus className="w-6 h-6 text-gray-400 group-hover:text-[#000066] transition-colors" />
            </div>
          ) : (
            <div className={`absolute inset-0 flex items-center justify-center ${
              type.bgColor || 'bg-blue-50'
            } group-hover:opacity-90 transition-opacity`}>
              <div className="relative w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center">
                <img 
                  src={type.image}
                  alt={type.label}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-200"
                />
                <div className={`absolute inset-0 ${
                  type.glowColor || 'bg-white/10'
                } blur-md opacity-0 group-hover:opacity-20 transition-opacity duration-200`} />
              </div>
            </div>
          )}
        </div>

        {/* Content Container - Adjusted text sizes */}
        <div className="flex-1 text-left flex flex-col justify-center min-w-0">
          <h3 className={`font-medium text-sm sm:text-base truncate ${
            selected ? 'text-[#000066]' : 'text-gray-900'
          }`}>
            {type.label}
          </h3>
          {type.description && (
            <p className="text-xs text-gray-500 mt-0.5 line-clamp-2">
              {type.description}
            </p>
          )}
        </div>

        {/* Selection Indicator - Made smaller */}
        {selected && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 w-4 h-4 rounded-full bg-[#000066] flex items-center justify-center shadow-sm"
          >
            <svg 
              className="w-2.5 h-2.5 text-white" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M5 13l4 4L19 7" 
              />
            </svg>
          </motion.div>
        )}
      </div>
    </motion.button>
  );
};

const SuccessPopup = ({ isOpen, onClose }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[70] overflow-y-auto">
          <div className="flex min-h-screen items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/40 backdrop-blur-[2px]"
              onClick={onClose}
            />
            
            {/* Popup Content */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ 
                type: "spring",
                stiffness: 300,
                damping: 25,
                duration: 0.3
              }}
              className="relative bg-white rounded-2xl w-full max-w-[320px] overflow-hidden shadow-2xl"
            >
              {/* Success Animation Container */}
              <motion.div 
                className="flex flex-col items-center px-6 pt-8 pb-7"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                {/* Success Icon Circle */}
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    delay: 0.2
                  }}
                  className="w-[72px] h-[72px] rounded-full bg-green-100 flex items-center justify-center mb-5 relative"
                >
                  {/* Outer Ring Animation */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.2 }}
                    className="absolute inset-0 rounded-full border-4 border-green-500/20"
                  />
                  
                  {/* Check Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 20,
                      delay: 0.4
                    }}
                    className="w-10 h-10 rounded-full bg-green-500 flex items-center justify-center"
                  >
                    <BiCheck className="w-8 h-8 text-white" />
                  </motion.div>
                </motion.div>
                
                {/* Success Message */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  className="text-center"
                >
                  <h3 className="text-lg font-semibold text-gray-900 mb-1">
                    Deal Published!
                  </h3>
                  <p className="text-sm text-gray-600">
                    Your deal has been successfully published
                  </p>
                </motion.div>
              </motion.div>

              {/* Progress Bar */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 2, ease: "linear" }}
                className="h-1 bg-green-500 origin-left"
              />
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
};

const WelcomeDealModal = ({ isOpen, onClose, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [selectedDealType, setSelectedDealType] = useState(null);
  const [customDeal, setCustomDeal] = useState({
    value: '',
    minPurchase: '',
    dealName: '',
    description: '',
    fullDetails: '',
    terms: '',
    images: [],
    repeatDays: []
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const dealTypes = [
    {
      id: "custom",
      label: "Create your own deal",
      description: "Customize a deal that fits your business",
      bgColor: "bg-gray-50",
      glowColor: "bg-gray-400/10",
    },
    {
      id: "fixed_discount",
      label: "$5 off on $30 purchase",
      description: "Fixed amount discount",
      image: fixedDiscountImage,
      bgColor: "bg-blue-50",
      glowColor: "bg-blue-400/10",
      template: { value: 5, minPurchase: 30 },
    },
    {
      id: "percentage",
      label: "10% off on 50% purchase",
      description: "Percentage off total purchase",
      image: discountImage,
      bgColor: "bg-orange-50",
      glowColor: "bg-orange-400/10",
      template: { value: 10, minPurchase: 50 },
    },
    {
      id: "free_item",
      label: "Free item worth $5​",
      description: "Free item with purchase",
      image: freeItemImage,
      bgColor: "bg-green-50",
      glowColor: "bg-green-400/10",
      template: { value: 5, minPurchase: 0 },
    },
    {
      id: "bogo",
      label: "Buy 1 Get 1 Free",
      description: "Equal or lesser value",
      image: bogoImage,
      bgColor: "bg-yellow-50",
      glowColor: "bg-yellow-400/10",
      template: { value: 0, minPurchase: 0 },
    },
    {
      id: "item_discount",
      label: "$3 off select items",
      description: "Discount on specific items",
      image: itemDiscountImage,
      bgColor: "bg-purple-50",
      glowColor: "bg-purple-400/10",
      template: { value: 3, minPurchase: 0 },
    },
  ];

  const initializeTemplateImage = (type) => {
    if (type.image) {
      setCustomDeal(prev => ({
        ...prev,
        images: [{
          id: 'template-image',
          url: type.image,
          isTemplate: true,
          bgColor: type.bgColor || 'bg-blue-50'
        }]
      }));
    }
  };

  const handleDealTypeSelect = (type) => {
    setSelectedDealType(type);
    if (type.id === 'custom') {
      setCustomDeal(prev => ({
        ...prev,
        value: '',
        minPurchase: '',
        images: [],
        dealName: '',
        description: generateDescription(type, '', ''),
        fullDetails: type.description
      }));
    } else {
      setCustomDeal(prev => ({
        ...prev,
        value: type.template.value,
        minPurchase: type.template.minPurchase,
        images: [],
        dealName: '',
        description: generateDescription(type, type.template.value, type.template.minPurchase),
        fullDetails: type.description
      }));
      initializeTemplateImage(type);
    }
    setStep(2);
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      url: URL.createObjectURL(file),
      file,
      isTemplate: false,
      displayOrder: customDeal.images.length
    }));
    
    const updatedExistingImages = customDeal.images.map((img, index) => ({
      ...img,
      displayOrder: index + newImages.length
    }));

    setCustomDeal(prev => ({
      ...prev,
      images: [...newImages, ...updatedExistingImages].slice(0, 3)
    }));
  };

  const removeImage = (id) => {
    setCustomDeal(prev => ({
      ...prev,
      images: prev.images.filter(img => img.id !== id)
    }));
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(customDeal.images);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setCustomDeal(prev => ({
      ...prev,
      images: items
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    // Deal name validation
    if (!customDeal.dealName.trim()) {
      newErrors.dealName = 'Deal name is required';
    } else if (customDeal.dealName.length > 50) {
      newErrors.dealName = 'Deal name must be less than 50 characters';
    }

    // Deal value validation
    if (!customDeal.value) {
      newErrors.value = 'Deal value is required';
    } else if (isNaN(customDeal.value) || Number(customDeal.value) <= 0) {
      newErrors.value = 'Deal value must be greater than 0';
    }

    // Short description validation (now required)
    if (!customDeal.description.trim()) {
      newErrors.description = 'Short description is required';
    }

    // Terms validation
    if (!customDeal.terms.trim()) {
      newErrors.terms = 'Terms and conditions are required';
    }

    // Images validation
    if (customDeal.images.length === 0) {
      newErrors.images = 'At least one image is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  const handleSubmit = () => {
    const allFields = ['dealName', 'value', 'fullDetails', 'terms', 'images'];
    const allTouched = allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
    setTouched(allTouched);

    if (validateForm()) {
      onSubmit({
        type: selectedDealType,
        ...customDeal
      });
      
      setShowSuccessPopup(true);
      
      // Increased delay to match the progress bar animation
      setTimeout(() => {
        setShowSuccessPopup(false);
        onClose();
      }, 2200); // 2.2 seconds to match the progress bar
    }
  };

  const generateDescription = (type, value, minPurchase) => {
    switch (type?.id) {
      case 'percentage':
        return `${value}% off on minimum purchase of $${minPurchase}`;
      case 'fixed_discount':
        return `$${value} off on minimum purchase of $${minPurchase}`;
      case 'free_item':
        return `Free item worth $${value}${minPurchase ? ` on $${minPurchase} purchase` : ''}`;
      case 'bogo':
        return `Buy ${value || 1} Get ${minPurchase || 1} Free`;
      case 'item_discount':
        return `$${value} off select items${minPurchase ? ` on $${minPurchase} purchase` : ''}`;
      case 'custom':
        return value ? `$${value} off${minPurchase ? ` on $${minPurchase} purchase` : ''}` : 'Custom deal';
      default:
        return '';
    }
  };

  const handleValueChange = (e) => {
    const newValue = e.target.value;
    setCustomDeal(prev => ({
      ...prev,
      value: newValue,
      description: generateDescription(selectedDealType, newValue, prev.minPurchase)
    }));
    if (touched.value) validateForm();
  };

  const handleMinPurchaseChange = (e) => {
    const newMinPurchase = e.target.value;
    setCustomDeal(prev => ({
      ...prev,
      minPurchase: newMinPurchase,
      description: generateDescription(selectedDealType, prev.value, newMinPurchase)
    }));
  };

  const renderInputFields = () => {
    return (
      <>
        {/* Deal Value */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Deal value <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              className="absolute left-3 top-1/2 -translate-y-1/2 border-0 bg-transparent pr-2 text-gray-500 focus:ring-0 text-sm"
              value="USD"
            >
              <option value="USD">USD</option>
            </select>
            <input
              type="number"
              value={customDeal.value}
              onChange={handleValueChange}
              onBlur={() => handleBlur("value")}
              className={`w-full pl-16 pr-3 py-2 text-sm rounded-lg border ${
                touched.value && errors.value
                  ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                  : "border-gray-200 focus:border-[#000066] focus:ring-[#000066]"
              } focus:ring-1`}
              placeholder="Enter deal value"
            />
          </div>
          {touched.value && errors.value && (
            <p className="mt-1 text-xs text-red-500">{errors.value}</p>
          )}
        </div>

        {/* Minimum Purchase */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Minimum purchase <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              $
            </span>
            <input
              type="number"
              value={customDeal.minPurchase}
              onChange={handleMinPurchaseChange}
              className="w-full pl-7 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
              placeholder="Min. purchase amount"
            />
          </div>
        </div>

        {/* Short Description (now updates automatically) */}
        {/* <div className="sm:col-span-2">
          <label className="block text-xs font-medium text-gray-700 mb-1.5">
            Short description <span className="text-red-500">*</span>
          </label>
          <textarea
            value={customDeal.description}
            readOnly
            className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
            rows={2}
          />
        </div> */}
      </>
    );
  };

  const renderPreviewCard = () => {
    const firstImage = customDeal.images[0];

    return (
      <div className="flex items-center gap-3 p-3 bg-white border border-gray-100 rounded-lg">
        <div className={`w-16 h-16 ${firstImage?.isTemplate ? firstImage.bgColor || selectedDealType?.bgColor : 'bg-gray-50'} rounded-lg flex items-center justify-center overflow-hidden`}>
          {firstImage ? (
            firstImage.isTemplate ? (
              <img 
                src={firstImage.url}
                alt="Deal"
                className="w-14 h-14 object-contain"
              />
            ) : (
              <img 
                src={firstImage.url}
                alt="Deal"
                className="w-full h-full object-cover"
              />
            )
          ) : (
            <BiImage className="w-8 h-8 text-gray-400" />
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-[#000066] font-medium">
            {selectedDealType?.label || 'Custom Deal'}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">
            {customDeal.fullDetails}
          </p>
        </div>
        <button 
          className="p-2 hover:bg-gray-100 rounded-full"
          onClick={() => setStep(1)}
        >
          <BiX className="w-5 h-5 text-gray-500" />
        </button>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-3">
            {dealTypes.map((type) => (
              <DealCard
                key={type.id}
                type={type}
                selected={selectedDealType?.id === type.id}
                onClick={() => handleDealTypeSelect(type)}
              />
            ))}
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            {/* Preview Card */}
            {renderPreviewCard()}

            {/* Input Fields */}
            <div className="space-y-6">
              {renderInputFields()}

              {/* Continue Button */}
              <button
                onClick={() => setStep(3)}
                disabled={!customDeal.value || (selectedDealType?.id !== 'bogo' && !customDeal.minPurchase)}
                className={`w-full py-3 rounded-lg mt-4 text-white transition-colors ${
                  customDeal.value && (selectedDealType?.id === 'bogo' || customDeal.minPurchase)
                    ? 'bg-[#000066] hover:bg-[#000066]/90' 
                    : 'bg-gray-300 cursor-not-allowed'
                }`}
              >
                Continue
              </button>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="relative flex flex-col h-[calc(100vh-180px)]">
            {/* Sticky Preview Header */}
            <div className="sticky top-0 z-10 bg-white pb-4">
              {/* Deal Preview Card */}
              {renderPreviewCard()}

              {/* Deal Pictures */}
              <div className="mt-3">
                <label className="block text-xs font-medium text-gray-700 mb-1.5">
                  Deal pictures <span className="text-red-500">*</span>
                </label>
                <DragDropContext onDragEnd={handleDragEnd}>
                  <Droppable droppableId="deal-images" direction="horizontal">
                    {(provided) => (
                      <div
                        className="flex gap-2"
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                      >
                        {customDeal.images.map((image, index) => (
                          <Draggable
                            key={image.id}
                            draggableId={image.id}
                            index={index}
                          >
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                className={`relative group ${
                                  snapshot.isDragging ? "z-50" : ""
                                }`}
                              >
                                <div
                                  className={`relative ${
                                    index === 0
                                      ? "w-14 h-14 sm:w-16 sm:h-16"
                                      : "w-12 h-12 sm:w-14 sm:h-14"
                                  }`}
                                >
                                  <div
                                    className={`absolute inset-0 rounded-lg overflow-hidden border ${
                                      snapshot.isDragging
                                        ? "border-[#000066] shadow-sm"
                                        : "border-gray-200"
                                    } ${
                                      index === 0 ? "bg-white" : "bg-gray-50"
                                    }`}
                                  >
                                    {image.isTemplate ? (
                                      <div
                                        className={`w-full h-full ${image.bgColor} flex items-center justify-center`}
                                      >
                                        <img
                                          src={image.url}
                                          alt="Deal"
                                          className="w-10 h-10 sm:w-12 sm:h-12 object-contain"
                                        />
                                      </div>
                                    ) : (
                                      <img
                                        src={image.url}
                                        alt="Deal"
                                        className="w-full h-full object-cover"
                                      />
                                    )}
                                  </div>

                                  <button
                                    onClick={() => removeImage(image.id)}
                                    className="absolute -top-1 -right-1 p-0.5 bg-white rounded-full shadow-sm hover:bg-gray-100 opacity-0 group-hover:opacity-100 transition-all"
                                  >
                                    <BiX className="w-3 h-3" />
                                  </button>

                                  <div className="absolute -bottom-1 -right-1 bg-white rounded-full w-3.5 h-3.5 shadow-sm opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center">
                                    <svg
                                      className="w-2 h-2 text-gray-400"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M8 9h8M8 15h8"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            )}
                          </Draggable>
                        ))}
                        {provided.placeholder}

                        {/* Add Image Button */}
                        {customDeal.images.length < 3 && (
                          <label className="w-12 h-12 sm:w-14 sm:h-14 flex-shrink-0 flex flex-col items-center justify-center border border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-[#000066] hover:bg-[#000066]/5 transition-all">
                            <BiPlus className="w-4 h-4 text-gray-400" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={handleImageUpload}
                              multiple
                            />
                          </label>
                        )}
                      </div>
                    )}
                  </Droppable>
                </DragDropContext>
                {touched.images && errors.images && (
                  <p className="mt-1 text-xs text-red-500">{errors.images}</p>
                )}
              </div>
            </div>

            {/* Scrollable Form Content */}
            <div className="flex-1 overflow-y-auto mt-4 pr-1 space-y-4 custom-scrollbar">
              {/* Form Fields */}
              <div className="grid gap-4 sm:grid-cols-2">
                {/* Deal Name */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Deal name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customDeal.dealName}
                    onChange={(e) => {
                      setCustomDeal((prev) => ({
                        ...prev,
                        dealName: e.target.value,
                      }));
                      if (touched.dealName) validateForm();
                    }}
                    onBlur={() => handleBlur("dealName")}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      touched.dealName && errors.dealName
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-[#000066] focus:ring-[#000066]"
                    } focus:ring-1`}
                    placeholder="Enter deal name"
                  />
                  {touched.dealName && errors.dealName && (
                    <p className="mt-1 text-xs text-red-500">
                      {errors.dealName}
                    </p>
                  )}
                </div>

                {/* Deal Value */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Deal value <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <select
                      className="absolute left-3 top-1/2 -translate-y-1/2 border-0 bg-transparent pr-2 text-gray-500 focus:ring-0 text-sm"
                      value="USD"
                    >
                      <option value="USD">USD</option>
                    </select>
                    <input
                      type="number"
                      value={customDeal.value}
                      onChange={handleValueChange}
                      onBlur={() => handleBlur("value")}
                      className={`w-full pl-16 pr-3 py-2 text-sm rounded-lg border ${
                        touched.value && errors.value
                          ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                          : "border-gray-200 focus:border-[#000066] focus:ring-[#000066]"
                      } focus:ring-1`}
                      placeholder="Enter deal value"
                    />
                  </div>
                  {touched.value && errors.value && (
                    <p className="mt-1 text-xs text-red-500">{errors.value}</p>
                  )}
                </div>

                {/* Minimum Purchase */}
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Minimum purchase <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
                      $
                    </span>
                    <input
                      type="number"
                      value={customDeal.minPurchase}
                      onChange={handleMinPurchaseChange}
                      className="w-full pl-7 pr-3 py-2 text-sm rounded-lg border border-gray-200 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
                      placeholder="Min. purchase amount"
                    />
                  </div>
                </div>

                {/* Short Description (now updates automatically) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Short description <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={customDeal.description}
                    readOnly
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
                    rows={2}
                  />
                </div>

                {/* Full Details (readonly since it's from dealType description) */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Full details{" "}
                    <span className="text-gray-400 text-xs">(Optional)</span>
                  </label>
                  <textarea
                    value={customDeal.fullDetails}
                    readOnly
                    className="w-full px-3 py-2 text-sm rounded-lg border border-gray-200 bg-gray-50 focus:border-[#000066] focus:ring-1 focus:ring-[#000066]"
                    rows={3}
                  />
                </div>

                {/* Terms and Conditions */}
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-gray-700 mb-1.5">
                    Terms and conditions <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    value={customDeal.terms}
                    onChange={(e) => {
                      setCustomDeal((prev) => ({
                        ...prev,
                        terms: e.target.value,
                      }));
                      if (touched.terms) validateForm();
                    }}
                    onBlur={() => handleBlur("terms")}
                    className={`w-full px-3 py-2 text-sm rounded-lg border ${
                      touched.terms && errors.terms
                        ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                        : "border-gray-200 focus:border-[#000066] focus:ring-[#000066]"
                    } focus:ring-1`}
                    rows={3}
                    placeholder="Enter terms and conditions"
                  />
                  {touched.terms && errors.terms && (
                    <p className="mt-1 text-xs text-red-500">{errors.terms}</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return 'Choose a deal template';
      case 2:
        return selectedDealType?.id === 'custom' ? 'Create your own deal' : 'Customize deal';
      case 3:
        return 'Deal details';
      default:
        return '';
    }
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] overflow-y-auto">
            <div className="flex min-h-screen items-center justify-center p-3">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/30 backdrop-blur-sm"
                onClick={onClose}
              />

              <motion.div
                initial={{ scale: 0.95, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 10 }}
                transition={{ type: "spring", duration: 0.4 }}
                className="relative bg-white rounded-xl w-full max-w-xl overflow-hidden shadow-lg"
              >
                {/* Header - Made more compact */}
                <div className="sticky top-0 z-20 bg-white/90 backdrop-blur-md border-b border-gray-200">
                  <div className="p-3 sm:p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        {step > 1 && (
                          <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setStep(prev => prev - 1)}
                            className="p-1.5 hover:bg-gray-100 rounded-full transition-colors"
                          >
                            <BiChevronLeft className="w-5 h-5" />
                          </motion.button>
                        )}
                        <div>
                          <h2 className="text-lg sm:text-xl font-semibold text-gray-900">Welcome Deal</h2>
                          <p className="text-xs text-gray-500">{getStepTitle()}</p>
                        </div>
                      </div>
                      <button
                        onClick={onClose}
                        className="px-3 py-1.5 text-xs text-gray-500 hover:text-gray-700 transition-colors rounded-lg hover:bg-gray-100"
                      >
                        Skip
                      </button>
                    </div>
                  </div>
                </div>

                {/* Content - Adjusted padding */}
                <div className="p-3 sm:p-4 space-y-4">
                  {renderStepContent()}
                </div>

                {/* Footer - Made more compact */}
                {step === 3 && (
                  <div className="sticky bottom-0 z-20 p-3 sm:p-4 border-t border-gray-200 bg-gray-50/90 backdrop-blur-md">
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
                      <div>
                        {Object.keys(errors).length > 0 && touched.dealName && (
                          <p className="text-xs text-red-500 flex items-center gap-1">
                            <span>⚠️</span>
                            Please fill in all required fields
                          </p>
                        )}
                      </div>
                      <div className="flex gap-2 w-full sm:w-auto">
                        <button
                          onClick={onClose}
                          className="flex-1 sm:flex-none px-3 py-2 text-xs font-medium text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          Cancel
                        </button>
                        <button
                          onClick={handleSubmit}
                          className="flex-1 sm:flex-none px-4 py-2 text-xs font-medium bg-[#000066] text-white rounded-lg hover:bg-[#000066]/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          Create Deal
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* Add Success Popup */}
      <SuccessPopup 
        isOpen={showSuccessPopup} 
        onClose={() => {
          setShowSuccessPopup(false);
          onClose();
        }} 
      />
    </>
  );
};

export default WelcomeDealModal;