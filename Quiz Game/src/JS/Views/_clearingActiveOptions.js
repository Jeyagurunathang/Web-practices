export class RemoveActiveOptions {
  removingOptions() {
    const options = document.querySelectorAll(".main__answers--item");

    options.forEach(option => option.classList.remove("active--option"));
  }
}
