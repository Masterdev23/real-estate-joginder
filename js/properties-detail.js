class PropertyDetail {
  constructor() {
      this.propertyId = new URLSearchParams(window.location.search).get('id');
      this.property = null;
      this.swiper = null;
      this.init();
  }

  async init() {
      try {
          this.showLoading(true);
          
          if (!propertyData || !propertyData[this.propertyId]) {
              throw new Error('Property not found');
          }
          
          this.property = propertyData[this.propertyId];
          this.renderContent();
          this.initializeSwiper();
          this.setupEventListeners();
          
          this.showLoading(false);

      } catch (error) {
          this.handleError(error);
      }
  }

  showLoading(show) {
      document.getElementById('loading-spinner').style.display = show ? 'flex' : 'none';
      document.getElementById('property-content').classList.toggle('hidden', show);
  }

  handleError(error) {
      console.error('Error:', error);
      this.showLoading(false);
      
      const errorContainer = document.getElementById('error-container');
      errorContainer.classList.remove('hidden');
      errorContainer.innerHTML = `
          <div class="error-content">
              <i class="fas fa-exclamation-circle"></i>
              <h2>Oops! Something went wrong</h2>
              <p>${error.message}</p>
              <a href="pricing.html" class="back-button">
                  <i class="fas fa-arrow-left"></i> Back to Properties
              </a>
          </div>
      `;
  }

  renderContent() {
      if (!this.property) return;

      this.renderGallery();
      this.renderBasicInfo();
      this.renderDescription();
      this.renderHighlights();
      this.renderFeatures();
      this.renderFloorPlans();
      this.renderDocuments();
      this.renderContactInfo();
  }

  renderGallery() {
      const container = document.getElementById('gallery-container');
      if (!container) return;

      container.innerHTML = this.property.images.map(image => `
          <div class="swiper-slide">
              <img src="${image}" alt="${this.property.title}" loading="lazy">
          </div>
      `).join('');
  }

  renderBasicInfo() {
      const elements = {
          'possession-status': this.property.possessionStatus,
          'property-title': this.property.title,
          'property-location': `<i class="fas fa-map-marker-alt"></i> ${this.property.location}`,
          'property-price': this.property.price,
          'price-per-sqft': this.property.pricePerSqft,
          'property-id': this.property.propertyId,
          'rera-number': this.property.reraNumber
      };

      Object.entries(elements).forEach(([id, content]) => {
          const element = document.getElementById(id);
          if (element) element.innerHTML = content;
      });
  }

  renderDescription() {
      const descriptionSection = document.querySelector('.description-section');
      if (!descriptionSection || !this.property.description) return;

      descriptionSection.innerHTML = `
          <div class="property-description">
              <h2>About This Property</h2>
              <p>${this.property.description}</p>
          </div>
          ${this.property.builderInfo ? `
              <div class="builder-info">
                  <h3>About the Developer</h3>
                  <p>${this.property.builderInfo}</p>
              </div>
          ` : ''}
          ${this.property.nearbyLandmarks ? `
              <div class="landmarks">
                  <h3>Nearby Landmarks</h3>
                  <ul id="landmarks-list">
                      ${this.property.nearbyLandmarks.map(landmark => 
                          `<li><i class="fas fa-map-pin"></i> ${landmark}</li>`
                      ).join('')}
                  </ul>
              </div>
          ` : ''}
      `;
  }

  renderHighlights() {
      const container = document.getElementById('property-highlights');
      if (!container || !this.property.highlights) return;

      container.innerHTML = this.property.highlights.map(item => `
          <div class="highlight-item">
              <i class="fas fa-${item.icon}"></i>
              <div class="highlight-content">
                  <span class="highlight-label">${item.label}</span>
                  <span class="highlight-value">${item.value}</span>
              </div>
          </div>
      `).join('');
  }

  renderFeatures() {
      const container = document.getElementById('features-grid');
      if (!container || !this.property.features) return;

      container.innerHTML = this.property.features.map(feature => `
          <div class="feature-item">
              <i class="fas fa-${feature.icon}"></i>
              <span>${feature.name}</span>
          </div>
      `).join('');
  }

  renderFloorPlans() {
      const tabsContainer = document.getElementById('floor-plans-tabs');
      if (!tabsContainer || !this.property.floorPlans) return;

      tabsContainer.innerHTML = this.property.floorPlans.map((plan, index) => `
          <button class="floor-plan-tab ${index === 0 ? 'active' : ''}" 
                  data-index="${index}">
              ${plan.name}
          </button>
      `).join('');

      this.showFloorPlan(0);

      tabsContainer.addEventListener('click', (e) => {
          if (e.target.classList.contains('floor-plan-tab')) {
              const index = parseInt(e.target.dataset.index);
              this.showFloorPlan(index);
          }
      });
  }

  showFloorPlan(index) {
      const plan = this.property.floorPlans?.[index];
      const viewContainer = document.getElementById('floor-plan-view');
      if (!viewContainer || !plan) return;

      viewContainer.innerHTML = `
          <div class="floor-plan-image">
              <img src="${plan.image}" alt="${plan.name}">
          </div>
          <a href="${plan.downloadUrl}" class="download-btn" download>
              <i class="fas fa-download"></i> Download Floor Plan
          </a>
      `;

      document.querySelectorAll('.floor-plan-tab').forEach((tab, i) => {
          tab.classList.toggle('active', i === index);
      });
  }

  renderDocuments() {
      const container = document.getElementById('downloads-grid');
      if (!container || !this.property.documents) return;

      container.innerHTML = this.property.documents.map(doc => `
          <a href="${doc.url}" class="doc-link" download data-type="${doc.type}">
              <i class="fas fa-file-pdf"></i>
              <span class="doc-name">${doc.name}</span>
              <span class="doc-size">${doc.size}</span>
          </a>
      `).join('');
  }

  renderContactInfo() {
      if (!this.property.contact) return;

      const phoneBtn = document.querySelector('.call-btn');
      const whatsappBtn = document.querySelector('.whatsapp-btn');
      
      if (phoneBtn) {
          phoneBtn.href = `tel:${this.property.contact.phone}`;
      }
      
      if (whatsappBtn) {
          whatsappBtn.href = `https://wa.me/${this.property.contact.whatsapp}`;
      }
  }

  initializeSwiper() {
      this.swiper = new Swiper(".mySwiper", {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: true,
          pagination: {
              el: ".swiper-pagination",
              clickable: true,
          },
          navigation: {
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
          },
          autoplay: {
              delay: 3000,
              disableOnInteraction: false,
          }
      });
  }

  setupEventListeners() {
      const form = document.getElementById('inquiry-form');
      if (form) {
          form.addEventListener('submit', this.handleFormSubmission.bind(this));
      }
  }

  handleFormSubmission(e) {
      e.preventDefault();
      const formData = new FormData(e.target);
      console.log('Form data:', Object.fromEntries(formData));
      // Add form submission logic here
  }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  new PropertyDetail();
});