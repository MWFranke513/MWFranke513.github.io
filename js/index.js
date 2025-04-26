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


  // Product filtering
  const filterBtns = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');
  const sortSelect = document.getElementById('sort-select');
  
  // Filter products by category
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      const filter = btn.getAttribute('data-filter');
      
      productCards.forEach(card => {
        if (filter === 'all' || card.getAttribute('data-category') === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
      
      // Re-apply sorting after filtering
      if (sortSelect) {
        sortProducts(sortSelect.value);
      }
    });
  });
  
  // Sort products
  if (sortSelect) {
    sortSelect.addEventListener('change', () => {
      sortProducts(sortSelect.value);
    });
  }
  
  function sortProducts(sortType) {
    const grid = document.querySelector('.product-grid');
    const products = Array.from(productCards);
    
    products.sort((a, b) => {
      switch(sortType) {
        case 'price-low':
          return parseFloat(a.getAttribute('data-price')) - parseFloat(b.getAttribute('data-price'));
        case 'price-high':
          return parseFloat(b.getAttribute('data-price')) - parseFloat(a.getAttribute('data-price'));
        case 'name':
          return a.getAttribute('data-name').localeCompare(b.getAttribute('data-name'));
        default:
          return 0;
      }
    });
    
    // Remove all products then add them back in sorted order
    products.forEach(product => {
      grid.appendChild(product);
    });
  }
  
  // Lazy loading for images
  const lazyImages = document.querySelectorAll('.lazy-load');
  
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
    // Fallback for browsers that don't support IntersectionObserver
    lazyImages.forEach(img => {
      img.classList.add('loaded');
    });
  }
  
  // Product badges animation
  const badges = document.querySelectorAll('.product-badge');
  badges.forEach(badge => {
    badge.style.transform = 'translateX(0)';
    badge.style.opacity = '1';
  });
  
  // Add to cart functionality
  const cartBtns = document.querySelectorAll('.cart-btn');
  cartBtns.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const card = this.closest('.product-card');
      const productName = card.querySelector('.product-name').textContent;
      
      // Animation effect
      this.innerHTML = '<i class="fas fa-check"></i> Added';
      this.style.backgroundColor = '#2ecc71';
      this.style.color = 'white';
      
      // Show a toast notification
      showToast(`${productName} added to cart!`);
      
      // Reset button after 2 seconds
      setTimeout(() => {
        this.innerHTML = '<i class="fas fa-cart-plus"></i> Add to Cart';
        this.style.backgroundColor = '';
        this.style.color = '';
      }, 2000);
    });
  });
  
  // Order now button
  const orderBtns = document.querySelectorAll('.order-btn');
  orderBtns.forEach(btn => {
    btn.addEventListener('click', function() {
      const card = this.closest('.product-card');
      const productName = card.querySelector('.product-name').textContent;
      
      // Here you would typically redirect to order page
      // For now, we'll just simulate with a toast message
      showToast(`Ordering ${productName}...`);
      
      // Simulate redirect
      setTimeout(() => {
        window.location.href = 'order.html';
      }, 1000);
    });
  });
  
  // Toast notification function
  function showToast(message) {
    // Create toast if it doesn't exist
    let toast = document.querySelector('.toast');
    if (!toast) {
      toast = document.createElement('div');
      toast.className = 'toast';
      document.body.appendChild(toast);
      
      // Style the toast
      toast.style.position = 'fixed';
      toast.style.bottom = '20px';
      toast.style.right = '20px';
      toast.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      toast.style.color = 'white';
      toast.style.padding = '12px 20px';
      toast.style.borderRadius = '4px';
      toast.style.zIndex = '1000';
      toast.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      toast.style.transform = 'translateY(20px)';
      toast.style.opacity = '0';
    }
    
    // Set message and show toast
    toast.textContent = message;
    setTimeout(() => {
      toast.style.transform = 'translateY(0)';
      toast.style.opacity = '1';
      
      // Hide toast after 3 seconds
      setTimeout(() => {
        toast.style.transform = 'translateY(20px)';
        toast.style.opacity = '0';
      }, 3000);
    }, 100);
  }
  
  // Pagination functionality
  const pageLinks = document.querySelectorAll('.page-link');
  pageLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Remove active class from

      pageLinks.forEach(pl => pl.classList.remove('active'));
      
      // Add active class to clicked link
      this.classList.add('active');
      
      // Here you would typically load the next page of products
      // For demo purposes, we'll scroll to top and show a loading indicator
      if (this.classList.contains('next')) {
        showLoading();
      } else {
        // Simulate page change
        showLoading();
      }
    });
  });
  
  // Loading indicator function
  function showLoading() {
    // Create loading overlay if it doesn't exist
    let loadingOverlay = document.querySelector('.loading-overlay');
    if (!loadingOverlay) {
      loadingOverlay = document.createElement('div');
      loadingOverlay.className = 'loading-overlay';
      document.body.appendChild(loadingOverlay);
      
      // Style the loading overlay
      loadingOverlay.style.position = 'fixed';
      loadingOverlay.style.top = '0';
      loadingOverlay.style.left = '0';
      loadingOverlay.style.width = '100%';
      loadingOverlay.style.height = '100%';
      loadingOverlay.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
      loadingOverlay.style.display = 'flex';
      loadingOverlay.style.justifyContent = 'center';
      loadingOverlay.style.alignItems = 'center';
      loadingOverlay.style.zIndex = '2000';
      
      // Create spinner
      const spinner = document.createElement('div');
      spinner.className = 'spinner';
      loadingOverlay.appendChild(spinner);
      
      // Style the spinner
      spinner.style.width = '40px';
      spinner.style.height = '40px';
      spinner.style.border = '4px solid #f3f3f3';
      spinner.style.borderTop = '4px solid var(--main-color)';
      spinner.style.borderRadius = '50%';
      spinner.style.animation = 'spin 1s linear infinite';
      
      // Add keyframes for spinner animation
      const style = document.createElement('style');
      style.textContent = `
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `;
      document.head.appendChild(style);
    }
    
    // Show loading overlay
    loadingOverlay.style.display = 'flex';
    
    // Scroll to top
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Hide loading overlay after 1 second (simulating page load)
    setTimeout(() => {
      loadingOverlay.style.display = 'none';
    }, 1000);
  }
  
  // Quick view functionality (optional)
  function setupQuickView() {
    // Create modal container
    const quickViewModal = document.createElement('div');
    quickViewModal.className = 'quick-view-modal';
    quickViewModal.style.display = 'none';
    document.body.appendChild(quickViewModal);
    
    // Style the modal
    quickViewModal.style.position = 'fixed';
    quickViewModal.style.top = '0';
    quickViewModal.style.left = '0';
    quickViewModal.style.width = '100%';
    quickViewModal.style.height = '100%';
    quickViewModal.style.backgroundColor = 'rgba(0, 0, 0, 0.7)';
    quickViewModal.style.zIndex = '2000';
    quickViewModal.style.display = 'none';
    quickViewModal.style.justifyContent = 'center';
    quickViewModal.style.alignItems = 'center';
    quickViewModal.style.padding = '20px';
    
    // Create modal content
    const modalContent = document.createElement('div');
    modalContent.className = 'modal-content';
    quickViewModal.appendChild(modalContent);
    
    // Style modal content
    modalContent.style.backgroundColor = 'white';
    modalContent.style.borderRadius = '8px';
    modalContent.style.maxWidth = '800px';
    modalContent.style.width = '100%';
    modalContent.style.padding = '20px';
    modalContent.style.position = 'relative';
    modalContent.style.maxHeight = '90vh';
    modalContent.style.overflow = 'auto';
    
    // Close button
    const closeBtn = document.createElement('button');
    closeBtn.innerHTML = '&times;';
    closeBtn.className = 'close-btn';
    modalContent.appendChild(closeBtn);
    
    // Style close button
    closeBtn.style.position = 'absolute';
    closeBtn.style.top = '10px';
    closeBtn.style.right = '10px';
    closeBtn.style.backgroundColor = 'transparent';
    closeBtn.style.border = 'none';
    closeBtn.style.fontSize = '24px';
    closeBtn.style.cursor = 'pointer';
    
    // Close modal on button click
    closeBtn.addEventListener('click', () => {
      quickViewModal.style.display = 'none';
    });
    
    // Close modal when clicking outside content
    quickViewModal.addEventListener('click', (e) => {
      if (e.target === quickViewModal) {
        quickViewModal.style.display = 'none';
      }
    });
    
    // Add quick view functionality to product images
    const productImages = document.querySelectorAll('.product-img');
    productImages.forEach(img => {
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const productName = card.querySelector('.product-name').textContent;
        const productImage = this.src;
        const productPrice = card.querySelector('.price').textContent;
        const productDesc = card.querySelector('.description').textContent;
        
        // Populate modal content
        modalContent.innerHTML = `
          <button class="close-btn">&times;</button>
          <div class="quick-view-layout">
            <div class="quick-view-image">
              <img src="${productImage}" alt="${productName}">
            </div>
            <div class="quick-view-info">
              <h2>${productName}</h2>
              <p class="quick-view-price">${productPrice}</p>
              <p class="quick-view-desc">${productDesc}</p>
              <div class="quick-view-actions">
                <button class="quick-view-cart">Add to Cart</button>
                <button class="quick-view-order">Order Now</button>
              </div>
            </div>
          </div>
        `;
        
        // Style quick view layout
        const layout = modalContent.querySelector('.quick-view-layout');
        layout.style.display = 'grid';
        layout.style.gridTemplateColumns = '1fr 1fr';
        layout.style.gap = '20px';
        
        // Responsive adjustment
        if (window.innerWidth < 768) {
          layout.style.gridTemplateColumns = '1fr';
        }
        
        // Style image container
        const imgContainer = modalContent.querySelector('.quick-view-image');
        imgContainer.style.borderRadius = '8px';
        imgContainer.style.overflow = 'hidden';
        
        // Style image
        const modalImg = imgContainer.querySelector('img');
        modalImg.style.width = '100%';
        modalImg.style.height = 'auto';
        modalImg.style.objectFit = 'cover';
        modalImg.style.borderRadius = '4px';
        
        // Style info
        const info = modalContent.querySelector('.quick-view-info');
        info.style.display = 'flex';
        info.style.flexDirection = 'column';
        
        // Re-assign close button functionality
        const newCloseBtn = modalContent.querySelector('.close-btn');
        newCloseBtn.style.position = 'absolute';
        newCloseBtn.style.top = '10px';
        newCloseBtn.style.right = '10px';
        newCloseBtn.style.backgroundColor = 'transparent';
        newCloseBtn.style.border = 'none';
        newCloseBtn.style.fontSize = '24px';
        newCloseBtn.style.cursor = 'pointer';
        
        newCloseBtn.addEventListener('click', () => {
          quickViewModal.style.display = 'none';
        });
        
        // Style action buttons
        const actionBtns = modalContent.querySelectorAll('.quick-view-actions button');
        actionBtns.forEach(btn => {
          btn.style.padding = '10px 20px';
          btn.style.margin = '5px';
          btn.style.border = 'none';
          btn.style.borderRadius = '4px';
          btn.style.cursor = 'pointer';
          btn.style.fontWeight = 'bold';
        });
        
        const cartBtn = modalContent.querySelector('.quick-view-cart');
        cartBtn.style.backgroundColor = '#f5f5f5';
        cartBtn.style.color = '#333';
        
        const orderBtn = modalContent.querySelector('.quick-view-order');
        orderBtn.style.backgroundColor = 'var(--main-color)';
        orderBtn.style.color = 'white';
        
        // Show the modal
        quickViewModal.style.display = 'flex';
      });
    });
  }
  
  // Initialize quick view functionality
  setupQuickView();

