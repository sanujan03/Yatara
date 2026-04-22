
import React from 'react';

const Card = ({ children, className = '', padding = true, ...props }) => {
  return (
    <div
      className={`glass-surface rounded-[20px] text-[#E6F4F1] ${padding ? 'p-6' : ''} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;