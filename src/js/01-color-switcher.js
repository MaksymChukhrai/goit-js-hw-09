const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');
const body = document.body;

let intervalId = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, 0)}`;
}

function startColorSwitcher() {
  if (intervalId) {
    return;
  }

  intervalId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);

  startButton.disabled = true;
}

function stopColorSwitcher() {
  clearInterval(intervalId);
  intervalId = null;

  startButton.disabled = false;
}

startButton.addEventListener('click', startColorSwitcher);
stopButton.addEventListener('click', stopColorSwitcher);

