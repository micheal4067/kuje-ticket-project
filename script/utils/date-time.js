// Get the current date and time
const date = new Date();

const weekday = date.toLocaleString('en-NG', { 
  weekday: 'short' 
});

const day = date.toLocaleString('en-NG', { 
  day: '2-digit' 
});

const month = date.toLocaleString('en-NG', { 
  month: '2-digit' 
});

const year = date.toLocaleString('en-NG', { 
  year: '2-digit' 
});

const time = date.toLocaleString('en-NG', { 
  hour: '2-digit', 
  minute: '2-digit', 
  hour12: true 
});

const nigeriaDate = `${weekday} ${day}, ${month}-${year} | ${time}`;


export { nigeriaDate};
