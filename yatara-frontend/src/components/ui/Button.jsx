
import React from 'react';

const Button = ({
  children,
  type = 'button',
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  className = '',
  onClick,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center rounded-[20px] font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#020617]';

  const variants = {
    primary: 'border border-[#10B981]/50 bg-[#064E3B]/70 text-[#E6F4F1] shadow-[0_0_22px_rgba(16,185,129,0.25)] hover:bg-[#064E3B]/90 focus:ring-[#10B981]',
    secondary: 'border border-[#10B981]/40 bg-[#052E2B]/75 text-[#E6F4F1] hover:bg-[#052E2B]/95 focus:ring-[#10B981]',
    outline: 'border border-[#10B981]/45 text-[#E6F4F1] hover:bg-[#10B981]/12 focus:ring-[#10B981]',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${
        disabled || isLoading ? 'opacity-50 cursor-not-allowed' : ''
      } ${className}`}
      disabled={disabled || isLoading}
      onClick={onClick}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {children}
    </button>
  );
};

export default Button;