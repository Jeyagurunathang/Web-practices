import finalPage from "./_finalPageView.js";

class FinalScore {
  #state;
  determineScore(state) {
    this.#state = state;

    const correctAnswers = this.#state.result.correctAnswers.filter(
      (answer, i) => this.#state.result.userSelectedAnswers[i] === answer
    ).length;

    finalPage.renderScore(correctAnswers, state);
    finalPage.renderQuestionCard(state);
  }
}

export default new FinalScore();
