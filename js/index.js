


/**
 * @fileoverview Main JavaScript file for MVP Prints website functionality
 * @description Handles all interactive features including navigation, product management, 
 * modals, filtering, sorting, and user interface enhancements
 * @author GitHub Copilot Assistant
 * @version 1.0.0
 */

/**
 * Initializes the under construction banner on the homepage
 * Creates and displays a modal banner with construction notice
 * Only shows on homepage URLs (/, /index.html, index.html)
 * @function
 * @since 1.0.0
 */

/**
 * Sets up the website favicon dynamically
 * Creates or updates the favicon link element in the document head
 * @function
 * @since 1.0.0
 */

/**
 * Sets up navigation handlers for anchor links in header and footer
 * Handles navigation between pages and sections with proper anchor linking
 * Redirects to index.html with anchor if not currently on homepage
 * @function setupNavigationHandlers
 * @since 1.0.0
 */

/**
 * Initializes footer dropdown functionality for mobile screens
 * Creates collapsible sections in footer for better mobile UX
 * Only activates on screens 768px and below
 * @function
 * @since 1.0.0
 */

/**
 * Toggles the visibility of footer dropdown sections
 * @function toggleDropdown
 * @param {HTMLElement} section - The footer section element to toggle
 * @since 1.0.0
 */

/**
 * Initializes responsive navbar functionality
 * Handles mobile menu toggle, scroll behavior, and search form interactions
 * @function
 * @since 1.0.0
 */

/**
 * Main initialization function for product page features
 * Sets up all product-related functionality including filtering, sorting, and interactions
 * Only runs if product grid is detected on the page
 * @function initProductPage
 * @since 1.0.0
 */

/**
 * Sets up product filtering and sorting functionality
 * Handles filter buttons and sort dropdown interactions
 * @function setupFilteringAndSorting
 * @since 1.0.0
 */

/**
 * Sets up product interaction handlers (add to cart, order buttons)
 * Uses event delegation for dynamic content handling
 * @function setupProductInteractions
 * @since 1.0.0
 */

/**
 * Changes the quantity of a product in quantity controls
 * @function changeQuantity
 * @param {HTMLElement} button - The quantity button that was clicked
 * @param {number} change - The amount to change (1 or -1)
 * @since 1.0.0
 */

/**
 * Updates the styling and state of quantity control buttons
 * @function updateQuantityControls
 * @param {HTMLElement} productCard - The product card element
 * @param {number} quantity - The current quantity value
 * @since 1.0.0
 */

/**
 * Implements lazy loading for product images
 * Adds loading states and error handling for product images
 * @function setupLazyLoading
 * @since 1.0.0
 */

/**
 * Sets up quick view modal functionality for product images
 * Creates modal overlay for detailed product preview
 * @function setupQuickView
 * @since 1.0.0
 */

/**
 * Displays a loading overlay with spinner animation
 * Used during page transitions and async operations
 * @function showLoading
 * @since 1.0.0
 */

/**
 * Ripple effect class for product card hover animations
 * Creates expanding circle animations on mouse hover
 * @class RippleEffect
 * @since 1.0.0
 */

/**
 * Initializes the ripple effect system
 * @method
 * @memberof RippleEffect
 * @since 1.0.0
 */

/**
 * Creates a ripple animation at mouse position
 * @method createRipple
 * @memberof RippleEffect
 * @param {Event} event - The mouse event containing position data
 * @since 1.0.0
 */

/**
 * Creates individual ripple ring elements
 * @method createRippleRing
 * @memberof RippleEffect
 * @param {HTMLElement} card - The product card element
 * @param {number} x - X coordinate for ripple center
 * @param {number} y - Y coordinate for ripple center
 * @param {string} className - CSS class name for the ripple
 * @param {number} [delay=0] - Animation delay in milliseconds
 * @since 1.0.0
 */

/**
 * Removes existing ripple elements from a card
 * @method removeExistingRipples
 * @memberof RippleEffect
 * @param {HTMLElement} card - The product card element to clean
 * @since 1.0.0
 */

/**
 * Initializes ripple effects for dynamically added content
 * @function initializeRippleEffect
 * @since 1.0.0
 */

/**
 * Sets up active navigation state indicators
 * Adds visual indicators (underline and color change) to navigation items
 * that correspond to the current page
 * @function setupActiveNavigation
 * @returns {void}
 * @since 1.0.0
 */

/**
 * Shares a product using the Web Share API or falls back to copying to clipboard
 * @function shareProduct
 * @param {string} productName - The name of the product to share
 * @param {string} productPrice - The price of the product to share
 * @since 1.0.0
 */

