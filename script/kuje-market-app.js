
// Import necessary data and functions
import { vehicles } from '../data/vehicles.js';
import { salesReviews} from '../data/review-sales-array.js';
import { formatCurrency, handleClick } from './utils/money.js';
import { nigeriaDate } from './utils/date-time.js';



// Generate vehicle buttons
generateContent();

// Check if login time is already stored
if (!localStorage.getItem('time')) {
  localStorage.setItem('time', nigeriaDate);
}

// Display the stored login time
document.querySelector('.last-login').innerHTML = `Last login: ${localStorage.getItem('time')}`;

// Get current date and time
const date = new Date();
const weekday = date.toLocaleString('en-NG', { weekday: 'short' });
const day = date.toLocaleString('en-NG', { day: '2-digit' });
const month = date.toLocaleString('en-NG', { month: '2-digit' });
const year = date.toLocaleString('en-NG', { year: '2-digit' });
const time = date.toLocaleString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
const nigerianDate = `${weekday} ${day}, ${month}-${year}`;

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
document.querySelector(".all-vehicles-ticket-button").style.backgroundColor = 'rgb(114, 24, 24)';

// Initialize paperPrint variable
let paperPrint;

// Add event listeners to vehicle buttons
document.querySelectorAll('.all-vehicles-button').forEach((button) => {
  button.addEventListener('click', () => {
    const vehicleId = button.dataset.vehicleId;
    vehicles.forEach((vehicle) => {
      if (vehicleId === vehicle.id) {
        paperPrint = vehicle;
      }
    });
    salesReviews.push({ vehicleId: vehicleId });
    localStorage.setItem('sales', JSON.stringify(salesReviews));

    // Create a new window for printing
    const printWindow = window.open('', '', 'width=800,height=400');
    printWindow.onload = function() {
      // Get current date and time again for printing
      const date = new Date();
      const weekday = date.toLocaleString('en-NG', { weekday: 'short' });
      const day = date.toLocaleString('en-NG', { day: '2-digit' });
      const month = date.toLocaleString('en-NG', { month: '2-digit' });
      const year = date.toLocaleString('en-NG', { year: '2-digit' });
      const time = date.toLocaleString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
      const nigerianDate = `${weekday} ${day}, ${month}-${year}`;

      // Print the vehicle information
      printWindow.document.write(` 
      <html>
        <body style="margin-top: 0; padding: 0;">
          <div style="display: flex; justify-content: space-between;">
            <p>${nigerianDate}</p>
            <p>${time}</p>
          </div>
          <p style="display:flex; align-items:center; justify-content: center; margin-bottom: 2rem;">
            <b> Kuje Ultra Mordern Market </b>
          </p>
          <p style="display:flex; align-items:center; justify-content: center;">
            ${paperPrint.name}
          </p>
          <p style="display:flex; align-items:center; justify-content: center;margin-bottom: 2rem">
            <b>₦${formatCurrency(paperPrint.price)}</b>
          </p>
          <p style="display:flex; align-items:center; justify-content: center;">
            Vehicle parked @ Owners risk
          </p>
        </body>
      </html>`);
    }
    printWindow.print();
setTimeout(function() {
  printWindow.close();
}, 500); // Adjust the delay as needed

  });

});

const allTicketIssued = document.getElementById('js-all-vehicles-ticket-button');
if (allTicketIssued) {
  allTicketIssued.addEventListener('click', () => {
    window.location.href = "./sales-review.html";
  });
}

const logOut = document.querySelector('.log-image-div');
if (logOut) {
  logOut.addEventListener('click', () => {
    handleClick();
    localStorage.removeItem('time');
    window.location.href = "./index.html";
  });
}


