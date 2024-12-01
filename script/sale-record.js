import { marketNameDisplay } from "../data/login-name.js";
import { formatCurrency } from "../script/utils/money.js";
import { salesHistory as importedSalesHistory } from "../data/sales-history.js";
import { vehicles } from "../data/vehicles.js";
import { themeTogle } from "./theme.js";

themeTogle();

// Initialize LocalStorage for salesHistory
if (!localStorage.getItem("salesHistory")) {
  localStorage.setItem("salesHistory", JSON.stringify(importedSalesHistory));
}

document.querySelector('.back-button-image, .back-arrow').addEventListener('click', () => {
  window.location.href = './ticket-dashboard.html';
});

document.querySelector('.market-name').innerHTML = marketNameDisplay;

let generateSalesReview = '';

// Function to group sales by date and render the table
function generateReviewSales() {
  const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
  let salesByDate = {};

  // Group sales by date
  salesHistory.forEach((sale) => {
    const vehicleId = sale.vehicleId;
    const date = sale.nigerianDate;

    let matchingVehicle;
    vehicles.forEach((vehicle) => {
      if (vehicle.id === vehicleId) {
        matchingVehicle = vehicle;
      }
    });

    if (!salesByDate[date]) {
      salesByDate[date] = [];
    }

    salesByDate[date].push({
      time: sale.time,
      name: matchingVehicle.name,
      price: matchingVehicle.price,
    });
  });

  // Generate rows
  generateSalesReview = ''; // Clear previous HTML
  Object.keys(salesByDate).forEach((date) => {
    const sales = salesByDate[date];
    let dateTotal = 0;

    generateSalesReview += `
      <tr class="date-header">
        <td colspan="3">
          <strong>${date}</strong><br>
          <button class="delete-btn" onclick="deleteSales('${date}')" style="margin-top:20px;">Delete</button>
          <button class="print-btn" onclick="printOrSaveSales('${date}')"  >Save as PDF</button>
        </td>
      </tr>
    `;

    sales.forEach((sale) => {
      generateSalesReview += `
        <tr>
          <td>${sale.time}</td>
          <td>${sale.name}</td>
          <td>₦${formatCurrency(sale.price)}</td>
        </tr>
      `;
      dateTotal += sale.price;
    });

    generateSalesReview += `
      <tr class="total-row">
        <td colspan="2">Total for ${date}</td>
        <td><strong>₦${formatCurrency(dateTotal)}</strong></td>
      </tr>
      <tr class="spacer-row"><td colspan="3">&nbsp;</td></tr>
    `;
  });

  // Render to the table
  document.querySelector('.content-empty').innerHTML = generateSalesReview;
}

// Modal control variables and functions
let dateToDelete = null; // Global variable to store the date being deleted

function openDeleteModal(date) {
  dateToDelete = date;
  document.getElementById('deleteConfirmationModal').style.display = 'flex';
}

function closeDeleteModal() {
  dateToDelete = null;
  document.getElementById('deleteConfirmationModal').style.display = 'none';
}

// Function to handle confirmed deletion
function confirmDeletion() {
  if (dateToDelete) {
    const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];

    // Filter out sales for the specified date
    const updatedSalesHistory = salesHistory.filter((sale) => sale.nigerianDate !== dateToDelete);

    // Update localStorage with the new salesHistory
    localStorage.setItem("salesHistory", JSON.stringify(updatedSalesHistory));

    // Re-render the sales table
    generateReviewSales();

    // Close the modal
    closeDeleteModal();
  }
}

// Attach event listeners to modal buttons
document.getElementById('confirmDeleteBtn').addEventListener('click', confirmDeletion);
document.getElementById('cancelDeleteBtn').addEventListener('click', closeDeleteModal);

// Update deleteSales button to open the modal
window.deleteSales = openDeleteModal;

// Function to print or save sales for a specific date
window.printOrSaveSales = function (date) {
  const { jsPDF } = window.jspdf;
  const pdf = new jsPDF();

  const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
  const salesForDate = salesHistory.filter((sale) => sale.nigerianDate === date);

  if (salesForDate.length === 0) {
    alert("No sales found for this date.");
    return;
  }

  // Add title
  pdf.setFontSize(16);
  pdf.text(`Sales for ${date}`, 14, 20);

  // Prepare table data
  const tableData = salesForDate.map((sale) => {
    const vehicle = vehicles.find((v) => v.id === sale.vehicleId);
    return [sale.time, vehicle.name, `₦${formatCurrency(vehicle.price)}`];
  });

  // Calculate and format the total
  const total = salesForDate.reduce((sum, sale) => {
    const vehicle = vehicles.find((v) => v.id === sale.vehicleId);
    return sum + vehicle.price;
  }, 0);

  const formattedTotal = `₦${formatCurrency(total)}`;

  // Add the total row
  tableData.push(["", "Total", formattedTotal]);

  // Use autoTable to render the table
  pdf.autoTable({
    head: [["Time", "Vehicle", "Price"]],
    body: tableData,
    startY: 30,
    theme: "grid",
    styles: { fontSize: 10 },
    headStyles: { fillColor: [41, 128, 185], textColor: [255, 255, 255] }, // Header styling
  });

  // Save the PDF
  pdf.save(`Ticket Sales_${date}.pdf`);
};

// Initial rendering
generateReviewSales();


// Confirm dialog for editing vehicle price
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



/*
// Function to print or save sales for a specific date
window.printOrSaveSales = function (date) {
  const salesHistory = JSON.parse(localStorage.getItem("salesHistory")) || [];
  const salesForDate = salesHistory.filter((sale) => sale.nigerianDate === date);

  // Generate printable content
  let printContent = `<h1>Sales for ${date}</h1>`;
  printContent += `<table border="1" style="width: 100%; text-align: left;">
    <tr>
      <th>Time</th>
      <th>Vehicle</th>
      <th>Price</th>
    </tr>`;

  salesForDate.forEach((sale) => {
    const vehicle = vehicles.find((v) => v.id === sale.vehicleId);
    printContent += `
      <tr>
        <td>${sale.time}</td>
        <td>${vehicle.name}</td>
        <td>₦${formatCurrency(vehicle.price)}</td>
      </tr>
    `;
  });

  printContent += `</table>`;

  // Open print dialog or save as PDF
  const newWindow = window.open('', '_blank');
  newWindow.document.write(printContent);
  newWindow.document.close();
  newWindow.print();
};
*/
