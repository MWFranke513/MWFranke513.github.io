/**
 * @fileoverview Main JavaScript file handling site navigation and product page functionality.
 * The file is responsible for handling navbar toggling, product filtering and sorting,
 * product interactions, lazy loading of images, and quick view modal functionality.
 * 
 * @requires AOS Optional AOS animation library for enhanced visual effects
 * 
 * @author MVP Prints
 * @version 1.0.0
 */

/**
 * Main initialization function for the product page.
 * Sets up all product-related functionality if a product grid is present.
 * 
 * @function initProductPage
 * @returns {void}
 */

/**
 * Sets up product filtering and sorting functionality.
 * Handles filter button clicks and sort select changes.
 * 
 * @function setupFilteringAndSorting
 * @returns {void}
 */

/**
 * Filters products based on category.
 * 
 * @function filterProducts
 * @param {string} filterValue - The category to filter by or 'all' for all products
 * @returns {void}
 */

/**
 * Sorts visible products by price or name.
 * 
 * @function sortProducts
 * @param {string} sortType - The sort method ('price-low', 'price-high', 'name')
 * @returns {void}
 */

/**
 * Sets up product interaction handlers including add to cart buttons, 
 * order now buttons, and pagination links.
 * 
 * @function setupProductInteractions
 * @returns {void}
 */

/**
 * Sets up lazy loading for product images.
 * Loads images only when needed and handles loading errors.
 * 
 * @function setupLazyLoading
 * @returns {void}
 */

/**
 * Sets up quick view functionality for product images.
 * Creates a modal dialog when product images are clicked.
 * 
 * @function setupQuickView
 * @returns {void}
 */

/**
 * Shows a loading overlay with spinner animation.
 * Used to indicate page transitions or data loading.
 * 
 * @function showLoading
 * @returns {void}
 */

/**
 * Shows a toast notification message.
 * Creates and animates a toast notification in the bottom right corner.
 * 
 * @function showToast
 * @param {string} message - The message to show in the toast notification
 * @returns {void}
 */



/**
 * Sets up navigation handlers for anchor links that need to redirect to homepage first.
 * Handles cases where user clicks on #about, #contact, etc. from non-homepage pages.
 * 
 * @function setupNavigationHandlers
 * @returns {void}
 */
document.addEventListener('DOMContentLoaded', function setupNavigationHandlers() {
  console.log('Setting up navigation handlers for anchor links');
  
  // Get all anchor links in header and footer that start with #
  const navLinks = document.querySelectorAll('nav a[href^="#"], header a[href^="#"], footer a[href^="#"]');
  
  if (navLinks.length === 0) {
    console.log('No anchor navigation links found in header or footer');
    return;
  }
  
  console.log(`Found ${navLinks.length} anchor navigation links in header/footer`);
  
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      console.log('Navigation link clicked:', href);
      
      // Check if we're currently on the homepage
      const currentPage = window.location.pathname;
      const isHomepage = currentPage === '/' || 
                        currentPage === '/index.html' || 
                        currentPage.endsWith('/index.html') ||
                        currentPage === '' ||
                        currentPage.split('/').pop() === 'index.html';
      
      if (!isHomepage) {
        // We're not on homepage, redirect to index.html with the anchor
        console.log('Not on homepage, redirecting to index.html with anchor:', href);
        e.preventDefault();
        window.location.href = `index.html${href}`;
      }
      // If we are on homepage, let the default anchor behavior work
    });
  });
});

// Navbar functionality
document.addEventListener('DOMContentLoaded', function() {
  const menuBtn = document.querySelector('#menu-btn');
  const navbar = document.querySelector('.navbar');
  
  if (menuBtn) {
    // Remove the inline onClick handler from HTML and use this instead
    menuBtn.addEventListener('click', function() {
      // Toggle the icon
      const icon = this.querySelector('i');
      icon.classList.toggle('bi-x');
      icon.classList.toggle('bi-list');
      
      // Toggle the navbar
      navbar.classList.toggle('active');
      
      // If you have a searchForm, close it when menu opens
      const searchForm = document.querySelector('.search-form');
      if (searchForm) {
        searchForm.classList.remove('active');
      }
    });
  }
  
  // Close the navbar on scroll
  window.addEventListener('scroll', function() {
    navbar.classList.remove('active');
    // Also reset the icon when navbar closes
    const icon = document.querySelector('#menu-btn i');
    if (icon && icon.classList.contains('bi-x')) {
      icon.classList.remove('bi-x');
      icon.classList.add('bi-list');
    }
  });
  
  // Initialize product page features
  initProductPage();
});

