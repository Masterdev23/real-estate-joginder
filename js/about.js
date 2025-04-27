/* filepath: /Users/vishalmohanta/real-estate-joginder/js/about.js */
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
      duration: 1000,
      once: true
  });

  // Parallax Effect
  window.addEventListener('scroll', function() {
      const parallax = document.querySelector('.hero-parallax');
      let scrollPosition = window.pageYOffset;
      parallax.style.transform = 'translateY(' + (scrollPosition * 0.5) + 'px)';
  });

  // Counter Animation
  const counters = document.querySelectorAll('.counter');
  
  const startCounting = (counter) => {
      const target = parseInt(counter.getAttribute('data-target'));
      const count = +counter.innerText;
      const increment = target / 200;

      if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(() => startCounting(counter), 10);
      } else {
          counter.innerText = target;
      }
  };

  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              startCounting(entry.target);
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.5 });

  counters.forEach(counter => counterObserver.observe(counter));
});