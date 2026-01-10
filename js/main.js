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
});
