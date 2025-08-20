import * as TableScore from "./tableScore";

const SimonGameColors = {
  YELLOW: "yellow",
  BLUE: "blue",
  RED: "red",
  GREEN: "green",
};

const elementById = (ID, parent = document) => {
  const element = parent.querySelector(ID);
  if(!element){
    console.error(`Element not found: ${ID}`);
    return null;
  }
  return element;
};

export class SimonGame {

  constructor() {
    // Game constants
    this.LAST_LEVEL = 5;
    this.COLORS = Object.values(SimonGameColors);

    // Game state
    this.currentLevel = 1;
    this.subLevel = 0;
    this.sequence = [];
    this.gameActive = false;
    this.sequenceRunning = false;

    // UI elements
    this.colors = {
      yellow: elementById("#yellow"),
      blue: elementById("#blue"),
      red: elementById("#red"),
      green: elementById("#green"),
    };

    this.startButton = elementById("#start-game");

    // Bind methods
    this.selectColor = this.selectColor.bind(this);
    this.nextLevel = this.nextLevel.bind(this);

    this.initializeGame();
  }

  initializeGame() {
    this.currentLevel = 1;
    this.subLevel = 0;
    this.gameActive = false;

    TableScore.resetAll();
    TableScore.updateTableScores();

    this.toggleStartButton();
    this.generateSequence();

    setTimeout(() => this.nextLevel(), 500);
  }

  toggleStartButton() {
    if (this.startButton) {
      this.startButton.classList.toggle("hide");
    }
  }

  generateSequence() {
    const test = this.sequence = new Array(this.LAST_LEVEL)
      .fill(0)
      .map(() => Math.floor(Math.random() * this.COLORS.length));
  }

  nextLevel() {
    this.subLevel = 0;
    this.gameActive = true;

    this.lightUpSequence();
    this.manageEventsClick();
  }

  getColorByNumber(number) {
    return this.COLORS[number];
  }

  getNumberByColor(color) {
    return this.COLORS.indexOf(color);
  }

  async lightUpSequence() {
    this.gameActive = false;
    this.sequenceRunning = true;

    for (let i = 0; i < this.currentLevel; i++) {
      const color = this.getColorByNumber(this.sequence[i]);
      
      await new Promise(resolve => {
        setTimeout(() => {
          this.lightUpColor(color);
          setTimeout(resolve, 600);
        }, 800 * i);
      });
    }
    
    this.gameActive = true;
    this.sequenceRunning = false;
  }

  lightUpColor(color) {
    if (this.colors[color]) {
      this.colors[color].classList.add("light");
      setTimeout(() => this.turnOffColor(color), 350);
    }
  }

  turnOffColor(color) {
    if (this.colors[color]) {
      this.colors[color].classList.remove("light");
    }
  }

  manageEventsClick(add = true) {
    const method = add ? "addEventListener" : "removeEventListener";

    Object.values(this.colors).forEach((colorElement) => {
      if (colorElement) {
        colorElement[method]("click", this.selectColor);
      }
    });
  }

  selectColor(event) {
    if (!this.gameActive) return;

    const colorName = event.target.dataset.color;
    const colorNumber = this.getNumberByColor(colorName);

    this.lightUpColor(colorName);

    console.log("Selected color: ", colorName, "Number: ", colorNumber);
    console.log("Expected color number: ", this.sequence[this.subLevel]);

    if (colorNumber === this.sequence[this.subLevel]) {
      this.manageCorrectAnswer();
    } else {
      this.gameOver();
    }
  }

  manageCorrectAnswer() {
    this.subLevel++;
    TableScore.incrementClickCount();
    if (this.subLevel === this.currentLevel) {
      this.manageCompleteLevel();
    }
  }

  manageCompleteLevel() {
    this.currentLevel++;
    TableScore.levelUp();

    this.manageEventsClick(false);

    if (this.currentLevel === (this.LAST_LEVEL + 1)) {
      this.wonGame();
    } else {
      setTimeout(() => this.nextLevel(), 1500);
    }
  }

  wonGame() {
    this.gameActive = false;
    /* this.toggleStartButton();
        TableScore.resetCount(); */
    alert("Congratulations! You won the game!");
    this.initializeGame();
  }

  gameOver() {
    this.gameActive = false;
    this.manageEventsClick(false);
    /* this.toggleStartButton();
        TableScore.resetCount(); */
    alert("Game Over! Try again!");
    this.initializeGame();
  }
}
