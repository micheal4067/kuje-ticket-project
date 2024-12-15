import { themeTogle } from "./theme.js";


window.addEventListener('load', () => {
  const spinnerOverlay = document.getElementById('spinner-overlay');

  // Add a delay before hiding the spinner
  setTimeout(() => {
    spinnerOverlay.style.display = 'none';
  }, 1000); // Adjust delay time (2000ms = 2 seconds)
});

themeTogle();

document.querySelector('.back-button-wrapper').addEventListener('click', ()=>{
  window.history.back();
});
