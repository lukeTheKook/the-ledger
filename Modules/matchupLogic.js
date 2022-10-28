import { getData } from "./data.js";
import { displayPlayerNames } from "./matchupDisplay.js";

// const data = getData();
// const urlID = parseInt(window.location.search.slice(4));

// const { id, player1, player2, scores } = data.find(({ id }) => id === urlID);

// Calculate Games Won

export const calculateGamesWon = () => {
  const data = getData();
  const urlID = parseInt(window.location.search.slice(4));

  const { id, player1, player2, scores } = data.find(({ id }) => id === urlID);

  const gamesWon = scores.reduce(
    (acc, curr) => {
      if (curr[0] > curr[1]) {
        acc[0]++;
      } else if (curr[1] > curr[0]) {
        acc[1]++;
      } else if (curr[0] === curr[1]) {
        acc[0]++;
        acc[1]++;
      }
      return acc;
    },
    [0, 0]
  );
  return gamesWon;
};

// Game History
export const gameHistory = () => {
  const data = getData();
  const urlID = parseInt(window.location.search.slice(4));

  const { id, player1, player2, scores } = data.find(({ id }) => id === urlID);

  const prevGameNumSpan = document.querySelector(".prev-game-num");

  const player1PrevScoreSpan = document.querySelector(
    ".player1-prev-game-score"
  );
  const player2PrevScoreSpan = document.querySelector(
    ".player2-prev-game-score"
  );
  let prevGameNum;
  let player1PrevScore;
  let player2PrevScore;

  if (scores.length > 0) {
    console.log("ffoo");
    prevGameNum = scores.length;
    displayHistory();
  } else {
    player1PrevScore = 0;
    player2PrevScore = 0;
    prevGameNum = 0;
    prevGameNumSpan.textContent = prevGameNum;
    player1PrevScoreSpan.textContent = player1PrevScore;
    player2PrevScoreSpan.textContent = player2PrevScore;
  }
  // Current Game number
  const currentGameNumSpan = document.querySelector(".current-game-num-span");
  currentGameNumSpan.textContent = prevGameNum + 1;

  function displayHistory() {
    player1PrevScore = scores[prevGameNum - 1][0];
    player2PrevScore = scores[prevGameNum - 1][1];
    prevGameNumSpan.textContent = prevGameNum;
    player1PrevScoreSpan.textContent = player1PrevScore;
    player2PrevScoreSpan.textContent = player2PrevScore;

    // colors
    if (player1PrevScore > player2PrevScore) {
      player1PrevScoreSpan.classList.add("winner");
      player2PrevScoreSpan.classList.remove("winner");
    }
    if (player2PrevScore > player1PrevScore) {
      player2PrevScoreSpan.classList.add("winner");
      player1PrevScoreSpan.classList.remove("winner");
    }
  }
  // navigate games
  const gameNumIncreaseIcon = document.querySelector(".game-increase");
  const gameNumDecreaseIcon = document.querySelector(".game-decrease");

  gameNumIncreaseIcon.addEventListener("click", function () {
    if (prevGameNum < scores.length) {
      prevGameNum++;
    } else prevGameNum = 1;
    displayHistory();
  });
  gameNumDecreaseIcon.addEventListener("click", function () {
    if (prevGameNum > 1) {
      prevGameNum--;
    } else prevGameNum = scores.length;
    displayHistory();
  });
};
// navigate Matchups
export const decreaseMatchup = () => {
  const data = getData();
  const urlID = parseInt(window.location.search.slice(4));
  const currentIndex = data.findIndex(({ id }) => id === urlID);

  if (currentIndex > 0) {
    const nextIndex = currentIndex - 1;
    const { id } = data[nextIndex];
    location.href = `matchup.html?id=${id}`;
  } else {
    const nextIndex = data.length - 1;
    const { id } = data[nextIndex];
    location.href = `matchup.html?id=${id}`;
  }
};
export const increaseMatchup = () => {
  const data = getData();
  const urlID = parseInt(window.location.search.slice(4));
  const currentIndex = data.findIndex(({ id }) => id === urlID);

  if (currentIndex < data.length - 1) {
    const nextIndex = currentIndex + 1;
    const { id } = data[nextIndex];
    location.href = `matchup.html?id=${id}`;
  } else {
    const nextIndex = 0;
    const { id } = data[nextIndex];
    location.href = `matchup.html?id=${id}`;
  }
};

// ==== Input Handler ===//
export const handleInput = () => {
  const data = getData();
  const urlID = parseInt(window.location.search.slice(4));

  const { id, player1, player2, scores } = data.find(({ id }) => id === urlID);
  const player1Input = parseInt(document.querySelector("#input-player1").value);
  const player2Input = parseInt(document.querySelector("#input-player2").value);

  console.log([player1Input, player2Input]);
  const newScores = [...scores, [player1Input, player2Input]];
  const newMatchupData = { id, player1, player2, scores: newScores };
  const newData = data.map((matchup) => {
    if (matchup.id === id) {
      return newMatchupData;
    } else return matchup;
  });

  localStorage.setItem("ledgerData", JSON.stringify(newData));
};
