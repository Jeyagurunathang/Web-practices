const startBtn = document.querySelector(".start__btn");
export const startingMenu = document.querySelector(".starting__section");
export const startingOverlay = document.querySelector(".overlay");
export const gameCategory = document.querySelector(".Game__category");
export const gameType = document.querySelector(".Game__type");
export const gameDifficult = document.querySelector(".Game__difficult");
export const gameLimit = document.querySelector(".Game__limit");

class StartButton {
  startingButton(addStartingHandler) {
    startBtn.addEventListener("click", addStartingHandler);
  }
}

export default new StartButton();
