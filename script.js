// ==================== INITIALIZATION ==================== //
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initAOS();
    initMenuTabs();
    initFAQ();
    initBackToTop();
    initCarousel();
    initFormHandling();
    initActiveLinks();
});

// ==================== THEME TOGGLE ==================== //
function initTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    document.body.classList.add(savedTheme + '-mode');
    updateThemeIcon(savedTheme);
    
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.classList.remove(currentTheme + '-mode');
        document.body.classList.add(newTheme + '-mode');
        
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

function updateThemeIcon(theme) {
    const themeToggle = document.getElementById('themeToggle');
    const icon = themeToggle.querySelector('i');
    
    if (theme === 'dark') {
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
    } else {
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
    }
}

// ==================== NAVBAR ==================== //
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Close menu when a link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const mobileMenuToggle = document.getElementById('mobileMenuToggle');
            const navMenu = document.getElementById('navMenu');
            
            if (window.innerWidth <= 768 && navMenu.classList.contains('active')) {
                mobileMenuToggle.click();
            }
        });
    });
}

// ==================== MOBILE MENU ==================== //
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navMenu = document.getElementById('navMenu');
    
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Animate hamburger
        const spans = mobileMenuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(8px, 8px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
}

// ==================== SMOOTH SCROLLING ==================== //
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ==================== AOS INITIALIZATION ==================== //
function initAOS() {
    AOS.init({
        duration: 1000,
        offset: 100,
        once: true,
        easing: 'ease-in-out'
    });
}

const menuTabs = document.querySelectorAll(".menu-tab-btn");
const menuGroups = document.querySelectorAll(".menu-item-group");

menuTabs.forEach(tab => {

    tab.addEventListener("click", () => {

        // Remove active class
        menuTabs.forEach(btn => btn.classList.remove("active"));

        // Add active class
        tab.classList.add("active");

        // Hide all groups
        menuGroups.forEach(group => {
            group.style.display = "none";
        });

        // Show selected group
        document.querySelector(
            `.menu-item-group[data-category="${tab.dataset.category}"]`
        ).style.display = "block";

    });

});
// ==================== MENU TABS ==================== //
function initMenuTabs() {
    const menuTabs = document.querySelectorAll(".menu-tab-btn");
    const menuGroups = document.querySelectorAll(".menu-item-group");

    menuTabs.forEach(tab => {
        tab.addEventListener("click", () => {
            menuTabs.forEach(btn => btn.classList.remove("active"));
            tab.classList.add("active");

            menuGroups.forEach(group => group.classList.remove("active"));
            const targetGroup = document.querySelector(
                `.menu-item-group[data-category="${tab.dataset.category}"]`
            );
            if (targetGroup) targetGroup.classList.add("active");
        });
    });
}


// ==================== FAQ ACCORDION ==================== //
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            // Close other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
}

// ==================== BACK TO TOP BUTTON ==================== //
function initBackToTop() {
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ==================== TESTIMONIALS CAROUSEL ==================== //
function initCarousel() {
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const testimonialTrack = document.querySelector('.testimonial-track');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    let currentIndex = 0;
    const cardsPerView = window.innerWidth > 768 ? 1 : 1;
    
    function showTestimonial(index) {
        // Clamp index between 0 and max
        currentIndex = Math.max(0, Math.min(index, testimonialCards.length - cardsPerView));
        
        // Calculate translation
        const translateValue = -currentIndex * 100;
        testimonialTrack.style.transform = `translateX(${translateValue}%)`;
    }
    
    prevBtn.addEventListener('click', () => {
        showTestimonial(currentIndex - 1);
    });
    
    nextBtn.addEventListener('click', () => {
        showTestimonial(currentIndex + 1);
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') showTestimonial(currentIndex - 1);
        if (e.key === 'ArrowRight') showTestimonial(currentIndex + 1);
    });
    
    // Responsive carousel
    window.addEventListener('resize', () => {
        showTestimonial(0);
    });
}

// ==================== FORM HANDLING ==================== //
function initFormHandling() {
    const bookingForm = document.getElementById('bookingForm');
    
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(bookingForm);
            
            // Create WhatsApp message
            const name = bookingForm.querySelector('input[type="text"]').value;
            const email = bookingForm.querySelector('input[type="email"]').value;
            const phone = bookingForm.querySelector('input[type="tel"]').value;
            const date = bookingForm.querySelector('input[type="date"]').value;
            const time = bookingForm.querySelector('input[type="time"]').value;
            const guests = bookingForm.querySelector('select').value;
            const requests = bookingForm.querySelector('textarea').value;
            
            const message = `Hi BrewHaven! I'd like to book a table.
Name: ${name}
Email: ${email}
Phone: ${phone}
Date: ${date}
Time: ${time}
Guests: ${guests}
Special Requests: ${requests || 'None'}`;
            
            const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
            
            // Show success message
            showNotification('Redirecting to WhatsApp...', 'success');
            
            // Redirect after delay
            setTimeout(() => {
                window.open(whatsappUrl, '_blank');
                bookingForm.reset();
            }, 1000);
        });
    }
    
    // Newsletter form
    const newsletterForms = document.querySelectorAll('.newsletter-form');
    newsletterForms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const emailInput = form.querySelector('input[type="email"]');
            const email = emailInput.value;
            
            // Simulate subscription
            showNotification('Successfully subscribed to our newsletter!', 'success');
            emailInput.value = '';
        });
    });
}

