/**
 * Enhanced Base JavaScript for StudySync
 * Provides interactive features for the base template
 */

document.addEventListener('DOMContentLoaded', function() {
  // DOM Elements
  const header = document.getElementById('header');
  const menuToggle = document.querySelector('.header-menu-toggle');
  const navWrap = document.getElementById('header-nav-wrap');
  const preloader = document.getElementById('preloader');
  
  // Initialize preloader
  setTimeout(() => {
    if (preloader) {
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 300);
    }
  }, 500);
  
  // Header scroll effect
  window.addEventListener('scroll', function() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
  
  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      this.classList.toggle('is-active');
      navWrap.classList.toggle('mobile-menu-open');
      document.body.classList.toggle('menu-is-open');
    });
  }
  
  // Close mobile menu when clicking outside
  document.addEventListener('click', function(event) {
    if (navWrap && navWrap.classList.contains('mobile-menu-open')) {
      if (!navWrap.contains(event.target) && !menuToggle.contains(event.target)) {
        navWrap.classList.remove('mobile-menu-open');
        menuToggle.classList.remove('is-active');
        document.body.classList.remove('menu-is-open');
      }
    }
  });
  
  // Add scroll progress indicator
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  document.body.appendChild(progressBar);
  
  window.addEventListener('scroll', function() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    progressBar.style.width = scrolled + '%';
  });
  
  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      
      if (targetId === '#') return;
      
      e.preventDefault();
      
      const targetElement = document.querySelector(targetId);
      
      if (targetElement) {
        // Close mobile menu if open
        if (navWrap && navWrap.classList.contains('mobile-menu-open')) {
          navWrap.classList.remove('mobile-menu-open');
          menuToggle.classList.remove('is-active');
          document.body.classList.remove('menu-is-open');
        }
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetElement.offsetTop - 80, // Account for fixed header
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Initialize user profile dropdown
  initializeUserProfile();
});

// Function to fetch and update user profile information
function initializeUserProfile() {
  const profilePhotos = document.querySelectorAll('.profile-photo');
  const userNames = document.querySelectorAll('.user-name');
  
  if (profilePhotos.length === 0) return; // No authenticated user
  
  fetch('/get-user-details', {
    method: 'POST',
    headers: {
      'X-CSRFToken': getCookie('csrftoken')
    }
  })
  .then(response => response.json())
  .then(data => {
    if (data && data.length > 0) {
      const userData = data[0];
      
      // Update profile photos
      profilePhotos.forEach(photo => {
        if (userData.user_image) {
          photo.src = userData.user_image;
        }
      });
      
      // Update usernames
      userNames.forEach(nameElement => {
        const fullName = (userData.firstname + " " + userData.lastname).trim();
        nameElement.textContent = fullName || userData.username;
      });
    }
  })
  .catch(error => {
    console.error('Error fetching user details:', error);
  });
}

// Helper function to get CSRF token
function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.substring(0, name.length + 1) === (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

// Course search functionality
function searchCourse() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput && searchInput.value.trim() !== '') {
    window.location.href = '/search-course/' + searchInput.value.trim();
  }
}

// Add event listener to search input
document.addEventListener('DOMContentLoaded', function() {
  const searchInput = document.getElementById('searchInput');
  if (searchInput) {
    searchInput.addEventListener('keyup', function(e) {
      if (e.key === 'Enter') {
        searchCourse();
      }
    });
  }
});
