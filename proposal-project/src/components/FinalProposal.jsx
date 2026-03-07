import { use, useState } from "react";
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



  return (
    <div className="relative h-screen w-screen flex items-center justify-center text-center">
      <div
        className="absolute inset-0"
        style={{
          top: 0,
          left: 0,
          width: "100%", // tam ekran
          height: "100%",
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
        <Button
          variant="contained"
          color="error"
          style={{ textTransform: "none", fontSize: "1.5rem" }}
          onClick={saidYes}
        >
          YES
        </Button>
        {showConfetti && (
          <Confetti width={window.innerWidth} height={window.innerHeight} />
        )}
      </div>
    </div>
  );
}

export default FinalProposal;
