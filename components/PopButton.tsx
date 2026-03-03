import { motion, HTMLMotionProps } from 'framer-motion';

interface PopButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  showArrow?: boolean;
}

const PopButton: React.FC<PopButtonProps> = ({
  children,
  className,
  showArrow = true,
  ...props
}) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`group inline-flex items-center gap-2 ${className}`}
      {...props}
    >
      {children}

      {showArrow && (
        <span className="transition-transform duration-300 group-hover:translate-x-1">
          →
        </span>
      )}
    </motion.button>
  );
};

export default PopButton;