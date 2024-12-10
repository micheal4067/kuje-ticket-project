import { vehicleDataArray } from '../data/users-data-upload.js';
import { formatCurrency } from './utils/money.js';
import { salesReviews } from '../data/review-sales-array.js';
import { salesHistory } from '../data/sales-history.js';
import { marketNameDisplay } from '../data/login-name.js';
import { salesLog } from '../data/review-sales-array.js';
import { generateSalesLog } from './log-input.js';


function userUpload() {
  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  const modalUpload = document.getElementById("dataModalUpload");
  const openModalUploadButton = document.querySelector(".openModalUploadButton");
  const closeModalUploadButton = document.getElementById("closeModalUploadButton");
  const saveButton = document.getElementById("saveButton");

  document.querySelectorAll('.openModalUploadButton').forEach(element => {
    element.addEventListener('click', () => {
      modalUpload.style.display = "block";
    });
  });


// Close modal
closeModalUploadButton.addEventListener("click", () => {
  modalUpload.style.display = "none";
});

window.addEventListener("click", (event) => {
  if (event.target === modalUpload) {
    modalUpload.style.display = "none";
  }
});



  // Save new vehicle data
saveButton.addEventListener("click", () => {
  const name = document.getElementById("vehicleName").value;
  const priceInput = document.getElementById("vehiclePrice").value; // Get price input
  const imageInput = document.getElementById("vehicleImage");
  let receiptNote = document.getElementById("receiptNote").value; // Get receipt note
  
  // Check if the receiptNote is empty and assign default value if so
  if (!receiptNote.trim()) {
    receiptNote = "Vehicle parked @ owners risk";
  }

  // Validate receipt note length
  if (receiptNote.length > 100) {
    alert("Receipt note must not exceed 100 characters.");
    return;
  }

  if (name && priceInput && imageInput.files.length > 0) {
    const reader = new FileReader();
    reader.onload = (e) => {
      // Convert price to number and append double zero
      const priceWithDoubleZero = parseFloat(priceInput) * 100;

      const newVehicle = {
        id: generateId(),
        name,
        price: priceWithDoubleZero, // Use updated price logic
        image: e.target.result,
        receiptNote, // Add receipt note to the data
      };

      vehicleDataArray.push(newVehicle); // Update in-memory array
      localStorage.setItem("vehicleData", JSON.stringify(vehicleDataArray)); // Update localStorage

      modalUpload.style.display = "none";
      document.getElementById("vehicleForm").reset();
      location.reload();

      displayStoredData(); // Refresh the UI
    };
    reader.readAsDataURL(imageInput.files[0]);
  } else {
    alert("Please fill in all fields!");
  }
});

  // Display stored vehicle data
  const displayStoredData = () => {
    const container = document.querySelector('.user-uploads-js');
    container.innerHTML = ''; // Clear container before rendering
  
    const headingDiv = document.querySelector('.upload-header');
    
    // Only show the heading if there are vehicles in the array
    if (vehicleDataArray.length > 0) {
      headingDiv.innerHTML = '<h1>Customized Tickets</h1>';
    } else {
      headingDiv.innerHTML = ''; // Clear heading if no vehicles exist
    }
  
    // Render the vehicle buttons
    vehicleDataArray.forEach((vehicle) => {
      const vehicleCard = document.createElement('div');
      vehicleCard.className = 'all-vehicles-button all-vehicles-button-upload';
      vehicleCard.dataset.vehicleId = vehicle.id;
  
      vehicleCard.innerHTML = `
        <p class="name-section">${vehicle.name}</p>
        <div class="image-section">
          <img class="icons" src="${vehicle.image}">
        </div>
        <div class="price-section"><b>NGN ${formatCurrency(vehicle.price)}</b></div>
        <button class="delete-button-upload" data-vehicle-id="${vehicle.id}">Delete</button>
      `;
  
      container.appendChild(vehicleCard);
    });
  
    // Add event listeners for delete buttons
    document.querySelectorAll('.delete-button-upload').forEach((button) => {
      button.addEventListener('click', (event) => {
        event.stopPropagation();
        const vehicleId = event.target.getAttribute('data-vehicle-id');
        deleteVehicle(vehicleId);
      });
    });
  };

  // Delete a vehicle
  const deleteVehicle = (id) => {
    const updatedArray = vehicleDataArray.filter((vehicle) => vehicle.id !== id);
    vehicleDataArray.length = 0; // Clear original array
    vehicleDataArray.push(...updatedArray); // Update array

    localStorage.setItem("vehicleData", JSON.stringify(vehicleDataArray));
    location.reload(); // Update localStorage
    displayStoredData(); // Refresh UI
  };

  // Initialize stored data from localStorage
  const initializeData = () => {
    const storedData = JSON.parse(localStorage.getItem("vehicleData")) || [];
    vehicleDataArray.length = 0; // Clear any existing data
    vehicleDataArray.push(...storedData); // Load from localStorage
  };

  // Initialize and display data on page load
  initializeData();
  displayStoredData();
}


function issueUploadReceipt() {
  const buttons = document.querySelectorAll('.all-vehicles-button');

  buttons.forEach((button) => {
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
      const selectedVehicle = vehicleDataArray.find((vehicle) => vehicle.id === vehicleId);
      if (!selectedVehicle) {
        console.error('Vehicle not found');
        return;
      }

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
            <p>${selectedVehicle.receiptNote}</p>
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
          <p style="margin: 0; font-size: 13px;">${selectedVehicle.receiptNote}</p>
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

function logheight(){
  const tableContainer = document.querySelector('.sales-table-container');
tableContainer.scrollTop = tableContainer.scrollHeight;
}


export {issueUploadReceipt};

export { userUpload };