// Main product page initialization
function initProductPage() {
  console.log('Starting product page initialization');
  
  try {
    // Make sure we're on a product page by checking for product grid
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) {
      console.log('No product grid found - not a product page');
      return;
    }
    
    console.log('Product grid found - continuing with setup');
    
    // Initialize all product features
    setupFilteringAndSorting();
    setupProductInteractions();
    setupLazyLoading();
    setupQuickView();
    
    // Initialize AOS animations if available
    if (typeof AOS !== 'undefined') {
      console.log('Initializing AOS animations');
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      });
    }
  } catch (error) {
    console.error('Product page initialization error:', error);
  }
}

// Product filtering and sorting functionality
function setupFilteringAndSorting() {
  console.log('Setting up filtering and sorting');
  
  // Use event delegation for filter buttons since they might be dynamically added
  document.addEventListener('click', function(e) {
    if (e.target.classList.contains('filter-btn')) {
      e.preventDefault();
      console.log('Filter clicked:', e.target.dataset.filter);
      
      // Update active button state
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      e.target.classList.add('active');
      
      const filterValue = e.target.getAttribute('data-filter');
      filterProducts(filterValue);
      
      // Re-apply current sorting if active
      const sortSelect = document.getElementById('sort-select');
      if (sortSelect && sortSelect.value !== 'default') {
        sortProducts(sortSelect.value);
      }
    }
  });

  // Sort select handler
  const sortSelect = document.getElementById('sort-select');
  if (sortSelect) {
    console.log('Sort select element found:', sortSelect);
    sortSelect.addEventListener('change', function() {
      console.log('Sort select change event fired, value:', this.value);
      sortProducts(this.value);
    });
  }

  function filterProducts(filterValue) {
    const productCards = document.querySelectorAll('.product-card');
    console.log(`Filtering ${productCards.length} products by:`, filterValue);
    
    productCards.forEach(card => {
      const cardCategory = card.getAttribute('data-category');
      
      if (filterValue === 'all' || cardCategory === filterValue) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  function sortProducts(sortType) {
    console.log('Sorting products by:', sortType);
    const productGrid = document.querySelector('.product-grid');
    if (!productGrid) {
      console.error('Product grid not found');
      return;
    }
  
    // Get only visible products
    const visibleProducts = Array.from(document.querySelectorAll('.product-card:not([style*="display: none"])'));
    console.log(`Found ${visibleProducts.length} visible products to sort`);
  
    // Debug: Log data attributes of first product
    if (visibleProducts.length > 0) {
      const sampleProduct = visibleProducts[0];
      console.log('Sample product data:', {
        name: sampleProduct.getAttribute('data-name'),
        price: sampleProduct.getAttribute('data-price'),
        category: sampleProduct.getAttribute('data-category')
      });
    }
  
    // Sort the visible products
    visibleProducts.sort((a, b) => {
      const aPrice = parseFloat(a.getAttribute('data-price') || 0);
      const bPrice = parseFloat(b.getAttribute('data-price') || 0);
      const aName = (a.getAttribute('data-name') || '').toLowerCase();
      const bName = (b.getAttribute('data-name') || '').toLowerCase();
  
      console.log(`Comparing: ${aName} ($${aPrice}) vs ${bName} ($${bPrice})`);
  
      switch(sortType) {
        case 'price-low':
          return aPrice - bPrice;
        case 'price-high':
          return bPrice - aPrice;
        case 'name':
          return aName.localeCompare(bName);
        default:
          return 0;
      }
    });
  
    console.log('Reordering products in DOM');
    // Re-append in sorted order to update the DOM
    visibleProducts.forEach(product => {
      productGrid.appendChild(product);
    });
  }
}

// Product interactions (add to cart, order now, etc.)
function setupProductInteractions() {
  console.log('Setting up product interactions');
  
  // Remove any existing cart button listeners to prevent duplicates
  if (window.cartButtonHandler) {
    document.removeEventListener('click', window.cartButtonHandler);
  }
  
  // Create the cart button handler function
  window.cartButtonHandler = function(e) {
    if (e.target.classList.contains('cart-btn') || e.target.closest('.cart-btn')) {
      e.preventDefault();
      const btn = e.target.classList.contains('cart-btn') ? e.target : e.target.closest('.cart-btn');
      const card = btn.closest('.product-card');
      const productName = card.querySelector('.product-name')?.textContent || 'Product';
      
      console.log('Cart button clicked for:', productName);
      
      // Prevent multiple clicks during animation
      if (btn.disabled) return;
      btn.disabled = true;
      
      // Visual feedback
      const originalText = btn.innerHTML;
      const originalClass = btn.className;

      // Remove any inline styles before applying new ones
      btn.style.removeProperty('background-color');
      btn.style.removeProperty('color');

      // Use setProperty to ensure inline style is applied
      btn.innerHTML = '<i class="fas fa-check"></i> Added';
      btn.classList.add('added-to-cart-feedback');
      btn.style.setProperty('background-color', '#2ecc71', 'important');
      btn.style.setProperty('color', 'white', 'important');
      
      // Show toast notifications
      showToast(`${productName} added to cart!`);
      
      // Reset button after animation
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.className = originalClass;
        btn.style.removeProperty('background-color');
        btn.style.removeProperty('color');
        btn.disabled = false;
      }, 2000);
    }
  };

  // Use event delegation for cart buttons to handle dynamic content
  document.addEventListener('click', window.cartButtonHandler);
  
  // Order now buttons
  const orderBtns = document.querySelectorAll('.order-btn');
  if (orderBtns.length > 0) {
    console.log(`Found ${orderBtns.length} order buttons`);
    
    orderBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const productName = card.querySelector('.product-name')?.textContent || 'Product';
        
        showToast(`Ordering ${productName}...`);
        
        // Navigate to order page
        setTimeout(() => {
          window.location.href = 'order.html';
        }, 1000);
      });
    });
  }
  
  // Pagination links
  const pageLinks = document.querySelectorAll('.page-link');
  if (pageLinks.length > 0) {
    console.log(`Found ${pageLinks.length} pagination links`);
    
    pageLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Handle active state
        pageLinks.forEach(pl => pl.classList.remove('active'));
        this.classList.add('active');
        
        // Show loading effect
        showLoading();
        
        // In a real implementation, load next page data here
        // For demo, just simulate a page load
      });
    });
  }
}
  // Use event delegation for cart buttons to handle dynamic content
  document.addEventListener('click', window.cartButtonHandler);
  
  // Order now buttons
  const orderBtns = document.querySelectorAll('.order-btn');
  if (orderBtns.length > 0) {
    console.log(`Found ${orderBtns.length} order buttons`);
    
    orderBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const productName = card.querySelector('.product-name')?.textContent || 'Product';
        
        showToast(`Ordering ${productName}...`);
        
        // Navigate to order page
        setTimeout(() => {
          window.location.href = 'order.html';
        }, 1000);
      });
    });
  }
  
  // Pagination links
  const pageLinks = document.querySelectorAll('.page-link');
  if (pageLinks.length > 0) {
    console.log(`Found ${pageLinks.length} pagination links`);
    
    pageLinks.forEach(link => {
      link.addEventListener('click', function(e) {
        e.preventDefault();
        
        // Handle active state
        pageLinks.forEach(pl => pl.classList.remove('active'));
        this.classList.add('active');
        
        // Show loading effect
        showLoading();
        
        // In a real implementation, load next page data here
        // For demo, just simulate a page load
      });
    });
  }


