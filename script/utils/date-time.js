// Get the current date and time
const date = new Date();

// Extract the weekday from the date (e.g. "Mon", "Tue", etc.)
const weekday = date.toLocaleString('en-NG', { 
  weekday: 'short' 
});

// Extract the day of the month from the date (e.g. "01", "02", etc.)
const day = date.toLocaleString('en-NG', { 
  day: '2-digit' 
});

// Extract the month from the date (e.g. "01", "02", etc.)
const month = date.toLocaleString('en-NG', { 
  month: '2-digit' 
});

// Extract the year from the date (e.g. "22" for 2022)
const year = date.toLocaleString('en-NG', { 
  year: '2-digit' 
});

// Extract the time from the date (e.g. "12:30 PM")
const time = date.toLocaleString('en-NG', { 
  hour: '2-digit', 
  minute: '2-digit', 
  hour12: true 
});

// Combine the weekday, day, month, and year to form a Nigerian date string
const nigeriaDate = `${weekday} ${day}, ${month}-${year} | ${time}`;

// Combine the weekday, day, month, and year to form a shorter Nigerian date string
const nigerianDate = `${weekday} ${day}, ${month}-${year}`;

// Export the Nigerian date strings and time
export { nigeriaDate, nigerianDate, time };
