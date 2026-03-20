import React, { useState, useEffect } from "react";
import { Search, Brain, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

const STEPS = [
  {
    id: 'research',
    icon: Search,
    text: "Researching Company Culture",
    subtext: "Analyzing industry trends and values..."
  },
  {
    id: 'skills',
    icon: Brain,
    text: "Evaluating Skill Match",
    subtext: "Comparing your profile with requirements..."
  },
  {
    id: 'report',
    icon: FileText,
    text: "Generating Report",
    subtext: "Compiling personalized insights..."
  }
];

export function LoadingState() {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % STEPS.length);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  const StepIcon = STEPS[currentStep].icon;

  return (
    <div className="flex flex-col items-center justify-center p-8 md:p-12 min-h-[400px] w-full max-w-2xl mx-auto">
      {/* Main Animation Container */}
      <div className="relative mb-12">
        {/* Background Glow */}
        <div className="absolute inset-0 bg-teal-500/20 blur-3xl rounded-full scale-150 animate-pulse" />
        
        {/* Orbiting Rings */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-20px] rounded-full border border-teal-500/30 border-t-teal-500 border-r-transparent"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-[-10px] rounded-full border border-emerald-500/30 border-b-emerald-500 border-l-transparent"
        />

        {/* Central Icon Container */}
        <div className="relative bg-gray-900 p-8 rounded-full border border-gray-800 shadow-2xl z-10 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <StepIcon className="w-12 h-12 text-teal-400" />
            </motion.div>
          </AnimatePresence>
          
          {/* Scanning Effect Overlay */}
          <motion.div
            animate={{ top: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 right-0 h-1/2 bg-gradient-to-b from-transparent via-teal-500/10 to-transparent pointer-events-none"
          />
        </div>
      </div>

      {/* Text Content */}
      <div className="text-center space-y-4 relative z-10 h-24 w-full">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-2"
          >
            <h3 className="text-xl md:text-2xl font-bold text-white flex items-center justify-center gap-2">
              {STEPS[currentStep].text}
              <span className="flex gap-1">
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }}>.</motion.span>
                <motion.span animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.4 }}>.</motion.span>
              </span>
            </h3>
            <p className="text-gray-400 text-sm md:text-base">
              {STEPS[currentStep].subtext}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Progress Indicators */}
      <div className="flex gap-2 mt-8">
        {STEPS.map((step, index) => (
          <div
            key={step.id}
            className={`h-1.5 rounded-full transition-all duration-500 ${
              index === currentStep 
                ? "w-8 bg-teal-500" 
                : "w-2 bg-gray-700"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
