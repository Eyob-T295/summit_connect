import React from 'react';

interface PopButtonProps {
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  type?: 'button' | 'submit';
  showArrow?: boolean;
}

const PopButton: React.FC<PopButtonProps> = ({
  children,
  onClick,
  className = '',
  type = 'button',
  showArrow = true,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`
        group relative inline-flex items-center justify-center
        transition-all duration-500 ease-out
        active:scale-95
        ${className}
      `}
    >
      <span className="flex items-center gap-3">
        {children}

        {showArrow && (
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        )}
      </span>

      {/* subtle hover underline */}
      <span
        className="
          absolute bottom-2 left-1/2 h-[2px] w-0
          bg-current opacity-40
          transition-all duration-500
          group-hover:w-3/4 group-hover:left-[12.5%]
        "
      />
    </button>
  );
};

export default PopButton;