/**
 * Fallback share function that copies the share text to clipboard
 * @function fallbackShare
 * @param {Object} shareData - Object containing title, text, and url
 * @param {string} shareData.title - The share title
 * @param {string} shareData.text - The share description text
 * @param {string} shareData.url - The URL to share
 * @since 1.0.0
 */

/**
 * Shows a notification when content is shared
 * @function showShareNotification
 * @param {string} message - The message to display in the notification
 * @since 1.0.0
 */

/**
 * Shows a modal with shareable text when clipboard API is not available
 * @function showShareModal
 * @param {string} shareText - The text to display for manual copying
 * @since 1.0.0
 */

document.addEventListener('DOMContentLoaded', function() {
  // Only show on homepage
  const isHomepage =
    window.location.pathname === '/' ||
    window.location.pathname.endsWith('/index.html') ||
    window.location.pathname === '/index.html';

  if (!isHomepage) return;

  // Create modal overlay
  const overlay = document.createElement('div');
  overlay.id = 'construction-overlay';
  Object.assign(overlay.style, {
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    zIndex: '99999',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backdropFilter: 'blur(5px)',
    animation: 'fadeIn 0.3s ease-out'
  });

  // Create banner
  const banner = document.createElement('div');
  banner.id = 'under-construction-banner';
  banner.innerHTML = `
    <div style="
      background: linear-gradient(135deg, #1e1e1e 0%, #2a2a2a 100%);
      color: #f0f0f0;
      padding: 3rem 2.5rem;
      border-radius: 16px;
      box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1);
      font-size: 1.3rem;
      max-width: 85vw;
      width: 600px;
      text-align: center;
      position: relative;
      border: 2px solid var(--main-color, #c6957e);
    ">
      <div style="
        font-size: 3rem;
        margin-bottom: 1rem;
        filter: drop-shadow(0 0 10px rgba(198, 149, 126, 0.5));
      ">🚧</div>
      <h2 style="
        color: var(--main-color, #c6957e);
        margin: 0 0 1.5rem 0;
        font-size: 2rem;
        font-weight: bold;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
      ">Site Under Construction</h2>
      <div style="
        margin-bottom: 2rem;
        line-height: 1.6;
        color: #e0e0e0;
        font-size: 1.1rem;
      ">
        We're working hard to bring you an amazing experience!<br>
        Please check back soon for our full range of services and updates.
      </div>
      <div style="
        font-size: 0.9rem;
        color: #bbb;
        margin-bottom: 1rem;
      ">
        Expected completion: Coming Soon
      </div>
      <button id="close-banner-btn" style="
        background: var(--main-color, #c6957e);
        border: none;
        color: white;
        padding: 12px 24px;
        border-radius: 8px;
        font-size: 1rem;
        font-weight: 600;
        cursor: pointer;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(198, 149, 126, 0.3);
      " onmouseover="this.style.transform='translateY(-2px)'; this.style.boxShadow='0 6px 16px rgba(198, 149, 126, 0.4)'" 
         onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(198, 149, 126, 0.3)'">
        Continue to Site
      </button>
      <button id="close-x-btn" style="
        position: absolute;
        top: 15px;
        right: 20px;
        background: transparent;
        border: none;
        color: #bbb;
        font-size: 2rem;
        cursor: pointer;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      " onmouseover="this.style.backgroundColor='rgba(255,255,255,0.1)'; this.style.color='#fff'" 
         onmouseout="this.style.backgroundColor='transparent'; this.style.color='#bbb'" 
         aria-label="Close">&times;</button>
    </div>
  `;

  // Add animation styles
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    @keyframes slideIn {
      from { 
        opacity: 0;
        transform: translateY(-20px) scale(0.9);
      }
      to { 
        opacity: 1;
        transform: translateY(0) scale(1);
      }
    }
    #under-construction-banner > div {
      animation: slideIn 0.4s ease-out 0.1s both;
    }
  `;
  document.head.appendChild(style);

  overlay.appendChild(banner);
  document.body.appendChild(overlay);

  // Close handlers
  const closeHandler = function() {
    overlay.style.animation = 'fadeOut 0.3s ease-out';
    setTimeout(() => overlay.remove(), 300);
  };

  // Add fadeOut animation
  style.textContent += `
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;

  banner.querySelector('#close-banner-btn').onclick = closeHandler;
  banner.querySelector('#close-x-btn').onclick = closeHandler;
  
  // Close on overlay click (but not banner click)
  overlay.onclick = function(e) {
    if (e.target === overlay) {
      closeHandler();
    }
  };

  // Close on Escape key
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
      closeHandler();
    }
  });
});


