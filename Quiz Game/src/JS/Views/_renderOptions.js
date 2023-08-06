import { ClearingElements } from "./_clearingHTML.js";

class RenderingOptions extends ClearingElements {
  #state;
  #parentElement = document.querySelector(".main__answers");

  // Rendering Answer options
  _renderingAnswers(state, count = 0) {
    this.#state = state;
    const index = this.#state.currentIndex;

    // clearing the parent element
    if (!count) this.clearing(this.#parentElement);

    this.#state.result.incorrectAnswers[index]?.forEach((option, i) => {
      const html = `
      <li class="main__answers--item answer--${i + 1}">
        <a href="#" class="main__answers--link"> ${option} </a>
      </li>
    `;

      // Rendering the options
      this.#parentElement.insertAdjacentHTML("beforeend", html);
    });
  }
}

export default new RenderingOptions();
