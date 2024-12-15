import { vehicles } from "../data/vehicles.js";
import { formatCurrency } from "../script/utils/money.js";
import { salesLog } from "../data/review-sales-array.js";
import { vehicleDataArray } from "../data/users-data-upload.js"; // Import vehicleDataArray

let generateSaleslog = '';
let total = [];
let price;

function generateSalesLog() {
  // Check if sales log should be shown based on localStorage
  const salesLogEnabled = localStorage.getItem('salesLogEnabled') === 'true';

  // If sales log is disabled, don't generate the table
  if (!salesLogEnabled) {
    document.querySelector('.info-log').style.display = 'none';
    return; // Stop further execution
  }

  generateSaleslog = ''; // Reset before generating
  total = []; // Reset total array

  // Start the table structure inside a scrollable container
  generateSaleslog += `
    <div class="sales-table-container">
      <table class="sales-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Time</th>
            <th>Vehicle Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
  `;

  // Loop through the `salesLog` array
  salesLog.forEach((sale) => {
    const vehicleId = sale.vehicleId;          // Extracting vehicleId
    const nigeriaDate = sale.nigerianDate;     // Extracting date
    const time = sale.time;                    // Extracting time
    let matchingVehicle;

    // Search for the vehicle in `vehicles`
    matchingVehicle = vehicles.find((vehicle) => vehicle.id === vehicleId);

    // If not found in `vehicles`, search in `vehicleDataArray`
    if (!matchingVehicle) {
      matchingVehicle = vehicleDataArray.find((vehicle) => vehicle.id === vehicleId);
    }

    // If no matching vehicle is found, mark as "Vehicle Deleted"
    if (!matchingVehicle) {
      generateSaleslog += `
        <tr>
          <td>${nigeriaDate}</td>
          <td>${time}</td>
          <td>Ticket Deleted</td>
          <td>₦${formatCurrency(sale.price)}</td>
        </tr>
      `;
      return; // Skip further processing for this sale
    }

    // Use the sale price if it exists; otherwise, fallback to the vehicle's current price
    price = sale.price || matchingVehicle.price;

    // Add the vehicle details to the table rows
    generateSaleslog += `
      <tr>
        <td>${nigeriaDate}</td>
        <td>${time}</td>
        <td>${matchingVehicle.name}</td>
        <td>₦${formatCurrency(price)}</td>
      </tr>
    `;
  });

  // Close the table structure
  generateSaleslog += `
        </tbody>
      </table>
    </div>
  `;

  // Insert the generated sales log into the DOM
  document.querySelector('.info-log').innerHTML = generateSaleslog;
}

export { generateSalesLog };
