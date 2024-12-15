// Open the change password modal
document.getElementById("change-password-btn").addEventListener("click", function() {
  const modal = document.getElementById("change-password-modal");
  modal.classList.add("show"); // Add the "show" class to make the modal visible
});

// Save the password when clicking the save button
document.getElementById("save-password-btn").addEventListener("click", function() {
  const oldPassword = document.getElementById("old-password").value;
  const newPassword = document.getElementById("new-password").value;
  const confirmPassword = document.getElementById("confirm-password").value;

  // Basic validation
  if (!oldPassword || !newPassword || !confirmPassword) {
    showFailureModal("Please fill in all fields.");
    return;
  }

  // Check if the old password matches the stored one
  const savedPassword = localStorage.getItem("password");
  if (savedPassword !== oldPassword) {
    showFailureModal("Old password is incorrect.");
    return;
  }

  // Check if new password and confirm password match
  if (newPassword !== confirmPassword) {
    showFailureModal("New password and confirm password do not match.");
    return;
  }

  // Save the new password (or perform other necessary actions)
  localStorage.setItem("password", newPassword);

  // Show success modal
  showSuccessModal("Your password has been updated successfully!");

  // Close the change password modal
  const modal = document.getElementById("change-password-modal");
  modal.classList.remove("show"); // Remove the "show" class to hide the modal
});

// Close the change password modal when clicking the close button
document.getElementById("close-change-password-modal").addEventListener("click", function() {
  const modal = document.getElementById("change-password-modal");
  modal.classList.remove("show"); // Remove the "show" class to hide the modal
});

// Close the success modal
document.getElementById("close-success-modal").addEventListener("click", function() {
  const successModal = document.getElementById("success-modal");
  successModal.classList.remove("show"); // Hide the success modal
});

// Close the failure modal
document.getElementById("close-failure-modal").addEventListener("click", function() {
  const failureModal = document.getElementById("failure-modal");
  failureModal.classList.remove("show"); // Hide the failure modal
});

// Show the success modal
function showSuccessModal(message) {
  const successModal = document.getElementById("success-modal");
  const successMessage = successModal.querySelector("p");
  successMessage.textContent = message;
  successModal.classList.add("show"); // Show the success modal

  // Close success modal after 3 seconds
  setTimeout(() => {
    successModal.classList.remove("show"); // Hide the success modal after 3 seconds
  }, 3000);
}

// Show the failure modal
function showFailureModal(message) {
  const failureModal = document.getElementById("failure-modal");
  const failureMessage = failureModal.querySelector("p");
  failureMessage.textContent = message;
  failureModal.classList.add("show"); // Show the failure modal

  // Close failure modal after 3 seconds
  setTimeout(() => {
    failureModal.classList.remove("show"); // Hide the failure modal after 3 seconds
  }, 3000);
}
