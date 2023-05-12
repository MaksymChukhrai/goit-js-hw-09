import flatpickr from 'flatpickr';
import Notiflix from 'notiflix';

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

let countdownIntervalId;

function startCountdown() {
  clearInterval(countdownIntervalId);
  const targetDate = fp.selectedDates[0];
  if (targetDate < new Date()) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  countdownIntervalId = setInterval(() => {
    const timeDiff = targetDate - new Date();
    if (timeDiff <= 0) {
      clearInterval(countdownIntervalId);
      Notiflix.Notify.success('Time is up!');
      return;
    }
    const time = convertMs(timeDiff);
    daysValue.textContent = time.days.toString().padStart(2, '0');
    hoursValue.textContent = time.hours.toString().padStart(2, '0');
    minutesValue.textContent = time.minutes.toString().padStart(2, '0');
    secondsValue.textContent = time.seconds.toString().padStart(2, '0');
  }, 1000);
}

const inputElement = document.querySelector('#datetime-picker');
const fp = flatpickr(inputElement, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose: function(selectedDates) {
    if (selectedDates[0] < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      startButton.disabled = true;
    } else {
      startButton.disabled = false;
    }
  },
});

startButton.addEventListener('click', startCountdown);

