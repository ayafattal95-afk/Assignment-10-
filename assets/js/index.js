var body = document.body;
var navLinks = document.querySelectorAll(".nav-links a");
var navBar = document.getElementById("header");
var footer = document.getElementById("footer");
var sections = document.querySelectorAll("section");
var themeToggleButton = document.getElementById("theme-toggle-button");
var html = document.querySelector(".html-theme");
var savetheme = localStorage.getItem("theme");
var buttons = document.getElementsByClassName("portfolio-filter");
var projects = document.getElementsByClassName("portfolio-item");
var carouselList = document.querySelectorAll("#testimonials-carousel div");
var cards = document.getElementsByClassName("testimonial-card");
var nextBtn = document.getElementById("next-testimonial");
var prevBtn = document.getElementById("prev-testimonial");
var startIndex = 0;
var visibleCards = 3;
var carouselIndicator = document.querySelectorAll(
  "#Carousel-Indicators button"
);
var indicators = document.querySelectorAll(".carousel-indicator");
var currentIndex = 0;
var scrollBtn = document.querySelector("#scroll-to-top");
var settingsSidebar = document.getElementById("settings-sidebar");
var openBtn = document.getElementById("settings-toggle"); // أيقونة الجير
var closeBtn = document.getElementById("close-settings");
var resetBtn = document.getElementById("reset-settings");
var fontButtons = document.getElementsByClassName("font-option");
var themeButtons = document.getElementsByClassName("theme-btn");

console.log(carouselIndicator);

applySavedSettings();

// ! activLink
for (var i = 0; i < sections.length; i++) {
  sections[i].addEventListener("mouseenter", function () {
    var id = this.id;
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].classList.remove("active-link");
      if (navLinks[i].getAttribute("href") == `#${id}`) {
        navLinks[i].classList.add("active-link");
      }
    }
  });
}

// ! teme (dark - light)
if (savetheme == "dark") {
  html.classList.add("dark");
} else {
  html.classList.remove("dark");
}

themeToggleButton.addEventListener("click", function () {
  if (html.classList.contains("dark")) {
    html.classList.remove("dark");

    localStorage.setItem("theme", "light");
  } else {
    html.classList.add("dark");

    localStorage.setItem("theme", "dark");
  }
});

// !portfolio-filters
for (var i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function (e) {
    var currentCard = e.target.getAttribute("data-filter");

    for (var j = 0; j < projects.length; j++) {
      projects[j].style.display = "none";
      var category = projects[j].getAttribute("data-category");
      if (currentCard == "all" || category == currentCard) {
        projects[j].style.display = "block";
      }
    }

    // نوضح الزرار اللي اتضغط
    for (var j = 0; j < buttons.length; j++) {
      buttons[j].style.opacity = "0.6";
    }
    this.style.opacity = "1";
  });
}

// ! carousel;
function showCards() {
  for (var i = 0; i < cards.length; i++) {
    cards[i].style.display = "none";
  }

  for (var i = startIndex; i < startIndex + visibleCards; i++) {
    if (cards[i]) {
      cards[i].style.display = "block";
    }
  }
}

showCards();

nextBtn.addEventListener("click", function () {
  if (
    startIndex + visibleCards < cards.length &&
    currentIndex < indicators.length - 1
  ) {
    startIndex++;
    currentIndex++;

    showCards();
    setActiveButton();
  }
});

prevBtn.addEventListener("click", function () {
  if (startIndex > 0 && currentIndex > 0) {
    startIndex--;
    currentIndex--;

    showCards();
    setActiveButton();
  }
});

// ! active button
function setActiveButton() {
  indicators.forEach(function (button, index) {
    button.classList.remove("active");
    if (index == currentIndex) {
      button.classList.add("active");
    }
  });
}

setActiveButton();

// &&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&
// ! font
function applySavedSettings() {
  // ? font
  var savedFont = localStorage.getItem("font");
  if (savedFont) {
    body.classList.remove("font-tajawal", "font-cairo", "font-alexandria");
    body.classList.add(savedFont);
  }

  // ? them Button Color
  var savedColor = localStorage.getItem("themeColor");
  if (savedColor) {
    document.body.style.setProperty("--color-primary", savedColor);
  }
}

function closeSettingsSidebar() {
  settingsSidebar.classList.add("translate-x-full");
  openBtn.classList.replace("settings-toggle-2", "settings-toggle-1");
}

openBtn.addEventListener("click", function () {
  settingsSidebar.classList.remove("translate-x-full");
  openBtn.classList.replace("settings-toggle-1", "settings-toggle-2");
});

closeBtn.addEventListener("click", closeSettingsSidebar);
navBar.addEventListener("click", closeSettingsSidebar);
footer.addEventListener("click", closeSettingsSidebar);
for (var i = 0; i < sections.length; i++) {
  sections[i].addEventListener("click", closeSettingsSidebar);
}

for (var i = 0; i < fontButtons.length; i++) {
  fontButtons[i].addEventListener("click", function () {
    var fontName = this.getAttribute("data-font");

    body.classList.remove("font-tajawal");
    body.classList.remove("font-cairo");
    body.classList.remove("font-alexandria");

    body.classList.add(fontName);
    localStorage.setItem("font", fontName);
  });
}

// ! teme color
for (var i = 0; i < themeButtons.length; i++) {
  themeButtons[i].addEventListener("click", function () {
    var themBtn = this.getAttribute("data-primary");
    document.body.style.setProperty("--color-primary", themBtn);
    localStorage.setItem("themeColor", themBtn);

    localStorage.setItem("themeColor", themBtn);
  });
}

// ! resetBtn إعادة ضبط
resetBtn.addEventListener("click", function () {
  body.classList.remove("font-tajawal", "font-cairo", "font-alexandria");
  body.classList.add("font-tajawal");
  localStorage.setItem("font", "font-tajawal");

  document.body.style.setProperty("--color-primary", "#4f46e5");
  localStorage.setItem("themeColor", "#4f46e5");

  closeSettingsSidebar();
});

// ! scrollBtn
window.addEventListener("scroll", function () {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("opacity-0", "invisible");
    scrollBtn.classList.add("opacity-100", "visible");
  } else {
    scrollBtn.classList.add("opacity-0", "invisible");
    scrollBtn.classList.remove("opacity-100", "visible");
  }
});