// ==================== NOTIFICATION SYSTEM ==================== //
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 10px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ==================== ACTIVE NAV LINKS ==================== //
function initActiveLinks() {
    window.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ==================== IMAGE LAZY LOADING ==================== //
function initLazyLoading() {
    const images = document.querySelectorAll('img');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    observer.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}

// ==================== PERFORMANCE OPTIMIZATION ==================== //
// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ==================== ACCESSIBILITY IMPROVEMENTS ==================== //
// Keyboard navigation for buttons
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu on Escape
        const navMenu = document.getElementById('navMenu');
        if (navMenu.classList.contains('active')) {
            document.getElementById('mobileMenuToggle').click();
        }
    }
});

// ==================== ANIMATION STYLES ==================== //
const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
    
    .nav-link.active {
        color: var(--primary-color);
    }
    
    .nav-link.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// ==================== TRACKING AND ANALYTICS ==================== //
// Track page interactions for insights
const trackEvent = (eventName, eventData = {}) => {
    console.log(`Event: ${eventName}`, eventData);
    // You can integrate with Google Analytics or other services here
};

// Track button clicks
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', () => {
        trackEvent('button_click', {
            buttonText: button.textContent.trim()
        });
    });
});

// Track form submissions
document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', () => {
        trackEvent('form_submit', {
            formId: form.id || 'unnamed'
        });
    });
});

// ==================== UTILITY FUNCTIONS ==================== //

// Smooth scroll to element
function smoothScrollTo(element) {
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

// Add animation class to element
function addAnimationClass(element, animationName) {
    element.classList.add(animationName);
    element.addEventListener('animationend', () => {
        element.classList.remove(animationName);
    });
}

// Check if element is in viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}
// ================= CART SYSTEM =================

let cart = [];

const cartButton = document.getElementById("cartButton");
const cartSidebar = document.getElementById("cartSidebar");
const closeCart = document.getElementById("closeCart");
const cartItems = document.getElementById("cartItems");
const cartCount = document.getElementById("cartCount");
const cartTotal = document.getElementById("cartTotal");

if(cartButton){
    cartButton.addEventListener("click", () => {
        cartSidebar.classList.add("active");
    });
}

if(closeCart){
    closeCart.addEventListener("click", () => {
        cartSidebar.classList.remove("active");
    });
}

// Quantity Buttons
document.querySelectorAll(".menu-card").forEach(card => {

    const minusBtn =
        card.querySelector(".quantity-box button:first-child");

    const plusBtn =
        card.querySelector(".quantity-box button:last-child");

    const qtySpan =
        card.querySelector(".quantity-box span");

    let qty = 1;

    plusBtn.addEventListener("click", () => {
        qty++;
        qtySpan.textContent = qty;
    });

    minusBtn.addEventListener("click", () => {
        if(qty > 1){
            qty--;
            qtySpan.textContent = qty;
        }
    });

    const addBtn = card.querySelector(".cart-btn");

    addBtn.addEventListener("click", () => {

        const name =
            card.querySelector("h3").textContent;

        const priceText =
            card.querySelector("h4").textContent;

        const price =
            parseInt(priceText.replace("₹",""));

        cart.push({
            name,
            price,
            qty
        });

        updateCart();
    });

});

function updateCart(){

    cartItems.innerHTML = "";

    let total = 0;

    cart.forEach(item => {

        total += item.price * item.qty;

        const div = document.createElement("div");

        div.classList.add("cart-item");

        div.innerHTML = `
            <div>
                <strong>${item.name}</strong>
                <br>
                Qty: ${item.qty}
            </div>

            <div>
                ₹${item.price * item.qty}
            </div>
        `;

        cartItems.appendChild(div);
    });

    cartCount.textContent = cart.length;
    cartTotal.textContent = `₹${total}`;
}

// Checkout
document.getElementById("checkoutBtn")
?.addEventListener("click", () => {

    if(cart.length === 0){
        alert("Cart is empty");
        return;
    }

    alert("Order placed successfully!");

    cart = [];
    updateCart();
});

// ==================== PRELOAD IMAGES ==================== //
function preloadImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        const newImg = new Image();
        newImg.src = img.src;
    });
}

// Run on page load
window.addEventListener('load', preloadImages);

// ==================== SERVICE WORKER REGISTRATION ==================== //
// For PWA functionality (optional)
if ('serviceWorker' in navigator) {
    // Uncomment to enable service worker
    // navigator.serviceWorker.register('sw.js').catch(err => console.log('SW registration failed'));
}
console.log('Velvet Brew Café website loaded successfully! 🚀');