// Game Score Total

let gamesLukeKuhn;

if (getLocalStorage("Luke", "Kuhn")) {
  let allgamesLukeKuhn = getLocalStorage("Luke", "Kuhn");
  let allgamesKuhnLuke = getLocalStorage("Luke", "Kuhn");

  gamesLukeKuhn = [
    allgamesLukeKuhn[allgamesLukeKuhn.length - 1][2],
    allgamesKuhnLuke[allgamesKuhnLuke.length - 1][3],
  ];
} else {
  gamesLukeKuhn = [0, 0];
}

// Load screen
window.addEventListener("DOMContentLoaded", function () {
  showLukeKuhnGameScore();
});

// select # of games won spans
const gamesLukeKuhnSpan = document.querySelector(".games-luke-kuhn-span");
const gamesKuhnLukeSpan = document.querySelector(".games-kuhn-luke-span");
// select score inputs
const inputLukeKuhn = document.querySelector("#input-luke-kuhn");
const inputKuhnLuke = document.querySelector("#input-kuhn-luke");

const btnAddScore = document.querySelector("#btnAddScore");

// add score
btnAddScore.addEventListener("click", function () {
  const gameScoreLukeKuhn = [
    parseInt(inputLukeKuhn.value),
    parseInt(inputKuhnLuke.value),
  ];

  if (gameScoreLukeKuhn[0] > gameScoreLukeKuhn[1]) {
    gamesLukeKuhn[0]++;
  } else if (gameScoreLukeKuhn[0] < gameScoreLukeKuhn[1]) {
    gamesLukeKuhn[1]++;
  }
  LukeKuhnStore(
    gameScoreLukeKuhn[0],
    gameScoreLukeKuhn[1],
    gamesLukeKuhn[0],
    gamesLukeKuhn[1]
  );

  // showscore
  showLukeKuhnGameScore();
});

// Display LukeKuhn total game score in all spans
function showLukeKuhnGameScore() {
  gamesLukeKuhnSpan.textContent = gamesLukeKuhn[0];
  gamesKuhnLukeSpan.textContent = gamesLukeKuhn[1];
  showPointsTotal("Luke", "Kuhn");
  gameHistory("Luke", "Kuhn");
}

// local storage
function LukeKuhnStore(score1, score2, games1, games2) {
  const games = getLocalStorage("Luke", "Kuhn");
  if (games) {
    games.push([score1, score2, games1, games2]);
    localStorage.setItem("LukeKuhnGames", JSON.stringify(games));
  } else {
    localStorage.setItem(
      "LukeKuhnGames",
      JSON.stringify([[score1, score2, games1, games2]])
    );
  }
}

function getLocalStorage(player1, player2) {
  const gamesData = JSON.parse(
    localStorage.getItem(`${player1}${player2}Games`)
  );
  return gamesData;
}

// Game history
function gameHistory(player1, player2) {
  const games = getLocalStorage(player1, player2);
  const prevGameNumSpan = document.querySelector(".prev-game-num");
  let player1PrevScore;
  let player2PrevScore;
  let prevGameNum;
  const player1PrevScoreSpan = document.querySelector(
    ".player1-prev-game-score"
  );
  const player2PrevScoreSpan = document.querySelector(
    ".player2-prev-game-score"
  );
  // end of input title
  if (games) {
    prevGameNum = games.length;
    player1PrevScore = games[prevGameNum - 1][0];
    player2PrevScore = games[prevGameNum - 1][1];
  } else {
    player1PrevScore = 0;
    player2PrevScore = 0;
    prevGameNum = 0;
  }
  prevGameNumSpan.textContent = prevGameNum;
  player1PrevScoreSpan.textContent = player1PrevScore;
  player2PrevScoreSpan.textContent = player2PrevScore;

  // input title
  const currentGameNumSpan = document.querySelector(".current-game-num-span");
  currentGameNumSpan.textContent = prevGameNum + 1;
  // show history function
  function showHistory() {
    player1PrevScore = games[prevGameNum - 1][0];
    player2PrevScore = games[prevGameNum - 1][1];
    prevGameNumSpan.textContent = prevGameNum;
    player1PrevScoreSpan.textContent = player1PrevScore;
    player2PrevScoreSpan.textContent = player2PrevScore;

    // colors
    // if (player1PrevScore > player2PrevScore) {
    //   player1PrevScoreSpan.style.color = "green";
    // }
  }
  // navigate games
  const gameNumIncreaseIcon = document.querySelector(".game-increase");
  const gameNumDecreaseIcon = document.querySelector(".game-decrease");

  gameNumIncreaseIcon.addEventListener("click", function () {
    if (prevGameNum < games.length) {
      prevGameNum++;
    } else prevGameNum = 1;
    showHistory();
  });
  gameNumDecreaseIcon.addEventListener("click", function () {
    if (prevGameNum > 1) {
      prevGameNum--;
    } else prevGameNum = games.length;
    showHistory();
  });
}

// points total
function showPointsTotal(player1, player2) {
  const games = getLocalStorage(player1, player2);

  const player1PointsSpan = document.querySelector(".player1-points-won");
  const player2PointsSpan = document.querySelector(".player2-points-won");
  const player1PercentSpan = document.querySelector(".player1-percent-won");
  const player2PercentSpan = document.querySelector(".player2-percent-won");

  let player1Points;
  let player2Points;
  let player1Percent;
  let player2Percent;
  if (games) {
    pointsTotals = games.reduce(
      function (acc, curr) {
        acc[0] += curr[0];
        acc[1] += curr[1];
        return acc;
      },
      [0, 0]
    );

    player1Points = pointsTotals[0];
    player2Points = pointsTotals[1];
    player1Percent = `${Math.round(
      (pointsTotals[0] / (pointsTotals[0] + pointsTotals[1])) * 100
    )}%`;
    player2Percent = `${Math.round(
      (pointsTotals[1] / (pointsTotals[0] + pointsTotals[1])) * 100
    )}%`;
  } else {
    player1Points = 0;
    player2Points = 0;
    player1Percent = "0%";
    player2Percent = "0%";
  }
  player1PointsSpan.textContent = player1Points;
  player2PointsSpan.textContent = player2Points;
  player1PercentSpan.textContent = player1Percent;
  player2PercentSpan.textContent = player2Percent;

  updateNeedle(player1Percent);
}

// visual needle and pie
function updateNeedle(percent) {
  const needle = document.querySelector(".needle");
  const rotation = (50 - parseInt(percent)) * 5.3;
  if (percent === "0%") {
    needle.style.transform = `rotate(0deg)`;
  } else if (rotation > -90 && rotation < 90) {
    needle.style.transform = `rotate(${rotation}deg)`;
    if (needle.classList.contains("needle-bounce-left")) {
      needle.classList.remove("needle-bounce-left");
    }
    if (needle.classList.contains("needle-bounce-right")) {
      needle.classList.remove("needle-bounce-right");
    }
  } else if (rotation <= -90) {
    if (!needle.classList.contains("needle-bounce-left"))
      needle.classList.add("needle-bounce-left");
  } else if (rotation >= 90) {
    if (!needle.classList.contains("needle-bounce-right"))
      needle.classList.add("needle-bounce-right");
  }
}
