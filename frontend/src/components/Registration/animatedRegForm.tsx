import { motion } from "motion/react";
import Signup from "./signup";
export default function AnimatedRegForm() {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Signup />
    </motion.div>
  );
}
