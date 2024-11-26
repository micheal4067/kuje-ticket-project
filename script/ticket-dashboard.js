
// Import necessary data and functions
import { vehicles } from '../data/vehicles.js';
import { salesReviews} from '../data/review-sales-array.js';
import { formatCurrency, handleClick } from './utils/money.js';
import { marketNameDisplay } from '../data/login-name.js';
import { nigeriaDate } from './utils/date-time.js';

document.querySelector('.market-name').innerHTML = marketNameDisplay;
// Generate vehicle buttons
generateContent();

// Check if login time is already stored
if (!localStorage.getItem('time')) {
  localStorage.setItem('time', nigeriaDate);
}

// Display the stored login time
document.querySelector('.last-login').innerHTML = `Last login: ${localStorage.getItem('time')}`;

// Function to generate vehicle buttons
function generateContent() {
  let vehiclesButton = '';
  vehicles.forEach((vehicle, index) => {
    if (index === 5) {
      // Special button for ticket issuance
      vehiclesButton += ` 
        <button class="review-sales-button all-vehicles-ticket-button" id="js-all-vehicles-ticket-button">
          <p class="name-section">${vehicle.name}</p>
          <div class="image-section">
            <img class="icons" src="${vehicle.image}">
          </div>
        </button>
      `;
    } else {
      // Regular vehicle button
      vehiclesButton += ` 
        <button class="all-vehicles-button" data-vehicle-id="${vehicle.id}">
          <p class="name-section">${vehicle.name}</p>
          <div class="image-section">
            <img class="icons" src="${vehicle.image}">
          </div>
          <div class="price-section"><b>NGN ${formatCurrency(vehicle.price)}</b></div>
        </button>
      `;
      
    }
  });
  document.querySelector('.buttons').innerHTML = vehiclesButton;
}

// Style the ticket issuance button
document.querySelector(".all-vehicles-ticket-button").style.backgroundColor = 'rgb(10, 51, 112)';

// Initialize paperPrint variable
let paperPrint;

// Add event listeners to vehicle buttons
// Global variable to track the vehicle ID
let currentVehicleId = null;

document.querySelectorAll('.all-vehicles-button').forEach((button) => {
  button.addEventListener('click', () => {
    const vehicleId = button.dataset.vehicleId;

    // Set the current vehicle ID
    currentVehicleId = vehicleId;

    // Find the selected vehicle
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
    if (!selectedVehicle) return;

    // Generate Nigerian date and time
    const date = new Date();
    const weekday = date.toLocaleString('en-NG', { weekday: 'short' });
    const day = date.toLocaleString('en-NG', { day: '2-digit' });
    const month = date.toLocaleString('en-NG', { month: '2-digit' });
    const year = date.toLocaleString('en-NG', { year: '2-digit' });
    const time = date.toLocaleString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
    const nigerianDate = `${weekday} ${day}, ${month}-${year}`;

    // Generate HTML content for modal
    const htmlContent = `
      <div class="print-container">
        <div class="header">
          <p>${nigerianDate}</p>
          <p>${time}</p>
        </div>
        <div class="center">
          <p><b>${marketNameDisplay}</b></p>
          <p>${selectedVehicle.name}</p>
          <p class="price">₦${formatCurrency(selectedVehicle.price)}</p>
          <p>Vehicle parked @ Owners risk</p>
        </div>
        <button class="close-button">Close</button>
        <button class="print-button">Print</button>
      </div>
    `;

    // Create a modal element
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = htmlContent;
    document.body.appendChild(modal);

    // Add styles for modal
    const style = document.createElement('style');
    style.textContent = `
      .modal {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.8);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
      }
      .print-container {
        background: white;
        padding: 20px;
        border-radius: 10px;
        width: 90%;
        max-width: 400px;
        text-align: center;
      }
      .header {
        display: flex;
        justify-content: space-between;
        font-size: 14px;
      }
      .center {
        margin: 20px 0;
      }
      .price {
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: bold;
      }
      .print-container button {
        padding: 10px 20px;
        margin: 10px;
        font-size: 14px;
        cursor: pointer;
        border: none;
        border-radius: 5px;
      }
      .close-button {
        background: #f44336;
        color: white;
      }
      .print-button {
        background: #4caf50;
        color: white;
      }
    `;
    document.head.appendChild(style);

    // Handle modal close
    modal.querySelector('.close-button').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Handle printing and modal close after print
    modal.querySelector('.print-button').addEventListener('click', () => {
      // Open a new print window
      const printWindow = window.open('', '_blank', 'width=800,height=600');

      // Check if the print window opened
      if (!printWindow) {
        alert('Pop-up blocked. Please allow pop-ups for this site.');
        return;
      }

      // Add the HTML content for printing
      printWindow.document.open();
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Print Preview</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .header { display: flex; justify-content: space-between; }
              .center { text-align: center; margin: 20px 0; }
              .price { margin-bottom: 20px; font-size: 16px; font-weight: bold; }
            </style>
          </head>
          <body>
            <div class="header">
              <p>${nigerianDate}</p>
              <p>${time}</p>
            </div>
            <div class="center">
              <p><b>${marketNameDisplay}</b></p>
              <p>${selectedVehicle.name}</p>
              <p class="price">₦${formatCurrency(selectedVehicle.price)}</p>
              <p>Vehicle parked @ Owners risk</p>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();

      // Trigger the print dialog
      printWindow.print();

      // Close the print window after triggering the print dialog
      printWindow.addEventListener('afterprint', () => {
        printWindow.close(); // Close the print window after printing
      });

      // Close the modal after triggering the print dialog
      document.body.removeChild(modal);
    });
  });
});





// Print listener: Trigger sales review update when printing
function push(){
  window.addEventListener('afterprint', () => {
    if (currentVehicleId) {
      // Push to salesReviews array
      salesReviews.push({ vehicleId: currentVehicleId });
      localStorage.setItem('sales', JSON.stringify(salesReviews));
  
      // Clear currentVehicleId for the next print
      currentVehicleId = null;
    }
  });
}

push();


const allTicketIssued = document.getElementById('js-all-vehicles-ticket-button');
if (allTicketIssued) {
  allTicketIssued.addEventListener('click', () => {
    window.location.href = "./sales-review.html";
  });
}

const editPriceBtn = document.querySelector('.edit-price');
const confirmDialog = document.querySelector('.confirm-dialog');
const yesBtn = document.querySelector('.yes-btn');
const noBtn = document.querySelector('.no-btn');

editPriceBtn.addEventListener('click', () => {
  confirmDialog.style.display = 'block';
});

yesBtn.addEventListener('click', () => {
  localStorage.removeItem('vehiclePrice');
  window.location.href = "./edit-vehicle.html";
  confirmDialog.style.display = 'none';
});

noBtn.addEventListener('click', () => {
  confirmDialog.style.display = 'none';
});

document.querySelector('.about-js').addEventListener('click', ()=>{
  window.location.href = './about-ticket.html';
}) 



const logOut = document.querySelector('.log-out-text');
if (logOut) {
  logOut.addEventListener('click', () => {
    handleClick();
    localStorage.removeItem('time');
    localStorage.removeItem('market');
    window.location.href = "./index.html";
  });
}


