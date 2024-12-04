import { vehicles } from "../data/vehicles.js";
import { formatCurrency } from "../script/utils/money.js";
import { salesLog } from "../data/review-sales-array.js";
import { vehicleDataArray } from "../data/users-data-upload.js"; // Import vehicleDataArray

let generateSaleslog = '';
let total = [];
let price;

function generateSalesLog() {
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

    // Skip if no matching vehicle is found
    if (!matchingVehicle) {
      console.warn(`No matching vehicle found for ID: ${vehicleId}`); // Debugging
      return;
    }

    price = matchingVehicle.price; // Get the price of the matched vehicle

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
