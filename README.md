<img width="1771" height="728" alt="image" src="https://github.com/user-attachments/assets/6b124924-65ae-4930-84b3-c6f235d6e16b" />


# Interactive Proposal Web Application

An interactive, romantic quiz and proposal web application built using React.js, Vite, and Material UI, styled with TailwindCSS.

## 🚀 Features
* **Interactive Memory Quiz:** A step-by-step custom question flow tracking shared memories with dynamic option selections.
* **Live Camera Integration:** Uses `navigator.mediaDevices.getUserMedia` to capture a live selfie before the final reveal.
* **Dynamic Visual Effects:** Floating heart animations, custom interactive typewriter effects, and full-screen confetti upon a successful proposal.
* **Evasive "No" Button:** A motion-controlled "No" button utilizing `framer-motion` that dynamically jumps away when hovered or clicked, ensuring a positive outcome.

## 🛠️ Tech Stack & Libraries
* **Frontend:** React.js (Hooks, Context concepts)
* **Styling:** TailwindCSS & Material UI (MUI Custom Themes)
* **Animations:** Framer Motion (AnimatePresence & spring transitions)
* **Effects:** `react-confetti` for celebration rendering.

## 📁 Project Structure & Component Mapping
* `App.jsx`: Core state controller managing steps (Intro -> Questions -> Camera -> Final Proposal).
* `main.jsx` & `index.css`: Application entry point and Tailwind utility configurations.
* `Theme.jsx`: Custom Material UI theme layer setting typography standards (e.g., *Cinzel* font).
* `/components`:
  * `Intro.jsx`: Welcome screen featuring a customized welcoming typewriter message.
  * `Question.jsx`: Handles layout and motion delays for memory questions.
  * `BuildUp.jsx`: Manages HTML5 canvas rendering and camera streams for live photos.
  * `FinalProposal.jsx`: The final screen containing the evasion logic for the "No" button and confetti activation.
  * `HeartAnimation.jsx`: Absolute-positioned background loop generating randomized floating CSS hearts.
* `/hooks`:
  * `useTypeWriter.jsx`: A reusable custom hook handling string slicing timing loops for text rendering.

## ⚙️ Setup & Local Development
1. Clone the repository:
   ```bash
   git clone [https://github.com/Emilhubb/Proposal.git](https://github.com/Emilhubb/Proposal.git)
