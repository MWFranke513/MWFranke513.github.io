let navbar = document.querySelector('.navbar');

document.querySelector('#menu-btn').onclick = () =>{
    navbar.classList.toggle('active');
    searchForm.classList.remove('active');
}

let searchForm = document.querySelector('.search-form');

document.querySelector('#search-btn').onclick = () =>{
    searchForm.classList.toggle('active');
    navbar.classList.remove('active');
}

window.onscroll = () => {
    navbar.classList.remove('active');
    searchForm.classList.remove('active');
}

//Carousel Code

new Glide('.glide').mount()

new Glide('.glide', {
    type: 'carousel',
    startAt: 0,
    perView: 1,
    autoplay: 5000,
    rewind: true
}).mount()

//Contact Form Code

document.querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var message = document.getElementById('message').value;

    if (name === '' || email === '' || message === '') {
        alert('All fields are required.');
        return;
    } else if (!email.includes('@')) {
        alert('Please enter a valid email address.');
        return;
    }

    emailjs.send("service_n92wf8y", "template_juv1lmp", { // Replace with your EmailJS service ID and template ID
        from_name: name,
        from_email: email,
        message: message
    })
    .then(function(response) {
        console.log("SUCCESS!", response.status, response.text);
        alert("Your message has been sent successfully!");
    }, function(error) {
        console.log("FAILED...", error);
        alert("Failed to send your message. Please try again later.");
    });
});

// FAQ Banners

document.querySelectorAll('.faq-question').forEach(item => {
    item.addEventListener('click', event => {
        event.target.parentNode.classList.toggle('active');
    })
});


//Order Form File Upload
// Select the file input element
var fileInput = document.getElementById('files');

// Select the file display area
var fileDisplayArea = document.getElementById('fileDisplayArea');

// Add an 'change' event listener to the file input element
fileInput.addEventListener('change', function(e) {
    // Get the selected files from the event target
    var files = e.target.files;

    // Initialize an array to store the file names
    var fileNames = [];

    // Loop through the selected files and get their names
    for (var i = 0; i < files.length; i++) {
        fileNames.push(files[i].name);
    }

    // Display the file names on the console
    console.log(fileNames.join(', '));

    // Display the file names on the form
    if (fileDisplayArea) {
        fileDisplayArea.innerText = fileNames.join(', ');
    }
});