// Lazy load images
function setupLazyLoading() {
  console.log('Setting up lazy loading');
  
  const lazyImages = document.querySelectorAll('.product-img.lazy-load');
  console.log(`Found ${lazyImages.length} lazy-load images`);
  
  lazyImages.forEach(img => {
    // First check if image is already loaded
    if (img.complete) {
      img.classList.add('loaded');
      return;
    }
    
    // Add load event listener
    img.addEventListener('load', function() {
      console.log('Image loaded:', this.src);
      this.classList.add('loaded');
    });
    
    img.addEventListener('error', function() {
      console.error('Image failed to load:', this.src);
      // Show a placeholder for failed images
      this.src = 'images/placeholder.jpg';
      this.alt = 'Image not found';
      this.classList.add('loaded'); // Still show it
    });
    
    // Force load if not already loading
    if (img.dataset.src) {
      img.src = img.dataset.src;
    }
  });
}

// Quick view modal for products 
function setupQuickView() {
  console.log('Setting up quick view functionality');
  
  const productImages = document.querySelectorAll('.product-img');
  console.log(`Found ${productImages.length} product images`);
  
  if (productImages.length === 0) return;
  
  // Create modal if it doesn't exist
  let quickViewModal = document.querySelector('.quick-view-modal');
  if (!quickViewModal) {
    quickViewModal = document.createElement('div');
    quickViewModal.className = 'quick-view-modal';
    quickViewModal.style.display = 'none';
    quickViewModal.style.position = 'fixed';
    quickViewModal.style.top = '0';
    quickViewModal.style.left = '0';
    quickViewModal.style.width = '100%';
    quickViewModal.style.height = '100%';
    quickViewModal.style.backgroundColor = 'rgba(0,0,0,0.9)';
    quickViewModal.style.zIndex = '10000';
    quickViewModal.style.justifyContent = 'center';
    quickViewModal.style.alignItems = 'center';
    quickViewModal.style.padding = '20px';
    
    document.body.appendChild(quickViewModal);
    
    console.log('Created quick view modal');
  }
  
  // Create modal content structure if it doesn't exist
  let modalContent = quickViewModal.querySelector('.modal-content');
  if (!modalContent) {
    modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    modalContent.style.backgroundColor = '#1e1e1e';
    modalContent.style.borderRadius = '8px';
    modalContent.style.maxWidth = '800px';
    modalContent.style.width = '100%';
    modalContent.style.padding = '20px';
    modalContent.style.position = 'relative';
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflow = 'auto';
    modalContent.style.border = '1px solid #333';
    modalContent.style.color = '#e0e0e0';
    
    quickViewModal.appendChild(modalContent);
  }
  
  // Setup product images to open quick view
  productImages.forEach(img => {
    img.style.cursor = 'pointer';
    
    img.addEventListener('click', function() {
      const card = this.closest('.product-card');
      if (!card) return;
      
      const productName = card.querySelector('.product-name')?.textContent || 'Product';
      const productImage = this.src;
      const productPrice = card.querySelector('.price')?.textContent || '';
      const productDesc = card.querySelector('.description')?.textContent || '';
      
      console.log('Opening quick view for:', productName);
      
      // Populate modal content
      modalContent.innerHTML = `
        <button class="close-btn" style="position:absolute;top:10px;right:10px;background:transparent;border:none;font-size:24px;cursor:pointer;color:#e0e0e0;">&times;</button>
        <div class="quick-view-layout" style="display:grid;grid-template-columns:1fr 1fr;gap:20px;">
          <div class="quick-view-image">
            <img src="${productImage}" alt="${productName}" style="width:100%;height:auto;border-radius:4px;">
          </div>
          <div class="quick-view-info">
            <h2 style="color:#f0f0f0;margin-top:0;">${productName}</h2>
            <p class="quick-view-price" style="color:var(--main-color);font-size:1.4rem;font-weight:bold;">${productPrice}</p>
            <p class="quick-view-desc" style="color:#bbb;">${productDesc}</p>
            <div class="quick-view-actions" style="display:flex;gap:10px;margin-top:20px;">
              <button class="quick-view-cart" style="padding:10px 20px;background:#2a2a2a;color:#f0f0f0;border:1px solid #444;border-radius:4px;cursor:pointer;flex:1;">Add to Cart</button>
              <button class="quick-view-order" style="padding:10px 20px;background:var(--main-color);color:white;border:none;border-radius:4px;cursor:pointer;flex:2;">Order Now</button>
            </div>
          </div>
        </div>
      `;
      
      // Setup close button
      const closeBtn = modalContent.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        quickViewModal.style.display = 'none';
      });
      
      // Setup action buttons
      const modalCartBtn = modalContent.querySelector('.quick-view-cart');
      modalCartBtn.addEventListener('click', () => {
        // Find the original cart button in the product card and trigger its click event
        const originalCartBtn = card.querySelector('.cart-btn');
        if (originalCartBtn) {
          originalCartBtn.click();
        } else {
          showToast(`${productName} added to cart!`);
        }
        quickViewModal.style.display = 'none';
      });
      
      const modalOrderBtn = modalContent.querySelector('.quick-view-order');
      modalOrderBtn.addEventListener('click', () => {
        showToast(`Ordering ${productName}...`);
        setTimeout(() => {
          window.location.href = 'order.html';
        }, 1000);
      });
      
      // Show the modal
      quickViewModal.style.display = 'flex';
    });
  });
  
  // Close modal when clicking outside content
  quickViewModal.addEventListener('click', (e) => {
    if (e.target === quickViewModal) {
      quickViewModal.style.display = 'none';
    }
  });
}