(function() {
  const faviconUrl = 'images/favicon.svg'; // Change to your favicon path
  let link = document.querySelector("link[rel~='icon']");
  if (!link) {
      link = document.createElement('link');
      link.rel = 'icon';
      document.head.appendChild(link);
  }
  link.type = 'image/png';
  link.href = faviconUrl;
})();


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


// Footer dropdown functionality for mobile
document.addEventListener('DOMContentLoaded', function() {
  // Only initialize footer dropdowns on mobile screens
  function initFooterDropdowns() {
      if (window.innerWidth <= 768) {
          const footerSections = document.querySelectorAll('.footer-section');
          
          footerSections.forEach(section => {
              const header = section.querySelector('h3');
              
              if (header) {
                  // Remove any existing listeners
                  header.removeEventListener('click', toggleDropdown);
                  header.removeEventListener('touchstart', handleTouchStart);
                  header.removeEventListener('touchend', handleTouchEnd);
                  
                  // Add click listener for desktop/mouse
                  header.addEventListener('click', function(e) {
                      e.preventDefault();
                      toggleDropdown.call(this, section);
                  });
                  
                  // Add touch listeners for mobile devices
                  let touchStartTime = 0;
                  
                  function handleTouchStart(e) {
                      touchStartTime = Date.now();
                  }
                  
                  function handleTouchEnd(e) {
                      e.preventDefault();
                      const touchDuration = Date.now() - touchStartTime;
                      
                      // Only trigger if it's a quick tap (not a long press or scroll)
                      if (touchDuration < 500) {
                          toggleDropdown.call(this, section);
                      }
                  }
                  
                  header.addEventListener('touchstart', handleTouchStart, { passive: true });
                  header.addEventListener('touchend', handleTouchEnd);
                  
                  // Add visual feedback for touch
                  header.style.cursor = 'pointer';
                  header.style.userSelect = 'none';
                  header.style.webkitUserSelect = 'none';
                  header.style.webkitTouchCallout = 'none';
              }
          });
      }
  }
  
  // Toggle dropdown function
  function toggleDropdown(section) {
      const isActive = section.classList.contains('active');
      
      // Close all other dropdowns
      document.querySelectorAll('.footer-section').forEach(otherSection => {
          if (otherSection !== section) {
              otherSection.classList.remove('active');
          }
      });
      
      // Toggle current dropdown
      if (isActive) {
          section.classList.remove('active');
      } else {
          section.classList.add('active');
      }
  }
  
  // Initialize on page load
  initFooterDropdowns();
  
  // Re-initialize on window resize
  let resizeTimer;
  window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
          // Remove active states when switching to desktop
          if (window.innerWidth > 768) {
              document.querySelectorAll('.footer-section').forEach(section => {
                  section.classList.remove('active');
              });
          } else {
              initFooterDropdowns();
          }
      }, 250);
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
      
      // // Show toast notifications
      // showToast(`${productName} added to cart!`);
      
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
        
        // showToast(`Ordering ${productName}...`);
        
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
        
        // showToast(`Ordering ${productName}...`);
        
        // Navigate to order page
        setTimeout(() => {
          window.location.href = 'order.html';
        }, 1000);
      });
    });
  }
  

  // Add this function to your js/index.js file

/**
 * Changes the quantity of a product in the quantity control
 * @param {HTMLElement} button - The quantity button that was clicked
 * @param {number} change - The amount to change (1 or -1)
 */
function changeQuantity(button, change) {
  const quantityControl = button.closest('.quantity-control');
  const quantityDisplay = quantityControl.querySelector('.quantity-display');
  const productCard = button.closest('.product-card');
  
  // Check if product is out of stock
  const isOutOfStock = productCard.querySelector('.stock-status.out-of-stock');
  if (isOutOfStock) {
      return; // Don't allow quantity changes for out of stock items
  }
  
  let currentQuantity = parseInt(quantityDisplay.textContent);
  let newQuantity = currentQuantity + change;
  
  // Ensure quantity doesn't go below 1 or above a reasonable limit
  if (newQuantity < 1) {
      newQuantity = 1;
  } else if (newQuantity > 99) {
      newQuantity = 99;
  }
  
  // Update the display
  quantityDisplay.textContent = newQuantity;
  
  // Optional: Add visual feedback
  quantityDisplay.style.transform = 'scale(1.1)';
  setTimeout(() => {
      quantityDisplay.style.transform = 'scale(1)';
  }, 150);
  
  // Update any cart-related data if needed
  updateQuantityControls(productCard, newQuantity);
}

