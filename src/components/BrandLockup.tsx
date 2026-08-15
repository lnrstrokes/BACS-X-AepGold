import React from 'react';

interface BrandLockupProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  theme?: 'dark' | 'light';
  className?: string;
}

export const BrandLockup: React.FC<BrandLockupProps> = ({
  size = 'md',
  theme = 'dark',
  className = '',
}) => {
  const isDark = theme === 'dark';

  const sizeClasses = {
    sm: 'text-xs',
    md: 'text-sm sm:text-base',
    lg: 'text-base sm:text-lg',
    xl: 'text-lg sm:text-xl',
  }[size];

  return (
    <div
      className={`inline-flex items-center select-none font-sans leading-none ${sizeClasses} ${className}`}
      aria-label="BACS × EapGold Travels"
    >
      <span
        className={`font-black tracking-wider uppercase ${
          isDark ? 'text-[#0B192C]' : 'text-white'
        }`}
      >
        BACS
      </span>
      <span
        className="mx-1.5 font-bold text-[#C59B27] text-[1.15em] leading-none"
        aria-hidden="true"
      >
        ×
      </span>
      <span
        className={`font-semibold tracking-normal ${
          isDark ? 'text-slate-800' : 'text-slate-200'
        }`}
      >
        EapGold Travels
      </span>
    </div>
  );
};
