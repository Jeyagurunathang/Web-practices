import { ClearingElements } from "./_clearingHTML.js";

class Timer extends ClearingElements {
  #state;
  #parent = document.querySelector(".timer");
  #gameLimit = document.querySelector(".Game__limit");
  #timeLimit = ``;
  #mainContainer = document.querySelector(".main");
  #finalPage = document.querySelector(".time__out");

  calculateTime(state) {
    this.#state = state;
    this.#timeLimit = `${+this.#state.QuestionLength * 30}`;
    setInterval(this._renderingTimer.bind(this), 1000);
  }

  _renderingTimer() {
    const minute = String(Math.trunc(this.#timeLimit / 60)).padStart(2, "0");
    const seconds = String(this.#timeLimit % 60).padStart(2, "0");

    this.#parent.textContent = `${minute} : ${seconds}`;

    this.#timeLimit--;

    if (this.#timeLimit < 30) {
      this.#parent.classList.add("boomer__timer");
    }

    if (this.#timeLimit < 0) {
      clearInterval(this.calculateTime);
      this.clearing(this.#mainContainer);
      this.#finalPage.style.opacity = "1";
      this.#finalPage.style.display = "block";
    }
  }
}

export default new Timer();
