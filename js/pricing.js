document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 800,
        once: true
    });

    // Filter functionality
    const presetButtons = document.querySelectorAll('.preset-btn');
    const bhkButtons = document.querySelectorAll('.bhk-btn');
    const locationFilter = document.getElementById('location-filter');
    const typeFilter = document.getElementById('type-filter');

    // Price preset buttons
    presetButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            presetButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            filterProperties();
        });
    });

    // BHK buttons
    bhkButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            btn.classList.toggle('active');
            filterProperties();
        });
    });

    // Location and type filters
    [locationFilter, typeFilter].forEach(filter => {
        filter.addEventListener('change', filterProperties);
    });

    // Chat widget
    const chatToggle = document.querySelector('.chat-toggle');
    const chatPopup = document.querySelector('.chat-popup');
    const closeChat = document.querySelector('.close-chat');

    chatToggle?.addEventListener('click', () => {
        chatPopup?.classList.toggle('active');
    });

    closeChat?.addEventListener('click', () => {
        chatPopup?.classList.remove('active');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            target?.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        });
    });

    // Filter properties function
    function filterProperties() {
        // Add your filtering logic here
        console.log('Filtering properties...');
    }
});