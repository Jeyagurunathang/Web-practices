import { ClearingElements } from "./_clearingHTML.js";
import userScore from "./_scoreView.js";

class QuizView extends ClearingElements {
  #state;
  #parentElement = document.querySelector(".question__container");
  #mainContainer = document.querySelector(".main");
  #finalPage = document.querySelector(".final__page");

  // Rendering questions
  renderingQuestions(state, count = 0) {
    this.#state = state;

    if (this.#state.currentIndex > +this.#state.QuestionLength - 1) {
      if (!count) this.clearing(this.#mainContainer);
      this.#finalPage.style.opacity = "1";
      this.#finalPage.style.display = "grid";
      this.#finalPage.style.zIndex = "15";

      userScore.determineScore(this.#state);
    }

    const question = `${this.#state.currentIndex + 1}. ${
      this.#state.result.questions[this.#state.currentIndex]
    }`;

    const html = this._renderHTML(question);

    // clearing the parent element
    this.clearing(this.#parentElement);

    // Rendering the question to the question container
    this.#parentElement.insertAdjacentHTML("beforeend", html);
  }

  // Rendering Question Element
  _renderHTML(question) {
    return `
    <p class="question">
        ${question}
    </p>
    `;
  }
}

export default new QuizView();
