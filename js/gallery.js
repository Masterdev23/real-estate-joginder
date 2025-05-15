document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Video Data - Example structure
    const videoItems = [
        {
            source: '../propassets/images/WhatsApp Video 2025-05-03 at 10.07.40_2d9b95aa.mp4', // Fixed path
            thumbnail: '../images/video-thumbnail1.jpg',
            title: 'Triilion',
            description: 'Take a virtual walk through this stunning 3BHK apartment',
            orientation: 'landscape',
            duration: '2:30'
        },
        {
            source: '../propassets/images/WhatsApp Video 2025-05-03 at 10.50.17_3ea4da80.mp4', // Fixed path
            thumbnail: '../images/video-thumbnail1.jpg',
            title: 'Gokulam Sentury',
            description: 'Take a virtual walk through this stunning 3BHK apartment',
            orientation: 'portrait',
            duration: '2:30'
        },
        {
            source: '../propassets/images/WhatsApp Video 2025-05-03 at 10.07.40_2d9b95aa.mp4', // Fixed path
            thumbnail: '../images/video-thumbnail1.jpg',
            title: 'Modern Apartment Tour',
            description: 'Take a virtual walk through this stunning 3BHK apartment',
            orientation: 'landscape',
            duration: '2:30'
        }
        // Add more video items as needed
    ];

    // Populate Videos
    const videoGrid = document.querySelector('.video-grid');
    
    videoItems.forEach((item, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = `video-item ${item.orientation}`;
        videoItem.setAttribute('data-aos', 'fade-up');
        videoItem.setAttribute('data-aos-delay', `${index * 100}`);
        
        videoItem.innerHTML = `
    <div class="video-container">
        <video class="video-element" preload="metadata" controlsList="nodownload">
            <source src="${item.source}" type="video/mp4">
            Your browser does not support the video tag.
        </video>
        <div class="video-overlay active">
            <button class="play-button" aria-label="Play video">
                <i class="fas fa-play"></i>
            </button>
            <div class="video-info-overlay">
                <h3 class="video-title">${item.title}</h3>
                <span class="video-duration">${item.duration}</span>
            </div>
        </div>
    </div>
    <div class="video-details">
        <h3 class="video-title">${item.title}</h3>
        <p class="video-description">${item.description}</p>
    </div>
`;
           
        
        videoGrid.appendChild(videoItem);

        // Get video elements after adding to DOM
        const video = videoItem.querySelector('.video-element');
        const overlay = videoItem.querySelector('.video-overlay');
        const playButton = videoItem.querySelector('.play-button');

        // Handle video loading error
        video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
            videoItem.classList.add('video-error');
            overlay.innerHTML = '<span class="error-message">Video could not be loaded</span>';
        });

        // Play button click handler
        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            handleVideoPlay(video, overlay, playButton);
        });

        // Video click handler
        video.addEventListener('click', () => {
            handleVideoPlay(video, overlay, playButton);
        });

        // Video ended handler
        video.addEventListener('ended', () => {
            overlay.classList.add('active');
            playButton.innerHTML = '<i class="fas fa-play"></i>';
        });
    });

    function handleVideoPlay(video, overlay, button) {
        // Pause all other videos first
        document.querySelectorAll('.video-element').forEach(v => {
            if (v !== video && !v.paused) {
                v.pause();
                const otherOverlay = v.closest('.video-container').querySelector('.video-overlay');
                const otherButton = otherOverlay.querySelector('.play-button');
                otherOverlay.classList.add('active');
                otherButton.innerHTML = '<i class="fas fa-play"></i>';
            }
        });

        if (video.paused) {
            video.play().then(() => {
                overlay.classList.remove('active');
                button.innerHTML = '<i class="fas fa-pause"></i>';
            }).catch(error => {
                console.error('Video playback error:', error);
            });
        } else {
            video.pause();
            overlay.classList.add('active');
            button.innerHTML = '<i class="fas fa-play"></i>';
        }
    }
});