// Import necessary data and functions
import { salesReviews } from "../data/review-sales-array.js";
import { vehicles } from '../data/vehicles.js';
import { formatCurrency} from '../script/utils/money.js';

// Initialize variables
let generateSalesReview = '';
let total = [];
let price;
let totalPriceDisplay;



// Function to generate sales review
function generateReviewSales() {
  // Loop through each sales review
  salesReviews.forEach((sales) => {
    const vehicleId = sales.vehicleId;
    let matchingVehicle;

    // Find the matching vehicle
    vehicles.forEach((vehicle) => {
      if (vehicle.id === vehicleId) {
        matchingVehicle = vehicle;
        price = matchingVehicle.price;
        total.push({ price });
      }
    });

    // Generate the sales review HTML
    generateSalesReview += `
      <div class="vehicle-type"> ${matchingVehicle.name} </div>
      <div class="price"> ₦${formatCurrency(matchingVehicle.price)} </div>
      
    `;
  });

  // Display the sales review
  document.querySelector('.content-empty').innerHTML = generateSalesReview;
}

// Generate the sales review
generateReviewSales();

// Add event listener to back button
document.querySelector('.back-button-image, .back-arrow').addEventListener('click', () => {
  window.location.href = './kuje-market-app.html';
});

// Function to calculate total price
function totalFun() {
  let totalPriceSummary = 0;
  total.forEach((price) => {
    totalPriceSummary += price.price;
  });
  totalPriceDisplay = totalPriceSummary;
  displayTotalPrice();
}

// Function to display total price
function displayTotalPrice() {
  if (totalPriceDisplay) {
    document.querySelector('.js-amount').innerHTML = `₦${formatCurrency(totalPriceDisplay)}`;
  } else {
    document.querySelector('.js-amount').innerHTML = '0.00';
  }
}

// Get total text and sales elements
const totalText = document.querySelector('.total-text');
const totalSales = document.querySelector('.totalSales');
const printText = document.querySelector('.clear-button-div');
const totalButtonElement = document.querySelector('.js-total-sales');
const totalDiv = document.querySelector('.js-div-button');

// Initialize print button variable
let printBotton;

// Check if sales review is empty
if (generateSalesReview === '') {
  totalDiv.style.display = 'none';
} else {
  // Add event listener to total sales button
  totalButtonElement.addEventListener('click', () => {
    totalText.innerHTML = 'Total';
    totalSales.style.borderBottom = 'solid 1px white';
    totalSales.style.borderTop = 'solid 1px white';
    totalFun();
    totalSales.style.marginBottom = '20px';
    printText.innerHTML = `<button class="total-sales js-print-receipt" >Print Receipt</button>`;
    printBotton = printText.innerHTML;

    // Add event listener to print receipt button
    if (printBotton === printText.innerHTML) {
      document.querySelector('.js-print-receipt').addEventListener('click', () => {
        const printWindow = window.open('', '', 'width=800,height=600');
        printWindow.onload = function() {
          const date = new Date();
          const weekday = date.toLocaleString('en-NG', { weekday: 'short' });
          const day = date.toLocaleString('en-NG', { day: '2-digit' });
          const month = date.toLocaleString('en-NG', { month: '2-digit' });
          const year = date.toLocaleString('en-NG', { year: '2-digit' });
          const time = date.toLocaleString('en-NG', { hour: '2-digit', minute: '2-digit', hour12: true });
          const nigerianDate = `${weekday} ${day}, ${month}-${year}`;

          // Print the receipt
          printWindow.document.write(`
            <html>
              <body>
                <div style="display: flex; justify-content: space-between;">
                  <p>${nigerianDate}</p>
                  <p>${time}</p>
                </div>
                <p style="display: flex; align-items: center; justify-content: center;margin-bottom:2rem;">
                  <b>Kuje Ultra Mordern Market</b>
                </p>
                <div style="display: flex; align-items: center; justify-content: space-between; border-top: solid 1px black;">
                  <p><b>Total</b></p>
                  <p><b>₦${formatCurrency(totalPriceDisplay)}</b></p>
                </div>
              </body>
            </html>
          `);
          printWindow.print();
          setTimeout(function() {
            printWindow.close();
          }, 500); // Adjust the delay as needed
        };
        // Print the page
        printWindow.print();
      });
    }
  });
}