import { motion, HTMLMotionProps } from 'framer-motion';

interface PopButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

const PopButton: React.FC<PopButtonProps> = ({ children, className, ...props }) => {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default PopButton;
