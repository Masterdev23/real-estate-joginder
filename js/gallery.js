document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
      duration: 800,
      once: true
  });

  // Initialize Swiper

  // Video Data
  const videoItems = [
      {
          thumbnail: '../images/jogi-prop-banner-768px.png',
          title: 'Modern Apartment Tour',
          description: 'Take a virtual walk through this stunning 3BHK apartment',
          videoUrl: '#'
      },
      // Add more video items
  ];


  // Populate Videos
  const videoGrid = document.querySelector('.video-grid');
  videoItems.forEach(item => {
      const videoItem = document.createElement('div');
      videoItem.className = 'video-item';
      videoItem.innerHTML = `
          <img src="${item.thumbnail}" alt="${item.title}" class="video-thumbnail">
          <div class="play-button">
              <i class="fas fa-play"></i>
          </div>
          <div class="video-info">
              <h3>${item.title}</h3>
              <p>${item.description}</p>
          </div>
      `;
      videoGrid.appendChild(videoItem);
  });

  // Filter Functionality
  const filters = document.querySelectorAll('.filter-select');
  filters.forEach(filter => {
      filter.addEventListener('change', function() {
          // Add your filter logic here
          console.log('Filter changed:', this.value);
      });
  });

  // Video Player
  const playButtons = document.querySelectorAll('.play-button');
  playButtons.forEach(button => {
      button.addEventListener('click', function() {
          // Add your video player logic here
          console.log('Play video clicked');
      });
  });
});