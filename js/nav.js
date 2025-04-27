document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
  });

  // Close mobile menu when clicking a nav link
  navLinks.forEach(link => {
      link.addEventListener('click', () => {
          hamburger.classList.remove('active');
          navMenu.classList.remove('active');
          document.body.classList.remove('no-scroll');
      });
  });

  // Navbar scroll effect
  window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
          navbar.classList.add('scrolled');
      } else {
          navbar.classList.remove('scrolled');
      }
  });

  // Set active nav link based on current page
  const currentLocation = location.pathname;
  navLinks.forEach(link => {
      if (link.getAttribute('href') === currentLocation) {
          link.classList.add('active');
      }
  });
});