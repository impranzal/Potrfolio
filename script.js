// Toggle mobile menu
function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");

  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
}

// Dark Mode Toggle
document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const toggle = document.getElementById("theme-toggle");
  const icon = document.getElementById("theme-icon");

  // Load saved theme
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    body.classList.add("dark-mode");
    icon.src = "./Assets/sun.svg";
  } else {
    icon.src = "./Assets/moon.svg";
  }

  // Handle click on dark mode toggle
  toggle.addEventListener("click", () => {
    const isDark = body.classList.toggle("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    icon.src = isDark ? "./Assets/sun.svg" : "./Assets/moon.svg";
  });
});
