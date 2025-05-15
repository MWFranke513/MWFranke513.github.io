/**
 * ScrollToTop.js - A self-contained solution for adding a scroll-to-top button to web pages
 * 
 * This IIFE (Immediately Invoked Function Expression) creates and manages a customizable
 * scroll-to-top button that appears when users scroll down the page beyond a threshold.
 * 
 * @module ScrollToTop
 * 
 * Features:
 * - Fully customizable appearance (colors, size, position)
 * - Smooth scrolling animation
 * - Automatically toggles visibility based on scroll position
 * - Hover effects and transitions
 * - Properly positioned to avoid conflicts with other fixed elements (like shopping carts)
 * 
 * Default Configuration:
 * - backgroundColor: 'rgba(26, 26, 26, 0.8)' - Semi-transparent dark background
 * - borderColor: '#d4b883' - Gold accent border color
 * - iconColor: '#d4b883' - Gold arrow icon color
 * - hoverBackgroundColor: '#d4b883' - Gold background on hover
 * - hoverIconColor: '#1a1a1a' - Dark icon on hover
 * - scrollThreshold: 300 - Pixels to scroll before showing button
 * - size: 50 - Button diameter in pixels
 * - position: { bottom: 90, right: 30 } - Positioned above typical cart elements
 * 
 * The button dynamically injects all necessary styles and SVG icon without external dependencies.
 */
// ScrollToTop.js - Complete self-contained solution
(function() {
    // Default configuration
    const defaults = {
        backgroundColor: 'rgba(26, 26, 26, 0.8)',
        borderColor: '#d4b883',
        iconColor: '#d4b883',
        hoverBackgroundColor: '#d4b883',
        hoverIconColor: '#1a1a1a',
        scrollThreshold: 300,
        size: 50,
        position: { bottom: 90, right: 30 } // Adjusted bottom position to be above shopping cart
    };

    // Create the button
    function initScrollToTop(options = {}) {
        const config = { ...defaults, ...options };
        const button = document.createElement('div');
        button.id = 'scrollToTopBtn';
        button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
        `;

        // Basic styles (always visible for debugging)
        button.style.cssText = `
            position: fixed;
            bottom: ${config.position.bottom}px;
            right: 20px;
            width: ${config.size}px;
            height: ${config.size}px;
            background-color: ${config.backgroundColor};
            border: 2px solid ${config.borderColor};
            border-radius: 50%;
            color: ${config.iconColor};
            display: flex;
            justify-content: center;
            align-items: center;
            cursor: pointer;
            opacity: 1;
            visibility: visible;
            transition: all 0.3s ease;
            z-index: 9998; // Set slightly lower than typical cart z-index
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
        `;

        // Rest of the code remains the same...
        const style = document.createElement('style');
        style.textContent = `
            #scrollToTopBtn:hover {
                background-color: ${config.hoverBackgroundColor};
                color: ${config.hoverIconColor};
                transform: translateY(-3px);
            }
            #scrollToTopBtn svg {
                width: ${config.size * 0.4}px;
                height: ${config.size * 0.4}px;
            }
        `;
        document.head.appendChild(style);
        document.body.appendChild(button);

        function toggleVisibility() {
            if (window.pageYOffset > config.scrollThreshold) {
                button.style.opacity = '1';
                button.style.visibility = 'visible';
            } else {
                button.style.opacity = '0';
                button.style.visibility = 'hidden';
            }
        }

        function scrollToTop() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        }

        window.addEventListener('scroll', toggleVisibility);
        button.addEventListener('click', scrollToTop);

        toggleVisibility();
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => initScrollToTop());
    } else {
        initScrollToTop();
    }
})();
