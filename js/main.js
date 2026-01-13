// js/main.js
document.addEventListener('DOMContentLoaded', () => {

    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');

            // Hamburger animation
            const spans = hamburger.querySelectorAll('span');
            spans.forEach(span => span.classList.toggle('change'));
        });
    }

    // Navbar Background Scroll Logic (Global)
    const navbar = document.querySelector('.navbar');
    const handleScroll = () => {
        if (window.scrollY > 20) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    // Global Hero Animations (for standardized banners)
    if (typeof gsap !== 'undefined') {
        const heroTitle = document.querySelector('.hero-title');
        const heroImg = document.querySelector('.hero-bg-img');

        if (heroTitle) {
            gsap.from(heroTitle, {
                duration: 1.5,
                y: 100,
                opacity: 0,
                ease: 'power4.out',
                delay: 0.2
            });
        }

        if (heroImg) {
            gsap.from(heroImg, {
                duration: 2,
                scale: 1.2,
                filter: 'grayscale(1) brightness(0)',
                ease: 'power2.out'
            });
        }
    }

    // --- Contact Page Logic ---

    // 1. FAQ Accordion
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const item = question.parentElement;
            const isActive = item.classList.contains('active');

            // Optional: Close others
            document.querySelectorAll('.faq-item').forEach(i => {
                i.classList.remove('active');
            });

            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // 2. Contact Form Mock Submit
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const btn = contactForm.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            // Loading State
            btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            btn.style.opacity = '0.8';

            // Mock Delay
            setTimeout(() => {
                // Success State
                const formPanel = document.querySelector('.form-panel');
                formPanel.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px;">
                        <i class="fas fa-check-circle" style="font-size: 4rem; color: var(--secondary-neon); margin-bottom: 20px;"></i>
                        <h3 style="margin-bottom: 10px;">Message Sent!</h3>
                        <p style="color: var(--text-dim);">Thanks for reaching out. The team will get back to you soon.</p>
                        <button onclick="location.reload()" class="submit-btn" style="margin: 30px auto 0;">Send Another</button>
                    </div>
                `;
            }, 2000);
        });
    }
});