/**
* Updates the quantity controls styling and state
* @param {HTMLElement} productCard - The product card element
* @param {number} quantity - The current quantity
*/
function updateQuantityControls(productCard, quantity) {
  const quantityButtons = productCard.querySelectorAll('.quantity-btn');
  const minusButton = quantityButtons[1]; // Second button is minus
  const plusButton = quantityButtons[0]; // First button is plus
  
  // Disable minus button if quantity is 1
  if (quantity <= 1) {
      minusButton.style.opacity = '0.5';
      minusButton.style.cursor = 'not-allowed';
  } else {
      minusButton.style.opacity = '1';
      minusButton.style.cursor = 'pointer';
  }
  
  // Disable plus button if quantity is at max
  if (quantity >= 99) {
      plusButton.style.opacity = '0.5';
      plusButton.style.cursor = 'not-allowed';
  } else {
      plusButton.style.opacity = '1';
      plusButton.style.cursor = 'pointer';
  }
}

// Initialize quantity controls when page loads
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all quantity controls
  const productCards = document.querySelectorAll('.product-card');
  productCards.forEach(card => {
      const quantityDisplay = card.querySelector('.quantity-display');
      if (quantityDisplay) {
          const currentQuantity = parseInt(quantityDisplay.textContent);
          updateQuantityControls(card, currentQuantity);
      }
  });
  
  // Your existing code...
});


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
// function showToast(message) {
//   console.log('Showing toast:', message);
  
//   let toast = document.querySelector('.toast-notification');
  
//   // Create toast if it doesn't exist
//   if (!toast) {
//     toast = document.createElement('div');
//     toast.className = 'toast-notification';
    
//     // Style the toast
//     toast.style.position = 'fixed';
//     toast.style.bottom = '20px';
//     toast.style.right = '20px';
//     toast.style.backgroundColor = 'rgba(40, 40, 40, 0.9)';
//     toast.style.color = 'white';
//     toast.style.padding = '12px 20px';
//     toast.style.borderRadius = '4px';
//     toast.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
//     toast.style.zIndex = '10000';
//     toast.style.transform = 'translateY(100px)';
//     toast.style.opacity = '0';
//     toast.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
    
//     document.body.appendChild(toast);
//     console.log('Created new toast element');
//   }
  
//   // Set message and show toast
//   toast.textContent = message;
  
//   // Show toast with animation
//   setTimeout(() => {
//     toast.style.transform = 'translateY(0)';
//     toast.style.opacity = '1';
//   }, 10);
  
//   // Hide toast after delay
//   setTimeout(() => {
//     toast.style.transform = 'translateY(100px)';
//     toast.style.opacity = '0';
//   }, 3000);
// }

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


// Add this function to your js/index.js file

/**
 * Shares a product using the Web Share API or falls back to copying to clipboard
 * @param {string} productName - The name of the product to share
 * @param {string} productPrice - The price of the product to share
 */
function shareProduct(productName, productPrice) {
  const shareData = {
      title: `${productName} - MVP Prints`,
      text: `Check out this ${productName} for ${productPrice} at MVP Prints!`,
      url: window.location.href
  };

  // Check if the Web Share API is supported
  if (navigator.share) {
      navigator.share(shareData)
          .then(() => {
              console.log('Product shared successfully');
              showShareNotification('Product shared successfully!');
          })
          .catch((err) => {
              console.log('Error sharing:', err);
              fallbackShare(shareData);
          });
  } else {
      // Fallback for browsers that don't support Web Share API
      fallbackShare(shareData);
  }
}

/**
* Fallback share function that copies the share text to clipboard
* @param {Object} shareData - Object containing title, text, and url
*/
function fallbackShare(shareData) {
  const shareText = `${shareData.text}\n${shareData.url}`;
  
  // Try to copy to clipboard
  if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(shareText)
          .then(() => {
              showShareNotification('Product link copied to clipboard!');
          })
          .catch(() => {
              // If clipboard fails, show a modal with the text to copy
              showShareModal(shareText);
          });
  } else {
      // If clipboard API not available, show a modal
      showShareModal(shareText);
  }
}

