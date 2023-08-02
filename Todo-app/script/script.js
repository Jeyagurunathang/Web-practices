const navbar = document.querySelector(".sidebar");
const sidebarTaskCategory = document.querySelector(".sidebar__tasks--list");

const tasksContainer = document.querySelector(".todo__task");

const taskForm = document.querySelector(".todo__addtask");
const inputEl = document.querySelector(".todo__input");

const taskCompleteBtn = document.querySelector(".todo__task--icon-1");
const taskCancelBtn = document.querySelector(".todo__task--icon-2");
const themeChangeBtn = document.querySelector(".sidebar__theme");
const navBtn = document.querySelector(".nav_btn");

const userScore = document.querySelector(".user__score");
const scoreBar = document.querySelector(".score__bar--rise");

const todoPriority = document.querySelector(".todo__priority");

const priorityTaskList = document.querySelector(".tags--list");

class Todo {
  #tasks = [];

  constructor() {
    this._getTheTaskFromForm();

    // Getting data from the localStorage
    this._getTheDataFromLocalStorage();
    this._getWidthFromLocalStorage();

    // Adding eventListener to the priority tasks container
    this._addEventToPriorityLists();

    // Adding Event to the apps in the sidenav bar (Today, Habit)
    this._addEventToApp();

    // Completing task
    this._completingTheTask();

    // Adding event to change the theme
    this._addEventToTheme();

    // Activate the theme on the page loads
    this._activateTheme();

    // Showing and hiding navbar
    this._showingHidingNav();
  }

  _getTheTaskFromForm() {
    taskForm.addEventListener("submit", this._getTheTaskFromInput.bind(this));
  }

  _getTheTaskFromInput(e) {
    e.preventDefault();

    // Getting the value from the input field
    const taskDetail = inputEl.value;
    const taskPriority = todoPriority.value;

    inputEl.value = "";
    inputEl.blur();

    // Generating the random id using timestamp
    const uniqueId = (Date.now() + "").slice(-7);

    const taskData = {
      task: taskDetail,
      id: uniqueId,
      priority: taskPriority,
    };

    this.#tasks.push(taskData);

    // Storing the data to the local storage
    this._storingDataInLocalStorage();

    // Getting each tasks from the tasks array
    this._creatingTasks(taskData);
  }

