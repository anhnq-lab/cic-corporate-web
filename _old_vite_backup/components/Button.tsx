import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'white';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '', 
  icon,
  ...props 
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  const variants = {
    primary: 'bg-brand-orange hover:bg-orange-600 text-white shadow-lg focus:ring-brand-orange',
    secondary: 'bg-brand-blue hover:bg-blue-800 text-white shadow-lg focus:ring-brand-blue',
    outline: 'border-2 border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white',
    ghost: 'text-gray-600 hover:text-brand-blue hover:bg-gray-100',
    white: 'bg-white text-brand-blue hover:bg-gray-100 shadow-lg focus:ring-white',
  };

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-6 py-3.5 text-lg',
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`} 
      {...props}
    >
      {icon && <span className="mr-2">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;