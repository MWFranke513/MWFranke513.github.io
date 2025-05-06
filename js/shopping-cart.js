// shopping-cart.js - Shopping Cart System with Square Integration
class ShoppingCart {
    constructor() {
      this.items = JSON.parse(localStorage.getItem('cartItems')) || [];
      this.cartVisible = false;
      this.init();
    }
  
    init() {
      // Create cart icon and container
      this.createCartElements();
      // Add event listeners
      this.addEventListeners();
      // Update cart badge
      this.updateCartBadge();
    }
  
    createCartElements() {
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
          background-color: white;
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
          font-size: 24px;
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
          background: #eee;
          border: none;
          width: 25px;
          height: 25px;
          border-radius: 4px;
          font-weight: bold;
          cursor: pointer;
        }
  
        .item-quantity {
          margin: 0 10px;
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
        }
  
        .checkout-button {
          background-color: #a17137;
          color: white;
          border: none;
          border-radius: 4px;
          padding: 10px;
          width: 100%;
          font-weight: bold;
          cursor: pointer;
          transition: background-color 0.3s;
        }
  
        .checkout-button:hover {
          background-color: #c6965c;
        }
  
        .empty-cart-message {
          text-align: center;
          padding: 20px;
          color: #666;
        }
      `;
  
      // Append elements to the DOM
      document.body.appendChild(cartStyles);
      document.body.appendChild(cartIcon);
      document.body.appendChild(cartContainer);
    }
  
    addEventListeners() {
      // Cart icon click
      document.getElementById('cart-icon').addEventListener('click', () => {
        this.toggleCart();
      });
  
      // Close cart button click
      document.getElementById('close-cart').addEventListener('click', () => {
        this.hideCart();
      });
  
      // Checkout button click
      document.getElementById('checkout-button').addEventListener('click', () => {
        this.proceedToCheckout();
      });
  
      // Close cart when clicking outside
      document.getElementById('cart-container').addEventListener('click', (e) => {
        if (e.target.id === 'cart-container') {
          this.hideCart();
        }
      });
    }
  
    toggleCart() {
      this.cartVisible = !this.cartVisible;
      document.getElementById('cart-container').style.display = this.cartVisible ? 'block' : 'none';
      if (this.cartVisible) {
        this.renderCartItems();
      }
    }
  
    hideCart() {
      this.cartVisible = false;
      document.getElementById('cart-container').style.display = 'none';
    }
  
    renderCartItems() {
      const cartItemsEl = document.getElementById('cart-items');
      cartItemsEl.innerHTML = '';
  
      if (this.items.length === 0) {
        cartItemsEl.innerHTML = '<div class="empty-cart-message">Your cart is empty</div>';
        return;
      }
  
      this.items.forEach((item, index) => {
        const itemEl = document.createElement('div');
        itemEl.className = 'cart-item';
        itemEl.innerHTML = `
          <div class="cart-item-details">
            <div class="cart-item-title">${item.name}</div>
            <div class="cart-item-price">$${item.price.toFixed(2)}</div>
          </div>
          <div class="cart-item-actions">
            <button class="quantity-btn decrease-btn" data-index="${index}">-</button>
            <span class="item-quantity">${item.quantity}</span>
            <button class="quantity-btn increase-btn" data-index="${index}">+</button>
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
      // product should have: id, name, price
      const existingItem = this.items.find(item => item.id === product.id);
      
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        this.items.push({
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        });
      }
  
      this.saveCart();
      this.updateCartBadge();
      
      // Show a brief notification
      this.showAddedToCartNotification(product.name);
    }
  
    showAddedToCartNotification(productName) {
      // Create notification element
      const notification = document.createElement('div');
      notification.className = 'cart-notification';
      notification.innerHTML = `<span>${productName} added to cart!</span>`;
      
      // Add styles
      const notificationStyle = document.createElement('style');
      notificationStyle.textContent = `
        .cart-notification {
          position: fixed;
          bottom: 80px;
          right: 20px;
          background-color: #4a86e8;
          color: white;
          padding: 10px 15px;
          border-radius: 4px;
          z-index: 1001;
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
      this.saveCart();
      this.renderCartItems();
      this.updateCartBadge();
    }
  
    removeItem(index) {
      this.items.splice(index, 1);
      this.saveCart();
      this.renderCartItems();
      this.updateCartBadge();
    }
  
    saveCart() {
      localStorage.setItem('cartItems', JSON.stringify(this.items));
    }
  
    updateCartBadge() {
      const totalItems = this.items.reduce((total, item) => total + item.quantity, 0);
      document.getElementById('cart-badge').textContent = totalItems;
    }
  
    updateCartTotal() {
      const total = this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
      document.getElementById('cart-total-amount').textContent = `$${total.toFixed(2)}`;
    }
  
    // Square Integration for Checkout
    proceedToCheckout() {
      // Redirect to checkout page with cart data
      // Create a form to POST data
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = '/checkout.html'; // Your checkout page
      form.style.display = 'none';
  
      // Add cart data as hidden input
      const cartInput = document.createElement('input');
      cartInput.type = 'hidden';
      cartInput.name = 'cartData';
      cartInput.value = JSON.stringify(this.items);
      form.appendChild(cartInput);
  
      // Add form to body and submit
      document.body.appendChild(form);
      form.submit();
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
    }
  }
  
  // Initialize cart when DOM is loaded
  document.addEventListener('DOMContentLoaded', () => {
    window.shoppingCart = new ShoppingCart();
  });
  
  // Product card click handler - can be called from product pages
  function addProductToCart(productId, productName, productPrice) {
    if (window.shoppingCart) {
      window.shoppingCart.addToCart({
        id: productId,
        name: productName,
        price: productPrice
      });
    }
  }