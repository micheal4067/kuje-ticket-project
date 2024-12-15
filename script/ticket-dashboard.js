// Import necessary data and functions
import { vehicles } from '../data/vehicles.js';
import { salesHistory } from '../data/sales-history.js';
import { formatCurrency } from './utils/money.js';
import { marketNameDisplay } from '../data/login-name.js';
import { nigeriaDate } from './utils/date-time.js';
import { themeTogle } from './theme.js';
import { maxDigit } from './set-vehicle-fee.js';
import { logOutApp } from './event-listeners.js';
import { modalHTML } from './modals.js';
import { userUpload } from './user-upload.js';
import { issueUploadReceipt } from './user-upload.js';
import { generateSalesLog } from './log-input.js';
import { salesLog } from '../data/review-sales-array.js';
import { initializeSearch } from './searchReceipt.js'; 

initializeSearch();
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

      // Generate a unique barcode identifier
      const uniqueId = `RCPT-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

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
          <!-- Barcode Container -->
          <div class="barcode-container" style="width: 100%; max-width: 300px; margin: 10px auto; text-align: center;">
            <svg id="barcode" style="width: 100%; height: auto;"></svg>
          </div>
        </div>
        <button class="close-button">Close</button>
        <button class="print-button">Print Ticket</button>
      </div>
    `;
    
    // Generate the barcode
    JsBarcode("#barcode", uniqueId, {
      format: "CODE128",
      displayValue: true,
      fontSize: 14,
      lineColor: "#000",
      width: 0.7, // Controls bar thickness
      height: 40 // Controls barcode height
    });
    
    

      // Show modal
      modal.classList.add('show');

      // Close modal
      modal.querySelector('.close-button').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
      });

      // Print functionality
      let isProcessing = false;

      modal.querySelector('.print-button').addEventListener('click', () => {
        if (isProcessing) return; // Prevent duplicate execution
        isProcessing = true;

        // Existing logic to handle the sale...
        const updatedVehicle = vehicles.find((vehicle) => vehicle.id === selectedVehicle.id);
        const currentPrice = updatedVehicle ? updatedVehicle.price : selectedVehicle.price;
        selectedVehicle.price = currentPrice;

        const saleRecord = { vehicleId, nigerianDate, time, price: currentPrice, receiptId: uniqueId };

        salesHistory.push(saleRecord);
        localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

        salesLog.push(saleRecord);
        localStorage.setItem('salesLog', JSON.stringify(salesLog));
        console.log(salesLog)

        generateSalesLog();
        logheight();

        modal.classList.remove('show');
        setTimeout(() => {
          modal.remove();
          isProcessing = false; // Reset the flag
        }, 200);

        // Print receipt
        printReceiptContent(nigerianDate, time, selectedVehicle, currentPrice, uniqueId);
      });
    });
  });
}



function logheight() {
  const tableContainer = document.querySelector('.sales-table-container');
  
  // Only run if the element exists
  if (tableContainer) {
    tableContainer.scrollTop = tableContainer.scrollHeight;
  }
}

// Call the function conditionally
logheight();

// Print receipt content
function printReceiptContent(printDate, printTime, selectedVehicle, salePrice, uniqueId) {
  const receiptHTML = `
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
          .receipt-content {
            text-align: center;
            padding: 10px;
          }
          .header {
            display: flex;
            justify-content: space-between;
          }
          
          .barcode {
            margin: 10px auto;
          }
          
        </style>
      </head>
      <body>
        <div class="receipt-content">
          <div class="header">
            <p>${printDate}</p>
            <p>${printTime}</p>
          </div>
          <p><b>${marketNameDisplay}</b></p>
          <p>${selectedVehicle.name}</p>
          <p><b>₦${formatCurrency(salePrice)}</b></p>
          <p>Vehicle Parked @ Owner's Risk</p>
          
          <div class="barcode">
            <svg id="barcode"></svg>
          </div>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
        <script>
          window.onload = function () {
            // Generate the barcode
            JsBarcode("#barcode", "${uniqueId}", {
              format: "CODE128",
              displayValue: true,
              fontSize: 14,
              lineColor: "#000",
              width: 0.7,
              height: 40
            });

            // Ensure printing happens AFTER barcode renders
            setTimeout(() => {
              window.print();
              window.close();
            }, 500); // Small delay to ensure barcode renders
          };
        </script>
      </body>
    </html>
  `;

  const printWindow = window.open('', '', 'width=800,height=400');
  if (!printWindow) {
    alert("Unable to open print preview. Please allow pop-ups for this site.");
    return;
  }

  printWindow.document.open();
  printWindow.document.write(receiptHTML);
  printWindow.document.close();
}

maxDigit()

logOutApp();


