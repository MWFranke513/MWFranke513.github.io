/**
 * @class ShoppingCart
 * @description Manages shopping cart functionality including item management, UI rendering, and checkout process
 * 
 * @property {Array} items - Array of cart items stored in localStorage
 * @property {boolean} cartVisible - Controls visibility state of the cart UI
 * 
 * @method init() - Initializes cart elements and event listeners
 * @method initializeProductButtons() - Legacy method for initializing add-to-cart buttons
 * @method createCartElements() - Creates and styles cart UI elements
 * @method addEventListeners() - Sets up event listeners for cart interactions
 * @method toggleCart() - Toggles cart visibility
 * @method hideCart() - Hides the cart UI
 * @method renderCartItems() - Renders cart items in the UI
 * @method addToCart(product) - Adds a product to cart
 * @method showAddedToCartNotification(productName) - Shows notification when item is added
 * @method decreaseQuantity(index) - Decreases item quantity
 * @method increaseQuantity(index) - Increases item quantity
 * @method removeItem(index) - Removes item from cart
 * @method saveCart() - Saves cart state to localStorage
 * @method updateCartBadge() - Updates the cart item count badge
 * @method updateCartTotal() - Updates the total price display
 * @method proceedToCheckout() - Handles checkout process
 * @method getCartData() - Returns current cart items
 * @method clearCart() - Clears all items from cart
 * 
 * @example
 * const cart = new ShoppingCart();
 * cart.addToCart({
 *   id: "product1",
 *   name: "Sample Product",
 *   price: 19.99
 * });
 */
// shopping-cart.js - Shopping Cart System with Square Integration

class ShoppingCart {
  constructor() {
    this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
    this.cartVisible = false;
    this.init();
    console.log('Shopping cart initialized with', this.items.length, 'items');
  }

  init() {
    // Create cart icon and container
    this.createCartElements();
    // Add event listeners
    this.addEventListeners();
    // Update cart badge
    this.updateCartBadge();
  }

