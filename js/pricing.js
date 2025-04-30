
document.addEventListener('DOMContentLoaded', function() {
  // Initialize AOS
  AOS.init({
      duration: 1000,
      once: true
  });

  // Property data
  const properties = [
      {
          id: 'sunny-villa',
          name: 'Sunny Villa',
          location: 'Beverly Hills, CA',
          price: 1250000,
          beds: 5,
          baths: 4,
          area: 4500,
          image: 'sunny-villa.jpg'
      },
      // Add other properties
  ];

  // View Property Function
  window.viewProperty = function(propertyId) {
      const property = properties.find(p => p.id === propertyId);
      if (!property) return;

      // Create modal content
      const modalContent = `
          <div class="property-modal">
              <h2>${property.name}</h2>
              <img src="../images/${property.image}" alt="${property.name}">
              <div class="modal-details">
                  <p class="price">$${property.price.toLocaleString()}</p>
                  <p class="location">${property.location}</p>
                  <div class="features">
                      <span>${property.beds} Bedrooms</span>
                      <span>${property.baths} Bathrooms</span>
                      <span>${property.area} sq ft</span>
                  </div>
                  <button class="schedule-viewing">Schedule Viewing</button>
              </div>
          </div>
      `;

      // Implement your modal display logic here
      alert(`Viewing details for ${property.name}`);
  };
});



/* filepath: /Users/vishalmohanta/real-estate-joginder/js/pricing.js */

// Chat functionality
let isChatOpen = false;
const botResponses = [
    "Hi! How can I help you today?",
    "I'd be happy to help you find your dream property!",
    "Would you like to schedule a viewing?",
    "Our agents are available 24/7 to assist you.",
    "Can you tell me more about what you're looking for?",
    "We have several properties that might interest you.",
    "What's your preferred budget range?",
    "Which area are you interested in?",
    "We have properties ranging from apartments to luxury villas. What type interests you?",
    "Would you like information about our financing options?",
    "The average price per square foot in this area is $300. Does this fit your budget?",
    "I can connect you with one of our real estate agents for more detailed information.",
    "We offer virtual tours for all our properties. Would you like to schedule one?",
    "Our properties come with various amenities like swimming pools, gardens, and security systems.",
    "The current market trends show it's a great time to invest in real estate!",
    "We also offer property management services. Would you like to learn more?",
    "What's your preferred number of bedrooms?",
    "Most of our properties are available for immediate possession.",
    "We can arrange a private viewing at your convenient time.",
    "Let me know if you need any specific details about our properties."
];

function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    isChatOpen = !isChatOpen;
    chatContainer.classList.toggle('hidden');
    
    if (isChatOpen) {
        // Initial bot message
        setTimeout(() => {
            addMessage("Hello! Welcome to Joginder Properties. How may I assist you today?", 'bot');
        }, 500);
    }
}

function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (message) {
        addMessage(message, 'user');
        input.value = '';
        
        // Simulate bot typing
        const typingIndicator = addTypingIndicator();
        
        // Random response delay between 1-2 seconds
        setTimeout(() => {
            removeTypingIndicator(typingIndicator);
            const botResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
            addMessage(botResponse, 'bot');
        }, 1000 + Math.random() * 1000);
    }
}

function addMessage(text, sender) {
    const messages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    messageDiv.innerHTML = `
        ${text}
        <span class="message-time">${time}</span>
    `;
    
    messages.appendChild(messageDiv);
    messages.scrollTop = messages.scrollHeight;
    
    // Add animation
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(20px)';
    requestAnimationFrame(() => {
        messageDiv.style.transition = 'all 0.3s ease';
        messageDiv.style.opacity = '1';
        messageDiv.style.transform = 'translateY(0)';
    });
}

function addTypingIndicator() {
    const messages = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot typing';
    typingDiv.innerHTML = '<div class="typing-indicator"><span></span><span></span><span></span></div>';
    messages.appendChild(typingDiv);
    messages.scrollTop = messages.scrollHeight;
    return typingDiv;
}

function removeTypingIndicator(element) {
    element.remove();
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const chatInput = document.getElementById('chat-input');
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
});

// Update the existing openChat function
function openChat() {
    toggleChat();
}