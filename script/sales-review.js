// Import necessary data and functions
import { salesReviews } from "../data/review-sales-array.js"; // Sales data with prices and vehicle IDs
import { vehicles } from "../data/vehicles.js"; // Array of vehicles
import { formatCurrency } from "../script/utils/money.js"; // Utility to format currency values
import { marketNameDisplay } from "../data/login-name.js"; // Market name display for headers
import { themeTogle } from "./theme.js"; // Theme toggle functionality
import { modalHTML } from "./modals.js"; // HTML template for modals
import { logOutApp } from "./log-out.js"; // Logout functionality
import { vehicleDataArray } from "../data/users-data-upload.js"; // Import vehicleDataArray

themeTogle();
document.querySelector('.modals-html').innerHTML = modalHTML;
logOutApp();

// Initialize variables
let generateSalesReview = '';
let total = [];
let totalPriceDisplay = 0;

document.querySelector('.market-name').innerHTML = `${marketNameDisplay} - Today's Sales`;

// Function to generate sales review
function generateReviewSales() {
  generateSalesReview = ''; // Reset before generating
  total = []; // Reset total array

  salesReviews.forEach((sale) => {
    const { vehicleId, price, status } = sale; // Extract sale details
    let matchingVehicle = null;

    // Skip if the sale status is inactive (i.e., vehicle was deleted)
    if (status === 'inactive') {
      return; // Skip inactive sales
    }

    // First, search for the vehicle in the `vehicles` array
    matchingVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

    // If no match found, search in `vehicleDataArray`
    if (!matchingVehicle) {
      matchingVehicle = vehicleDataArray.find((vehicle) => vehicle.id === vehicleId);
    }

    // Skip if no matching vehicle is found
    if (!matchingVehicle) {
      // Optionally, mark the sale as "vehicle not found" or display a message
      generateSalesReview += `
        <div class="vehicle-type"> Vehicle Deleted </div>
        <div class="price"> ₦${formatCurrency(price)} </div>
      `;
      return; // Skip this sale if no vehicle is found
    }

    // Add sale price to total
    total.push(price);

    // Generate sales record
    generateSalesReview += `
      <div class="vehicle-type"> ${matchingVehicle.name} </div>
      <div class="price"> ₦${formatCurrency(price)} </div>
    `;
  });

  // Update DOM with sales review
  document.querySelector('.content-empty').innerHTML = generateSalesReview;

  // Show or hide total sales button
  const totalDiv = document.querySelector('.js-div-button');
  totalDiv.style.display = generateSalesReview === '' ? 'none' : 'block';
}


// Function to calculate total sales price
function totalFun() {
  totalPriceDisplay = total.reduce((sum, price) => sum + price, 0);
  displayTotalPrice();
}

// Function to display total sales price
function displayTotalPrice() {
  document.querySelector('.js-amount').innerHTML =
    totalPriceDisplay > 0 ? `₦${formatCurrency(totalPriceDisplay)}` : '0.00';
}

// Event listener for total sales button
const totalText = document.querySelector('.total-text');
const totalSales = document.querySelector('.totalSales');
const printText = document.querySelector('.clear-button-div');
const totalButtonElement = document.querySelector('.js-total-sales');

totalButtonElement.addEventListener('click', () => {
  totalText.innerHTML = 'Total';
  totalSales.classList.add('border-top-bottom');
  totalFun();
  totalSales.style.marginBottom = '20px';
  printText.innerHTML = `<button class="total-sales js-print-receipt">Print Receipt</button>`;
  document.querySelector('.js-print-receipt').addEventListener('click', showReceiptModal);
});

// Generate initial sales review
generateReviewSales();

// Navigation handlers
document.querySelector('.back-button-image, .back-arrow').addEventListener('click', () => {
  window.location.href = './ticket-dashboard.html';
});

document.getElementById('dashboard').addEventListener('click', ()=>{
  window.location.href = './ticket-dashboard.html';
})

// Function to show modal with receipt content
function showReceiptModal() {
  // Check if modal already exists
  let modal = document.querySelector('.modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.className = 'modal';
    document.body.appendChild(modal);
  }

  // Create modal
  const date = new Date();
  const weekday = date.toLocaleString('en-NG', { weekday: 'short' });
  const day = date.toLocaleString('en-NG', { day: '2-digit' });
  const month = date.toLocaleString('en-NG', { month: '2-digit' });
  const year = date.toLocaleString('en-NG', { year: '2-digit' });
  const time = date.toLocaleString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
  const nigerianDate = `${weekday} ${day}, ${month}-${year}`;

  modal.innerHTML = `
    <div class="modal-content">
      <p style="font-size: 12px;">Login date&time: ${localStorage.getItem('time')}</p>
      <p style="font-size: 12px;">Print date&time: ${nigerianDate} | ${time}</p>
      <h3 style="margin-bottom: 1rem;">${marketNameDisplay}</h3>
      <div class="border-modal" style="display: flex; justify-content: space-between; padding-top: 10px;">
        <p><b>Total Sales</b></p>
        <p><b>₦${formatCurrency(totalPriceDisplay)}</b></p>
      </div>
      <div class="modal-buttons">
        <button class="print-button">Print Receipt</button>
        <button class="close-button">Cancel</button>
      </div>
    </div>
  `;

  modal.classList.add('show');

  // Add event listeners for modal buttons
  modal.querySelector('.print-button').addEventListener('click', () => {
    printReceiptContent(nigerianDate, time);
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  });

  modal.querySelector('.close-button').addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  });
}

// Function to print receipt content
function printReceiptContent(printDate, printTime) {
  const htmlContent = `
    <html>
      <head>
        <title>Receipt</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            font-size: 12px;
            margin: 0;
            padding: 10px;
          }
          .center {
            text-align: center;
            margin-bottom: 20px;
          }
          .sales-summary {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid black;
            padding-top: 10px;
          }
        </style>
      </head>
      <body>
        <div class="center">
          <p>Login date & time: ${localStorage.getItem('time')}</p>
          <p>Print date & time: ${printDate} | ${printTime}</p>
        </div>
        <h3 class="center">${marketNameDisplay}</h3>
        <div class="sales-summary">
          <p><b>Total Sales</b></p>
          <p><b>₦${formatCurrency(totalPriceDisplay)}</b></p>
        </div>
      </body>
    </html>
  `;

  // Create a hidden iframe for printing
  const printFrame = document.createElement('iframe');
  printFrame.style.position = 'absolute';
  printFrame.style.top = '-9999px';
  document.body.appendChild(printFrame);

  const doc = printFrame.contentDocument || printFrame.contentWindow.document;
  doc.open();
  doc.write(htmlContent);
  doc.close();

  // Wait for the content to load before printing
  printFrame.onload = function () {
    printFrame.contentWindow.focus();
    printFrame.contentWindow.print();

    // Remove iframe after printing
    setTimeout(() => {
      document.body.removeChild(printFrame);
    }, 100);
  };
}
