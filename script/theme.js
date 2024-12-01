const themeToggle = document.getElementById("theme-toggle");

function themeTogle(){
  

// Load the user's preferred theme from localStorage
const currentTheme = localStorage.getItem("theme") || "light";
document.documentElement.setAttribute("data-theme", currentTheme);
themeToggle.checked = currentTheme === "dark";

// Toggle theme on switch change
themeToggle.addEventListener("change", () => {
  const newTheme = themeToggle.checked ? "dark" : "light";
  document.documentElement.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme); // Save the preference
});
}

export {themeTogle};