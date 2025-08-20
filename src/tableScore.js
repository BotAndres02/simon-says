const TABLE_SCORE = {
  currentLevel: 1,
  bestScore: 0,
  count: 0,
};

const ID_MAPPING = {
  currentLevel: "#level",
  bestScore: "#globalScore",
  count: "#score",
};

const elementById = (selector, value, parent = document) => {
  return (parent.querySelector(selector).innerHTML = value);
};

const updateElement = (id, value) => elementById(id, value);

export function updateTableScores() {
  Object.entries(TABLE_SCORE).forEach(([key, value]) => {
    if (ID_MAPPING[key]) {
      updateElement(ID_MAPPING[key], value);
    }
  });
}

export function incrementClickCount() {
  console.log("Working!!");
  TABLE_SCORE.count++;
  elementById(ID_MAPPING.count, TABLE_SCORE.count);
  checkAndUpdateBestScore();
}

export function checkAndUpdateBestScore() {
  const currentCount = TABLE_SCORE.count;
  if (currentCount > TABLE_SCORE.bestScore) {
    TABLE_SCORE.bestScore = currentCount;
    elementById(ID_MAPPING.bestScore, TABLE_SCORE.bestScore);
  }
}

export function levelUp() {
  TABLE_SCORE.currentLevel++;
  elementById(ID_MAPPING.currentLevel, TABLE_SCORE.currentLevel);
  /*tableScore.count = 0; // Reset count for the next level
  elementById('#score', tableScore.count);*/
}

export function resetCount() {
  TABLE_SCORE.count = 0; // Reset count for the next level
  elementById("#score", TABLE_SCORE.count);
}

export function resetLevel() {
  TABLE_SCORE.currentLevel = 1;
  elementById("#level", TABLE_SCORE.currentLevel);
}

export function resetAll() {
  TABLE_SCORE.currentLevel = 1;
  TABLE_SCORE.count = 0;
  updateTableScores();
}

// Getters
export const getCurrentLevel = () => TABLE_SCORE.currentLevel;

export const getBestScore = () => TABLE_SCORE.bestScore;

export const getCount = () => TABLE_SCORE.count;
