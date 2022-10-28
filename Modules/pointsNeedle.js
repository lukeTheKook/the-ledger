import { getData } from "./data.js";

// points total
export const displayPointsTotal = () => {
  const data = getData();
  const urlID = parseInt(window.location.search.slice(4));

  const { id, player1, player2, scores } = data.find(({ id }) => id === urlID);
  const player1PointsSpan = document.querySelector(".player1-points-won");
  const player2PointsSpan = document.querySelector(".player2-points-won");
  const player1PercentSpan = document.querySelector(".player1-percent-won");
  const player2PercentSpan = document.querySelector(".player2-percent-won");

  let player1Points;
  let player2Points;
  let player1Percent;
  let player2Percent;
  if (scores.length > 0) {
    const pointsTotals = scores.reduce(
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
};

// visual needle and pie
const updateNeedle = (percent) => {
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
};
