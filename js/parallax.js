/* filepath: /Users/vishalmohanta/real-estate-joginder/js/parallax.js */

document.addEventListener('DOMContentLoaded', function() {
  const parallax = document.querySelector('.hero-parallax');
  let scrollPosition;

  // Parallax effect
  window.addEventListener('scroll', function() {
      scrollPosition = window.pageYOffset;
      parallax.style.transform = `translateY(${scrollPosition * 0.5}px)`;
      
      // Fade out effect as user scrolls
      parallax.style.opacity = 1 - (scrollPosition / 700);
  });

  // Optional: Add smooth scroll for the mouse indicator
  document.querySelector('.scroll-indicator').addEventListener('click', function() {
      window.scrollTo({
          top: window.innerHeight,
          behavior: 'smooth'
      });
  });
});