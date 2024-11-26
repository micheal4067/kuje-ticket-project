
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
document.querySelectorAll('.all-vehicles-button').forEach((button) => {
  button.addEventListener('click', () => {
    const vehicleId = button.dataset.vehicleId;

    // Find the selected vehicle
    const selectedVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);
    if (!selectedVehicle) return;

    // Save sales review in localStorage
    salesReviews.push({ vehicleId });
    localStorage.setItem('sales', JSON.stringify(salesReviews));

    // Generate Nigerian date and time
    const date = new Date();
    const weekday = date.toLocaleString('en-NG', { weekday: 'short' });
    const day = date.toLocaleString('en-NG', { day: '2-digit' });
    const month = date.toLocaleString('en-NG', { month: '2-digit' });
    const year = date.toLocaleString('en-NG', { year: '2-digit' });
    const time = date.toLocaleString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
    const nigerianDate = `${weekday} ${day}, ${month}-${year}`;

    // Generate HTML content for printing
    const htmlContent = `
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
    `;

    // Open the print window and load content
    const printWindow = window.open('', '_blank', 'width=800,height=400');
    if (!printWindow) {
      alert('Pop-up blocked. Please allow pop-ups for this site.');
      return;
    }

    // Write content and handle printing
    printWindow.document.open();
    printWindow.document.write(htmlContent);
    printWindow.document.close();

    // Wait until content is ready and then print
    const interval = setInterval(() => {
      if (printWindow.document.readyState === 'complete') {
        clearInterval(interval);
        printWindow.print();
        setTimeout(() => printWindow.close(), 500);
      }
    }, 100); // Check readiness every 100ms
  });
});


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


