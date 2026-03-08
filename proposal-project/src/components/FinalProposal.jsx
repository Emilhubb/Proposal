import { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import Confetti from "react-confetti";
import useTypeWriter from "../useTypeWriter";
import { motion } from "framer-motion"; // Animasiyalar üçün

function FinalProposal({ selfie }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const firstMessage = useTypeWriter("Will you be my girlfriend? ❤️", 40);
  const secondMessage = useTypeWriter(
    showSecond ? "Yay! I'm so happy! ❤️" : "",
    40,
  );

  const saidYes = () => {
    setShowConfetti(true);
    setShowSecond(true);
  };

  const moveNoButton = () => {
    if (containerRef.current) {
      const container = containerRef.current;

      const btnWidth = 100;
      const btnHeight = 50;

      const maxX = container.clientWidth - btnWidth;
      const maxY = container.clientHeight - btnHeight;

      const randomX = Math.random() * maxX - maxX / 2;
      const randomY = Math.random() * maxY - maxY / 2;

      setNoButtonPos({ x: randomX, y: randomY });
    }
  };
  const containerRef = useRef(null);
  const [confettiSize, setConfettiSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setConfettiSize({ width: rect.width, height: rect.height });
    }
  }, [showConfetti]);

  return (
    <div
      ref={containerRef}
      className="relative h-screen w-screen flex items-center justify-center text-center overflow-hidden touch-none"
    >
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-400 via-rose-100 to-pink-300">
        <motion.div
          animate={{ scale: [1, 2.2, 1], opacity: [0.1, 0.4, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-white rounded-full blur-[120px]"
        />
        {showConfetti && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
              overflow: "hidden",
            }}
          >
            <Confetti
              width={containerRef.current?.offsetWidth}
              height={containerRef.current?.offsetHeight}
              numberOfPieces={200}
              recycle={true}
            />
          </div>
        )}
      </div>
      <div className="relative bg-white/70 p-10 rounded-lg z-10">
        <p className="text-4xl font-bold mb-6 text-red-500">
          {showSecond ? secondMessage : firstMessage}
        </p>

        {!showSecond && (
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            {/* Əsas YES Düyməsi */}
            <Button
              variant="contained"
              color="error"
              className="hover:scale-110 transition-transform"
              style={{
                textTransform: "none",
                fontSize: "1.6rem",
                padding: "10px 40px",
                borderRadius: "50px",
                fontWeight: "bold",
              }}
              onClick={saidYes}
            >
              YES!
            </Button>

            {/* Qaçan NO Düyməsi */}
            <motion.div
              animate={{ x: noButtonPos.x, y: noButtonPos.y }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <Button
                variant="outlined"
                color="inherit"
                onMouseEnter={moveNoButton} // Mouse üzərinə gələndə qaçır
                onClick={moveNoButton} // Mobildə klikləyəndə qaçır
                style={{
                  textTransform: "none",
                  fontSize: "1.2rem",
                  padding: "8px 30px",
                  borderRadius: "50px",
                  borderColor: "#f87171",
                  color: "#ef4444",
                }}
              >
                No
              </Button>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}

export default FinalProposal;
