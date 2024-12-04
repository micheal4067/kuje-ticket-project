// Import necessary data and functions
import { salesReviews } from "../data/review-sales-array.js";
import { vehicles } from "../data/vehicles.js";
import { formatCurrency } from "../script/utils/money.js";
import { marketNameDisplay } from "../data/login-name.js";
import { themeTogle } from "./theme.js";
import { modalHTML } from "./modals.js";
import { logOutApp } from "./log-out.js";
import { vehicleDataArray } from '../data/users-data-upload.js';

themeTogle();
document.querySelector('.modals-html').innerHTML = modalHTML;

logOutApp();
// Initialize variables
let generateSalesReview = '';
let total = [];
let price;
let totalPriceDisplay;

document.querySelector('.market-name').innerHTML = `${marketNameDisplay} - Today's Sales`;

// Function to generate sales review
function generateReviewSales() {
  generateSalesReview = ''; // Reset before generating
  total = []; // Reset total array

  salesReviews.forEach((sales) => {
    const vehicleId = sales.vehicleId;
    let matchingVehicle;

    // Check in the `vehicles` array
    vehicles.forEach((vehicle) => {
      if (vehicle.id === vehicleId) {
        matchingVehicle = vehicle;
        price = matchingVehicle.price;
        total.push({ price });
      }
    });

    // Check in the `vehicleDataArray` array
    vehicleDataArray.forEach((vehicle) => {
      if (vehicle.id === vehicleId) {
        matchingVehicle = vehicle;
        price = matchingVehicle.price;
        total.push({ price });
      }
    });

    // If a matching vehicle is found, add it to the DOM string
    if (matchingVehicle) {
      generateSalesReview += `
        <div class="vehicle-type"> ${matchingVehicle.name} </div>
        <div class="price"> ₦${formatCurrency(matchingVehicle.price)} </div>
      `;
    }
  });

  document.querySelector('.content-empty').innerHTML = generateSalesReview;

  // Update the visibility of total sales button based on content
  const totalDiv = document.querySelector('.js-div-button');
  if (generateSalesReview === '') {
    totalDiv.style.display = 'none';
  } else {
    totalDiv.style.display = 'block';
  }
}

// Function to calculate total price
function totalFun() {
  let totalPriceSummary = 0;
  total.forEach((price) => {
    totalPriceSummary += price.price;
  });
  totalPriceDisplay = totalPriceSummary;
  displayTotalPrice();
}

// Function to display total price
function displayTotalPrice() {
  totalPriceDisplay
    ? (document.querySelector('.js-amount').innerHTML = `₦${formatCurrency(totalPriceDisplay)}`)
    : (document.querySelector('.js-amount').innerHTML = '0.00');
}

// Event listener for total sales button
const totalText = document.querySelector('.total-text');
const totalSales = document.querySelector('.totalSales');
const printText = document.querySelector('.clear-button-div');
const totalButtonElement = document.querySelector('.js-total-sales');
const totalDiv = document.querySelector('.js-div-button');

totalButtonElement.addEventListener('click', () => {
  totalText.innerHTML = 'Total';
  totalSales.classList.add('border-top-bottom');
  totalFun();
  totalSales.style.marginBottom = '20px';
  printText.innerHTML = `<button class="total-sales js-print-receipt">Print Receipt</button>`;
  document.querySelector('.js-print-receipt').addEventListener('click', showReceiptModal);
});


generateReviewSales();

document.querySelector('.back-button-image, .back-arrow').addEventListener('click', () => {
  window.location.href = './ticket-dashboard.html';
});

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
      <div class="border-modal"style="display: flex; justify-content: space-between; padding-top: 10px;">
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

  setTimeout(() => modal.classList.add('show'), 100);

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
      <body style="font-family: Arial, sans-serif; font-size: 12px;">
        <div style="text-align: center; margin-bottom: 20px;">
          <p>Login date&time: ${localStorage.getItem('time')}</p>
          <p>Print date&time: ${printDate} | ${printTime}</p>
        </div>
        <h3 style="text-align: center; margin-bottom: 20px;">${marketNameDisplay}</h3>
        <div style="display: flex; justify-content: space-between; border-top: 1px solid black; padding-top: 10px;">
          <p><b>Total Sales</b></p>
          <p><b>₦${formatCurrency(totalPriceDisplay)}</b></p>
        </div>
      </body>
    </html>
  `;
  const printWindow = window.open('', '', 'width=800,height=400');
  if (!printWindow) {
    alert("Unable to open print preview. Please allow pop-ups for this site.");
    return;
  }

  // Write content to the new window and ensure it's loaded
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();

  // Ensure the content is fully loaded before triggering print
  printWindow.onload = function() {
    // Delay printing to ensure the content is fully rendered
    setTimeout(function() {
      printWindow.print();
      setTimeout(function() {
        printWindow.close();
      }, 200);
    }, 100); // Adjust the delay if necessary
  };

  // Handle possible issues on mobile (Safari blocking print window)
  printWindow.focus();
}

    document.querySelectorAll('.about-js').forEach(element => {
      element.addEventListener('click', () => {
        window.location.href = './about-ticket.html';
      });
    });
    
    
    document.querySelectorAll('.js-all-vehicles-ticket-button').forEach(element => {
      element.addEventListener('click', () => {
        window.location.href = './ticket-dashboard.html';
      });
    });
    
    document.querySelectorAll('.sales-record').forEach(element => {
      element.addEventListener('click', () => {
        modalk.style.display = 'flex';
        historyView();
       
      });
    });


    