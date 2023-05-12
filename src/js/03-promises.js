import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delayInput = document.querySelector('input[name="delay"]');
const stepInput = document.querySelector('input[name="step"]');
const amountInput = document.querySelector('input[name="amount"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = parseInt(delayInput.value);
  const step = parseInt(stepInput.value);
  const amount = parseInt(amountInput.value);

  for (let i = 1; i <= amount; i++) {
    const position = i;
    const promiseDelay = delay + step * (i - 1);

    setTimeout(() => {
      createPromise(position, promiseDelay)
        .then(({ position, delay }) => {
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }, promiseDelay);
  }
});

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

Notiflix.init({
  useGoogleFont: false,
  fontFamily: 'Quicksand',
  timeout: 3000,
  position: 'center',
  distance: '10px',
  borderRadius: '5px',
  backOverlay: true,
  backOverlayColor: 'rgba(0,0,0,0.5)',
  plainText: false,
  cssAnimationStyle: 'fade',
});
