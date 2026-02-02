/**
 * Portfolio Website - Main JavaScript
 * 现代化个人作品集网站交互脚本
 */

// ==========================================
// DOM Elements
// ==========================================
const navbar = document.querySelector('.navbar');
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');
const navLinkItems = document.querySelectorAll('.nav-link');
const backToTopBtn = document.getElementById('backToTop');
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const contactForm = document.getElementById('contactForm');
const skillProgressBars = document.querySelectorAll('.skill-progress');
const statNumbers = document.querySelectorAll('.stat-number');

// ==========================================
// Custom Cursor
// ==========================================
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

function initCursor() {
    if (!cursor || !cursorFollower) return;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;

        cursor.style.left = `${mouseX}px`;
        cursor.style.top = `${mouseY}px`;
    });

    // Smooth cursor follower animation
    function animateCursorFollower() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;

        cursorFollower.style.left = `${cursorX}px`;
        cursorFollower.style.top = `${cursorY}px`;

        requestAnimationFrame(animateCursorFollower);
    }
    animateCursorFollower();

    // Hover effects
    const hoverElements = document.querySelectorAll('a, button, .project-card, .skill-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
}

// ==========================================
// Navigation
// ==========================================
function initNavigation() {
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navToggle.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // Close mobile menu on link click
    navLinkItems.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Active navigation link on scroll
    const sections = document.querySelectorAll('section[id]');

    function highlightNavLink() {
        const scrollY = window.scrollY;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinkItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);
}

// ==========================================
// Back to Top Button
// ==========================================
function initBackToTop() {
    if (!backToTopBtn) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
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

// ==========================================
// Project Filters
// ==========================================
function initProjectFilters() {
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active filter button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.dataset.filter;

            // Filter projects with animation
            projectCards.forEach((card, index) => {
                const category = card.dataset.category;

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = `fadeIn 0.5s ease ${index * 0.1}s forwards`;
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });
}

// ==========================================
// Skill Progress Bars Animation
// ==========================================
function initSkillBars() {
    const animateSkillBars = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target;
                const progress = progressBar.dataset.progress;
                progressBar.style.width = `${progress}%`;
                observer.unobserve(progressBar);
            }
        });
    };

    const observer = new IntersectionObserver(animateSkillBars, {
        threshold: 0.5
    });

    skillProgressBars.forEach(bar => observer.observe(bar));
}

// ==========================================
// Counter Animation for Stats
// ==========================================
function initCounterAnimation() {
    const animateCounter = (element, target) => {
        const duration = 2000;
        const start = 0;
        const increment = target / (duration / 16);
        let current = start;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target;
            }
        };

        updateCounter();
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                animateCounter(entry.target, target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(num => observer.observe(num));
}

// ==========================================
// Scroll Reveal Animation
// ==========================================
function initScrollReveal() {
    const revealElements = document.querySelectorAll('[data-aos]');

    const revealOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(revealOnScroll, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => observer.observe(el));
}

// ==========================================
// Contact Form
// ==========================================
function initContactForm() {
    if (!contactForm) return;

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Form validation
        if (!name || !email || !subject || !message) {
            showNotification('请填写所有必填字段', 'error');
            return;
        }

        if (!isValidEmail(email)) {
            showNotification('请输入有效的电子邮箱地址', 'error');
            return;
        }

        // Simulate form submission
        const submitBtn = contactForm.querySelector('.btn-submit');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span>发送中...</span>';
        submitBtn.disabled = true;

        setTimeout(() => {
            showNotification('消息发送成功！我会尽快回复您。', 'success');
            contactForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }, 1500);
    });
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showNotification(message, type = 'info') {
    // Remove existing notification
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <span>${message}</span>
        <button class="notification-close">&times;</button>
    `;

    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 1.5rem;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#6366f1'};
        color: white;
        border-radius: 0.5rem;
        display: flex;
        align-items: center;
        gap: 1rem;
        z-index: 1000;
        animation: slideInRight 0.3s ease;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.3);
    `;

    document.body.appendChild(notification);

    // Close button functionality
    const closeBtn = notification.querySelector('.notification-close');
    closeBtn.style.cssText = `
        background: none;
        border: none;
        color: white;
        font-size: 1.5rem;
        cursor: pointer;
        padding: 0;
        line-height: 1;
    `;
    closeBtn.addEventListener('click', () => {
        notification.style.animation = 'slideOutRight 0.3s ease forwards';
        setTimeout(() => notification.remove(), 300);
    });

    // Auto remove after 5 seconds
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOutRight 0.3s ease forwards';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// ==========================================
// Smooth Scroll for Anchor Links
// ==========================================
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==========================================
// Typing Effect
// ==========================================
function initTypingEffect() {
    const typingElement = document.querySelector('.title');
    if (!typingElement) return;

    const titles = [
        '全栈开发工程师',
        'Full Stack Developer',
        'UI/UX 设计师',
        '创意技术专家'
    ];

    let titleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentTitle = titles[titleIndex];

        if (isDeleting) {
            typingElement.textContent = currentTitle.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingElement.textContent = currentTitle.substring(0, charIndex + 1);
            charIndex++;
        }

        if (!isDeleting && charIndex === currentTitle.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            titleIndex = (titleIndex + 1) % titles.length;
            typingSpeed = 200;
        } else {
            typingSpeed = isDeleting ? 50 : 100;
        }

        setTimeout(type, typingSpeed);
    }

    // Start typing effect after initial animation
    setTimeout(type, 2000);
}

// ==========================================
// Parallax Effect
// ==========================================
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-visual');

    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;

        parallaxElements.forEach(el => {
            const speed = 0.3;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// ==========================================
// Tilt Effect on Cards
// ==========================================
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .skill-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (y - centerY) / 10;
            const rotateY = (centerX - x) / 10;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
        });
    });
}

// ==========================================
// Add Animation Keyframes
// ==========================================
function addAnimationStyles() {
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideInRight {
            from {
                opacity: 0;
                transform: translateX(100px);
            }
            to {
                opacity: 1;
                transform: translateX(0);
            }
        }

        @keyframes slideOutRight {
            from {
                opacity: 1;
                transform: translateX(0);
            }
            to {
                opacity: 0;
                transform: translateX(100px);
            }
        }
    `;
    document.head.appendChild(style);
}

// ==========================================
// Initialize All Functions
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    addAnimationStyles();
    initCursor();
    initNavigation();
    initBackToTop();
    initProjectFilters();
    initSkillBars();
    initCounterAnimation();
    initScrollReveal();
    initContactForm();
    initSmoothScroll();
    initTypingEffect();
    initParallax();
    initTiltEffect();

    // Log initialization
    console.log('🚀 Portfolio website initialized successfully!');
});

// ==========================================
// Window Load Event
// ==========================================
window.addEventListener('load', () => {
    // Remove any loading states
    document.body.classList.add('loaded');

    // Trigger initial animations
    document.querySelectorAll('.animate-fade-in, .animate-slide-up').forEach(el => {
        el.style.opacity = '1';
    });
});
