// hamburger menu toggle
function toggleMenu() {
  var menu = document.querySelector(".menu-links");
  var icon = document.querySelector(".hamburger-icon");
  if (menu && icon) {
    menu.classList.toggle("open");
    icon.classList.toggle("open");
  }
}

// --- dark mode / light mode ---

var themeToggle = document.getElementById("theme-toggle");
var themeIcon = document.getElementById("theme-icon");
var themeIconMobile = document.getElementById("theme-icon-mobile");
var prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

function setTheme(mode) {
  if (mode === "dark") {
    document.body.classList.add("dark-mode");
    if (themeIcon) themeIcon.src = "./assets/icons/Sun.svg";
    if (themeIconMobile) themeIconMobile.src = "./assets/icons/Sun.svg";
    localStorage.setItem("theme", "dark");
  } else {
    document.body.classList.remove("dark-mode");
    if (themeIcon) themeIcon.src = "./assets/icons/Moon.svg";
    if (themeIconMobile) themeIconMobile.src = "./assets/icons/Moon.svg";
    localStorage.setItem("theme", "light");
  }
}

// check if user already picked a theme before, otherwise default to dark
var savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme("dark");
}

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    var isDark = document.body.classList.contains("dark-mode");
    setTheme(isDark ? "light" : "dark");
  });
}


// --- typing effect ---
// change these to update what gets typed on the hero section

var typingPhrases = [
  "Full-Stack Developer",
  "AI/ML Enthusiast",
  "Tech Enthusiast",
  "Problem Solver",
];

var typedEl = document.getElementById("typed-text");
var phraseIdx = 0;
var charIdx = 0;
var isDeleting = false;

function typeEffect() {
  if (!typedEl) return;

  var current = typingPhrases[phraseIdx];

  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIdx - 1);
    charIdx--;
  } else {
    typedEl.textContent = current.substring(0, charIdx + 1);
    charIdx++;
  }

  // typing is slower than deleting
  var delay = isDeleting ? 35 : 70;

  if (!isDeleting && charIdx === current.length) {
    // done typing, wait a bit then start deleting
    delay = 2200;
    isDeleting = true;
  } else if (isDeleting && charIdx === 0) {
    // done deleting, move to next phrase
    isDeleting = false;
    phraseIdx = (phraseIdx + 1) % typingPhrases.length;
    delay = 500;
  }

  setTimeout(typeEffect, delay);
}

typeEffect();


// --- scroll reveal animation ---
// sections and cards fade in when they enter the viewport

var revealElements = document.querySelectorAll(".reveal, .reveal-card");

var revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
      }
    });
  },
  { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
);

revealElements.forEach(function (el) {
  revealObserver.observe(el);
});


// --- nav scroll behavior ---
// adds shadow to nav on scroll and highlights the active section link

var sections = document.querySelectorAll("section[id]");
var desktopNav = document.getElementById("desktop-nav");
var hamburgerNav = document.getElementById("hamburger-nav");

function handleScroll() {
  var scrollY = window.scrollY;
  var scrolled = scrollY > 30;

  // add shadow to navbar when scrolled
  [desktopNav, hamburgerNav].forEach(function (nav) {
    if (nav) nav.classList.toggle("scrolled", scrolled);
  });

  // figure out which section is currently visible and highlight its nav link
  var offset = scrollY + 200;
  sections.forEach(function (section) {
    var top = section.offsetTop;
    var height = section.offsetHeight;
    var id = section.getAttribute("id");
    var links = document.querySelectorAll(
      '.nav-link ul li a[href="#' + id + '"], .footer-nav a[href="#' + id + '"]'
    );
    var isActive = offset >= top && offset < top + height;
    links.forEach(function (link) {
      link.classList.toggle("active-link", isActive);
    });
  });
}

window.addEventListener("scroll", handleScroll, { passive: true });
handleScroll();


// set footer year automatically
var yearEl = document.getElementById("current-year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
