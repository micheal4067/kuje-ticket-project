import { vehicleDataArray } from '../data/users-data-upload.js';
import { formatCurrency } from './utils/money.js';
import { salesHistory } from '../data/sales-history.js';
import { marketNameDisplay } from '../data/login-name.js';
import { salesLog } from '../data/review-sales-array.js';
import { generateSalesLog } from './log-input.js';


function userUpload() {
  const generateId = () => '_' + Math.random().toString(36).substr(2, 9);

  const modalUpload = document.getElementById("dataModalUpload");
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
  
    // Validate name length
    if (name.length > 10) {
      alert("Name must not exceed 10 characters.");
      return;
    }
  
    // Check if the receiptNote is empty and assign default value if so
    if (!receiptNote.trim()) {
      receiptNote = "Vehicle parked @ owner's risk";
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
// Delete a vehicle
const deleteVehicle = (id) => {
  // Remove the vehicle from the vehicleDataArray
  const updatedArray = vehicleDataArray.filter((vehicle) => vehicle.id !== id);

  // Update localStorage with the new vehicle data
  vehicleDataArray.length = 0; // Clear the original array
  vehicleDataArray.push(...updatedArray); // Push the updated array

  // Save the updated vehicle data to localStorage
  localStorage.setItem("vehicleData", JSON.stringify(vehicleDataArray));

  location.reload();
  displayStoredData(); // Refresh UI

};

  // Initialize stored data from localStorage
 const initializeData = () => {
  const storedVehicleData = JSON.parse(localStorage.getItem("vehicleData")) || [];
  const storedSalesData = JSON.parse(localStorage.getItem("sales")) || []; // Load sales data separately

  vehicleDataArray.length = 0; // Clear any existing vehicle data
  vehicleDataArray.push(...storedVehicleData); // Load vehicle data

  salesHistory.push(...storedSalesData);
  salesLog.push(...storedSalesData);
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

      // Store price at time of sale (do not update in vehicle data)
      const salePrice = selectedVehicle.price;

        // Generate unique ID for barcode
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
            <p class="price">₦${formatCurrency(salePrice)}</p>
            <p>${selectedVehicle.receiptNote}</p>
          </div>
          <!-- Barcode Container -->
          <div class="barcode-container" style="width: 100%; max-width: 300px; margin: 10px auto; text-align: center;">
            <svg id="barcode" style="width: 100%; height: auto;"></svg>
          </div>
          <button class="close-button">Close</button>
          <button class="print-button">Print Ticket</button>
        </div>
        <script src="https://cdn.jsdelivr.net/npm/jsbarcode@3.11.0/dist/JsBarcode.all.min.js"></script>
      `;

      JsBarcode("#barcode", uniqueId, {
        format: "CODE128",
        displayValue: true,
        fontSize: 14,
        lineColor: "#000",
        width: 0.7,
        height: 40
      });

      // Show modal
      modal.classList.add('show');

      // Close modal
      modal.querySelector('.close-button').addEventListener('click', () => {
        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 300);
      });

      // Print functionality
      modal.querySelector('.print-button').addEventListener('click', () => {
        const currentPrice = selectedVehicle.price; // Capture the current price at the time of the sale

        // Push sale data to relevant arrays
        const saleRecord = { vehicleId, nigerianDate, time, price: currentPrice, receiptId: uniqueId };

        salesHistory.push(saleRecord);
        localStorage.setItem('salesHistory', JSON.stringify(salesHistory));

        salesLog.push(saleRecord);
        localStorage.setItem('salesLog', JSON.stringify(salesLog));
        generateSalesLog();
        logheight();

        modal.classList.remove('show');
        setTimeout(() => modal.remove(), 200);

        // Print receipt with the stored price and barcode
        printReceiptContent(nigerianDate, time, selectedVehicle, salePrice, uniqueId);
      });
    });
  });
}


function printReceiptContent(printDate, printTime, selectedVehicle, salePrice, uniqueId) {


  const receiptHTML = `
    <html>
    <head>
      <title>Receipt</title>
      <style>
        body {
          font-family: Arial, sans-serif; font-size: 12px; margin: 0; padding: 10px;
        }
        .receipt-container {
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
      <div class="receipt-container">
        <!-- Date and Time -->
        <div class="header">
          <p>${printDate}</p>
          <p>${printTime}</p>
        </div>

        <!-- Market Name and Vehicle Details -->
        <p><b>${marketNameDisplay}</b></p>
        <p>${selectedVehicle.name}</p>
        <p><b>₦${formatCurrency(salePrice)}</b></p>
        <p>${selectedVehicle.receiptNote}</p>

       
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


function logheight(){
  const tableContainer = document.querySelector('.sales-table-container');
tableContainer.scrollTop = tableContainer.scrollHeight;
}

export {issueUploadReceipt};

export { userUpload };
