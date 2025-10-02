/**
 * Color mode toggler for Bootstrap's docs (https://getbootstrap.com/)
 * Copyright 2011-2024 The Bootstrap Authors
 * Licensed under the Creative Commons Attribution 3.0 Unported License.
 *
 * @format
 */
(() => {
  "use strict";

  const getStoredTheme = () => localStorage.getItem("theme");
  const setStoredTheme = (theme) => localStorage.setItem("theme", theme);

  const getPreferredTheme = () => {
    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  };

  const setTheme = (theme) => {
    if (theme === "auto") {
      document.documentElement.setAttribute(
        "data-bs-theme",
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "dark"
          : "light"
      );
    } else {
      document.documentElement.setAttribute("data-bs-theme", theme);
    }
  };

  const showActiveTheme = (theme, focus = false) => {
    const themeToggle = document.getElementById("theme-toggle");

    if (!themeToggle) {
      return;
    }

    const icon = themeToggle.querySelector("i");
    icon.className = theme === "dark" ? "bi bi-sun" : "bi bi-moon";

    if (focus) {
      themeToggle.focus();
    }
  };

  // Immediately set the theme when the page loads
  window.addEventListener("DOMContentLoaded", () => {
    const storedTheme = getStoredTheme();
    const preferredTheme = getPreferredTheme();

    // Set the theme based on stored preference or system preference
    setTheme(storedTheme || preferredTheme);
    showActiveTheme(storedTheme || preferredTheme);

    // Event listener for toggling theme
    const themeToggle = document.getElementById("theme-toggle");

    if (themeToggle) {
      themeToggle.addEventListener("click", (e) => {
        e.preventDefault();
        const currentTheme = getStoredTheme() || preferredTheme;
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        setStoredTheme(newTheme);
        setTheme(newTheme);
        showActiveTheme(newTheme, true);
      });
    }

    // Watch for changes in system color scheme and update theme accordingly
    window
      .matchMedia("(prefers-color-scheme: dark)")
      .addEventListener("change", () => {
        const currentTheme = getStoredTheme() || preferredTheme;
        if (currentTheme !== "light" && currentTheme !== "dark") {
          setTheme(preferredTheme);
          showActiveTheme(preferredTheme);
        }
      });
  });
})();
