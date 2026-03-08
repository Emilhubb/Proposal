import Button from "@mui/material/Button";
import { useState, useEffect } from "react";
import React from "react";
import useTypeWriter from "../useTypeWriter";
import HeartAnimation from "./HeartAnimation";
import { motion, AnimatePresence } from "framer-motion";
const Question = ({ next, text, options }) => {
  const fullMessage = text;
  const [showOptions, setShowOptions] = useState(false);

  const message = useTypeWriter(text, 40, () => setShowOptions(true));

  useEffect(() => {
    const timer = setTimeout(
      () => {
        setShowOptions(true);
      },
      text.length * 40 + 500,
    );

    return () => clearTimeout(timer);
  }, [text]);

  return (
    <>
      <HeartAnimation />
      <div className="h-screen flex flex-col items-center justify-center bg-pink-200 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative z-10 mb-5 p-8 rounded-[30px] bg-white/30 backdrop-blur-md border border-white/40 shadow-xl max-w-2xl"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-pink-600 leading-snug">
            {message}
          </h2>
        </motion.div>

        <div className="flex flex-col gap-4 w-full max-w-sm z-10">
          <AnimatePresence>
            {showOptions &&
              options.map((option, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                >
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={next}
                    sx={{
                      py: 2,
                      borderRadius: "15px",
                      textTransform: "none",
                      fontSize: "1.1rem",
                      backgroundColor: "#ef4444", 
                      boxShadow: "0 8px 20px rgba(239, 68, 68, 0.3)",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#dc2626",
                        transform: "scale(1.03)",
                        boxShadow: "0 12px 25px rgba(220, 38, 38, 0.4)",
                      },
                    }}
                  >
                    {option}
                  </Button>
                </motion.div>
              ))}
          </AnimatePresence>
        </div>
        <motion.div
          animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-white opacity-20 blur-[100px] rounded-full pointer-events-none"
        />
      </div>
    </>
  );
};

export default Question;
