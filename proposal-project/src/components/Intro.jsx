import Button from "@mui/material/Button";
import useTypeWriter from "../useTypeWriter";
import "../styles/App.css";
import HeartAnimation from "./HeartAnimation";

const Intro = ({ next }) => {
  const fullMessage = "I have some questions for my cutie patootie ❤️";

  const message = useTypeWriter(fullMessage, 40);

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-gradient-to-b from-pink-100 to-pink-300 text-center p-6 overflow-hidden relative">
      <HeartAnimation/>
      <div className="z-10 flex flex-col items-center">
        <h1
          className="text-[49px] md:text-6xl font-bold mb-10 text-pink-600 drop-shadow-md select-none"
          style={{ fontFamily: "'Cinzel', cursive" }}
        >
          {message}
        </h1>

        <Button
          variant="contained"
          onClick={next}
          sx={{
            backgroundColor: "#ff4d6d",
            padding: "15px 50px",
            borderRadius: "30px",
            fontSize: "1.3rem",
            fontWeight: "bold",
            textTransform: "none",
            boxShadow: "0 8px 15px rgba(255, 77, 109, 0.4)",
            "&:hover": {
              backgroundColor: "#ff758f",
              transform: "scale(1.1)",
              transition: "0.3s",
            },
          }}
        >
          Let's Go!
        </Button>
      </div>
    </div>
  );

};

export default Intro;
