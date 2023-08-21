const addGameButton = document.getElementById("add-modal");
const startAddGameButton = document.querySelector("header button");
const backdrop = document.getElementById("backdrop");
const cancelButton = document.querySelector(".btn--passive");

const confirmButton = cancelButton.nextElementSibling;
const userInput = addGameButton.querySelectorAll("input");
const platformBox = document.getElementById("platform");
const genreBox = document.getElementById("genre");
const ratingBox = document.getElementById("rating");
const myGamesListText = document.getElementById("entry-text");

const deleteGameModal = document.getElementById("delete-modal");

games = [];

const deleteGameModalHandler = (gameId) => {
  let gameIndex = 0;
  for (game of games) {
    if (gameId === game.id) {
      break;
    }
    gameIndex++;
  }

  games.splice(gameIndex, 1);
  const listRoot = document.getElementById("game-list");
  listRoot.children[gameIndex].remove();
  cancelGameDelete();
  updateUI();
};

const cancelGameDelete = () => {
  deleteGameModal.classList.remove("visible");
  backdropToggle();
};

const deleteGameModalButtonHandler = (gameId) => {
  deleteGameModal.classList.add("visible");
  backdropToggle();
  const cancelDeletionButton = deleteGameModal.querySelector(".btn--passive");
  let confirmDeletionButton = deleteGameModal.querySelector(".btn--danger");

  confirmDeletionButton.replaceWith(confirmDeletionButton.cloneNode(true));

  confirmDeletionButton = deleteGameModal.querySelector(".btn--danger");

  // confirmDeletionButton.removeEventListener(  // This does not work...
  //   "click",
  //   deleteGameModalHandler.bind(null, gameId)
  // );

  cancelDeletionButton.removeEventListener("click", cancelGameDelete);

  cancelDeletionButton.addEventListener("click", cancelGameDelete);
  confirmDeletionButton.addEventListener(
    "click",
    deleteGameModalHandler.bind(null, gameId)
  );
};

const updateUI = () => {
  if (games.length <= 0) {
    myGamesListText.style.display = "block";
  } else {
    myGamesListText.style.display = "none";
  }
};

const addGameButtonToggle = () => {
  addGameButton.classList.toggle("visible");
  backdropToggle();
  clearAddGameModalInput();
};

const backdropToggle = () => {
  backdrop.classList.toggle("visible");
};

const closeGameModal = () => {
  addGameButton.classList.remove("visible");
  backdropToggle();
};

const showGameModal = () => {
  addGameButton.classList.add("visible");
  backdropToggle();
};

const cancelAddGameHandler = () => {
  closeGameModal();
  clearAddGameModalInput();
};

const clearAddGameModalInput = () => {
  userInput[0].value = "";
  userInput[1].value = "";
  ratingBox.value = "";
};

const addGameHandler = () => {
  const titleValue = userInput[0].value;
  const imageValue = userInput[1].value;
  const platformValue = platformBox.value;
  const genreValue = genreBox.value;
  const ratingValue = ratingBox.value;

  if (
    titleValue.trim() === "" ||
    imageValue.trim() === "" ||
    ratingValue.trim() === "" ||
    +ratingValue < 1 ||
    +ratingValue > 5
  ) {
    alert("Please enter valid values (rating between 1 and 5).");
    return;
  }

  const newGame = {
    id: Math.random().toString(), // use uuid in the future
    title: titleValue,
    image: imageValue,
    platform: platformValue,
    genre: genreValue,
    rating: ratingValue,
  };
  games.push(newGame);
  console.log(games);
  closeGameModal();

  clearAddGameModalInput();
  renderNewGame(
    newGame.id,
    newGame.title,
    newGame.image,
    newGame.platform,
    newGame.genre,
    newGame.rating
  );
};

const renderNewGame = (id, title, image, platform, genre, rating) => {
  const newGameElement = document.createElement("li");
  newGameElement.className = "game-element";
  newGameElement.innerHTML = `
  <div class="game-element__image">
    <img src="${image}" alt="${title}">
  </div>
  <div class="game-element__info">
    <h2>${title}</h2>
    <h2>${platform}</h2>
    <h2>${genre}</h2>
    <p>${rating}/5 stars</p>
  </div>
`;
  newGameElement.addEventListener(
    "click",
    deleteGameModalButtonHandler.bind(null, id)
  );
  const listRoot = document.getElementById("game-list");
  listRoot.append(newGameElement);
  updateUI();
};

const backdropClickHandler = () => {
  backdropToggle();
  closeGameModal();
  cancelGameDelete();
  clearAddGameModalInput();
};

startAddGameButton.addEventListener("click", showGameModal);
backdrop.addEventListener("click", backdropClickHandler);
cancelButton.addEventListener("click", closeGameModal);
confirmButton.addEventListener("click", addGameHandler);
