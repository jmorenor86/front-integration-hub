"use client";
import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className, onClick }) => {
  return (
    <div className={`bg-white rounded-lg shadow p-4 ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="border-b pb-2">{children}</div>;
};

export const CardTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <h2 className="text-black text-xl font-semibold">{children}</h2>;
};

export const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <p className="text-black">{children}</p>;
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="py-4">{children}</div>;
};

export const CardFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="pt-2">{children}</div>;
};
