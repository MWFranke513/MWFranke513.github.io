// Cookie Banner Implementation
(function() {
    'use strict';

    // Check if user has already made a choice
    if (getCookie('cookieConsent')) {
        return;
    }

    // Create and inject CSS
    const style = document.createElement('style');
    style.textContent = `
        .cookie-banner {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: var(--bg2, #191714);
            border-top: var(--border, 0.1rem solid) var(--main-color, #c6965c);
            color: var(--light-text, #f5f5f5);
            padding: 24px;
            box-shadow: var(--hover-shadow, 0 8px 25px rgba(0, 0, 0, 0.15));
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            transform: translateY(100%);
            transition: var(--transition, all 0.3s ease);
            backdrop-filter: blur(8px);
        }
        .cookie-banner.show {
            transform: translateY(0);
        }
        .cookie-banner:focus-within {
            outline: 2px solid var(--main-color, #c6965c);
            outline-offset: -2px;
        }
        .cookie-content {
            max-width: 1200px;
            margin: 0 auto;
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            gap: 24px;
        }
        .cookie-text {
            flex: 1;
            min-width: 300px;
        }
        .cookie-text h3 {
            margin: 0 0 8px 0;
            font-size: 16px;
            font-weight: 600;
            color: var(--main-color, #c6965c);
        }
        .cookie-text p {
            margin: 0 0 12px 0;
            line-height: 1.5;
            font-size: 12px;
            color: var(--light-text, #f5f5f5);
        }
        .cookie-text a {
            color: var(--light-accent, #e0bb8e);
            text-decoration: underline;
            text-decoration-color: transparent;
            transition: var(--transition, all 0.3s ease);
        }
        .cookie-text a:hover,
        .cookie-text a:focus {
            color: var(--main-color, #c6965c);
            text-decoration-color: currentColor;
        }
        .cookie-actions {
            display: flex;
            flex-direction: column;
            gap: 12px;
            min-width: 200px;
        }
        .cookie-buttons {
            display: flex;
            gap: 12px;
        }
        .cookie-btn {
            padding: 12px 24px;
            border: none;
            border-radius: var(--border-radius, 8px);
            cursor: pointer;
            font-weight: 500;
            font-size: 12px;
            transition: var(--transition, all 0.3s ease);
            min-width: 100px;
            position: relative;
            overflow: hidden;
        }
        .cookie-btn:focus {
            outline: 2px solid var(--main-color, #c6965c);
            outline-offset: 2px;
        }
        .cookie-btn:disabled {
            opacity: 0.6;
            cursor: not-allowed;
        }
        .cookie-btn.accept {
            background: linear-gradient(135deg, #28a745, #20c997);
            color: #fff;
            box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        }
        .cookie-btn.accept:hover:not(:disabled) {
            background: linear-gradient(135deg, #218838, #1ea085);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
        }
        .cookie-btn.decline {
            background: linear-gradient(135deg, #dc3545, #e83e8c);
            color: #fff;
            box-shadow: 0 4px 15px rgba(220, 53, 69, 0.3);
        }
        .cookie-btn.decline:hover:not(:disabled) {
            background: linear-gradient(135deg, #c82333, #d91a72);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(220, 53, 69, 0.4);
        }
        .cookie-btn.customize {
            background: var(--bg3, #1d1a16);
            color: var(--main-color, #c6965c);
            border: 1px solid var(--main-color, #c6965c);
            padding: 8px 16px;
        }
        .cookie-btn.customize:hover:not(:disabled) {
            background: var(--main-color, #c6965c);
            color: var(--bg, #010103);
        }
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0, 0, 0, 0);
            white-space: nowrap;
            border: 0;
        }
        @media (max-width: 768px) {
            .cookie-banner {
                padding: 20px 16px;
            }
            .cookie-content {
                flex-direction: column;
                gap: 20px;
            }
            .cookie-actions {
                width: 100%;
                min-width: unset;
            }
            .cookie-buttons {
                flex-direction: column;
            }
            .cookie-btn {
                width: 100%;
            }
        }
        @media (prefers-reduced-motion: reduce) {
            .cookie-banner {
                transition: none;
            }
            .cookie-btn {
                transition: none;
            }
        }
        @media (prefers-contrast: high) {
            .cookie-banner {
                border-top-width: 3px;
            }
            .cookie-btn {
                border: 2px solid;
            }
        }
    `;
    document.head.appendChild(style);

    // Create banner HTML with improved accessibility
    const banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-labelledby', 'cookie-title');
    banner.setAttribute('aria-describedby', 'cookie-description');
    banner.innerHTML = `
        <div class="cookie-content">
            <div class="cookie-text">
                <h3 id="cookie-title">Cookie Preferences</h3>
                <p id="cookie-description">
                    We use essential cookies to make our site work and analytics cookies to understand how you interact with our website. 
                    <a href="/privacy-policy" target="_blank" rel="noopener">Learn more about our privacy practices</a>.
                </p>
            </div>
            <div class="cookie-actions">
                <button class="cookie-btn customize" onclick="showCookieSettings()" aria-describedby="customize-help">
                    Customize Settings
                </button>
                <div class="cookie-buttons">
                    <button class="cookie-btn decline" onclick="handleCookieChoice(false)" aria-describedby="decline-help">
                        <span class="sr-only">Decline all non-essential cookies</span>
                        Decline All
                    </button>
                    <button class="cookie-btn accept" onclick="handleCookieChoice(true)" aria-describedby="accept-help">
                        <span class="sr-only">Accept all cookies</span>
                        Accept All
                    </button>
                </div>
            </div>
        </div>
        <div id="customize-help" class="sr-only">Opens cookie preference center</div>
        <div id="decline-help" class="sr-only">Declines all non-essential cookies</div>
        <div id="accept-help" class="sr-only">Accepts all cookies for enhanced experience</div>
    `;

    // Add banner to page
    document.body.appendChild(banner);

    // Trap focus within banner
    const focusableElements = banner.querySelectorAll('button, a, [tabindex]:not([tabindex="-1"])');
    const firstFocusable = focusableElements[0];
    const lastFocusable = focusableElements[focusableElements.length - 1];

    banner.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            if (e.shiftKey) {
                if (document.activeElement === firstFocusable) {
                    e.preventDefault();
                    lastFocusable.focus();
                }
            } else {
                if (document.activeElement === lastFocusable) {
                    e.preventDefault();
                    firstFocusable.focus();
                }
            }
        }
        if (e.key === 'Escape') {
            handleCookieChoice(false);
        }
    });

    // Show banner after page loads
    window.addEventListener('load', function() {
        setTimeout(() => {
            banner.classList.add('show');
            firstFocusable.focus();
        }, 500);
    });

    // Cookie utility functions
    function setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${value};expires=${expires.toUTCString()};path=/;SameSite=Strict;Secure`;
    }

    function getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for(let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Handle user choice
    window.handleCookieChoice = function(accepted) {
        const buttons = banner.querySelectorAll('.cookie-btn');
        buttons.forEach(btn => btn.disabled = true);

        setCookie('cookieConsent', accepted ? 'accepted' : 'declined', 365);
        setCookie('cookieConsentDate', new Date().toISOString(), 365);
        
        // Hide banner
        banner.classList.remove('show');
        setTimeout(() => {
            banner.remove();
            // Return focus to main content
            const main = document.querySelector('main, #main, .main-content');
            if (main) main.focus();
        }, 300);

        // Trigger custom event for other scripts to listen to
        const event = new CustomEvent('cookieConsentChanged', {
            detail: { 
                accepted: accepted,
                timestamp: new Date().toISOString(),
                version: '1.0'
            }
        });
        document.dispatchEvent(event);
    };

    // Placeholder for cookie settings modal
    window.showCookieSettings = function() {
        // This would open a detailed cookie preferences modal
        console.log('Cookie settings would open here');
        // For now, default to accept
        handleCookieChoice(true);
    };
})();