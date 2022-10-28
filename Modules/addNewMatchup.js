import { getData } from "./data.js";
import { populateMatchups } from "./populateMatchups.js";
import { closeModal } from "../index.js";

export const addNewMatchup = () => {
  const data = getData();
  if (data.length > 0) {
    const { id } = data[data.length - 1];
    const newId = id + 1;

    const player1 = document.querySelector(".new-player1-name").value;
    const player2 = document.querySelector(".new-player2-name").value;

    const newData = [...data, { id: newId, player1, player2, scores: [] }];

    localStorage.setItem("ledgerData", JSON.stringify(newData));
  } else {
    const newId = 1;

    const player1 = document.querySelector(".new-player1-name").value;
    const player2 = document.querySelector(".new-player2-name").value;

    const newData = [...data, { id: newId, player1, player2, scores: [] }];

    localStorage.setItem("ledgerData", JSON.stringify(newData));
  }

  populateMatchups();
  closeModal();
};
