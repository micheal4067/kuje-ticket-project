// Import dependencies
import { salesHistory } from "../data/sales-history.js";
import { vehicles } from "../data/vehicles.js";
import { formatCurrency } from "./utils/money.js";

// Cache DOM elements
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");

// Initialize search functionality
function initializeSearch() {
  configureAutocomplete(searchInput);
  setupSearchListeners();
}

// Configure input field autocomplete behavior
function configureAutocomplete(inputElement) {
  inputElement.setAttribute("autocomplete", "off");
}

// Add event listeners for search actions
function setupSearchListeners() {
  searchButton.addEventListener("click", handleSearch);
  searchInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") handleSearch();
  });
}

// Handle search operation
function handleSearch() {
  const inputValue = searchInput.value.trim();

  if (!isValidInput(inputValue)) {
    displayModal(null, "Please enter at least 3 digits of the receipt ID.");
    return;
  }

  const matchingRecord = findMatchingRecord(inputValue);
  if (matchingRecord) {
    displayModal(matchingRecord);
  } else {
    displayModal(null, "No record found for the entered receipt ID.");
  }
}

// Validate user input
function isValidInput(input) {
  return input.length >= 3;
}

// Find matching receipt based on last 3 digits
function findMatchingRecord(inputValue) {
  const lastThreeDigits = inputValue.slice(-3);

  // Filter valid salesHistory entries
  const validSalesHistory = salesHistory.filter(
    (record) => record && record.receiptId
  );

  return validSalesHistory.find((record) =>
    record.receiptId.endsWith(lastThreeDigits)
  );
}

// Display modal with search results or messages
function displayModal(record, message = "") {
  clearSearchInput();
  const modal = getOrCreateModal();

  modal.innerHTML = record
    ? createReceiptDetailsHTML(record)
    : createErrorMessageHTML(message);

  showModal(modal);
  setupModalCloseHandler(modal);
}

// Clear search input field
function clearSearchInput() {
  searchInput.value = "";
}

// Get or create modal element
function getOrCreateModal() {
  let modal = document.querySelector(".modal");
  if (!modal) {
    modal = document.createElement("div");
    modal.className = "modal";
    document.body.appendChild(modal);
  }
  return modal;
}

// Generate HTML for receipt details
function createReceiptDetailsHTML(record) {
  const vehicleName =
    vehicles.find((v) => v.id === record.vehicleId)?.name || "Unknown";

  return `
    <div class="modal-content">
      <h2>Receipt Details</h2>
      <div style="text-align: start; margin-top: 10px;">
        <p><b>Receipt ID:</b> ${record.receiptId}</p>
        <p><b>Ticket Type:</b> ${vehicleName}</p>
        <p><b>Fee:</b> ₦${formatCurrency(record.price)}</p>
        <p><b>Valid Date:</b> ${record.nigerianDate}</p>
        <p><b>Time In:</b> ${record.time}</p>
      </div>
      <button class="close-button">Close</button>
    </div>
  `;
}

// Generate HTML for error message
function createErrorMessageHTML(message) {
  return `
    <div class="modal-content">
      <h2>Search Result</h2>
      <p>${message}</p>
      <button class="close-button">Close</button>
    </div>
  `;
}

// Show the modal
function showModal(modal) {
  modal.classList.add("show");
}

// Add event listener to close the modal
function setupModalCloseHandler(modal) {
  modal.querySelector(".close-button").addEventListener("click", () => {
    modal.classList.remove("show");
    setTimeout(() => modal.remove(), 300);
  });
}

// Export the search initialization function
export { initializeSearch };
