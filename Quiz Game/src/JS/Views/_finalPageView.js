class FinalPage {
  #state;
  #scoreElement = document.querySelector(".scorecard__score");
  #parent = document.querySelector(".questionCard--list");
  #newGameBtn = document.querySelector(".new__gameBtn");

  renderScore(score, state) {
    this.#scoreElement.textContent = `${score} / ${state.QuestionLength}`;
  }

  renderQuestionCard(state) {
    this.#state = state;

    this.#state.result.questions.forEach((question, i) => {
      const html = `
      <li class="questionCard--item">
      <div class="questionCard--questionContainer">
        <p class="questionCard--question">
          ${question}
        </p>
      </div>

      <div class="questionCard__options">
        <ul class="options__list">
          ${this._renderOption(i)}
        </ul>
      </div>
      `;
      this.#parent.insertAdjacentHTML("beforeend", html);
    });
  }

  _renderOption(i) {
    const options = this.#state.result.incorrectAnswers[i];
    const answer = this.#state.result.correctAnswers[i];
    const userSelectedAnswer = this.#state.result.userSelectedAnswers[i];

    if (this.#state.gameType === "multiple")
      return this._multipleOptions(options, answer, userSelectedAnswer);

    if (this.#state.gameType === "boolean")
      return this._trueOrFalse(options, answer, userSelectedAnswer);
  }

  _multipleOptions(options, answer, userSelectedAnswer) {
    return `
    <li class="options__item">
      ${this._checkCorrectAnswer(
        answer,
        userSelectedAnswer,
        `<a href="#" class="options__link">${options[0]}</a>`
      )}
    </li>
    <li class="options__item">
    ${this._checkCorrectAnswer(
      answer,
      userSelectedAnswer,
      `<a href="#" class="options__link">${options[1]}</a>`
    )}
    </li>

    <li class="options__item">
      ${this._checkCorrectAnswer(
        answer,
        userSelectedAnswer,
        `<a href="#" class="options__link">${options[2]}</a>`
      )}
    </li>

    <li class="options__item">
      ${this._checkCorrectAnswer(
        answer,
        userSelectedAnswer,
        `<a href="#" class="options__link">${options[3]}</a>`
      )}
    </li>
    <li class="options__liner"></li>
    </li>
  `;
  }

  _trueOrFalse(options, answer, userSelectedAnswer) {
    return `
    <li class="options__item">
      ${this._checkCorrectAnswer(
        answer,
        userSelectedAnswer,
        `<a href="#" class="options__link">${options[0]}</a>`
      )}
    </li>
    <li class="options__item">
    ${this._checkCorrectAnswer(
      answer,
      userSelectedAnswer,
      `<a href="#" class="options__link">${options[1]}</a>`
    )}
    </li>
    <li class="options__liner"></li>
  `;
  }

  _checkCorrectAnswer(answer, userSelectedAnswer, option) {
    const answerStartingPoint = option.indexOf(">") + 1;

    const userAnswer = option.slice(answerStartingPoint, -4);

    if (userAnswer === answer) {
      return `<a href="#" class="options__link correct_answer">${userAnswer}</a>`;
    } else if (userAnswer === userSelectedAnswer) {
      return `<a href="#" class="options__link wrong__answer">${userAnswer}</a>`;
    } else {
      return `<a href="#" class="options__link">${userAnswer}</a>`;
    }
  }

  newGame(creatingNewGame) {
    this.#newGameBtn.addEventListener("click", creatingNewGame);
  }
}

export default new FinalPage();
