import Button from "@mui/material/Button";
import React from "react";
import useTypeWriter from "../useTypeWriter";
import HeartAnimation from "./HeartAnimation";

const Question = ({ next, text, options }) => {
  const fullMessage = text
  const message = useTypeWriter(fullMessage, 40);
  return (
    <>
    <HeartAnimation/>
      <div className="h-screen flex flex-col items-center justify-center bg-pink-200 text-center">
        <h2 className="text-3xl font-bold mb-4 text-pink-500 pb-10">{message}</h2>

        <div className="flex flex-col gap-4">
          {options.map((option, index) => (
            <Button
              key={index}
              variant="contained"
              color="error"
              onClick={next}
            >
              {option}
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Question;
