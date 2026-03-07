import { useState, useRef, useEffect } from "react";
import { Button } from "@mui/material";
import Confetti from "react-confetti";
import useTypeWriter from "../useTypeWriter";

function FinalProposal({ selfie }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const firstMessage = useTypeWriter("Will you be my girlfriend? ❤️", 40);
  const secondMessage = useTypeWriter(
    showSecond ? "Yay! I'm so happy! ❤️" : "",
    40,
  );

  const saidYes = () => {
    setShowConfetti(true);
    setShowSecond(true);
  };

  // Ref for the confetti container
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
      className="relative h-screen w-screen flex items-center justify-center text-center"
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `url(${selfie})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "blur(3px)",
        }}
      />

      <div className="relative bg-white/70 p-10 rounded-lg z-10">
        <p className="text-4xl font-bold mb-6 text-red-500 uppercase">
          {showSecond ? secondMessage : firstMessage}
        </p>
        {showConfetti && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%", // div-in eni qədər
              height: "100%", // div-in hündürlüyü qədər
              pointerEvents: "none",
              overflow: "hidden", // div-dən çıxan confetti gizlənir
            }}
          >
            <Confetti
              width={containerRef.current?.offsetWidth} // div ölçüsünə uyğun
              height={containerRef.current?.offsetHeight} // div ölçüsünə uyğun
              numberOfPieces={200}
              recycle={true}
            />
          </div>
        )}

        {!showSecond && (
          <Button
            variant="contained"
            color="error"
            style={{ textTransform: "none", fontSize: "1.5rem" }}
            onClick={saidYes}
          >
            YES
          </Button>
        )}
      </div>
    </div>
  );
}

export default FinalProposal;
