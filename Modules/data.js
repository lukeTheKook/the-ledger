export const getData = () => {
  if (localStorage.getItem("ledgerData")) {
    return JSON.parse(localStorage.getItem("ledgerData"));
  } else return [];
};

// export const data = getData();

const sampledata = [
  {
    id: 1,
    player1: "Luke",
    player2: "Kuhn",
    scores: [
      [11, 9],
      [8, 11],
      [11, 7],
    ],
  },
  {
    id: 2,
    player1: "Tom",
    player2: "Kuhn",
    scores: [],
  },
  {
    id: 3,
    player1: "Luke",
    player2: "Tom",
    scores: [],
  },
];
