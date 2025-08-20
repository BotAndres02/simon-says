import { SimonGame } from "./game.js";

let currentGame = null;
// Initialize the game when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  const startButton = document.getElementById("start-game");
  if (startButton) {
    startButton.addEventListener("click", () => {
      currentGame = new SimonGame();
    });
  }
});

/* import './style.css'
import { setupCounter } from './counter.js'
setupCounter(document.querySelector('#counter'))
const startButton = elementById('#start');
const LAST_LEVEL = 5;
const SimonGameColors = {
  RED: 'red',
  GREEN: 'green',
  BLUE: 'blue',
  YELLOW: 'yellow',
  } */