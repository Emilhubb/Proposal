import { useState } from "react";
import {ThemeProvider} from "@mui/material/styles";
import theme from "./Theme";
import Intro from "./components/Intro";
import FinalProposal from "./components/FinalProposal";
import Question from "./components/Question";
import BuildUp from "./components/BuildUp";

const App = ({options}) => {
  const [step, setStep] = useState(0);
  const [selfie, setSelfie] = useState(null);


  const questions = [
    { text: "Where did we meet for the first time?", options: ['At a volunteering training', 'On Mars'] },
    { text: "Where did we meet for the first time in person?", options: ['At the café', 'On a pedestrian cross'] },
    { text: "When did we confess our feelings to each other?", options: ['On New Year\'s Eve', 'January 27th'] },
    { text: "What was the first thing I gave you?", options: ['A minecraft model', 'A spaceship model'] },
    { text: "What dessert did we share for the first time?", options: ['Panna cotta', 'Tiramisu'] },
    { text: "When did you kiss my cheek for the first time?", options: ['March 5th', 'February 14th'] },
    { text: "What food did we eat together last time?", options: ['Kebab', 'Pizza'] },
    { text: "Do you really enjoy spending time with me?", options: ['Yes', 'DEFINITELYY!!!'] },
  ];

  const next = () => setStep(step + 1);
  if (step === 0) return <Intro next={next} />;
  if (step > 0 && step <= questions.length){
    return <Question text={questions[step - 1].text} options={questions[step - 1].options} next={next} />
  }
  if (step === questions.length + 1) return <BuildUp next={next} setSelfie={setSelfie}/>;
  if (step === questions.length + 2) 
  return <FinalProposal selfie={selfie} />;



};

const AppWrapper = () => (
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>
);

export default AppWrapper;
