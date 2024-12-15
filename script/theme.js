export function themeTogle() {
  const themeSelect = document.getElementById("theme-select");

  // Load saved theme or set to light by default
  const savedTheme = localStorage.getItem("theme") || "light";
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (themeSelect) themeSelect.value = savedTheme;

  // Change event listener
  themeSelect?.addEventListener("change", () => {
    const selectedTheme = themeSelect.value;
    document.documentElement.setAttribute("data-theme", selectedTheme);
    localStorage.setItem("theme", selectedTheme);
  });
}
