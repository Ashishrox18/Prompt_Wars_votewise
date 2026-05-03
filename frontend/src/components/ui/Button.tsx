import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type ButtonProps = Omit<HTMLMotionProps<"button">, "size" | "children"> & {
  children?: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
};

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  const baseStyle = "inline-flex items-center justify-center font-bold rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-offset-2 overflow-hidden relative";
  
  const variants = {
    primary: "bg-gradient-to-r from-[var(--primary)] to-[var(--primary-dark)] text-white shadow-lg hover:shadow-[var(--shadow-glow)] border border-transparent",
    secondary: "bg-white/80 backdrop-blur-sm border border-[var(--border)] text-gray-700 hover:bg-gray-50 shadow-sm",
    ghost: "bg-transparent text-[var(--primary)] hover:bg-blue-50/50",
    danger: "bg-gradient-to-r from-red-500 to-red-600 text-white shadow-md hover:shadow-lg border border-transparent",
  };

  const sizes = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const classes = `${baseStyle} ${variants[variant]} ${sizes[size]} ${fullWidth ? 'w-full' : ''} ${className}`;

  return (
    <motion.button 
      whileHover={{ scale: variant === 'ghost' ? 1.02 : 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={classes} 
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center w-full">{children}</span>
    </motion.button>
  );
};
