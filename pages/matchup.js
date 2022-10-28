import { getData } from "../Modules/data.js";
import {
  displayPlayerNames,
  displayGamesWon,
} from "../Modules/matchupDisplay.js";
import {
  calculateGamesWon,
  handleInput,
  gameHistory,
  decreaseMatchup,
  increaseMatchup,
} from "../Modules/matchupLogic.js";
import { displayPointsTotal } from "../Modules/pointsNeedle.js";

// console.log(data);
// const urlID = parseInt(window.location.search.slice(4));

// const { id, player1, player2, scores } = data.find(({ id }) => id === urlID);

displayPlayerNames();
calculateGamesWon();
displayGamesWon();
gameHistory();
displayPointsTotal();

// ====Input=== //
const inputBtn = document.querySelector("#btnAddScore");
inputBtn.addEventListener("click", (e) => {
  e.preventDefault();
  handleInput();
  calculateGamesWon();
  displayGamesWon();
  gameHistory();
  displayPointsTotal();
});

// Navigate Matchups
const matchupDecreaseIcon = document.querySelector(".matchup-decrease");
const matchupIncreaseIcon = document.querySelector(".matchup-increase");

matchupDecreaseIcon.addEventListener("click", decreaseMatchup);
matchupIncreaseIcon.addEventListener("click", increaseMatchup);
