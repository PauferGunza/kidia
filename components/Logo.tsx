import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  vertical?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true, vertical = false }) => {
  const sizes = {
    sm: { icon: 24, text: 'text-lg' },
    md: { icon: 40, text: 'text-2xl' },
    lg: { icon: 64, text: 'text-4xl' },
    xl: { icon: 120, text: 'text-6xl' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex ${vertical ? 'flex-col items-center' : 'items-center'} gap-2 ${className}`}>
      <div 
        className="relative flex items-center justify-center"
        style={{ width: currentSize.icon, height: currentSize.icon }}
      >
        {/* Apple Body */}
        <div className="absolute inset-0 bg-green-500 rounded-full shadow-sm flex items-center justify-center overflow-hidden">
          {/* Smiley Face */}
          <div className="relative w-1/2 h-1/2 flex flex-col items-center justify-center">
            <div className="flex gap-1 mb-0.5">
              <div className="w-1 h-1 bg-kidia-green rounded-full"></div>
              <div className="w-1 h-1 bg-kidia-green rounded-full"></div>
            </div>
            <div className="w-3 h-1.5 border-b-2 border-kidia-green rounded-full"></div>
          </div>
        </div>
        
        {/* Leaf */}
        <div className="absolute -top-1 right-1 w-1/3 h-1/3 bg-green-700 rounded-full rounded-tr-none rotate-45"></div>
        
        {/* Carrot (Simplified) */}
        <div className="absolute -left-1 bottom-0 w-1/3 h-2/3 bg-orange-500 rounded-full rotate-[-15deg] -z-10"></div>
        
        {/* Fork (Simplified) */}
        <div className="absolute -right-1 bottom-1 w-1/4 h-1/2 flex flex-col gap-0.5 items-center rotate-[15deg] -z-10">
          <div className="flex gap-0.5">
            <div className="w-0.5 h-2 bg-orange-600 rounded-full"></div>
            <div className="w-0.5 h-2 bg-orange-600 rounded-full"></div>
            <div className="w-0.5 h-2 bg-orange-600 rounded-full"></div>
          </div>
          <div className="w-1.5 h-3 bg-orange-600 rounded-sm"></div>
        </div>
      </div>

      {showText && (
        <div className={`font-extrabold tracking-tight ${currentSize.text} flex items-center`}>
          <span className="text-kidia-green-primary">k</span>
          <span className="relative text-kidia-accent-yellow">
            i
            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-kidia-accent-red rounded-full rotate-45"></div>
          </span>
          <span className="text-kidia-orange">d</span>
          <span className="text-kidia-green-primary">i</span>
          <span className="text-kidia-orange">a</span>
        </div>
      )}
    </div>
  );
};
