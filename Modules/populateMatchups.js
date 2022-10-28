import { getData } from "./data.js";

export const populateMatchups = () => {
  const matchupsDOM = document.querySelector(".matchups");
  const data = getData();
  const matchupsHTML = data
    .map(({ id, player1, player2, scores }) => {
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

      return `
        <!-- single matchup -->
        <article class="matchup" data-id="${id}" onclick="location.href='matchup.html?id=${id}'">
          <div class="${player1}-${player2}">
            <h4>${player1}: <span class="games-${player1}-${player2}-span">${gamesWon[0]}</span></h4>
          </div>
          <div class="${player2}-${player1}">
            <h4>${player2}: <span class="games-${player2}-${player1}-span">${gamesWon[1]}</span></h4>
          </div>
        </article>
        <!-- end of single matchcup -->`;
    })
    .join("");

  matchupsDOM.innerHTML = matchupsHTML;
};
