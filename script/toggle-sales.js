// toggle-sales-log.js
function initializeSalesLogToggle() {
  const salesToggle = document.getElementById('sales-toggle');
  const salesIcon = document.getElementById('sales-icon');
  const salesBtn = document.getElementById('sales-btn');

  // Check if the toggle state is stored in localStorage
  const salesLogEnabled = localStorage.getItem('salesLogEnabled') === 'true';

  // Set the initial state of the toggle based on localStorage
  salesToggle.checked = salesLogEnabled;

  // Update the icon and text based on the toggle state
  updateSalesLogState(salesLogEnabled);

  // Listen for changes to the toggle
  salesToggle.addEventListener('change', (event) => {
    const isEnabled = event.target.checked;
    localStorage.setItem('salesLogEnabled', isEnabled); // Save the state to localStorage
    updateSalesLogState(isEnabled); // Update the visibility and icon
  });
}

// Function to update the visibility and icon based on the state
function updateSalesLogState(isEnabled) {
  const salesIcon = document.getElementById('sales-icon');
  const salesBtn = document.getElementById('sales-btn');

  if (isEnabled) {
    salesIcon.classList.remove('fa-toggle-off');
    salesIcon.classList.add('fa-toggle-on');
    salesBtn.innerHTML = '<i class="fas fa-toggle-on" id="sales-icon"></i> Disable Sales Log';
    // Display the sales log if enabled
    document.querySelector('.info-log').style.display = 'block';
  } else {
    salesIcon.classList.remove('fa-toggle-on');
    salesIcon.classList.add('fa-toggle-off');
    salesBtn.innerHTML = '<i class="fas fa-toggle-off" id="sales-icon"></i> Enable Sales Log';
    // Hide the sales log if disabled
    document.querySelector('.info-log').style.display = 'none';
  }
}

export { initializeSalesLogToggle };
