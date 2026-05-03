import React from 'react';
import { motion } from 'framer-motion';
import type { HTMLMotionProps } from 'framer-motion';

type CardProps = Omit<HTMLMotionProps<"div">, "children"> & {
  children?: React.ReactNode;
  glass?: boolean;
};

export const Card: React.FC<CardProps> = ({ children, className = '', glass = false, ...props }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`rounded-2xl p-6 ${
        glass 
          ? 'bg-white/70 backdrop-blur-md shadow-[var(--shadow-glass)] border border-white/50' 
          : 'bg-white border border-[var(--border)] shadow-sm hover:shadow-md transition-shadow duration-300'
      } ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export const CardHeader: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`mb-4 ${className}`} {...props}>
    {children}
  </div>
);

export const CardTitle: React.FC<React.HTMLAttributes<HTMLHeadingElement>> = ({ children, className = '', ...props }) => (
  <h3 className={`text-xl font-display font-bold text-gray-900 tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

export const CardContent: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className = '', ...props }) => (
  <div className={`text-gray-600 leading-relaxed ${className}`} {...props}>
    {children}
  </div>
);
