// Dark Mode Toggle Functionality
(function () {
  "use strict";

  const THEME_KEY = "portfolio-theme";
  const THEME_DARK = "dark";
  const THEME_LIGHT = "light";

  // Get saved theme or default to light
  function getSavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
      return savedTheme;
    }

    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      return THEME_DARK;
    }

    return THEME_LIGHT;
  }

  // Apply theme to document
  function applyTheme(theme) {
    const root = document.documentElement;
    const themeToggleBtn = document.getElementById("themeToggle");
    const icon = themeToggleBtn ? themeToggleBtn.querySelector("i") : null;

    if (theme === THEME_DARK) {
      root.setAttribute("data-theme", "dark");
      if (icon) {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    } else {
      root.setAttribute("data-theme", "light");
      if (icon) {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      }
    }

    // Save to localStorage
    localStorage.setItem(THEME_KEY, theme);
  }

  // Toggle between themes
  function toggleTheme() {
    const currentTheme = document.documentElement.getAttribute("data-theme");
    const newTheme = currentTheme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    applyTheme(newTheme);
  }

  // Initialize theme on page load
  function initTheme() {
    const savedTheme = getSavedTheme();
    applyTheme(savedTheme);

    // Add event listener to toggle button
    const themeToggleBtn = document.getElementById("themeToggle");
    if (themeToggleBtn) {
      themeToggleBtn.addEventListener("click", toggleTheme);

      // Add keyboard support
      themeToggleBtn.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleTheme();
        }
      });
    }

    // Listen for system theme changes
    if (window.matchMedia) {
      window
        .matchMedia("(prefers-color-scheme: dark)")
        .addEventListener("change", (e) => {
          const newTheme = e.matches ? THEME_DARK : THEME_LIGHT;
          applyTheme(newTheme);
        });
    }
  }

  // Initialize when DOM is ready
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initTheme);
  } else {
    initTheme();
  }
})();
