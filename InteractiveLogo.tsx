import React from "react";
import { motion } from "motion/react";
import { BrainCircuit } from "lucide-react";

interface InteractiveLogoProps {
  size?: "sm" | "lg";
  className?: string;
}

export function InteractiveLogo({ size = "sm", className = "" }: InteractiveLogoProps) {
  const isLarge = size === "lg";
  const iconSize = isLarge ? "w-12 h-12" : "w-5 h-5";
  const containerPadding = isLarge ? "p-4" : "p-2";
  const rounded = isLarge ? "rounded-2xl" : "rounded-lg";

  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
      initial="initial"
      whileTap="tap"
    >
      <motion.div
        className={`bg-gradient-to-br from-teal-500 to-emerald-600 ${containerPadding} ${rounded} shadow-lg shadow-teal-500/20 relative overflow-hidden`}
        variants={{
          initial: { scale: 1 },
          hover: {
            scale: 1.05,
            boxShadow: "0 10px 25px -5px rgba(20, 184, 166, 0.4)",
          },
          tap: { scale: 0.95 }
        }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
      >
        {/* Continuous subtle pulse for the background gradient */}
        <motion.div 
            className="absolute inset-0 bg-gradient-to-br from-teal-400/0 to-emerald-500/0"
            animate={{
                opacity: [0, 0.3, 0],
            }}
            transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut"
            }}
        />

        {/* Animated background shine on hover */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 w-[200%]"
          initial={{ x: "-150%" }}
          variants={{
            hover: {
              x: ["-150%", "150%"],
              transition: {
                duration: 1,
                repeat: Infinity,
                repeatDelay: 0.5,
                ease: "easeInOut",
              }
            }
          }}
        />

        <motion.div
          variants={{
            hover: {
              rotate: [0, -10, 10, -5, 5, 0],
              transition: {
                duration: 0.6,
                ease: "easeInOut",
              }
            }
          }}
        >
          <BrainCircuit className={`${iconSize} text-white relative z-10`} />
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
