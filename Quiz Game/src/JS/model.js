import { API_URL } from "./config.js";

export const state = {
  category: "",
  result: {
    questions: [],
    options: [],
    correctAnswers: [],
    incorrectAnswers: [],
    userSelectedAnswers: [],
    score: 0,
  },
  currentIndex: 0,
  gameType: "",
  QuestionLength: 0,
};

let options = [];

export const fetchingQuestions = async function (
  category,
  type,
  difficult,
  limit
) {
  const fetching = await fetch(
    `${API_URL}amount=${limit}&category=${category}&difficulty=${difficult}&type=${type}`
  );
  const res = await fetching.json();
  const { results } = res;

  results.forEach(result => {
    const { category } = result;
    const { incorrect_answers } = result;
    const { correct_answer } = result;
    const { question } = result;

    const randomIndex = Math.trunc(Math.random() * 4);

    state.category = category;
    state.result.correctAnswers.push(correct_answer);
    state.result.incorrectAnswers.push(incorrect_answers);
    state.result.options.push(
      incorrect_answers.splice(randomIndex, 0, correct_answer)
    );
    state.result.questions.push(question);

    options.push(incorrect_answers.concat(correct_answer));
    state.gameType = type;
    state.QuestionLength = limit;
  });
};

export const increaseIndex = function () {
  state.currentIndex++;
};
