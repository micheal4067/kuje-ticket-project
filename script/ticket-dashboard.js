// Import necessary data and functions
import { vehicles } from '../data/vehicles.js';
import { salesReviews } from '../data/review-sales-array.js';
import { salesHistory } from '../data/sales-history.js';
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
    button.addEventListener('click', (event) => {
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
            <p><b>${marketNameDisplay}</b></p>
            <p>${selectedVehicle.name}</p>
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
        salesReviews.push({ vehicleId });
        localStorage.setItem('sales', JSON.stringify(salesReviews));
        salesHistory.push({ vehicleId, nigerianDate, time });
        localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 200);
        printReceiptContent(nigerianDate, time, selectedVehicle);
      });
    });
  });
}

// Print receipt content using jsPDF
function printReceiptContent(printDate, printTime, selectedVehicle) {
  const { jsPDF } = window.jspdf;

  // Create a new jsPDF instance
  const doc = new jsPDF();

  // Add content to the PDF
  doc.setFont('Arial', 'normal');
  doc.setFontSize(12);

  // Add date and time
  doc.text(`Date: ${printDate}`, 10, 10);
  doc.text(`Time: ${printTime}`, 150, 10);

  // Add market name
  doc.setFontSize(14);
  doc.text(`${marketNameDisplay}`, 10, 30);

  // Add vehicle details
  doc.setFontSize(12);
  doc.text(`Vehicle: ${selectedVehicle.name}`, 10, 50);
  doc.text(`Price: ₦${formatCurrency(selectedVehicle.price)}`, 10, 60);
  doc.text(`Note: Vehicle parked @ Owner's risk`, 10, 80);

  // Add footer
  doc.setFontSize(10);
  doc.text(`Thank you for using our services!`, 10, 100);

  // Prepare the document for printing
  doc.autoPrint();

  // Open the print dialog
  const printBlob = doc.output('blob');
  const printURL = URL.createObjectURL(printBlob);
  const printWindow = window.open(printURL);
  if (printWindow) {
    printWindow.print();
  } else {
    alert("Please enable pop-ups to print the receipt.");
  }
}




const openModalBtn = document.getElementById('openModalBtn');
const modalk = document.getElementById('loginModal');
let username = document.getElementById('username');
let password = document.getElementById('password');

function historyView(){
  const closeModal = document.querySelector('.close');
  const loginForm = document.getElementById('loginForm');

  // Close modal
  closeModal.addEventListener('click', () => {
    modalk.style.display = 'none';
    document.querySelector('.invalid').innerHTML = '';
    username.value = '';
    password.value = '';
  });

  // Close modal when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === modalk) {
      modalk.style.display = 'none';
      document.querySelector('.invalid').innerHTML = '';
      username.value = '';
      password.value = '';
    }
  });

  // Form submission
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Basic validation
    if (username.value && password.value ) {
      window.location.href = './sale-record.html';
    } else {
      document.querySelector('.invalid').innerHTML = 'Enter any Username or Password';
    }
  });

}

  // Open modal
  openModalBtn.addEventListener('click', () => {
    modalk.style.display = 'flex';
    historyView();
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