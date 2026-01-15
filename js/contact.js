document.addEventListener('DOMContentLoaded', () => {
    // GSAP initialization
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animation
    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' });
});
