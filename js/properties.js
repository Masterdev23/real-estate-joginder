import { properties } from './propertyData.js';

class PropertyManager {
    constructor() {
        this.initializeElements();
        this.setupInitialState();
        this.setupEventListeners();
        this.init();
    }

    initializeElements() {
        this.propertiesContainer = document.getElementById('propertiesContainer');
        this.searchInput = document.getElementById('searchInput');
        this.clearSearchBtn = document.getElementById('clearSearch');
        this.propertyTypeInputs = document.querySelectorAll('input[name="propertyType"]');
        this.priceRangeSlider = document.getElementById('priceRange');
        this.selectedPriceLabel = document.getElementById('selectedPrice');
        this.resetFiltersBtn = document.getElementById('resetFilters');
        this.activeFiltersContainer = document.getElementById('activeFilters');
        this.presetButtons = document.querySelectorAll('.preset-btn');
        this.loadingElement = document.getElementById('loading');
    }

    setupInitialState() {
        this.filters = {
            search: '',
            propertyType: 'all',
            maxPrice: 200000000
        };
        this.searchTimeout = null;
        
        if (this.priceRangeSlider) {
            this.priceRangeSlider.max = "200000000";
            this.priceRangeSlider.value = "200000000";
            this.updatePriceLabel(200000000);
        }
    }

    init() {
        this.showWelcomeMessage();
        AOS.init({ duration: 800, once: true });
        this.updateActiveFilters();
    }

