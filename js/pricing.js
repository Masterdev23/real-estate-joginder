
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
// Chat functionality
let isChatOpen = false;

// Structured response patterns with keywords
const botResponsePatterns = [
    {
        keywords: ['hi', 'hello', 'hey', 'start', 'greetings'],
        responses: [
            "Hi! How can I help you today?",
            "Hello! Welcome to Joginder Properties. How may I assist you?",
            "Hi there! Looking for your dream property?"
        ]
    },
    {
        keywords: ['price', 'cost', 'budget', 'expensive', 'cheap', 'afford'],
        responses: [
            "Our properties range from $500,000 to $5,000,000. What's your budget range?",
            "The average price per square foot in this area is $300. Does this fit your budget?",
            "We have properties in various price ranges. What's your budget in mind?"
        ]
    },
    {
        keywords: ['bedroom', 'bath', 'rooms', 'size', 'sqft', 'square'],
        responses: [
            "We have properties from 1 to 6 bedrooms. How many bedrooms do you need?",
            "Our properties range from 1000 to 5000 square feet. What size are you looking for?",
            "Would you like to see our spacious family homes or cozy apartments?"
        ]
    },
    {
        keywords: ['location', 'area', 'where', 'place', 'neighborhood'],
        responses: [
            "We have properties in Beverly Hills, Downtown, and other prime locations. Any preference?",
            "Which neighborhood interests you? We have properties across the city.",
            "Popular areas include Beverly Hills, Hollywood Hills, and Santa Monica. Where would you like to live?"
        ]
    },
    {
        keywords: ['view', 'tour', 'visit', 'see', 'showing', 'schedule'],
        responses: [
            "I can schedule a viewing for you. Would you prefer a virtual tour or in-person visit?",
            "We offer both virtual and in-person viewings. What works better for you?",
            "Our agent can show you the property at your convenience. When would you like to visit?"
        ]
    },
    {
        keywords: ['agent', 'contact', 'representative', 'help'],
        responses: [
            "I'll connect you with one of our experienced agents. Please provide your contact number.",
            "Our agents are available 24/7. Would you like someone to call you?",
            "I can have an agent reach out to you. What's the best way to contact you?"
        ]
    },
    {
        keywords: ['amenities', 'features', 'facilities', 'include'],
        responses: [
            "Our properties come with premium amenities like pools, gyms, and security systems.",
            "Common features include modern appliances, smart home systems, and landscaped gardens.",
            "We offer properties with luxury amenities. What specific features are you looking for?"
        ]
    }
];

const defaultResponses = [
    "Can you tell me more about what you're looking for?",
    "I'm here to help! What specific information do you need?",
    "Let me know what aspects of the property interest you most.",
    "Would you like information about our latest listings?"
];

function findResponse(message) {
    // Convert message to lowercase and remove punctuation
    const cleanMessage = message.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
    const words = cleanMessage.split(' ');

    // Check each pattern for keyword matches
    for (const pattern of botResponsePatterns) {
        if (pattern.keywords.some(keyword => words.includes(keyword))) {
            return pattern.responses[Math.floor(Math.random() * pattern.responses.length)];
        }
    }
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
}

function toggleChat() {
    const chatContainer = document.getElementById('chat-container');
    isChatOpen = !isChatOpen;
    chatContainer.classList.toggle('hidden');
    
    if (isChatOpen) {
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
        
        const typingIndicator = addTypingIndicator();
        
        // Response delay between 1-2 seconds
        setTimeout(() => {
            removeTypingIndicator(typingIndicator);
            const botResponse = findResponse(message);
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

// Chat toggle function
function openChat() {
    toggleChat();
}