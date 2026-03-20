import React from "react";
import { motion } from "motion/react";
import { InteractiveLogo } from "./InteractiveLogo";

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-950 text-white"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="flex flex-col items-center gap-4"
      >
        <InteractiveLogo size="lg" />
        <h1 className="text-3xl font-bold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">CareerFit Analyst</h1>
        <p className="text-teal-400 font-medium tracking-wide">AI-Powered Career Insights</p>
      </motion.div>
    </motion.div>
  );
}