/**
* Shows a notification when content is shared
* @param {string} message - The message to display
*/
function showShareNotification(message) {
  // Create notification element
  const notification = document.createElement('div');
  notification.className = 'share-notification';
  notification.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <span>${message}</span>
  `;
  
  // Add styles
  const notificationStyle = document.createElement('style');
  notificationStyle.textContent = `
      .share-notification {
          position: fixed;
          top: 20px;
          right: 20px;
          background-color: #28a745;
          color: white;
          padding: 15px 20px;
          border-radius: 8px;
          z-index: 1001;
          opacity: 0;
          transform: translateX(100%);
          transition: all 0.3s ease;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 500;
          max-width: 300px;
      }
      
      .share-notification.show {
          opacity: 1;
          transform: translateX(0);
      }
      
      .share-notification i {
          font-size: 1.2em;
      }
  `;
  
  document.head.appendChild(notificationStyle);
  document.body.appendChild(notification);
  
  // Show notification
  setTimeout(() => {
      notification.classList.add('show');
  }, 10);
  
  // Hide and remove after 3 seconds
  setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
          if (document.body.contains(notification)) {
              document.body.removeChild(notification);
          }
      }, 300);
  }, 3000);
}

/**
* Shows a modal with shareable text when clipboard API is not available
* @param {string} shareText - The text to display for sharing
*/
function showShareModal(shareText) {
  // Create modal
  const modal = document.createElement('div');
  modal.className = 'share-modal';
  modal.innerHTML = `
      <div class="share-modal-content">
          <div class="share-modal-header">
              <h3>Share Product</h3>
              <button class="share-modal-close">&times;</button>
          </div>
          <div class="share-modal-body">
              <p>Copy this link to share:</p>
              <textarea readonly class="share-text">${shareText}</textarea>
              <button class="copy-btn">Copy to Clipboard</button>
          </div>
      </div>
  `;
  
  // Add modal styles
  const modalStyle = document.createElement('style');
  modalStyle.textContent = `
      .share-modal {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          z-index: 1002;
          display: flex;
          align-items: center;
          justify-content: center;
          opacity: 0;
          transition: opacity 0.3s ease;
      }
      
      .share-modal.show {
          opacity: 1;
      }
      
      .share-modal-content {
          background: white;
          border-radius: 12px;
          padding: 0;
          max-width: 500px;
          width: 90%;
          max-height: 80%;
          overflow: hidden;
          transform: scale(0.7);
          transition: transform 0.3s ease;
      }
      
      .share-modal.show .share-modal-content {
          transform: scale(1);
      }
      
      .share-modal-header {
          padding: 20px;
          border-bottom: 1px solid #eee;
          display: flex;
          justify-content: space-between;
          align-items: center;
      }
      
      .share-modal-header h3 {
          margin: 0;
          color: #333;
      }
      
      .share-modal-close {
          background: none;
          border: none;
          font-size: 24px;
          cursor: pointer;
          color: #999;
          padding: 0;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
      }
      
      .share-modal-close:hover {
          background: #f0f0f0;
          color: #333;
      }
      
      .share-modal-body {
          padding: 20px;
      }
      
      .share-modal-body p {
          margin: 0 0 15px 0;
          color: #666;
      }
      
      .share-text {
          width: 100%;
          height: 100px;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 6px;
          resize: none;
          font-family: inherit;
          margin-bottom: 15px;
      }
      
      .copy-btn {
          background: var(--main-color, #c6957e);
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
      }
      
      .copy-btn:hover {
          background: var(--main-color-dark, #b8876f);
      }
  `;
  
  document.head.appendChild(modalStyle);
  document.body.appendChild(modal);
  
  // Show modal
  setTimeout(() => {
      modal.classList.add('show');
  }, 10);
  
  // Handle modal interactions
  const closeBtn = modal.querySelector('.share-modal-close');
  const copyBtn = modal.querySelector('.copy-btn');
  const shareTextArea = modal.querySelector('.share-text');
  
  // Close modal function
  const closeModal = () => {
      modal.classList.remove('show');
      setTimeout(() => {
          if (document.body.contains(modal)) {
              document.body.removeChild(modal);
          }
      }, 300);
  };
  
  // Close button
  closeBtn.addEventListener('click', closeModal);
  
  // Close on backdrop click
  modal.addEventListener('click', (e) => {
      if (e.target === modal) {
          closeModal();
      }
  });
  
  // Copy button
  copyBtn.addEventListener('click', () => {
      shareTextArea.select();
      shareTextArea.setSelectionRange(0, 99999); // For mobile devices
      
      try {
          document.execCommand('copy');
          copyBtn.textContent = 'Copied!';
          copyBtn.style.background = '#28a745';
          
          setTimeout(() => {
              copyBtn.textContent = 'Copy to Clipboard';
              copyBtn.style.background = '';
          }, 2000);
      } catch (err) {
          console.error('Failed to copy text: ', err);
      }
  });
  
  // Auto-select text
  shareTextArea.select();
}