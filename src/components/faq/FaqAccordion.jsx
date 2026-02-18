"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export default function FaqAccordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group rounded-xl border border-white/15 bg-white/5 overflow-hidden backdrop-blur-sm hover:border-white/25 transition-colors duration-300">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full p-4 md:p-6 text-left flex items-center justify-between cursor-pointer"
      >
        <span className="text-white font-semibold text-base md:text-lg pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          className="text-white/60 text-xl shrink-0"
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ 
              height: "auto", 
              opacity: 1,
              transition: {
                height: {
                  duration: 0.4,
                  ease: [0.4, 0, 0.2, 1]
                },
                opacity: {
                  duration: 0.3,
                  ease: "easeInOut",
                  delay: 0.1
                }
              }
            }}
            exit={{ 
              height: 0, 
              opacity: 0,
              transition: {
                height: {
                  duration: 0.3,
                  ease: [0.4, 0, 0.2, 1]
                },
                opacity: {
                  duration: 0.2,
                  ease: "easeInOut"
                }
              }
            }}
            className="overflow-hidden"
          >
            <motion.div
              initial={{ y: -10 }}
              animate={{ 
                y: 0,
                transition: {
                  duration: 0.4,
                  ease: [0.68, -0.55, 0.27, 1.55], // Adding bounce effect
                  delay: 0.1
                }
              }}
              exit={{ 
                y: -10,
                transition: {
                  duration: 0.3,
                  ease: [0.68, -0.55, 0.27, 1.55] // Adding bounce effect
                }
              }}
              className="px-4 md:px-6 pb-4 md:pb-6"
            >
              <p className="text-white/70 text-sm md:text-base leading-relaxed">
                {answer}
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
