class PricingPage {
    constructor() {
        this.properties = [];
        this.filters = {
            propertyType: '',
            location: '',
            bhk: [],
            priceRange: { min: 0, max: Infinity }
        };
        this.currentPage = 1;
        this.itemsPerPage = 6;

        this.initializeAOS();
        this.initializeElements();
        this.setupEventListeners();
        this.loadProperties();
    }

    initializeAOS() {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    initializeElements() {
        this.elements = {
            propertyType: document.getElementById('propertyType'),
            location: document.getElementById('location'),
            bhkButtons: document.querySelectorAll('.bhk-btn'),
            pricePresets: document.querySelectorAll('.preset-btn'),
            propertiesGrid: document.getElementById('propertiesGrid'),
            propertyCount: document.getElementById('propertyCount'),
            priceTableBody: document.getElementById('priceTableBody'),
            quickNavButtons: document.querySelectorAll('.quick-nav-btn')
        };
    }

    setupEventListeners() {
        // Filter change events
        this.elements.propertyType.addEventListener('change', () => this.handleFilterChange());
        this.elements.location.addEventListener('change', () => this.handleFilterChange());
        
        // BHK buttons
        this.elements.bhkButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                this.handleFilterChange();
            });
        });

        // Price presets
        this.elements.pricePresets.forEach(btn => {
            btn.addEventListener('click', () => {
                this.elements.pricePresets.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.filters.priceRange = {
                    min: parseInt(btn.dataset.min),
                    max: parseInt(btn.dataset.max)
                };
                this.handleFilterChange();
            });
        });

        // Quick navigation
        this.elements.quickNavButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.scroll;
                document.getElementById(targetId).scrollIntoView({ behavior: 'smooth' });
            });
        });
    }

    async loadProperties() {
        try {
            this.showLoading();
            const response = await fetch('../data/properties.json');
            if (!response.ok) throw new Error('Failed to fetch properties');
            
            const data = await response.json();
            this.properties = data.properties;
            this.handleFilterChange();
            this.updatePriceTable();
        } catch (error) {
            console.error('Error loading properties:', error);
            this.showError('Failed to load properties. Please try again later.');
        }
    }

    handleFilterChange() {
        this.filters.propertyType = this.elements.propertyType.value;
        this.filters.location = this.elements.location.value;
        this.filters.bhk = Array.from(this.elements.bhkButtons)
            .filter(btn => btn.classList.contains('active'))
            .map(btn => btn.dataset.bhk);

        const filtered = this.filterProperties();
        this.renderProperties(filtered);
        this.updatePropertyCount(filtered.length);
    }

    filterProperties() {
        return this.properties.filter(property => {
            const typeMatch = !this.filters.propertyType || 
                            property.type === this.filters.propertyType;
            
            const locationMatch = !this.filters.location || 
                                property.location.toLowerCase().includes(this.filters.location.toLowerCase());
            
            const bhkMatch = this.filters.bhk.length === 0 || 
                           this.filters.bhk.includes(property.bhk.toString());
            
            const priceMatch = property.price >= this.filters.priceRange.min && 
                             property.price <= this.filters.priceRange.max;

            return typeMatch && locationMatch && bhkMatch && priceMatch;
        });
    }

    renderProperties(properties) {
        if (properties.length === 0) {
            this.showNoResults();
            return;
        }

        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        const paginatedProperties = properties.slice(start, end);

        this.elements.propertiesGrid.innerHTML = paginatedProperties.map(property => `
            <div class="property-card" data-aos="fade-up">
                <div class="property-image">
                    <img src="${property.image}" alt="${property.title}" loading="lazy">
                    ${property.tag ? `<span class="property-tag">${property.tag}</span>` : ''}
                </div>
                <div class="property-details">
                    <h3>${property.title}</h3>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</p>
                    <div class="specs">
                        <span><i class="fas fa-bed"></i> ${property.bhk} BHK</span>
                        <span><i class="fas fa-ruler-combined"></i> ${property.area} sq.ft.</span>
                    </div>
                    <div class="price">₹${this.formatPrice(property.price)}</div>
                    <div class="actions">
                        <button class="view-btn">View Details</button>
                        <button class="contact-btn">Contact Now</button>
                    </div>
                </div>
            </div>
        `).join('');
    }

    updatePriceTable() {
        const ranges = [
            { min: 5000000, max: 10000000, label: '50L - 1Cr' },
            { min: 10000000, max: 20000000, label: '1Cr - 2Cr' },
            { min: 20000000, max: 50000000, label: '2Cr - 5Cr' }
        ];

        this.elements.priceTableBody.innerHTML = ranges.map(range => {
            const count = this.properties.filter(p => 
                p.price >= range.min && p.price <= range.max
            ).length;

            return `
                <tr>
                    <td>₹${range.label}</td>
                    <td>${count} Properties</td>
                    <td>
                        <button class="explore-btn" 
                                onclick="pricingPage.filterByPriceRange(${range.min}, ${range.max})"
                                ${count === 0 ? 'disabled' : ''}>
                            Explore →
                        </button>
                    </td>
                </tr>
            `;
        }).join('');
    }

    formatPrice(price) {
        if (price >= 10000000) {
            return `${(price / 10000000).toFixed(2)} Cr`;
        }
        return `${(price / 100000).toFixed(2)} Lac`;
    }

    showLoading() {
        this.elements.propertiesGrid.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Loading properties...</p>
            </div>
        `;
    }

    showError(message) {
        this.elements.propertiesGrid.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
            </div>
        `;
    }

    showNoResults() {
        this.elements.propertiesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No Properties Found</h3>
                <p>Try adjusting your filters to see more properties</p>
            </div>
        `;
    }

    updatePropertyCount(count) {
        this.elements.propertyCount.textContent = count;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pricingPage = new PricingPage();
});