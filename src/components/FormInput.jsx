import React from 'react';

const FormInput = ({ 
  label, 
  type = "text", 
  value, 
  onChange, 
  placeholder, 
  optional = false,
  error,
  options,
  isSelect,
  className = "",
  ...props 
}) => {
  const baseInputStyles = `w-full px-4 py-3 rounded-xl border border-gray-300 
    focus:outline-none focus:ring-2 focus:ring-[#000066]/20 focus:border-[#000066] 
    transition-all text-sm placeholder-gray-400`;

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-900">
          {label}
          {optional && <span className="text-gray-500 ml-1">(optional)</span>}
        </label>
      )}
      
      {isSelect ? (
        <select
          value={value}
          onChange={onChange}
          className={`${baseInputStyles} bg-white text-gray-900 ${className}`}
          {...props}
        >
          <option value="">{placeholder}</option>
          {options?.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`${baseInputStyles} ${error ? 'border-red-300 bg-red-50' : ''} ${className}`}
          {...props}
        />
      )}

      {error && (
        <p className="text-xs text-red-500 mt-1">{error}</p>
      )}
    </div>
  );
};

export default FormInput; 