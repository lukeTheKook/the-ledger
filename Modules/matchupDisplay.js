import { getData } from "./data.js";
import { calculateGamesWon } from "./matchupLogic.js";

// const data = getData();

// const urlID = parseInt(window.location.search.slice(4));

// const { id, player1, player2 } = data.find(({ id }) => id === urlID);
export const displayPlayerNames = () => {
  const data = getData();

  const urlID = parseInt(window.location.search.slice(4));

  const { id, player1, player2 } = data.find(({ id }) => id === urlID);
  // select player name span elements
  const player1NameSpans = document.querySelectorAll(".player1NameSpan");
  const player2NameSpans = document.querySelectorAll(".player2NameSpan");

  // display names
  player1NameSpans.forEach((span) => (span.textContent = player1));
  player2NameSpans.forEach((span) => (span.textContent = player2));
};

export const displayGamesWon = () => {
  // select # of games won spans
  const gamesWonPlayer1Span = document.querySelector(".games-won-player1-span");
  const gamesWonPlayer2Span = document.querySelector(".games-won-player2-span");

  // display Games Won
  const gamesWon = calculateGamesWon();
  gamesWonPlayer1Span.textContent = gamesWon[0];
  gamesWonPlayer2Span.textContent = gamesWon[1];
};
// edit
export const displayEdit = () => {
  const data = getData();
  const urlID = parseInt(window.location.search.slice(4));

  const { id, player1, player2, scores } = data.find(({ id }) => id === urlID);

  const prevGameNum = parseInt(
    document.querySelector(".prev-game-num").textContent
  );
  const currentGameScores = scores[prevGameNum - 1];

  const editOverlay = document.querySelector(".edit-overlay");
  editOverlay.classList.add("show-edit-overlay");

  const currentGameNumSpan = document.querySelector(".current-game-num-span");
  const player1Input = document.querySelector("#input-player1");
  const player2Input = document.querySelector("#input-player2");
  currentGameNumSpan.textContent = prevGameNum;
  player1Input.value = currentGameScores[0];
  player2Input.value = currentGameScores[1];
};
