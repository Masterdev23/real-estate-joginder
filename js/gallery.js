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
            duration: '00:54'
        },
        {
            source: '../propassets/hero-patilal/VID-20250503-WA0003.mp4', // Fixed path
            thumbnail: '../propassets/hero-patilal/VID-20250503-WA0003.mp4',
            title: 'Hero-Palatial',
            description: 'Take a virtual walk through this stunning 3BHK apartment',
            orientation: 'landscape',
            duration: '1:36'
        },
        {
            source: '../propassets/hero-patilal/VID-20250503-WA0004.mp4', // Fixed path
            thumbnail: '../propassets/hero-patilal/VID-20250503-WA0004.mp4',
            title: 'Hero-Palatial',
            description: 'Take a virtual walk through this stunning 3BHK apartment',
            orientation: 'landscape',
            duration: '00:48'
        },
        {
            source: '../propassets/hero-patilal/VID-20250503-WA0006.mp4', // Fixed path
            thumbnail: '../propassets/hero-patilal/VID-20250503-WA0006.mp4',
            title: 'Hero-Palatial',
            description: ' Take a virtual walk through this stunning 3BHK apartment',
            orientation: 'landscape',
            duration: '00:11'
        },
        {
            source: '../propassets/Shobha-anaya/Sobha Aranya- New ECO-Luxe development .MP4', // Fixed path
            thumbnail: '../propassets/Shobha-anaya/Sobha Aranya- New ECO-Luxe development .MP4',
            title: 'Shobha Aranya',
            description: 'Take a virtual walk through this stunning 3BHK apartment',
            orientation: 'landscape',
            duration: '5:30'
        },

        // Add more video items as needed
    ];

    // Populate Videos
    // Add lightbox container to body
    document.body.insertAdjacentHTML('beforeend', `
        <div class="video-lightbox">
            <div class="lightbox-content">
                <button class="close-lightbox">
                    <i class="fas fa-times"></i>
                </button>
                <video id="lightbox-video" controls>
                    <source src="" type="video/mp4">
                </video>
                <div class="video-info-lightbox">
                    <h3 class="lightbox-title"></h3>
                    <p class="lightbox-description"></p>
                </div>
            </div>
        </div>
    `);

    // Lightbox elements
    const lightbox = document.querySelector('.video-lightbox');
    const lightboxVideo = document.getElementById('lightbox-video');
    const lightboxTitle = document.querySelector('.lightbox-title');
    const lightboxDescription = document.querySelector('.lightbox-description');
    const closeLightbox = document.querySelector('.close-lightbox');

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

        // Get video elements
        const video = videoItem.querySelector('.video-element');
        const overlay = videoItem.querySelector('.video-overlay');
        const playButton = videoItem.querySelector('.play-button');

        // Error handling
        video.addEventListener('error', (e) => {
            console.error('Video loading error:', e);
            videoItem.classList.add('video-error');
            overlay.innerHTML = '<span class="error-message">Video could not be loaded</span>';
        });

        // Play button opens lightbox
        playButton.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(item);
        });

        // Thumbnail click also opens lightbox
        overlay.addEventListener('click', () => {
            openLightbox(item);
        });
    });

    // Lightbox functions
    function openLightbox(videoData) {
        // Pause all other videos
        document.querySelectorAll('.video-element').forEach(v => {
            v.pause();
        });

        // Set up lightbox
        lightboxVideo.src = videoData.source;
        lightboxTitle.textContent = videoData.title;
        lightboxDescription.textContent = videoData.description;
        
        // Show lightbox
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';

        // Play video
        lightboxVideo.play().catch(error => {
            console.error('Lightbox video playback error:', error);
        });
    }

    function closeLightboxHandler() {
        lightboxVideo.pause();
        lightboxVideo.src = '';
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Close lightbox events
    closeLightbox.addEventListener('click', closeLightboxHandler);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightboxHandler();
        }
    });

    // Keyboard support
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightboxHandler();
        }
    });

    // Handle window resize for responsive video sizing
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            if (lightbox.classList.contains('active')) {
                const videoAspect = lightboxVideo.videoWidth / lightboxVideo.videoHeight;
                const windowAspect = window.innerWidth / window.innerHeight;
                
                if (videoAspect > windowAspect) {
                    lightboxVideo.style.width = '90vw';
                    lightboxVideo.style.height = 'auto';
                } else {
                    lightboxVideo.style.width = 'auto';
                    lightboxVideo.style.height = '90vh';
                }
            }
        }, 100);
    });
});