  _storingDataInLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.#tasks));
  }

  _getTheDataFromLocalStorage() {
    if (localStorage.length > 5) return;

    this.#tasks.push(...JSON.parse(localStorage.getItem("tasks")));

    // Getting each tasks from the tasks array
    this._gettingEachTasks();
  }

  _gettingEachTasks() {
    this.#tasks.forEach(task => {
      this._creatingTasks(task);
    });
  }

  _creatingTasks(task) {
    const html = `
      <li class="todo__task--item" id="${task.id}">
        <a href="#" class="todo__task--detail"> ${task.task} 
        
        <span class="todo__task--priority todo__task--priority--${task.priority}">${task.priority}</span>
        </a>
        <span class="todo__task--icon-1" id="${task.id}" data-icon="1">
          <svg class="todo__task--icon" data-icon="1">
            <use xlink:href="img/sprite.svg#icon-emoji-happy" data-icon="1"></use>
          </svg>
        </span>
        <span class="todo__task--icon-2" id="${task.id}" data-icon="2">
          <svg class="todo__task--icon icon__sad" data-icon="2">
            <use xlink:href="img/sprite.svg#icon-emoji-sad" data-icon="2"></use>
          </svg>
        </span>
      </li>
    `;

    tasksContainer.insertAdjacentHTML("beforeend", html);
  }

  _completingTheTask() {
    tasksContainer.addEventListener(
      "click",
      this._disappearingTasks.bind(this)
    );
  }

  _disappearingTasks(e) {
    const icon_id = e.target.dataset.icon;

    const taskComplete = e.target.closest(`.todo__task--icon-${icon_id}`);

    if (!taskComplete) return;

    const id = taskComplete.id;
    const completedTask = document.getElementById(`${id}`);

    completedTask.classList.add("todo__task--completed");

    if (icon_id === "1") this._addWidth();

    if (icon_id === "2") this._decreaseWidth();

    // Clearing element from the localstorage
    this._clearingElementInLocalStorage(id);
  }

  _clearingElementInLocalStorage(id) {
    const tasks = JSON.parse(localStorage.getItem("tasks"));

    tasks.forEach((task, i) => {
      if (task.id === id) {
        tasks.splice(i, 1);
      }
    });

    this.#tasks = tasks;
    this._storingDataInLocalStorage();
  }

  _refactorWidthAdding(updatedWidth, localstorage = false) {
    userScore.textContent = Number.parseInt(updatedWidth);
    scoreBar.style.width = updatedWidth;

    // Store the width in the localStorage
    if (localstorage) this._storeWidthInLocalStorage(updatedWidth);
  }

  _addWidth() {
    const previousWidth = scoreBar.offsetWidth;
    const updatedWidth = previousWidth + 2 + "px";

    this._refactorWidthAdding(updatedWidth, true);
  }

  _decreaseWidth() {
    const previousWidth = scoreBar.offsetWidth;
    const updatedWidth = previousWidth - 2 + "px";

    this._refactorWidthAdding(updatedWidth, true);
  }

  _storeWidthInLocalStorage(width) {
    localStorage.setItem("scoreBar_width", JSON.stringify(width));
  }

  _getWidthFromLocalStorage() {
    const width = JSON.parse(localStorage.getItem("scoreBar_width"));

    this._refactorWidthAdding(width);
  }

  // Displaying Tasks by priorities
  _addEventToPriorityLists() {
    priorityTaskList.addEventListener(
      "click",
      this._getPriorityTasksFromLocalStorage.bind(this)
    );
  }

  _getPriorityTasksFromLocalStorage(e) {
    const priority = e.target.closest(".sidebar__tasks--link")?.dataset
      .priority;

    if (!priority) return;

    const priorityTasks = JSON.parse(localStorage.getItem("tasks")).filter(
      task => task.priority === `${priority}`
    );

    this.#tasks = priorityTasks;

    tasksContainer.innerHTML = "";
    this._gettingEachTasks();
  }

  _addEventToApp() {
    sidebarTaskCategory.addEventListener(
      "click",
      this._selectingApp.bind(this)
    );
  }

  _selectingApp(e) {
    const app = e.target.closest(".sidebar__tasks--link")?.dataset.app;

    if (!app) return;

    if (app === "todo") {
      this.#tasks = JSON.parse(localStorage.getItem("tasks"));

      tasksContainer.innerHTML = "";
      this._gettingEachTasks();
    }
  }

  // Showing and hiding the navbar
  _showingHidingNav() {
    navBtn.addEventListener("click", function (e) {
      // navbar.style.display = "flex";
      // const btn = e.target.closest(".nav_btn");

      this.classList.toggle("width");
      navbar.classList.toggle("move");
    });
  }

  // Add event to change the theme
  _addEventToTheme() {
    themeChangeBtn.addEventListener("click", this._changeTheme.bind(this));
  }

  // Changing the theme
  _changeTheme() {
    const btn = themeChangeBtn.closest(".sidebar__theme");

    const theme = btn.dataset.theme;

    this._themeBtn = btn;

    this._themeDecider(btn, theme);
  }

  _themeDecider(btn, theme) {
    // For dark theme
    if (theme === "white") {
      btn.dataset.theme = "black";
      this._darkTheme();

      // theme = "black";
      localStorage.setItem("theme", JSON.stringify(theme));
    }

    // For white theme
    if (theme === "black") {
      btn.dataset.theme = "white";
      this._whiteTheme();

      // theme = "white";
      localStorage.setItem("theme", JSON.stringify(theme));
    }
  }

  // Activating the previous theme on page loads
  _activateTheme() {
    const btn = themeChangeBtn.closest(".sidebar__theme");

    const theme = JSON.parse(localStorage.getItem("theme"));

    this._themeDecider(btn, theme);
  }

  // White theme colors
  _whiteTheme() {
    document.documentElement.style.setProperty("--primary-color", "#fff");
    document.documentElement.style.setProperty("--primary-color--2", "#eeede9");

    document.documentElement.style.setProperty(
      "--secondary-color--dark",
      "#a4b3b0"
    );

    document.documentElement.style.setProperty("--green", "#416c60");

    document.documentElement.style.setProperty("--medium-priority", "#eec659");
    document.documentElement.style.setProperty("--low-priority", "#96bddf");

    document.documentElement.style.setProperty("--color-black", "#333");
    document.documentElement.style.setProperty("--color-black-1", "#413f3a");
    document.documentElement.style.setProperty("--color-black-2", "#333");

    document.documentElement.style.setProperty("--color-heading", "#333");
  }

  // Dark theme colors
  _darkTheme() {
    document.documentElement.style.setProperty("--primary-color", "#1f2226");
    document.documentElement.style.setProperty("--primary-color--2", "#474f59");

    document.documentElement.style.setProperty(
      "--secondary-color--dark",
      "#373d3b"
    );

    document.documentElement.style.setProperty("--green", "#2ecc71");

    document.documentElement.style.setProperty("--medium-priority", "#e79e31");
    document.documentElement.style.setProperty("--low-priority", "#176fbd");

    document.documentElement.style.setProperty("--color-black", "#f1f1f1");
    document.documentElement.style.setProperty("--color-black-1", "#f1f1f1");
    document.documentElement.style.setProperty("--color-black-2", "#f1f1f1");

    document.documentElement.style.setProperty("--color-heading", "#f2a81d");
  }
}

const todoApp = new Todo();
