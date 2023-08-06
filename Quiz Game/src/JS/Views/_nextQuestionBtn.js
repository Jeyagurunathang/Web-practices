class nextQuestion {
  #parentElement = document.querySelector(".next__question");
  renderNextQuestion(nextQuestion) {
    this.#parentElement.addEventListener("click", nextQuestion);
  }
}

export default new nextQuestion();