// Loading overlay
function showLoading() {
  // Create loading overlay if needed
  let loadingOverlay = document.querySelector('.loading-overlay');
  if (!loadingOverlay) {
    loadingOverlay = document.createElement('div');
    loadingOverlay.className = 'loading-overlay';
    loadingOverlay.style.position = 'fixed';
    loadingOverlay.style.top = '0';
    loadingOverlay.style.left = '0';
    loadingOverlay.style.width = '100%';
    loadingOverlay.style.height = '100%';
    loadingOverlay.style.backgroundColor = 'rgba(0,0,0,0.7)';
    loadingOverlay.style.display = 'flex';
    loadingOverlay.style.justifyContent = 'center';
    loadingOverlay.style.alignItems = 'center';
    loadingOverlay.style.zIndex = '9999';
    
    document.body.appendChild(loadingOverlay);
    
    const spinner = document.createElement('div');
    spinner.className = 'spinner';
    spinner.style.width = '50px';
    spinner.style.height = '50px';
    spinner.style.border = '5px solid #f3f3f3';
    spinner.style.borderTop = '5px solid var(--main-color, #3498db)';
    spinner.style.borderRadius = '50%';
    spinner.style.animation = 'spin 1s linear infinite';
    loadingOverlay.appendChild(spinner);
    
    // Add spinner animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  }
  
  // Show loading overlay and scroll to top
  loadingOverlay.style.display = 'flex';
  
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
  
  // Hide after delay (simulating page load)
  setTimeout(() => {
    loadingOverlay.style.display = 'none';
  }, 1000);
}

// Toast notification
function showToast(message) {
  console.log('Showing toast:', message);
  
  let toast = document.querySelector('.toast-notification');
  
  // Create toast if it doesn't exist
  if (!toast) {
    toast = document.createElement('div');
    toast.className = 'toast-notification';
    
    // Style the toast
    toast.style.position = 'fixed';
    toast.style.bottom = '20px';
    toast.style.right = '20px';
    toast.style.backgroundColor = 'rgba(40, 40, 40, 0.9)';
    toast.style.color = 'white';
    toast.style.padding = '12px 20px';
    toast.style.borderRadius = '4px';
    toast.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
    toast.style.zIndex = '10000';
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
    toast.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    
    document.body.appendChild(toast);
    console.log('Created new toast element');
  }
  
  // Set message and show toast
  toast.textContent = message;
  
  // Show toast with animation
  setTimeout(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  }, 10);
  
  // Hide toast after delay
  setTimeout(() => {
    toast.style.transform = 'translateY(100px)';
    toast.style.opacity = '0';
  }, 3000);
}

