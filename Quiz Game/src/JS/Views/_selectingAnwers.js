import { RemoveActiveOptions } from "./_clearingActiveOptions.js";

class SelectingAnswer extends RemoveActiveOptions {
  #state;
  #parent = document.querySelector(".main__answers");

  selectingAnswer(state) {
    this.#state = state;
    this.#parent.addEventListener("click", this.pushingValue.bind(this));
  }

  pushingValue(e) {
    const options = e.target.closest(".main__answers--item");

    if (!options) return;

    // Removing active option class from options
    this.removingOptions();

    // Adding active option
    options.classList.add("active--option");

    const value = options.textContent.trim();

    this.#state.result.userSelectedAnswers[this.#state.currentIndex] = value;
  }
}

export default new SelectingAnswer();