    setupEventListeners() {
        this.searchInput?.addEventListener('input', (e) => {
            clearTimeout(this.searchTimeout);
            this.clearSearchBtn.style.display = e.target.value ? 'flex' : 'none';
            this.searchTimeout = setTimeout(() => {
                this.filters.search = e.target.value.toLowerCase();
                this.applyFilters();
            }, 300);
        });

        this.clearSearchBtn?.addEventListener('click', () => {
            this.searchInput.value = '';
            this.clearSearchBtn.style.display = 'none';
            this.filters.search = '';
            this.applyFilters();
        });

        this.propertyTypeInputs.forEach(input => {
            input.addEventListener('change', () => {
                this.filters.propertyType = input.value;
                this.applyFilters();
            });
        });

        this.priceRangeSlider?.addEventListener('input', (e) => {
            const value = parseInt(e.target.value);
            this.updatePriceLabel(value);
            this.filters.maxPrice = value;
            this.applyFilters();
        });

        this.presetButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                const price = parseInt(btn.dataset.price);
                this.priceRangeSlider.value = price;
                this.filters.maxPrice = price;
                this.updatePriceLabel(price);
                this.applyFilters();
            });
        });

        this.resetFiltersBtn?.addEventListener('click', () => this.resetFilters());
    }

    updatePriceLabel(value) {
        if (value >= 10000000) {
            const crValue = (value / 10000000).toFixed(1);
            this.selectedPriceLabel.textContent = `₹${parseFloat(crValue)} Cr`;
        } else if (value >= 100000) {
            const lakhValue = (value / 100000).toFixed(1);
            this.selectedPriceLabel.textContent = `₹${parseFloat(lakhValue)} L`;
        } else {
            this.selectedPriceLabel.textContent = `₹${value.toLocaleString('en-IN')}`;
        }
    }

    formatPrice(price) {
        if (price >= 10000000) {
            const crValue = (price / 10000000).toFixed(2);
            return `${parseFloat(crValue)} Cr`;
        } else if (price >= 100000) {
            const lakhValue = (price / 100000).toFixed(2);
            return `${parseFloat(lakhValue)} Lakh`;
        }
        return price.toLocaleString('en-IN');
    }

    showLoading() {
        this.loadingElement.style.display = 'flex';
    }

    hideLoading() {
        this.loadingElement.style.display = 'none';
    }

    applyFilters() {
        this.showLoading();
        
        setTimeout(() => {
            let filtered = [...properties];

            if (this.filters.search) {
                filtered = filtered.filter(property => 
                    property.title.toLowerCase().includes(this.filters.search) ||
                    property.location.toLowerCase().includes(this.filters.search) ||
                    property.description.toLowerCase().includes(this.filters.search)
                );
            }

            if (this.filters.propertyType !== 'all') {
                filtered = filtered.filter(property => 
                    property.type === this.filters.propertyType
                );
            }

            filtered = filtered.filter(property => 
                property.price <= this.filters.maxPrice
            );

            this.renderProperties(filtered);
            this.updateActiveFilters();
            this.hideLoading();
        }, 300);
    }

    resetFilters() {
        this.searchInput.value = '';
        this.clearSearchBtn.style.display = 'none';
        this.propertyTypeInputs.forEach(input => {
            if (input.value === 'all') input.checked = true;
        });
        this.priceRangeSlider.value = "200000000";
        
        this.filters = {
            search: '',
            propertyType: 'all',
            maxPrice: 200000000
        };

        this.updatePriceLabel(this.filters.maxPrice);
        this.showWelcomeMessage();
        this.updateActiveFilters();
    }

    updateActiveFilters() {
        const activeFilters = [];
        
        if (this.filters.search) {
            activeFilters.push(`
                <div class="active-filter-tag" data-type="search">
                    ${this.filters.search}
                    <i class="fas fa-times" data-filter="search"></i>
                </div>
            `);
        }
        
        if (this.filters.propertyType !== 'all') {
            activeFilters.push(`
                <div class="active-filter-tag" data-type="type">
                    ${this.filters.propertyType}
                    <i class="fas fa-times" data-filter="type"></i>
                </div>
            `);
        }

        if (this.filters.maxPrice < 200000000) {
            activeFilters.push(`
                <div class="active-filter-tag" data-type="price">
                    ₹${this.formatPrice(this.filters.maxPrice)}
                    <i class="fas fa-times" data-filter="price"></i>
                </div>
            `);
        }

        this.activeFiltersContainer.innerHTML = activeFilters.join('');
        
        this.activeFiltersContainer.querySelectorAll('.active-filter-tag i').forEach(closeBtn => {
            closeBtn.addEventListener('click', (e) => {
                const filterType = e.currentTarget.dataset.filter;
                this.clearFilter(filterType);
            });
        });
    }

    showWelcomeMessage() {
        this.propertiesContainer.innerHTML = `
            <div class="welcome-message" data-aos="fade-up">
                <div class="background-shapes">
                    <div class="shape"></div>
                    <div class="shape"></div>
                </div>
                <div class="content-wrapper">
                    <i class="fas fa-home"></i>
                    <h2>Find Your Perfect Property</h2>
                    <p>Use the filters above to discover properties that match your preferences</p>
                </div>
            </div>
        `;
    }

    renderProperties(properties) {
        if (properties.length === 0) {
            this.propertiesContainer.innerHTML = `
                <div class="no-results">
                    <div class="shape-decoration">
                        <div class="shape"></div>
                        <div class="shape"></div>
                    </div>
                    <div class="no-results-content">
                        <i class="fas fa-search"></i>
                        <h3>No Properties Found</h3>
                        <p>Try adjusting your filters to find more properties</p>
                    </div>
                </div>
            `;
            return;
        }

        this.propertiesContainer.innerHTML = properties.map(property => this.renderPropertyCard(property)).join('');
    }

    renderPropertyCard(property) {
        return `
            <div class="property-card" data-aos="fade-up">
                <div class="property-image">
                    <img src="${property.image || './images/placeholder.jpg'}" alt="${property.title}" onerror="this.onerror=null; this.src='./images/placeholder.jpg';">
                    <span class="property-tag">${property.status}</span>
                </div>
                <div class="property-content">
                    <h3 class="property-title">${property.title}</h3>
                    <div class="property-location">
                        <i class="fas fa-map-marker-alt"></i>
                        <span>${property.location}</span>
                    </div>
                    <p class="property-description">${property.description}</p>
                    <div class="property-features">
                        ${property.features.map((feature, index) => 
                            `<span class="feature-tag" data-feature="${feature}" style="--index: ${index}">${feature}</span>`
                        ).join('')}
                    </div>
                    <div class="property-specs">
                        ${property.bedrooms ? `
                            <div class="spec-item">
                                <i class="fas fa-bed"></i>
                                <span>${property.bedrooms} Beds</span>
                            </div>
                        ` : ''}
                        <div class="spec-item">
                            <i class="fas fa-bath"></i>
                            <span>${property.bathrooms} Baths</span>
                        </div>
                        <div class="spec-item">
                            <i class="fas fa-vector-square"></i>
                            <span>${property.area} sq ft</span>
                        </div>
                    </div>
                    <div class="property-price">₹${this.formatPrice(property.price)}</div>
                </div>
                <a href="properties-detail.html?id=${property.id}" class="view-details-btn">
                    View Details <i class="fas fa-arrow-right"></i>
                </a>
            </div>
        `;
    }

    clearFilter(filterType) {
        switch(filterType) {
            case 'search':
                this.searchInput.value = '';
                this.filters.search = '';
                this.clearSearchBtn.style.display = 'none';
                break;
            case 'type':
                this.propertyTypeInputs.forEach(input => {
                    if (input.value === 'all') input.checked = true;
                });
                this.filters.propertyType = 'all';
                break;
            case 'price':
                this.priceRangeSlider.value = "200000000";
                this.filters.maxPrice = 200000000;
                this.updatePriceLabel(200000000);
                break;
        }
        this.applyFilters();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new PropertyManager();
});