// Initialize test toast for debugging
// setTimeout(() => {
//   console.log('Testing toast notification system');
//   showToast('Test toast message - this should appear!');
// }, 2000);


class RippleEffect {
  constructor() {
    this.init();
  }

  init() {
    // Add event listeners to all product cards
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
      // Ensure the card has proper overflow handling for ripples
      card.style.overflow = 'hidden';
      card.addEventListener('mouseenter', (e) => this.createRipple(e));
      // Also remove ripples when mouse leaves to prevent lingering effects
      card.addEventListener('mouseleave', (e) => this.removeExistingRipples(card));
    });
  }

  createRipple(event) {
    const card = event.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to the card
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    // Remove any existing ripples first
    this.removeExistingRipples(card);

    // Create only one ripple ring
    this.createRippleRing(card, x, y, 'ripple-1', 0);
  }

  createRippleRing(card, x, y, className, delay = 0) {
    setTimeout(() => {
      const ripple = document.createElement('div');
      ripple.className = `ripple ${className}`;
      
      // Position the ripple at mouse coordinates
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.style.transform = 'translate(-50%, -50%)';
      
      card.appendChild(ripple);

      // Remove the ripple after animation completes (reduced to match shorter animation)
      setTimeout(() => {
        if (ripple.parentNode) {
          ripple.parentNode.removeChild(ripple);
        }
      }, 1500); // Reduced from 1800 to 1500 to match new animation duration
    }, delay);
  }

  removeExistingRipples(card) {
    const existingRipples = card.querySelectorAll('.ripple, .glow-ripple');
    existingRipples.forEach(ripple => {
      if (ripple.parentNode) {
        ripple.parentNode.removeChild(ripple);
      }
    });
  }
}

