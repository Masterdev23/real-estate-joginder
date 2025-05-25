class PricingPage {
    constructor() {
        this.properties = [];
        this.filters = {
            propertyType: '',
            location: '',
            bhk: [],
            priceRange: { min: 5000000, max: 200000000 }
        };
        this.currentPage = 1;
        this.itemsPerPage = 6;
        this.priceRanges = [
            { min: 5000000, max: 10000000, label: '50L - 1Cr' },
            { min: 10000000, max: 20000000, label: '1Cr - 2Cr' },
            { min: 20000000, max: 30000000, label: '2Cr - 3Cr' },
            { min: 30000000, max: 50000000, label: '3Cr - 5Cr' },
            { min: 50000000, max: 100000000, label: '5Cr - 10Cr' },
            { min: 100000000, max: 200000000, label: '10Cr - 20Cr' }
        ];

        this.init();
    }

    async init() {
        this.initializeAOS();
        this.initializeElements();
        this.setupEventListeners();
        await this.loadProperties();
        this.renderPricePresets();
        this.updatePriceTable();
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
            pricePresets: document.querySelector('.price-presets'),
            propertiesGrid: document.getElementById('propertiesGrid'),
            propertyCount: document.getElementById('propertyCount'),
            priceTableBody: document.getElementById('priceTableBody'),
            quickNavButtons: document.querySelectorAll('.quick-nav-btn'),
            pagination: document.getElementById('pagination')
        };
    }

    setupEventListeners() {
        // Property type filter
        this.elements.propertyType?.addEventListener('change', () => this.handleFilterChange());
        
        // Location filter
        this.elements.location?.addEventListener('change', () => this.handleFilterChange());
        
        // BHK buttons
        this.elements.bhkButtons?.forEach(btn => {
            btn.addEventListener('click', () => {
                btn.classList.toggle('active');
                this.handleFilterChange();
            });
        });

        // Price preset delegation
        this.elements.pricePresets?.addEventListener('click', (e) => {
            if (e.target.classList.contains('preset-btn')) {
                const buttons = this.elements.pricePresets.querySelectorAll('.preset-btn');
                buttons.forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                
                this.filters.priceRange = {
                    min: parseInt(e.target.dataset.min),
                    max: parseInt(e.target.dataset.max)
                };
                this.handleFilterChange();
            }
        });

        // Quick navigation
        this.elements.quickNavButtons?.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.dataset.scroll;
                const element = document.getElementById(targetId);
                if (element) {
                    const headerOffset = 80; // Adjust based on your header height
                    const elementPosition = element.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });

        // Window scroll for sticky elements
        window.addEventListener('scroll', this.handleScroll.bind(this));
    }

    handleScroll() {
        const filterSection = document.querySelector('.filters-group');
        const priceExplorer = document.querySelector('.price-explorer');
        
        if (filterSection && priceExplorer) {
            const scrollY = window.scrollY;
            const filterThreshold = filterSection.offsetTop;
            const priceThreshold = priceExplorer.offsetTop;

            filterSection.classList.toggle('sticky', scrollY >= filterThreshold);
            priceExplorer.classList.toggle('sticky', scrollY >= priceThreshold);
        }
    }

    renderPricePresets() {
        if (!this.elements.pricePresets) return;

        this.elements.pricePresets.innerHTML = this.priceRanges.map((range, index) => `
            <button class="preset-btn ${index === 0 ? 'active' : ''}" 
                    data-min="${range.min}" 
                    data-max="${range.max}">
                ₹${range.label}
            </button>
        `).join('');
    }

    async loadProperties() {
        try {
            this.showLoading();
            const response = await fetch('../data/properties.json');
            if (!response.ok) throw new Error('Failed to fetch properties');
            
            const data = await response.json();
            this.properties = data.properties;
            this.handleFilterChange();
        } catch (error) {
            console.error('Error loading properties:', error);
            this.showError('Failed to load properties. Please try again later.');
        }
    }

    handleFilterChange() {
        this.currentPage = 1; // Reset to first page on filter change
        const filtered = this.filterProperties();
        this.renderProperties(filtered);
        this.updatePropertyCount(filtered.length);
        this.renderPagination(filtered.length);
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

    renderPagination(totalItems) {
        if (!this.elements.pagination) return;

        const totalPages = Math.ceil(totalItems / this.itemsPerPage);
        if (totalPages <= 1) {
            this.elements.pagination.style.display = 'none';
            return;
        }

        this.elements.pagination.style.display = 'flex';
        this.elements.pagination.innerHTML = `
            <button class="pagination-btn prev" ${this.currentPage === 1 ? 'disabled' : ''}>
                <i class="fas fa-chevron-left"></i>
            </button>
            <div class="page-numbers">
                ${this.generatePageNumbers(totalPages)}
            </div>
            <button class="pagination-btn next" ${this.currentPage === totalPages ? 'disabled' : ''}>
                <i class="fas fa-chevron-right"></i>
            </button>
        `;

        this.setupPaginationListeners();
    }

    generatePageNumbers(totalPages) {
        let pages = '';
        for (let i = 1; i <= totalPages; i++) {
            if (i === this.currentPage) {
                pages += `<button class="page-number active">${i}</button>`;
            } else {
                pages += `<button class="page-number">${i}</button>`;
            }
        }
        return pages;
    }

    setupPaginationListeners() {
        this.elements.pagination?.addEventListener('click', (e) => {
            const target = e.target;
            
            if (target.classList.contains('prev') && this.currentPage > 1) {
                this.currentPage--;
                this.handleFilterChange();
            }
            else if (target.classList.contains('next')) {
                this.currentPage++;
                this.handleFilterChange();
            }
            else if (target.classList.contains('page-number')) {
                this.currentPage = parseInt(target.textContent);
                this.handleFilterChange();
            }
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
            { min: 20000000, max: 30000000, label: '2Cr - 3Cr' },
            { min: 30000000, max: 50000000, label: '3Cr - 5Cr' },
            { min: 50000000, max: 100000000, label: '5Cr - 10Cr' },
            { min: 100000000, max: 200000000, label: '10Cr - 20Cr' }
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
        if (!this.elements.propertiesGrid) return;
        
        this.elements.propertiesGrid.innerHTML = `
            <div class="loading-state">
                <div class="spinner"></div>
                <p>Loading properties...</p>
            </div>
        `;
    }

    showError(message) {
        if (!this.elements.propertiesGrid) return;

        this.elements.propertiesGrid.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-circle"></i>
                <h3>Oops! Something went wrong</h3>
                <p>${message}</p>
                <button onclick="location.reload()">Try Again</button>
            </div>
        `;
    }

    showNoResults() {
        if (!this.elements.propertiesGrid) return;

        this.elements.propertiesGrid.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>No Properties Found</h3>
                <p>Try adjusting your filters to see more properties</p>
            </div>
        `;
    }

    updatePropertyCount(count) {
        if (this.elements.propertyCount) {
            this.elements.propertyCount.textContent = count;
        }
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.pricingPage = new PricingPage();
});