  // Method to initialize add-to-cart buttons - Not used directly anymore
  // This is now handled by product-page-integration.js
  initializeProductButtons() {
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        const productCard = e.target.closest('.product-card');
        const productId = productCard.dataset.category; // Using category as ID
        const productName = productCard.dataset.name;
        const productPrice = parseFloat(productCard.dataset.price);
        
        this.addToCart({
          id: productId,
          name: productName,
          price: productPrice
        });
      });
    });
  }

  createCartElements() {
    // Check if cart icon already exists
    if (document.getElementById('cart-icon')) {
      console.log('Cart icon already exists, skipping creation');
      return;
    }

    // Create cart icon
    const cartIcon = document.createElement('div');
    cartIcon.id = 'cart-icon';
    cartIcon.innerHTML = `
      <div class="cart-icon-container">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="9" cy="21" r="1"></circle>
          <circle cx="20" cy="21" r="1"></circle>
          <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
        </svg>
        <span id="cart-badge" class="cart-badge">0</span>
      </div>
    `;

    // Create cart container
    const cartContainer = document.createElement('div');
    cartContainer.id = 'cart-container';
    cartContainer.innerHTML = `
      <div id="cart-popup" class="cart-popup">
        <div class="cart-header">
          <h3>Your Cart</h3>
          <button id="close-cart" class="close-cart">&times;</button>
        </div>
        <div id="cart-items" class="cart-items"></div>
        <div class="cart-footer">
          <div class="cart-total">
            <span>Total:</span>
            <span id="cart-total-amount">$0.00</span>
          </div>
          <button id="checkout-button" class="checkout-button">Checkout</button>
        </div>
      </div>
    `;

    // Create and append styles
    const cartStyles = document.createElement('style');
    cartStyles.textContent = `
      #cart-icon {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 1000;
        cursor: pointer;
      }

      .cart-icon-container {
        background-color: #a17137;
        color: white;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }

      .cart-badge {
        position: absolute;
        top: -5px;
        right: -5px;
        background-color: #ff4d4d;
        color: white;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
      }

      #cart-container {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 999;
        display: none;
        background-color: rgba(0, 0, 0, 0.5);
      }

      .cart-popup {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: var(--bg2);
        color: #fff;
        border-radius: 8px;
        width: 90%;
        max-width: 400px;
        max-height: 80vh;
        display: flex;
        flex-direction: column;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
      }

      .cart-header {
        padding: 15px;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .cart-header h3 {
        margin: 0;
        font-size: 18px;
      }

      .close-cart {
        background: none;
        border: none;
        font-size: 28px;
        cursor: pointer;
        color: #666;
      }

      .cart-items {
        padding: 15px;
        overflow-y: auto;
        flex-grow: 1;
      }

      .cart-item {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 0;
        border-bottom: 1px solid #eee;
      }

      .cart-item-details {
        flex-grow: 1;
      }

      .cart-item-title {
        font-weight: bold;
        font-size: 14px;
      }

      .cart-item-price, .cart-item-quantity {
        font-size: 14px;
        color: #666;
      }

      .cart-item-actions {
        display: flex;
        align-items: center;
      }

      .quantity-btn {
        background: var(--accent-color);
        color: #fff;
        border: none;
        width: 25px;
        height: 25px;
        border-radius: 4px;
        font-weight: bold;
        cursor: pointer;
      }

      .quantity-btn:hover {
        background-color: #c6965c;
      }

      .item-quantity {
        margin: 0 10px;
        font-size: 14px;
      }

      .remove-item {
        color: #ff4d4d;
        background: none;
        border: none;
        cursor: pointer;
        margin-left: 10px;
      }

      .cart-footer {
        padding: 15px;
        border-top: 1px solid #eee;
      }

      .cart-total {
        display: flex;
        justify-content: space-between;
        font-weight: bold;
        margin-bottom: 15px;
        font-size: 14px;
      }

      .checkout-button {
        background-image: linear-gradient(to right, var(--main-color) 0%, var(--light-accent) 51%, var(--accent-color) 100%);
        color: white;
        box-shadow: 0 4px 15px rgba(198, 150, 92, 0.3);
        border: none;
        border-radius: 4px;
        padding: 10px;
        width: 100%;
        font-weight: bold;
        cursor: pointer;
        transition: var(--transition);
      }

      .checkout-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(198, 150, 92, 0.4);
        background-position: right center;
      }

      .empty-cart-message {
        text-align: center;
        padding: 20px;
        color: #666;
        font-size: 12px;
      }

      .cart-item-image {
        width: 50px;
        height: 50px;
        margin-right: 10px;
        flex-shrink: 0;
      }

      .cart-item-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 4px;
      }
    `;

    // Append elements to the DOM
    document.body.appendChild(cartStyles);
    document.body.appendChild(cartIcon);
    document.body.appendChild(cartContainer);
    
    console.log('Cart elements created and appended to DOM');
  }

  addEventListeners() {
    // Cart icon click
    const cartIcon = document.getElementById('cart-icon');
    if (cartIcon) {
      cartIcon.addEventListener('click', () => {
        console.log('Cart icon clicked');
        this.toggleCart();
      });
    } else {
      console.error('Cart icon not found in DOM');
    }

    // Close cart button click
    const closeCartBtn = document.getElementById('close-cart');
    if (closeCartBtn) {
      closeCartBtn.addEventListener('click', () => {
        console.log('Close cart clicked');
        this.hideCart();
      });
    }

    // Checkout button click
    const checkoutBtn = document.getElementById('checkout-button');
    if (checkoutBtn) {
      checkoutBtn.addEventListener('click', () => {
        console.log('Checkout button clicked');
        this.proceedToCheckout();
      });
    }

    // Close cart when clicking outside
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      cartContainer.addEventListener('click', (e) => {
        if (e.target.id === 'cart-container') {
          console.log('Clicked outside cart, hiding');
          this.hideCart();
        }
      });
    }
  }

  toggleCart() {
    this.cartVisible = !this.cartVisible;
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      cartContainer.style.display = this.cartVisible ? 'block' : 'none';
      if (this.cartVisible) {
        console.log('Displaying cart and rendering items');
        this.renderCartItems();
      }
    } else {
      console.error('Cart container not found');
    }
  }

  hideCart() {
    this.cartVisible = false;
    const cartContainer = document.getElementById('cart-container');
    if (cartContainer) {
      cartContainer.style.display = 'none';
    }
  }

