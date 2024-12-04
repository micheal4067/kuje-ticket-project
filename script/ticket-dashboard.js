// Import necessary data and functions
import { vehicles } from '../data/vehicles.js';
import { salesReviews } from '../data/review-sales-array.js';
import { salesHistory } from '../data/sales-history.js';
import { formatCurrency } from './utils/money.js';
import { marketNameDisplay } from '../data/login-name.js';
import { nigeriaDate } from './utils/date-time.js';
import { themeTogle } from './theme.js';
import { maxDigit } from './set-vehicle-fee.js';
import { logOutApp } from './log-out.js';
import { modalHTML } from './modals.js';
import { userUpload } from './user-upload.js';
import { issueUploadReceipt } from './user-upload.js';
import { generateSalesLog } from './log-input.js';
import { salesLog } from '../data/review-sales-array.js';



themeTogle();
document.querySelector('.modals-html').innerHTML = modalHTML
generateSalesLog();
// Display market name and last login time
document.querySelector('.market-name').innerHTML = marketNameDisplay;
if (!localStorage.getItem('time')) {
  localStorage.setItem('time', nigeriaDate);
}
document.querySelector('.last-login').innerHTML = `Last login: ${localStorage.getItem('time')}`;

// Generate vehicle buttons
generateContent();
function generateContent() {
  let vehiclesButton = '';
  vehicles.forEach((vehicle, index) => {
      vehiclesButton += `
        <button class="all-vehicles-button" data-vehicle-id="${vehicle.id}">
          <p class="name-section">${vehicle.name}</p>
          <div class="image-section">
            <img class="icons" src="${vehicle.image}">
          </div>
          <div class="price-section"><b>NGN ${formatCurrency(vehicle.price)}</b></div>
        </button>
      `;
  });
  document.querySelector('.buttons').innerHTML = vehiclesButton;
}

userUpload();

const runIfContentLoaded = () => {
  // Check if the content container exists and is populated
  const container = document.querySelector('.user-uploads-js');
  if (container && container.children.length > 0) {
    issueUploadReceipt();
  }
};

// Run the check after DOM is fully loaded
document.addEventListener('DOMContentLoaded', runIfContentLoaded);

// Prevent default Enter key behavior globally
document.addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();
  }
});

// Add event listeners for vehicle buttons
issueReceipt();


function issueReceipt() {
  document.querySelectorAll('.all-vehicles-button').forEach((button) => {
    button.addEventListener('click', () => {
      // Check if modal already exists
      let modal = document.querySelector('.modal');
      if (!modal) {
        modal = document.createElement('div');
        modal.className = 'modal';
        document.body.appendChild(modal);
      }

      // Get vehicle details
      const vehicleId = button.dataset.vehicleId;
      const selectedVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
      if (!selectedVehicle) return;

      // Get Nigerian date and time
      const date = new Date();
      const weekday = date.toLocaleString('en-NG', { weekday: 'short' });
      const day = date.toLocaleString('en-NG', { day: '2-digit' });
      const month = date.toLocaleString('en-NG', { month: '2-digit' });
      const year = date.toLocaleString('en-NG', { year: '2-digit' });
      const time = date.toLocaleString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
      const nigerianDate = `${weekday} ${day}, ${month}-${year}`;

      // Populate modal content
      modal.innerHTML = `
        <div class="modal-content">
          <div class="header">
            <p>${nigerianDate}</p>
            <p>${time}</p>
          </div>
          <div class="center">
            <p style="margin-bottom:10px;"><b>${marketNameDisplay}</b></p>
            <p style="margin-bottom:10px;">${selectedVehicle.name}</p>
            <p class="price">₦${formatCurrency(selectedVehicle.price)}</p>
            <p>Vehicle parked @ Owners risk</p>
          </div>
          <button class="close-button">Close</button>
          <button class="print-button">Print Ticket</button>
        </div>
      `;

      // Show modal
      modal.classList.add('show');

      // Close modal
      modal.querySelector('.close-button').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
      });

      // Print functionality
      modal.querySelector('.print-button').addEventListener('click', () => {
        salesReviews.push({ vehicleId, nigerianDate, time });
        localStorage.setItem('sales', JSON.stringify(salesReviews));
        salesHistory.push({ vehicleId, nigerianDate, time });
        localStorage.setItem('salesHistory', JSON.stringify(salesHistory));
        salesLog.push({ vehicleId, nigerianDate, time });
        localStorage.setItem('salesLog', JSON.stringify(salesLog));
        generateSalesLog();
        logheight();

        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 200);
        printReceiptContent(nigerianDate, time, selectedVehicle);
      });
    });
  });

}

function logheight(){
  const tableContainer = document.querySelector('.sales-table-container');
tableContainer.scrollTop = tableContainer.scrollHeight;
}

// Print receipt content
function printReceiptContent(printDate, printTime, selectedVehicle) {
  const receiptContainer = `
    <html>
    <head>
      <title>Receipt</title>
    </head>
    <body style="font-family: Arial, sans-serif; font-size: 12px; margin: 0;  padding: 10px; justify-items: center;">
      <div style="width: 100%; padding: 10px;">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px;">
          <p style="margin: 0;">${printDate}</p>
          <p style="margin: 0;">${printTime}</p>
        </div>
        <div style="text-align: center;">
          <p style="margin: 0 0 10px 0; font-size: 13px; font-weight: bold;">${marketNameDisplay}</p>
          <p style="margin: 0 0 10px 0; font-size: 13px;">${selectedVehicle.name}</p>
          <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: bold;">₦${formatCurrency(selectedVehicle.price)}</p>
          <p style="margin: 0; font-size: 13px;">Vehicle parked @ Owner's risk</p>
        </div>
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
  printWindow.document.write(receiptContainer);
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





maxDigit()

logOutApp();


