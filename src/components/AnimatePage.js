import { motion } from "framer-motion";

// Component AnimatePage is a wrapper component which gives a smooth transition when Linking from one component to another
const AnimatePage = ({ children }) => {
  const animation = {
    initial: { opacity: 0, x: 100 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -100 },
  };

  return (
    <motion.div
      variants={animation}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{
        duration: 0.75,
        type: "spring"
      }}
    >
      {children}
    </motion.div>
  );
};

export default AnimatePage;