import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'glass';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  ...props 
}) => {
  // Base styles: rounded-full for modern iOS feel, smooth transition
  const baseStyles = "relative overflow-hidden py-4 px-8 rounded-2xl font-semibold text-lg transition-all duration-300 transform active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 backdrop-blur-sm";
  
  const variants = {
    primary: "bg-slate-900 text-white shadow-xl shadow-slate-900/20 hover:bg-slate-800 border border-transparent",
    secondary: "bg-emerald-600 text-white shadow-xl shadow-emerald-900/20 hover:bg-emerald-700 bg-gradient-to-br from-emerald-500 to-emerald-700",
    outline: "border-2 border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300",
    glass: "bg-white/40 hover:bg-white/60 text-slate-800 border border-white/40 shadow-sm backdrop-blur-md",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};