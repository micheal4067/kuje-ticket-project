import { themeTogle } from "./theme.js";

themeTogle();

document.querySelector('.back-button-wrapper').addEventListener('click', ()=>{
  window.location.href = './ticket-dashboard.html';
});