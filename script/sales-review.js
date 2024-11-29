// Import necessary data and functions
import { salesReviews } from "../data/review-sales-array.js";
import { vehicles } from "../data/vehicles.js";
import { formatCurrency } from "../script/utils/money.js";
import { marketNameDisplay } from "../data/login-name.js";

// Initialize variables
let generateSalesReview = '';
let total = [];
let price;
let totalPriceDisplay;

document.querySelector('.market-name').innerHTML = marketNameDisplay;

// Function to generate sales review
function generateReviewSales() {
  salesReviews.forEach((sales) => {
    const vehicleId = sales.vehicleId;
    let matchingVehicle;

    vehicles.forEach((vehicle) => {
      if (vehicle.id === vehicleId) {
        matchingVehicle = vehicle;
        price = matchingVehicle.price;
        total.push({ price });
      }
    });

    generateSalesReview += `
      <div class="vehicle-type"> ${matchingVehicle.name} </div>
      <div class="price"> ₦${formatCurrency(matchingVehicle.price)} </div>
    `;
  });

  document.querySelector('.content-empty').innerHTML = generateSalesReview;
}

generateReviewSales();

document.querySelector('.back-button-image, .back-arrow').addEventListener('click', () => {
  window.location.href = './ticket-dashboard.html';
});

// Function to calculate total price
function totalFun() {
  let totalPriceSummary = 0;
  total.forEach((price) => {
    totalPriceSummary += price.price;
  });
  totalPriceDisplay = totalPriceSummary;
  displayTotalPrice();
}

function displayTotalPrice() {
  totalPriceDisplay
    ? (document.querySelector('.js-amount').innerHTML = `₦${formatCurrency(totalPriceDisplay)}`)
    : (document.querySelector('.js-amount').innerHTML = '0.00');
}

// Function to show modal with receipt content
function showReceiptModal() {
  // Check if modal already exists
  let modal = document.querySelector('.modals');
  if (modal) {
    return; // If modal already exists, do nothing
  }

  // Create modal
  const date = new Date();
  const weekday = date.toLocaleString('en-NG', { weekday: 'short' });
  const day = date.toLocaleString('en-NG', { day: '2-digit' });
  const month = date.toLocaleString('en-NG', { month: '2-digit' });
  const year = date.toLocaleString('en-NG', { year: '2-digit' });
  const time = date.toLocaleString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
  const nigerianDate = `${weekday} ${day}, ${month}-${year}`;

  modal = document.createElement('div');
  modal.className = 'modals';

  modal.innerHTML = `
    <div class="modal-contents">
      <p style="font-size: 12px;">Login date&time: ${localStorage.getItem('time')}</p>
      <p style="font-size: 12px;">Print date&time: ${nigerianDate} | ${time}</p>
      <h3 style="margin-bottom: 1rem;">${marketNameDisplay}</h3>
      <div style="display: flex; justify-content: space-between; border-top: solid 1px black; padding-top: 10px;">
        <p><b>Total Sales</b></p>
        <p><b>₦${formatCurrency(totalPriceDisplay)}</b></p>
      </div>
      <div class="modal-buttons">
        <button class="modal-button confirm">Print Receipt</button>
        <button class="modal-button cancel">Cancel</button>
      </div>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => modal.classList.add('show'), 100);

  // Add event listeners for modal buttons
  modal.querySelector('.confirm').addEventListener('click', () => {
    printReceiptContent(nigerianDate, time);
    modal.classList.remove('show');
    setTimeout(() => modal.remove(), 300);
  });

  modal.querySelector('.cancel').addEventListener('click', () => {
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
  printWindow.document.body.innerHTML = htmlContent;
  printWindow.print();
  setTimeout(() => printWindow.close(), 500);
}

// Get elements
const totalText = document.querySelector('.total-text');
const totalSales = document.querySelector('.totalSales');
const printText = document.querySelector('.clear-button-div');
const totalButtonElement = document.querySelector('.js-total-sales');
const totalDiv = document.querySelector('.js-div-button');

generateSalesReview === ''
  ? (totalDiv.style.display = 'none')
  : totalButtonElement.addEventListener('click', () => {
      totalText.innerHTML = 'Total';
      totalSales.style.borderBottom = 'solid 1px white';
      totalSales.style.borderTop = 'solid 1px white';
      totalFun();
      totalSales.style.marginBottom = '20px';
      printText.innerHTML = `<button class="total-sales js-print-receipt">Print Receipt</button>`;

      document.querySelector('.js-print-receipt').addEventListener('click', showReceiptModal);
    });
