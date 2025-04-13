/**
 * desktop-responsive.js
 * 
 * This script handles responsive behavior for the StudySync application
 * It's designed to work with the desktop-first.css approach
 */

(function() {
    'use strict';

    // DOM Elements
    const header = document.getElementById('header');
    const menuToggle = document.querySelector('.header-menu-toggle');
    const mainNav = document.querySelector('.header-main-nav');
    
    // Add mobile menu toggle functionality
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Toggle active class on menu button
            this.classList.toggle('is-clicked');
            
            // Toggle mobile-menu-open class on nav
            mainNav.classList.toggle('mobile-menu-open');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        const target = e.target;
        
        // If click is outside the nav and the menu is open, close it
        if (!target.closest('#header-nav-wrap') && 
            !target.closest('.header-menu-toggle') && 
            mainNav.classList.contains('mobile-menu-open')) {
            
            // Remove active class from menu button
            if (menuToggle) {
                menuToggle.classList.remove('is-clicked');
            }
            
            // Close the menu
            mainNav.classList.remove('mobile-menu-open');
        }
    });
    
    // Add scroll event listener for header
    window.addEventListener('scroll', function() {
        // If scrolled down more than 50px, add 'scrolled' class to header
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Responsive image loading
    // Load higher resolution images on desktop, lower on mobile
    function handleResponsiveImages() {
        const responsiveImages = document.querySelectorAll('[data-src-desktop]');
        const isMobile = window.innerWidth < 768;
        
        responsiveImages.forEach(img => {
            if (isMobile && img.hasAttribute('data-src-mobile')) {
                img.src = img.getAttribute('data-src-mobile');
            } else {
                img.src = img.getAttribute('data-src-desktop');
            }
        });
    }
    
    // Call responsive image handler on load and resize
    window.addEventListener('load', handleResponsiveImages);
    window.addEventListener('resize', handleResponsiveImages);
    
    // Handle profile dropdown on mobile
    const profileDropdown = document.querySelector('.profile-dropdown');
    if (profileDropdown) {
        // On mobile, make dropdown work on click instead of hover
        profileDropdown.addEventListener('click', function(e) {
            if (window.innerWidth < 768) {
                const dropdownMenu = this.querySelector('.profile-dropdown-menu');
                
                // If the menu is already visible, hide it, else show it
                if (dropdownMenu.style.opacity === '1') {
                    dropdownMenu.style.opacity = '0';
                    dropdownMenu.style.visibility = 'hidden';
                    dropdownMenu.style.transform = 'translateY(10px)';
                } else {
                    dropdownMenu.style.opacity = '1';
                    dropdownMenu.style.visibility = 'visible';
                    dropdownMenu.style.transform = 'translateY(0)';
                }
                
                // Prevent the click from propagating (which would close the menu)
                e.stopPropagation();
            }
        });
    }
    
    // Adjust viewport height for mobile browsers
    function adjustViewportHeight() {
        // Set a CSS variable with the viewport height
        // This helps with mobile browser address bar resizing issues
        const vh = window.innerHeight * 0.01;
        document.documentElement.style.setProperty('--vh', `${vh}px`);
    }
    
    // Call on load and resize
    window.addEventListener('load', adjustViewportHeight);
    window.addEventListener('resize', adjustViewportHeight);
    
})();
