document.addEventListener('DOMContentLoaded', () => {
  // Select the necessary elements after DOM is loaded
  const navbar = document.querySelector("[data-navbar]");
  const overlay = document.querySelector("[data-overlay]");
  const navCloseBtn = document.querySelector("[data-nav-close-btn]");
  const navOpenBtn = document.querySelector("[data-nav-open-btn]");
  const navbarLinks = document.querySelectorAll("[data-nav-link]");

  const navElemArr = [overlay, navCloseBtn, navOpenBtn, ...navbarLinks];

  // Ensure the function for toggling class is available
  const elemToggleFunc = function (elem) { elem.classList.toggle("active"); }

  // Handle search bar toggle
  

  // Add an event listener for the toggle action (if required)
  
  // Add event listeners for navbar toggle
  if (navElemArr) {
    navElemArr.forEach(elem => {
      if (elem) {
        elem.addEventListener("click", () => {
          elemToggleFunc(navbar);
          elemToggleFunc(overlay);
        });
      }
    });
  }

  // Header active state on scroll
  const header = document.querySelector("[data-header]");
  window.addEventListener("scroll", function () {
    if (window.scrollY >= 400 && header) {
      header.classList.add("active");
    } else if (header) {
      header.classList.remove("active");
    }
  });
});

//owner component script

function loadPage(page) {
  // Load content from the external HTML file
  fetch(page)
    .then(response => response.text())
    .then(data => {
      document.getElementById('contentArea').innerHTML = data;
    })
    .catch(error => {
      console.error('Error loading page:', error);
      document.getElementById('contentArea').innerHTML = "<p>Failed to load content.</p>";
    });
}