// Main initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize product page features
    initProductPage();
  });
  
  // Consolidated product page initialization
  function initProductPage() {
    // Initialize product functionality
    setupFilteringAndSorting();
    setupProductInteractions();
    setupLazyLoading();
    setupQuickView();
    
    // Initialize AOS animations if AOS is available
    if (typeof AOS !== 'undefined') {
      AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true
      });
    }
  }
  
  // Product filtering and sorting functionality
  function setupFilteringAndSorting() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    const sortSelect = document.getElementById('sort-select');
    const productGrid = document.querySelector('.product-grid');
    
    console.log('Filter buttons found:', filterBtns.length);
    console.log('Product cards found:', productCards.length);
    console.log('Product grid exists:', !!productGrid);
    console.log('Sort select exists:', !!sortSelect);
  
    if (!productGrid || productCards.length === 0) {
      console.error('Essential elements missing - cannot initialize filtering');
      return;
    }
  
    // Initialize products - ensure all are visible initially
    productCards.forEach(card => {
      card.style.display = 'flex';
      console.log('Initializing card:', card.dataset.name);
    });
  
    // Filter products by category
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        console.log('Filter button clicked:', this.dataset.filter);
        
        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filterValue = this.getAttribute('data-filter');
        console.log('Applying filter:', filterValue);
        
        productCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          console.log(`Checking card ${card.dataset.name} (${cardCategory}) against filter ${filterValue}`);
          
          if (filterValue === 'all' || cardCategory === filterValue) {
            card.style.display = 'flex';
            console.log('Showing card:', card.dataset.name);
          } else {
            card.style.display = 'none';
            console.log('Hiding card:', card.dataset.name);
          }
        });
        
        // Re-apply sorting after filtering
        if (sortSelect && sortSelect.value !== 'default') {
          console.log('Re-applying sort after filter:', sortSelect.value);
          sortProducts(sortSelect.value);
        }
      });
    });
    
  
    // Sort products
    if (sortSelect) {
      sortSelect.addEventListener('change', function() {
        sortProducts(this.value);
      });
    }
  
    function sortProducts(sortType) {
      const visibleProducts = Array.from(productCards).filter(card => {
        return card.style.display !== 'none';
      });
  
      visibleProducts.sort((a, b) => {
        const aPrice = parseFloat(a.getAttribute('data-price') || '0');
        const bPrice = parseFloat(b.getAttribute('data-price') || '0');
        const aName = a.getAttribute('data-name')?.toLowerCase() || '';
        const bName = b.getAttribute('data-name')?.toLowerCase() || '';
  
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
  
      // Efficiently update the DOM
      visibleProducts.forEach(product => {
        productGrid.appendChild(product);
      });
    }
  }
  
  // Setup interactions for product cards
  function setupProductInteractions() {
    // Add to cart buttons
    const cartBtns = document.querySelectorAll('.cart-btn');
    if (cartBtns.length > 0) {
      cartBtns.forEach(btn => {
        btn.addEventListener('click', function() {
          const card = this.closest('.product-card');
          const productName = card.querySelector('.product-name')?.textContent || 'Product';
          
          // Visual feedback
          const originalText = this.innerHTML;
          this.innerHTML = '<i class="fas fa-check"></i> Added';
          this.style.backgroundColor = '#2ecc71';
          this.style.color = 'white';
          
          // Show toast notification
          showToast(`${productName} added to cart!`);
          
          // Reset button after animation
          setTimeout(() => {
            this.innerHTML = originalText;
            this.style.backgroundColor = '';
            this.style.color = '';
          }, 2000);
        });
      });
    }
    
    // Order now buttons
    const orderBtns = document.querySelectorAll('.order-btn');
    if (orderBtns.length > 0) {
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
      pageLinks.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          // Active state handling
          pageLinks.forEach(pl => pl.classList.remove('active'));
          this.classList.add('active');
          
          // Show loading effect
          showLoading();
          
          // In a real implementation, you would load the next page data here
          // For demo, we just simulate a page load
        });
      });
    }
  }
  
  // Lazy load images for better performance
  function setupLazyLoading() {
    const lazyImages = document.querySelectorAll('.lazy-load');
    
    if (lazyImages.length === 0) return;
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            observer.unobserve(img);
          }
        });
      });
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });
    } else {
      // Fallback for browsers without IntersectionObserver
      lazyImages.forEach(img => {
        img.classList.add('loaded');
      });
    }
  }
  
  // Quick view functionality
  function setupQuickView() {
    const productImages = document.querySelectorAll('.product-img');
    if (productImages.length === 0) return;
    
    // Create modal if it doesn't exist
    let quickViewModal = document.querySelector('.quick-view-modal');
    if (!quickViewModal) {
      quickViewModal = document.createElement('div');
      quickViewModal.className = 'quick-view-modal';
      document.body.appendChild(quickViewModal);
      
      const modalContent = document.createElement('div');
      modalContent.className = 'modal-content';
      quickViewModal.appendChild(modalContent);
    }
    
    // Get the modal content element
    const modalContent = quickViewModal.querySelector('.modal-content');
    
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
        
        // Populate modal content
        modalContent.innerHTML = `
          <button class="close-btn">&times;</button>
          <div class="quick-view-layout">
            <div class="quick-view-image">
              <img src="${productImage}" alt="${productName}" style="width:100%;height:auto;border-radius:4px;">
            </div>
            <div class="quick-view-info">
              <h2 style="color:#f0f0f0;margin-top:0;">${productName}</h2>
              <p class="quick-view-price" style="color:var(--main-color, #c8a97e);font-size:1.4rem;font-weight:bold;">${productPrice}</p>
              <p class="quick-view-desc" style="color:#bbb;">${productDesc}</p>
              <div class="quick-view-actions" style="display:flex;gap:10px;margin-top:20px;">
                <button class="quick-view-cart" style="padding:10px 20px;background:#2a2a2a;color:#f0f0f0;border:1px solid #444;border-radius:4px;cursor:pointer;flex:1;">Add to Cart</button>
                <button class="quick-view-order" style="padding:10px 20px;background:var(--main-color, #c8a97e);color:white;border:none;border-radius:4px;cursor:pointer;flex:2;">Order Now</button>
              </div>
            </div>
          </div>
        `;
        
        // Setup close button
        const closeBtn = modalContent.querySelector('.close-btn');
        closeBtn.addEventListener('click', () => {
          quickViewModal.style.display = 'none';
        });
        
        // Setup quick view action buttons
        const modalCartBtn = modalContent.querySelector('.quick-view-cart');
        modalCartBtn.addEventListener('click', () => {
          showToast(`${productName} added to cart!`);
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
  
  // Loading indicator function
  function showLoading() {
    // Create loading overlay if needed
    let loadingOverlay = document.querySelector('.loading-overlay');
    if (!loadingOverlay) {
      loadingOverlay = document.createElement('div');
      loadingOverlay.className = 'loading-overlay';
      document.body.appendChild(loadingOverlay);
      
      const spinner = document.createElement('div');
      spinner.className = 'spinner';
      loadingOverlay.appendChild(spinner);
      
      // Add keyframes for animation if needed
      if (!document.getElementById('spinner-animation')) {
        const style = document.createElement('style');
        style.id = 'spinner-animation';
        style.textContent = `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `;
        document.head.appendChild(style);
      }
    }
    
    // Show loading and scroll to top
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
  
  // Toast notification function
  function showToast(message) {
    let toast = document.querySelector('.toast');
    
    // Create toast if it doesn't exist
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
    }
    
    // Set message and show toast
    toast.textContent = message;
    toast.classList.remove('show');
    
    // Force DOM reflow to ensure animation works
    void toast.offsetWidth;
    
    // Show toast
    toast.classList.add('show');
    
    // Hide toast after delay
    setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  }
