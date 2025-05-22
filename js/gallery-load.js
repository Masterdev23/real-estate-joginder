document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('masonry-gallery');
  const loadMoreBtn = document.getElementById('load-more');
  let currentPage = 1;
  const imagesPerPage = 5; // Changed to 5 images per page

  // Sample image data (replace with your actual images)
  const images = [
      '../propassets/images/IMG-20250504-WA0026.jpg',
      '../propassets/images/IMG-20250504-WA0027.jpg',
      '../propassets/images/IMG-20250504-WA0028.jpg',
      '../propassets/images/IMG-20250504-WA0029.jpg',
      '../propassets/images/IMG-20250504-WA0030.jpg',
      '../propassets/images/IMG-20250504-WA0031.jpg',
      '../propassets/images/IMG-20250504-WA0032.jpg',
      '../propassets/images/IMG-20250504-WA0033.jpg',
      '../propassets/images/IMG-20250504-WA0034.jpg',
      '../propassets/images/IMG-20250504-WA0035.jpg',
      '../propassets/images/IMG-20250504-WA0036.jpg',
      '../propassets/images/Gokulam The Sanctuary luxury Floor.pdf-image-013.jpg',
      '../propassets/images/Gokulam The Sanctuary luxury Floor.pdf-image-001.png',
      '../propassets/images/Gokulam The Sanctuary luxury Floor.pdf-image-009.jpg',
      '../propassets/images/Gokulam The Sanctuary luxury Floor.pdf-image-024.jpg',
      '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-015.jpg',
      '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-062.jpg',
      '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-068.png',
      '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-077 (1).jpg',
      '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-081.jpg',
      '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-103.jpg',
      '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-131.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-078 (1).png',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-081 (1).jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-081.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-083.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-085.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-088 (1).jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-091.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-094.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-097 (1).jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-100.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-103 (1).jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-117.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-119.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-121.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-123.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-125.jpg',
       '../propassets/images/The Palatial - Brochure Presentation - 042025.pdf-image-127.jpg',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-008.jpg',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-012.jpg',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-023.png',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-028.jpg',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-035.jpg',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-036.jpg',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-037.jpg',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-038.jpg',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-044.jpg',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-047.jpg',
        '../propassets/Shobha-anaya/PDF Mobile Brochure Aranya.pdf-image-049.jpg',

  ];

  function clearGallery() {
      while (gallery.firstChild) {
          gallery.removeChild(gallery.firstChild);
      }
  }

  function loadImages(page) {
      const start = 0;
      const end = page * imagesPerPage;
      const pageImages = images.slice(start, end);

      clearGallery(); // Clear existing images

      pageImages.forEach(imagePath => {
          const item = document.createElement('div');
          item.className = 'gallery-item';
          item.innerHTML = `
              <img src="${imagePath}" alt="Property Image" loading="lazy">
          `;
          gallery.appendChild(item);
          
          // Animate the new items
          item.style.opacity = '0';
          requestAnimationFrame(() => {
              item.style.transition = 'opacity 0.5s ease';
              item.style.opacity = '1';
          });
      });

      // Update button text and state
      if (end >= images.length) {
          loadMoreBtn.textContent = 'Show Less';
          loadMoreBtn.classList.add('show-less');
      } else {
          loadMoreBtn.textContent = 'Load More';
          loadMoreBtn.classList.remove('show-less');
      }
  }

  // Initial load
  loadImages(currentPage);

  // Load more/Show less click handler
  loadMoreBtn.addEventListener('click', () => {
      if (loadMoreBtn.classList.contains('show-less')) {
          currentPage = 1;
      } else {
          currentPage++;
      }
      loadImages(currentPage);
      
      // Scroll to gallery smoothly when showing less
      if (currentPage === 1) {
          gallery.scrollIntoView({ behavior: 'smooth' });
      }
  });

  // Remove the Intersection Observer as we want manual control
});