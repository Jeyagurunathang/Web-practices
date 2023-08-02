const buttons = document.querySelector(".buttons");
const question = document.querySelector(".prev__ques");
const screen = document.querySelector(".answer");

const signs = document.querySelectorAll(".signs");

const equalBtn = document.querySelector(".equal__btn");
const clearBtn = document.querySelector(".clear__btn");
const dotBtn = document.querySelector(".dot__btn");
const deleteBtn = document.querySelector(".del");
const negotateBtn = document.querySelector(".negotate");
const themeBtn = document.querySelector(".theme");

class Calculator {
  #numbers = [];
  #symbols = ["+", "-", "*", "/"];
  #otherSymbols = this.#symbols.concat(["C"]);

  constructor() {
    buttons.addEventListener("click", this._gettingvalue.bind(this));

    equalBtn.addEventListener("click", this._solveProblem.bind(this));

    clearBtn.addEventListener("click", this._clearScreen.bind(this));

    deleteBtn.addEventListener("click", this._deleteOneValue.bind(this));

    negotateBtn.addEventListener("click", this._negotate.bind(this));

    themeBtn.addEventListener("click", this._changingTheme.bind(this));
  }

  _gettingvalue(e) {
    let newArr;
    const element = e.target.closest(".btn");
    const dataProperty = element?.dataset.func;

    if (!element || dataProperty) return;

    const value = element.textContent;

    if (value === "Del") return;

    this._disableDotBtn(value);

    this.#numbers.push(value);

    const last = String(this.#numbers.slice(-2, -1));
    if (
      this.#numbers.length > 2 &&
      !Number(value) &&
      !Number(last) &&
      value !== last
    ) {
      this._enablingSignBtns();
      this.#numbers = [...this.#numbers.slice(0, -2)].concat([value]);
      element.disabled = true;
    }

    this.#symbols.forEach(symbol => {
      const last = String(this.#numbers.slice(-1));
      if (symbol === last) {
        element.disabled = true;
      }
    });

    if (Number(this.#numbers.slice(-1))) this._enablingSignBtns();

    this._enableDotBtn(value);

    // Render the value to the screen
    this._renderToScreen();
  }

  // Disabling and enabling dot button
  _disableDotBtn(value) {
    if (value === ".") dotBtn.disabled = true;
  }

  _enableDotBtn(value) {
    this.#symbols.forEach(symbol => {
      if (symbol === value) dotBtn.disabled = false;
    });
  }

  _enablingSignBtns() {
    signs.forEach(sign => (sign.disabled = false));
  }

  // Doing math for the user input
  _solveProblem() {
    this._renderQuestion(this.#numbers);
    let equation;
    const firstNumber = this.#numbers[0];

    this.#symbols.forEach(symbol => {
      if (symbol === firstNumber) {
        equation = "0" + this.#numbers.join("");
      } else {
        equation = this.#numbers.join("");
      }
    });

    const answer = eval(equation);
    screen.textContent = answer;
    this.#numbers = [];
    this.#numbers.push(answer);

    // Enabling sign button
    this._enablingSignBtns();
  }

  // Rendering question
  _renderQuestion(ques) {
    question.textContent = ques.join("");
  }

  // Rendering the answer to the screen
  _renderToScreen() {
    screen.textContent = this.#numbers.join("");
  }

  // Clearing the screen
  _clearScreen() {
    question.textContent = "";
    screen.textContent = "";
    this.#numbers = [];

    dotBtn.disabled = false;
    this._enablingSignBtns();
  }

  // Deleting one value
  _deleteOneValue() {
    this.#numbers = this.#numbers.slice(0, -1);

    signs.forEach(sign => (sign.disabled = false));
    this._renderToScreen(0);
  }

  // Negotate [changing the sign of the beginning number]
  _negotate() {
    if (this.#numbers[0] === "-") {
      this.#numbers[0] = "";

      this._renderToScreen();
    } else {
      this.#numbers.unshift("-");

      this._renderToScreen();
    }
  }

  _changingTheme(e) {
    const btn = e.target.closest(".theme");

    const theme = btn.dataset.theme;

    if (theme === "black") {
      document.documentElement.style.setProperty(
        "--symbol-background",
        "#e67e22"
      );
      document.documentElement.style.setProperty("--color-black-2", "#fff");
      document.documentElement.style.setProperty("--color-black", "#eee");
      document.documentElement.style.setProperty("--color-white", "#333");
      document.documentElement.style.setProperty(
        "--color-white-alpha",
        "#000000b0"
      );

      btn.dataset.theme = "white";
    }

    if (theme === "white") {
      document.documentElement.style.setProperty(
        "--symbol-background",
        "#2fc35c"
      );
      document.documentElement.style.setProperty("--color-black-2", "#262626");
      document.documentElement.style.setProperty("--color-black", "#333");
      document.documentElement.style.setProperty("--color-white", "#fff");
      document.documentElement.style.setProperty(
        "--color-white-alpha",
        "#eeeeee8a"
      );

      btn.dataset.theme = "black";
    }
  }
}

const calculator = new Calculator();
