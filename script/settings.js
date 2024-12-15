// Import necessary data and functions

import { marketNameDisplay } from '../data/login-name.js';
import { themeTogle } from './theme.js';
import { logOutApp } from './event-listeners.js';
import { modalHTML } from './modals.js';
import './settings-password.js';
import { initializeSalesLogToggle } from './toggle-sales.js';

// Initialize the sales log toggle functionality
initializeSalesLogToggle();


document.querySelector('.back-button-image, .back-arrow').addEventListener('click', () => {
  window.location.href = './ticket-dashboard.html';
});

themeTogle();

document.querySelector('.modals-html').innerHTML = modalHTML;

// Display market name and last login time
document.querySelector('.market-name').innerHTML = `${marketNameDisplay} - Settings`;



document.getElementById('dashboard').addEventListener('click', ()=>{
  window.location.href = './ticket-dashboard.html';
});

// Get references to the modal and buttons
const parametersButton = document.getElementById("parameters-btn");
const parametersModal = document.getElementById("parameters-modal");
const closeModalButton = document.getElementById("close-modal");

// Function to open the modal
parametersButton.addEventListener("click", () => {
  parametersModal.classList.add("show"); // Slide in modal
});

// Function to close the modal
closeModalButton.addEventListener("click", () => {
  parametersModal.classList.remove("show"); // Slide out modal
});

// Function to save IP values to localStorage
function saveIPAddresses() {
  const entryIP1 = document.getElementById("entry-ip-1").value;
  const entryIP2 = document.getElementById("entry-ip-2").value;
  const exitIP1 = document.getElementById("exit-ip-1").value;
  const exitIP2 = document.getElementById("exit-ip-2").value;

  // Save them in localStorage
  localStorage.setItem("entry-ip-1", entryIP1);
  localStorage.setItem("entry-ip-2", entryIP2);
  localStorage.setItem("exit-ip-1", exitIP1);
  localStorage.setItem("exit-ip-2", exitIP2);

  // Show the success message modal
  const successMessage = document.getElementById("success-message");
  successMessage.classList.add("show");

  // Hide the success message after 3 seconds
  setTimeout(() => {
    successMessage.classList.remove("show");
  }, 3000); // Hide after 3 seconds
}

// Function to retrieve IP values from localStorage and populate the fields
function loadIPAddresses() {
  // Get the saved values from localStorage
  const entryIP1 = localStorage.getItem("entry-ip-1");
  const entryIP2 = localStorage.getItem("entry-ip-2");
  const exitIP1 = localStorage.getItem("exit-ip-1");
  const exitIP2 = localStorage.getItem("exit-ip-2");

  // Populate the input fields with stored values, if they exist
  if (entryIP1 !== null) document.getElementById("entry-ip-1").value = entryIP1;
  if (entryIP2 !== null) document.getElementById("entry-ip-2").value = entryIP2;
  if (exitIP1 !== null) document.getElementById("exit-ip-1").value = exitIP1;
  if (exitIP2 !== null) document.getElementById("exit-ip-2").value = exitIP2;
}

  loadIPAddresses(); 

// Event listener for the Save Settings button
document.getElementById("save-settings-btn").addEventListener("click", saveIPAddresses);



// settings.js
export function initializeSettingsToggle() {
  const salesToggle = document.getElementById("sales-toggle"); // The toggle in settings
  const savedState = localStorage.getItem("salesLogVisible");

  // Restore the toggle state from localStorage
  if (savedState === "false") {
    salesToggle.checked = true; // Checked means sales log is hidden
  } else {
    salesToggle.checked = false; // Unchecked means sales log is visible
  }

  // Event listener to save the toggle state to localStorage when it changes
  salesToggle.addEventListener("change", () => {
    if (salesToggle.checked) {
      localStorage.setItem("salesLogVisible", "false"); // Hide sales log
    } else {
      localStorage.setItem("salesLogVisible", "true"); // Show sales log
    }
  });
}




logOutApp();

