
// Define constants for username and password
const userName = 'admin'; // Default username
const password = 'Password123'; // Default password

// Get HTML elements for username, password, wrong input message, and login button
const username = document.getElementById('username'); // Username input field
const passWord = document.getElementById('password'); // Password input field
const wrongInput = document.getElementById('wrong-input'); // Wrong input message element
const buttonElement = document.getElementById('login-button'); // Login button element
const notificationPopup = document.getElementById('notification-popup');

// Function to add event listener to login button
function logIn() {
  // Add event listener to login button
  buttonElement.addEventListener('click', () => {
    logInCheck(); // Call login check function when button is clicked
  });
}
logIn(); // Call login function to add event listener

// Add event listener to body for Enter key press
document.body.addEventListener('keydown', (event) => {
  // Check if Enter key is pressed
  if (event.key === 'Enter') {
    logInCheck(); // Call login check function when Enter key is pressed
  }
});

// Function to check login credentials
function logInCheck() {
  
  if (username.value === userName && passWord.value ===    password) {
        window.location.href = `./kuje-market-app.html`;
   }
   else {
    // Login failed, show the notification popup
    wrongInput.textContent = 'Wrong username or password!';
    notificationPopup.style.display = 'block';
    notificationPopup.style.color = 'white';
    notificationPopup.style.marginTop = '1rem'

    // Hide the notification popup after 3 seconds
    setTimeout(() => {
      notificationPopup.style.display = 'none';
    }, 3000);

  }
}

// Function to toggle password visibility
const passwordField = document.getElementById("password");
const togglePassword = document.querySelector(".password-toggle-icon i");

togglePassword.addEventListener("click", function () {
  if (passwordField.type === "password") {
    passwordField.type = "text";
    togglePassword.classList.remove("fa-eye");
    togglePassword.classList.add("fa-eye-slash");
  } else {
    passwordField.type = "password";
    togglePassword.classList.remove("fa-eye-slash");
    togglePassword.classList.add("fa-eye");
  }
});



