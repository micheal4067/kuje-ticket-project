// Export a function to format currency
export function formatCurrency(priceKobo) {
  // Convert price from kobo to naira
  const naira = Math.round(priceKobo) / 100;
  
  // Format naira value with 2 decimal places and comma separators
  return `${naira.toLocaleString('en-NG', { 
    minimumFractionDigits: 2, 
    maximumFractionDigits: 2, 
  })}`;
}

// Export the formatCurrency function as the default export
export default formatCurrency;

// Export a function to handle click event
export function handleClick() {
  // Remove 'sales' item from local storage
  localStorage.removeItem('sales');
  
  // Reload the current window
  window.location.reload();
}

export function getAttendantPic() {
  const storedAttendantPic = localStorage.getItem('attendantPic');
  return storedAttendantPic ? JSON.parse(storedAttendantPic) : null;

}