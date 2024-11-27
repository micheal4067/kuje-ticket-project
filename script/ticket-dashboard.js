// Import necessary data and functions
import { vehicles } from '../data/vehicles.js';
import { salesReviews } from '../data/review-sales-array.js';
import { formatCurrency } from './utils/money.js';
import { marketNameDisplay } from '../data/login-name.js';
import { nigeriaDate } from './utils/date-time.js';

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
    if (index === 5) {
      vehiclesButton += `
        <button class="review-sales-button all-vehicles-ticket-button" id="js-all-vehicles-ticket-button">
          <p class="name-section">${vehicle.name}</p>
          <div class="image-section">
            <img class="icons" src="${vehicle.image}">
          </div>
        </button>
      `;
    } else {
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

// Add event listeners for vehicle buttons
document.querySelectorAll('.all-vehicles-button').forEach((button) => {
  button.addEventListener('click', () => {
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

    // Modal content
    const modalContent = `
      <div class="modal-content">
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

    // Create and display modal
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = modalContent;
    document.body.appendChild(modal);

    // Modal and print styles
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
      .modal-content {
        background: white;
        padding: 20px;
        border-radius: 10px;
        text-align: center;
        width: 90%;
        max-width: 400px;
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
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 20px;
      }
      .modal-content button {
        padding: 10px 20px;
        margin: 10px;
        font-size: 14px;
        border: none;
        border-radius: 5px;
        cursor: pointer;
      }
      .close-button {
        background: #f44336;
        color: white;
      }
      .print-button {
        background: #4caf50;
        color: white;
      }
      @media print {
        body * {
          display: none !important;
        }
        .print-container,
        .print-container * {
          display: block !important;
        }
        .print-container {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          background: white;
          color: black;
          text-align: center;
    
          margin: 0;
          page-break-after: avoid;
        }
        .print-container .header {
          display: flex !important;
          justify-content: space-between;
          font-size: 14px;
        }
         .receipt{
          padding:20px;
         } 
      }
    `;
    document.head.appendChild(style);
    

    // Close modal
    modal.querySelector('.close-button').addEventListener('click', () => {
      document.body.removeChild(modal);
    });

    // Print functionality
    modal.querySelector('.print-button').addEventListener('click', () => {
      // Save sales review before printing
      salesReviews.push({ vehicleId });
      localStorage.setItem('sales', JSON.stringify(salesReviews));

      // Create print container
      const printContainer = document.createElement('div');
      printContainer.classList.add('print-container');
      printContainer.innerHTML = `
      <div class="receipt">
        <div class="header">
          <p>${nigerianDate}</p>
          <p>${time}</p>
        </div>
        <div class="center">
          <p  style="margin-bottom:1rem; font-size: 13px;"><b>${marketNameDisplay}</b></p>
          <p  style="margin-bottom:1rem; font-size: 13px;">${selectedVehicle.name}</p>
          <p class="price">₦${formatCurrency(selectedVehicle.price)}</p>
          <p  style=" font-size: 13px;">Vehicle parked @ Owners risk</p>
        </div>
       </div> 
      `;

      document.body.appendChild(printContainer);

      // Trigger print and cleanup
      setTimeout(() => {
        window.print();
        document.body.removeChild(printContainer); // Remove print container after printing
        document.body.removeChild(modal); // Close modal
      }, 300);
    });
  });
});

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

// Event listeners for ticket and logout actions
document.getElementById('js-all-vehicles-ticket-button')?.addEventListener('click', () => {
  window.location.href = './sales-review.html';
});


// Get references to the modal and buttons
const logoutButton = document.querySelector('.log-out-js');
const modal = document.getElementById('logout-modal');
const confirmLogout = document.getElementById('confirm-logout');
const cancelLogout = document.getElementById('cancel-logout');

// Show the modal when the log-out button is clicked
logoutButton.addEventListener('click', () => {
  modal.classList.remove('hidden');
  modal.classList.add('show');
});

// Handle the confirm log-out action
confirmLogout.addEventListener('click', () => {
  modal.classList.remove('show');
  setTimeout(() => {
    modal.classList.add('hidden');
    // Perform the log-out action
    localStorage.removeItem('time');
    localStorage.removeItem('market');
    localStorage.removeItem('sales');
    window.location.href = "./index.html";
  }, 400); // Wait for animation to complete
});

// Handle the cancel action
cancelLogout.addEventListener('click', () => {
  modal.classList.remove('show');
  setTimeout(() => modal.classList.add('hidden'), 400); // Wait for animation to complete
});