// Initialize the ripple effect when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new RippleEffect();
});

// For dynamic content, you can also call this function
function initializeRippleEffect() {
  new RippleEffect();
}


/**
 * Sets up active navigation state indicators.
 * Adds visual indicators (underline and color change) to navigation items
 * that correspond to the current page.
 * 
 * @function setupActiveNavigation
 * @returns {void}
 */
function setupActiveNavigation() {
  console.log('Setting up active navigation indicators');
  
  // Get current page info
  const currentPath = window.location.pathname;
  const currentPage = currentPath.split('/').pop() || 'index.html';
  const currentHash = window.location.hash;
  
  console.log('Current page:', currentPage, 'Hash:', currentHash);
  
  // Get all navigation links in header and footer, but exclude logos and quote buttons
  const navLinks = document.querySelectorAll('nav a:not(.logo):not(.quote-btn), header a:not(.logo):not(.quote-btn), footer a:not(.logo):not(.quote-btn)');
  
  if (navLinks.length === 0) {
    console.log('No navigation links found');
    return;
  }
  
  console.log(`Found ${navLinks.length} navigation links`);
  
  // Remove existing active states
  navLinks.forEach(link => {
    link.classList.remove('nav-active');
    link.style.removeProperty('border-bottom');
    link.style.removeProperty('color');
  });
  
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Skip if this is a logo link, quote button, or other special elements
    if (link.classList.contains('logo') || 
        link.classList.contains('quote-btn') ||
        link.querySelector('img') || 
        link.querySelector('.logo') ||
        link.textContent.toLowerCase().includes('logo') ||
        link.textContent.toLowerCase().includes('quote') ||
        link.id === 'logo') {
      return;
    }
    
    let isActive = false;
    
    // Check for exact page matches
    if (href === currentPage) {
      isActive = true;
    }
    // Check for index/home page variations
    else if ((currentPage === 'index.html' || currentPage === '') && 
             (href === '/' || href === 'index.html' || href === './index.html')) {
      isActive = true;
    }
    // Check for anchor links on current page
    else if (href.startsWith('#') && currentHash === href) {
      isActive = true;
    }
    // Check for relative paths
    else if (href.includes('/') && href.endsWith(currentPage)) {
      isActive = true;
    }
    // Check if link text matches page name (without extension)
    else {
      const linkText = link.textContent.toLowerCase().trim();
      const pageNameOnly = currentPage.replace('.html', '').toLowerCase();
      if (linkText === pageNameOnly) {
        isActive = true;
      }
    }
    
    if (isActive) {
      console.log('Setting active state for:', link.textContent, 'href:', href);
      
      // Add active class
      link.classList.add('nav-active');
      
      // Apply active styling
      link.style.borderBottom = '2px solid var(--main-color, #f39c12)';
      link.style.color = 'var(--main-color, #f39c12)';
      link.style.fontWeight = 'bold';
    }
  });
  
  // Add CSS for smooth transitions if not already present, excluding quote buttons
  if (!document.querySelector('#nav-active-styles')) {
    const style = document.createElement('style');
    style.id = 'nav-active-styles';
    style.textContent = `
      nav a:not(.logo):not(.quote-btn):not([class*="btn"]), 
      header a:not(.logo):not(.quote-btn):not([class*="btn"]), 
      footer a:not(.logo):not(.quote-btn):not([class*="btn"]) {
        transition: color 0.3s ease, border-bottom 0.3s ease;
      }
      .nav-active {
        position: relative;
      }
    `;
    document.head.appendChild(style);
  }
}

// Initialize active navigation on page load
document.addEventListener('DOMContentLoaded', setupActiveNavigation);

// Also update active state when hash changes (for anchor links)
window.addEventListener('hashchange', setupActiveNavigation);