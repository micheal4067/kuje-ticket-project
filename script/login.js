import { marketNameDisplay } from "../data/login-name.js";
import { themeTogle } from "./theme.js";

themeTogle();

function logInCheck(){
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const wrongInput = document.querySelector('.wrong-input');

  if(usernameInput.value && passwordInput.value){
    window.location.href = './ticket-dashboard.html';
  } else{
    wrongInput.innerHTML = 'Enter any username or Password';
    usernameInput.value = '';
    passwordInput.value = '';
  }
}

document.querySelector('.btn').addEventListener('click',()=>{
  logInCheck();
  marketFun();
})

document.body.addEventListener('keydown', (event)=>{
 if(event.key === 'Enter'){
  logInCheck();
 }
});

function headingEdit(){
  const inputElement = document.querySelector('.market-name');
  const heading = document.querySelector('.heading-name');

  if (localStorage.getItem('market')) {
    heading.innerHTML = marketNameDisplay;;
  } else if (!localStorage.getItem('market')) {
    heading.innerHTML = marketNameDisplay;
    inputElement.addEventListener('input', () => {
      const marketNameHead = inputElement.value;
      heading.innerHTML = marketNameHead
    });
  }
}

headingEdit();

document.getElementById("alphabet-input").addEventListener("keydown", function(e) {
  const maxLength = 17;
  const input = this.value;

  if (input.length > maxLength) {
    this.value = input.slice(0, maxLength);
    e.preventDefault();
  }
});

function marketFun () {
  const inputElement = document.querySelector('.market-name');

    const marketName = inputElement.value;
    if (!localStorage.getItem('market')) {
      marketNameDisplay.push(marketName);
      localStorage.setItem('market', marketName);

    }
} 

marketFun();

document.addEventListener("DOMContentLoaded", function () {
  const welcomeModal = document.getElementById("welcomeModal");

  // Check if the user has already seen the welcome modal
  if (!localStorage.getItem("welcomeModalShown")) {
    // Display the modal if not shown before
    welcomeModal.style.display = "flex";

    // Close the modal when the button is clicked
    document.getElementById("closeModalButton").addEventListener("click", function () {
      welcomeModal.style.display = "none";
      localStorage.setItem("welcomeModalShown", "true"); // Remember the modal has been shown
    });
  }
});










