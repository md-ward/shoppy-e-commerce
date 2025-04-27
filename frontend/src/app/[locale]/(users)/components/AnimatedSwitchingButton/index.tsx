import { AnimatePresence, motion } from "motion/react"; // Fixed import for Framer Motion
import React, { JSX } from "react";

const AnimatedSwitchingButton = ({
  onSwitch,
  isEditable,
  FirstIcon,
  SecondIcon,
}: {
  onSwitch: () => void;
  isEditable: boolean;
  FirstIcon: JSX.Element;
  SecondIcon: JSX.Element;
}) => {
  return (
    <button
      className="text-white"
      onClick={() => {
        onSwitch();
      }}
    >
      <AnimatePresence mode="wait">
        {!isEditable ? (
          <motion.div
            key={"edit"}
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 180 }}
            exit={{ scale: 0, rotate: 0 }}
            transition={{ duration: 0.2 }}
          >
            {FirstIcon}
          </motion.div>
        ) : (
          <motion.div
            key={"close"}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: 180 }}
            transition={{ duration: 0.2 }}
          >
            {SecondIcon}
          </motion.div>
        )}
      </AnimatePresence>
    </button>
  );
};

export default AnimatedSwitchingButton;
