document.addEventListener('DOMContentLoaded', () => {
  const locationCards = document.querySelector('.location-cards');
  const prevBtn = document.querySelector('.prev-btn');
  const nextBtn = document.querySelector('.next-btn');
  
  let scrollAmount = 0;
  const cardWidth = 300 + 24; // card width + gap
  
  // Handle button clicks
  nextBtn.addEventListener('click', () => {
      scrollAmount += cardWidth;
      if (scrollAmount > locationCards.scrollWidth - locationCards.clientWidth) {
          scrollAmount = locationCards.scrollWidth - locationCards.clientWidth;
      }
      locationCards.style.transform = `translateX(${-scrollAmount}px)`;
      updateButtonStates();
  });
  
  prevBtn.addEventListener('click', () => {
      scrollAmount -= cardWidth;
      if (scrollAmount < 0) {
          scrollAmount = 0;
      }
      locationCards.style.transform = `translateX(${-scrollAmount}px)`;
      updateButtonStates();
  });
  
  // Handle touch events for mobile
  let startX;
  let scrollLeft;
  
  locationCards.addEventListener('touchstart', (e) => {
      startX = e.touches[0].pageX - locationCards.offsetLeft;
      scrollLeft = scrollAmount;
  });
  
  locationCards.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const x = e.touches[0].pageX - locationCards.offsetLeft;
      const walk = (x - startX);
      scrollAmount = scrollLeft - walk;
      
      if (scrollAmount < 0) scrollAmount = 0;
      if (scrollAmount > locationCards.scrollWidth - locationCards.clientWidth) {
          scrollAmount = locationCards.scrollWidth - locationCards.clientWidth;
      }
      
      locationCards.style.transform = `translateX(${-scrollAmount}px)`;
  });
  
  function updateButtonStates() {
      prevBtn.style.opacity = scrollAmount <= 0 ? '0.5' : '1';
      nextBtn.style.opacity = 
          scrollAmount >= locationCards.scrollWidth - locationCards.clientWidth 
          ? '0.5' : '1';
  }
  
  // Initial button states
  updateButtonStates();
});