// Update the renderCartItems method to include image display
renderCartItems() {
  const cartItemsEl = document.getElementById('cart-items');
  if (!cartItemsEl) {
    console.error('Cart items container not found');
    return;
  }
  
  cartItemsEl.innerHTML = '';

  if (this.items.length === 0) {
    cartItemsEl.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
    return;
  }

  this.items.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.innerHTML = `
      <div class="cart-item-image">
        <img src="${item.image || 'images/placeholder.jpg'}" alt="${item.name}" onerror="this.src='images/placeholder.jpg'">
      </div>
      <div class="cart-item-details">
        <div class="cart-item-title">${item.name}</div>
        <div class="cart-item-price">$${item.price.toFixed(2)}</div>
      </div>
      <div class="cart-item-actions">
        <div class="quantity-controls">
          <button class="quantity-btn increase-btn" data-index="${index}">+</button>
          <span class="item-quantity">${item.quantity}</span>
          <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
        </div>
        <button class="remove-item" data-index="${index}">✕</button>
      </div>
    `;
    cartItemsEl.appendChild(itemEl);
  });

  // Add event listeners for quantity buttons and remove buttons
  document.querySelectorAll('.decrease-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      this.decreaseQuantity(index);
    });
  });

  document.querySelectorAll('.increase-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      this.increaseQuantity(index);
    });
  });

  document.querySelectorAll('.remove-item').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const index = parseInt(e.target.getAttribute('data-index'));
      this.removeItem(index);
    });
  });

  // Update total
  this.updateCartTotal();
}

  addToCart(product) {
    // Log the product being added
    console.log('Adding to cart:', product);
    
    // Validate product data
    if (!product.id || !product.name || isNaN(product.price)) {
      console.error('Invalid product data:', product);
      return;
    }
    
    // Use quantity from product or default to 1
    const quantity = product.quantity || 1;
    
    // product should have: id, name, price, quantity
    const existingItem = this.items.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity; // Add the selected quantity
      console.log(`Increased quantity by ${quantity} for existing item:`, existingItem.name);
    } else {
      this.items.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity, // Use the selected quantity
        image: product.image || 'images/placeholder.jpg'
      });
      console.log(`Added new item to cart with quantity ${quantity}:`, product.name);
    }

    this.saveCart();
    this.updateCartBadge();
    if (this.cartVisible) {
      this.renderCartItems();
    }
    
    // Show a brief notification with quantity
    this.showAddedToCartNotification(product.name, quantity);
  }

  showAddedToCartNotification(productName, quantity = 1) {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    
    // Show different message based on quantity
    const message = quantity === 1 ? 
      `${productName} added to cart!` : 
      `${quantity}x ${productName} added to cart!`;
      
    notification.innerHTML = `<span>${message}</span>`;
    
    // Add styles (keep existing styles)
    const notificationStyle = document.createElement('style');
    notificationStyle.textContent = `
      .cart-notification {
        position: fixed;
        font-size: 12px;
        bottom: 80px;
        right: 20px;
        background-color:rgba(51, 51, 51, 0.88);
        color: white;
        padding: 10px 15px;
        border-radius: 4px;
        z-index: 99999;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.3s, transform 0.3s;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
      }
      
      .cart-notification.show {
        opacity: 1;
        transform: translateY(0);
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
        document.body.removeChild(notification);
      }, 300);
    }, 3000);
  }

  decreaseQuantity(index) {
    if (this.items[index].quantity > 1) {
      this.items[index].quantity -= 1;
      console.log('Decreased quantity for', this.items[index].name);
    } else {
      this.removeItem(index);
      return;
    }
    
    this.saveCart();
    this.renderCartItems();
    this.updateCartBadge();
  }

  increaseQuantity(index) {
    this.items[index].quantity += 1;
    console.log('Increased quantity for', this.items[index].name);
    
    this.saveCart();
    this.renderCartItems();
    this.updateCartBadge();
  }

  removeItem(index) {
    const itemName = this.items[index].name;
    this.items.splice(index, 1);
    console.log('Removed item:', itemName);
    
    this.saveCart();
    this.renderCartItems();
    this.updateCartBadge();
  }

  saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.items));
    console.log('Cart saved to localStorage with', this.items.length, 'items');
  }

  updateCartBadge() {
    const totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
    const cartBadge = document.getElementById('cart-badge');
    if (cartBadge) {
      cartBadge.textContent = totalItems;
      console.log('Cart badge updated:', totalItems);
    } else {
      console.error('Cart badge element not found');
    }
    this.updateCartTotal();
  }

  updateCartTotal() {
    const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const totalElement = document.getElementById('cart-total-amount');
    if (totalElement) {
      totalElement.textContent = `$${total.toFixed(2)}`;
      console.log('Cart total updated:', total.toFixed(2));
    }
  }

  // Improved Checkout Process
  proceedToCheckout() {
    if (this.items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    
    // Store cart data in sessionStorage for checkout page
    sessionStorage.setItem('checkoutCartData', JSON.stringify(this.items));
    console.log('Cart data stored in sessionStorage for checkout');
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';
  }

  // Helper method to get cart data
  getCartData() {
    return this.items;
  }

  // Clear cart after successful order
  clearCart() {
    this.items = [];
    this.saveCart();
    this.updateCartBadge();
    console.log('Cart cleared');
  }
}

// Function to integrate with product page buttons
function connectProductButtons() {
  console.log('Connecting product buttons to cart...');
  
  // Make sure the shopping cart exists
  if (!window.shoppingCart) {
    console.error('Shopping cart not initialized yet');
    return false;
  }
  
  // Add to cart buttons
  const cartBtns = document.querySelectorAll('.cart-btn');
  if (cartBtns.length > 0) {
    console.log(`Found ${cartBtns.length} cart buttons to connect`);
    
    cartBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const card = this.closest('.product-card');
        if (!card) {
          console.error('Product card not found for button:', this);
          return;
        }
        
        // Get the quantity from the quantity control
        const quantityDisplay = card.querySelector('.quantity-display');
        const quantity = quantityDisplay ? parseInt(quantityDisplay.textContent) : 1;
        
        // Use a more unique identifier - combination of category and name if available
        const productId = card.dataset.id || 
                         (card.dataset.category && card.dataset.name ? 
                          `${card.dataset.category}-${card.dataset.name}` : 
                          `product-${Date.now()}`);
        const productName = card.dataset.name || card.querySelector('.product-name')?.textContent;
        const productPrice = parseFloat(card.dataset.price);
        
        // Fix: Get the image properly from the product card
        let productImage = 'images/placeholder.jpg'; // Default fallback
        
        // Try to get image from the product card
        const imgElement = card.querySelector('.product-img') || 
                          card.querySelector('.product-image-container img') || 
                          card.querySelector('img');
        
        if (imgElement && imgElement.src) {
          productImage = imgElement.src;
          console.log('Found product image:', productImage);
        } else {
          console.warn('No image found for product:', productName);
          // Try to construct image path based on product name
          if (productName) {
            const imageName = productName.toLowerCase()
              .replace(/[^a-z0-9]/g, '-')
              .replace(/-+/g, '-')
              .replace(/^-|-$/g, '');
            productImage = `images/${imageName}.webp`;
            console.log('Generated image path:', productImage);
          }
        }
        
        if (productName && !isNaN(productPrice)) {
          console.log(`Adding to cart: ${productName} - $${productPrice} x${quantity}`);
          console.log('Product image being added:', productImage);
          
          // Add to shopping cart with quantity and image
          window.shoppingCart.addToCart({
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity,
            image: productImage
          });
        } else {
          console.error('Invalid product data:', {
            id: productId,
            name: productName,
            price: productPrice,
            quantity: quantity
          });
        }
      });
    });
    
    return true;
  } else {
    console.warn('No cart buttons found on page');
    return false;
  }
}

// Single initialization point when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM content loaded, initializing shopping cart...');
  
  // Create cart instance or reinitialize it
  if (!window.shoppingCart) {
    window.shoppingCart = new ShoppingCart();
  } else {
    // Force recreation of cart elements to ensure they exist on this page
    window.shoppingCart.createCartElements();
    window.shoppingCart.addEventListeners();
    window.shoppingCart.updateCartBadge();
  }
  
  // Connect product buttons after a short delay to ensure cart is ready
  setTimeout(() => {
    const connected = connectProductButtons();
    if (!connected) {
      console.log('Retrying button connection...');
      setTimeout(connectProductButtons, 500); // Try once more after 500ms
    }
  }, 100);
});