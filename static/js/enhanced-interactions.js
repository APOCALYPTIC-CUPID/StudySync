/**
 * Enhanced interactions for StudySync
 * Handles particle background and smooth scrolling
 */

document.addEventListener('DOMContentLoaded', function() {
    // Particle.js Configuration
    if (document.getElementById('particles-js')) {
        particlesJS('particles-js', {
            "particles": {
                "number": {
                    "value": 80,
                    "density": {
                        "enable": true,
                        "value_area": 800
                    }
                },
                "color": {
                    "value": "#ffffff"
                },
                "shape": {
                    "type": "circle",
                    "stroke": {
                        "width": 0,
                        "color": "#000000"
                    },
                    "polygon": {
                        "nb_sides": 5
                    }
                },
                "opacity": {
                    "value": 0.2,
                    "random": false,
                    "anim": {
                        "enable": false,
                        "speed": 1,
                        "opacity_min": 0.1,
                        "sync": false
                    }
                },
                "size": {
                    "value": 3,
                    "random": true,
                    "anim": {
                        "enable": false,
                        "speed": 40,
                        "size_min": 0.1,
                        "sync": false
                    }
                },
                "line_linked": {
                    "enable": true,
                    "distance": 150,
                    "color": "#ffffff",
                    "opacity": 0.2,
                    "width": 1
                },
                "move": {
                    "enable": true,
                    "speed": 2,
                    "direction": "none",
                    "random": false,
                    "straight": false,
                    "out_mode": "out",
                    "bounce": false,
                    "attract": {
                        "enable": false,
                        "rotateX": 600,
                        "rotateY": 1200
                    }
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": {
                        "enable": true,
                        "mode": "grab"
                    },
                    "onclick": {
                        "enable": true,
                        "mode": "push"
                    },
                    "resize": true
                },
                "modes": {
                    "grab": {
                        "distance": 140,
                        "line_linked": {
                            "opacity": 1
                        }
                    },
                    "bubble": {
                        "distance": 400,
                        "size": 40,
                        "duration": 2,
                        "opacity": 8,
                        "speed": 3
                    },
                    "repulse": {
                        "distance": 200,
                        "duration": 0.4
                    },
                    "push": {
                        "particles_nb": 4
                    },
                    "remove": {
                        "particles_nb": 2
                    }
                }
            },
            "retina_detect": true
        });
    }

    // Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if(!targetElement) return;
            
            const headerOffset = 80;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        });
    });

    // Scroll Indicator Visibility
    const scrollIndicator = document.querySelector('.scroll-indicator');
    if (scrollIndicator) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 200) {
                scrollIndicator.style.opacity = '0';
            } else {
                scrollIndicator.style.opacity = '0.7';
            }
        });
    }

    // Feature Card Animation on Scroll
    const featureCards = document.querySelectorAll('.feature-card');
    if (featureCards.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });

        featureCards.forEach(card => {
            observer.observe(card);
        });
    }

    // Set particles container height to match the full document height
    function updateParticlesHeight() {
        const particlesContainer = document.getElementById('particles-js');
        if (particlesContainer) {
            particlesContainer.style.height = document.documentElement.scrollHeight + 'px';
        }
    }
    
    // Call initially and on window resize
    updateParticlesHeight();
    window.addEventListener('resize', updateParticlesHeight);
    // Also update on load to account for dynamic content
    window.addEventListener('load', updateParticlesHeight);

    // Mobile Menu Adjustments
    const mobileMenuToggle = document.querySelector('.header-menu-toggle');
    const headerNavWrap = document.querySelector('#header-nav-wrap');
    
    if (mobileMenuToggle && headerNavWrap) {
        mobileMenuToggle.addEventListener('click', function() {
            headerNavWrap.classList.toggle('mobile-nav-open');
        });
    }
    
    // Handle AOS (Animate On Scroll) animations
    const aosElements = document.querySelectorAll('[data-aos]');
    if (aosElements.length > 0) {
        const aosObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('aos-animate');
                    aosObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1
        });
        
        aosElements.forEach(element => {
            aosObserver.observe(element);
        });
    }

    // Handle subscription form
    const subscribeForm = document.getElementById('mc-form');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            if (!emailInput) return;
            
            const email = emailInput.value;
            if (!isEmail(email)) {
                showFormMessage(subscribeForm, 'Please enter a valid email address.', 'error');
                return;
            }
            
            // Simulate successful subscription
            showFormMessage(subscribeForm, `Thanks for subscribing! We've sent a confirmation to ${email}.`, 'success');
            this.reset();
        });
    }
    
    function showFormMessage(form, message, type) {
        let messageEl = form.querySelector('.form-message');
        if (!messageEl) {
            messageEl = document.createElement('div');
            messageEl.className = 'form-message';
            form.appendChild(messageEl);
        }
        
        messageEl.innerHTML = `<p class="${type}">${message}</p>`;
        
        // Clear message after 5 seconds
        setTimeout(() => {
            messageEl.innerHTML = '';
        }, 5000);
    }
});

// Email validation function
function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}
