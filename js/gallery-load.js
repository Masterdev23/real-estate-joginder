document.addEventListener('DOMContentLoaded', function() {
  const gallery = document.getElementById('masonry-gallery');
  const loadMoreBtn = document.getElementById('load-more');
  let currentPage = 1;
  const imagesPerPage = 5; // Changed to 5 images per page

  // Sample image data (replace with your actual images)
  const images = [
      '../images/jc-gellidon-GFUXPM7Hf6M-unsplash.jpg',
      '../images/dlf-camellias-gurgaon.webp',
      '../images/bestech_park_view_grand_spa-sector_81_gurgaon-gurgaon-bestech_india_pvt_ltd_2.jpg',
      '../images/jc-gellidon-GFUXPM7Hf6M-unsplash.jpg',
      '../images/luxury villa.jpeg',
      '../images/Bestech_Grand_view_Spa_-Banner.jpg',
      '../images/DLF_new_photo_2_final_1738058267776_1738058276372.jpg',
     '../images/jc-gellidon-GFUXPM7Hf6M-unsplash.jpg',
     '../images/Bestech_Grand_view_Spa_-Banner.jpg',
     '../images/bestech_park_view_grand_spa-sector_81_gurgaon-gurgaon-bestech_india_pvt_ltd_2.jpg',
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