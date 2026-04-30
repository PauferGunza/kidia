import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  vertical?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md', showText = true, vertical = false }) => {
  const sizes = {
    sm: { text: 'text-xl' },
    md: { text: 'text-2xl' },
    lg: { text: 'text-4xl' },
    xl: { text: 'text-6xl' },
  };

  const currentSize = sizes[size];

  return (
    <div className={`flex items-center ${className}`}>
      {showText && (
        <div className={`font-black tracking-tighter ${currentSize.text} flex items-center`}>
          <span className="text-kidia-green-dark uppercase">Kidia</span>
        </div>
      )}
    </div>
  );
};
