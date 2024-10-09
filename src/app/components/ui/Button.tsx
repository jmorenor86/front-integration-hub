// src/app/components/ui/Button.tsx
"use client";
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({ children, onClick, className }) => {
  return (
    <button
      className={`bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
