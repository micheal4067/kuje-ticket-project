import { marketNameDisplay } from "../data/login-name.js";
import { themeTogle } from "./theme.js";

themeTogle();

// Set the initial username and password if not set in localStorage
if (!localStorage.getItem('username')) {
  localStorage.setItem('username', 'admin');
}
if (!localStorage.getItem('password')) {
  localStorage.setItem('password', 'admin');
}
console.log(localStorage);

function logInCheck() {
  const usernameInput = document.getElementById('username');
  const passwordInput = document.getElementById('password');
  const wrongInput = document.querySelector('.wrong-input');

  // Check if username and password are entered
  if (usernameInput.value && passwordInput.value) {
    // Retrieve the stored username and password from localStorage
    const savedUsername = localStorage.getItem('username');
    const savedPassword = localStorage.getItem('password');

    // Validate the entered username and password
    if (savedUsername === usernameInput.value && savedPassword === passwordInput.value) {
      window.location.href = './ticket-dashboard.html';
    } else {
      wrongInput.innerHTML = 'Incorrect username or password. Please try again.';
      usernameInput.value = '';
      passwordInput.value = '';
    }
  } else {
    wrongInput.innerHTML = 'Enter username or password';
    usernameInput.value = '';
    passwordInput.value = '';
  }
}

document.querySelector('.btn').addEventListener('click', () => {
  logInCheck();
  marketFun();
});

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    logInCheck();
  }
});

function headingEdit() {
  const inputElement = document.querySelector('.market-name');
  const heading = document.querySelector('.heading-name');

  if (localStorage.getItem('market')) {
    heading.innerHTML = marketNameDisplay;
  } else if (!localStorage.getItem('market')) {
    heading.innerHTML = marketNameDisplay;
    inputElement.addEventListener('input', () => {
      const marketNameHead = inputElement.value;
      heading.innerHTML = marketNameHead;
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

function marketFun() {
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
