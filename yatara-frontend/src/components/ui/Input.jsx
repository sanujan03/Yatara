
import React from 'react';

const Input = ({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error = '',
  icon: Icon,
  className = '',
  ...props
}) => {
  return (
    <div className="w-full">
      {label && (
        <label className="mb-1 block text-sm font-medium text-[#E6F4F1]/90">
          {label}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Icon className="h-5 w-5 text-[#E6F4F1]/55" />
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          className={`
            block w-full rounded-[20px] border border-[#10B981]/30 bg-[#052E2B]/55 py-2.5 text-[#E6F4F1] shadow-[0_0_18px_rgba(16,185,129,0.12)] backdrop-blur
            placeholder:text-[#E6F4F1]/50 focus:border-[#10B981] focus:ring-2 focus:ring-[#10B981]/35 focus:outline-none sm:text-sm
            ${Icon ? 'pl-10 pr-3' : 'px-4'}
            ${error ? 'border-red-500' : 'border'}
            ${className}
          `}
          {...props}
        />
      </div>
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default Input;