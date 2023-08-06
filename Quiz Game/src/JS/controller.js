import { fetchingQuestions, state, increaseIndex } from "./model.js";

import starting from "./Views/_startButtonView.js";
import {
  startingMenu,
  gameCategory,
  gameType,
  gameDifficult,
  gameLimit,
} from "./Views/_startButtonView.js";
import nextQuestion from "./Views/_nextQuestionBtn.js";
import renderOptions from "./Views/_renderOptions.js";

import timer from "./Views/_timer.js";

import quizQuestion from "./Views/_quizView.js";
import selectingOption from "./Views/_selectingAnwers.js";

import FinalPage from "./Views/_finalPageView.js";
let isLoading = false;

const start = async function () {
  const category = gameCategory.value;
  const type = gameType.value;
  const difficult = gameDifficult.value;
  const limit = gameLimit.value;
  const spinner = document.querySelector(".spinner");

  if (!isLoading) {
    spinner.style.display = "flex";
    spinner.style.zIndex = "99";
  }

  startingMenu.style.transform = "translateY(-100rem)";
  await fetchingQuestions(category, type, difficult, limit);

  isLoading = true;
  spinner.style.display = "none";
  spinner.style.zIndex = "1";

  // rendering the timer
  timer.calculateTime(state);

  quizQuestion.renderingQuestions(state);

  // Rendering the options
  renderOptions._renderingAnswers(state);

  // Selecting the answer from the user
  selectingOption.selectingAnswer(state);
};

const nextQuizQuestion = function () {
  // Increasing the current index count in the state object
  increaseIndex();

  // Rendering next questions
  quizQuestion.renderingQuestions(state);

  // Rendering options for that particular question
  renderOptions._renderingAnswers(state);
};

const createNewGame = function () {
  const startingMenu = document.querySelector(".starting__section");
  const finalPage = document.querySelector(".final__page");
  const mainContainer = document.querySelector(".main");

  state.category = "";
  state.currentIndex = 0;
  state.gameType = "";

  state.result.questions = [];
  state.result.options = [];
  state.result.correctAnswers = [];
  state.result.incorrectAnswers = [];
  state.result.userSelectedAnswers = [];
  state.result.score = 0;

  startingMenu.style.transform = "translateY(0rem)";
  startingMenu.style.display = "flex";

  // quizQuestion.renderingQuestions(state);
  mainContainer.style.display = "grid";
  // start();

  finalPage.style.opacity = "0";
  finalPage.style.display = "none";
};

const init = function () {
  starting.startingButton(start);
  nextQuestion.renderNextQuestion(nextQuizQuestion);
  FinalPage.newGame(createNewGame);
};
init();
