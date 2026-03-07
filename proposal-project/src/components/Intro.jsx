import Button from "@mui/material/Button";
import useTypeWriter from "../useTypeWriter";

const Intro = ({ next }) => {
  const fullMessage = "I have some questions for my cutie patootie ❤️";
  const message = useTypeWriter(fullMessage, 40); 

  return (
    <div className="h-screen flex flex-col items-center justify-center bg-pink-200 text-center">
      <h1 className="text-4xl font-bold mb-8 text-pink-500">{message}</h1>
      <Button variant="contained" color="error" onClick={next}>
        Let's Go!
      </Button>
    </div>
  );
};

export default Intro;