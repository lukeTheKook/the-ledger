import { getData } from "./Modules/data.js";
import { populateMatchups } from "./Modules/populateMatchups.js";
import { addNewMatchup } from "./Modules/addNewMatchup.js";
console.log(getData());

populateMatchups();

// add new Matchup Modal
const newMatchupIcon = document.querySelector(".new-matchup-icon");
const closeModalIcon = document.querySelector(".close-modal");
const modal = document.querySelector(".new-matchup-modal-overlay");

const openModal = () => {
  modal.classList.add("show-modal");
};
newMatchupIcon.addEventListener("click", openModal);
export const closeModal = () => {
  modal.classList.remove("show-modal");
};
closeModalIcon.addEventListener("click", closeModal);
// Add new Matchup Logic
const addMatchupBtn = document.querySelector(".add-matchup-btn");
addMatchupBtn.addEventListener("click", (e) => {
  e.preventDefault();
  addNewMatchup();
});
