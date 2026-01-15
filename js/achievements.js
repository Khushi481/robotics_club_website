document.addEventListener('DOMContentLoaded', () => {
    // GSAP initialization
    gsap.registerPlugin(ScrollTrigger);

    // Initial Hero Animation
    gsap.from('.hero-title', { opacity: 0, y: 30, duration: 1, ease: 'power3.out' });
    gsap.from('.hero-subtitle', { opacity: 0, y: 20, duration: 1, delay: 0.3, ease: 'power3.out' });

    // Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    stats.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'));
        gsap.to(stat, {
            scrollTrigger: {
                trigger: stat,
                start: 'top 90%',
            },
            innerText: target,
            duration: 2.5,
            snap: { innerText: 1 },
            ease: 'power2.out'
        });
    });

    // Individual Entry for Competition Cards (Fixing glitch)
    const cards = document.querySelectorAll('.comp-card');
    cards.forEach((card, index) => {
        gsap.from(card, {
            scrollTrigger: {
                trigger: card,
                start: 'top 90%', // Trigger when card top hits 90% of viewport
                toggleActions: 'play none none reverse' // Play on enter, reverse on leave up
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: 'power2.out'
        });
    });

    // Refresh ScrollTrigger on load to ensure image heights are calculated
    window.addEventListener('load', () => {
        ScrollTrigger.refresh();
    });

    // Milestone Animation (New Diagonal Cards)
    const milestones = document.querySelectorAll('.milestone-card');
    if (milestones.length > 0) {
        gsap.from('.milestone-card', {
            scrollTrigger: {
                trigger: '.milestone-container',
                start: 'top 80%',
            },
            x: 100, // Slide in from right
            opacity: 0,
            duration: 1,
            stagger: 0.3,
            ease: 'power3.out'
        });
    }

    // Floating Trophy Animation
    gsap.to('.decorative-trophy', {
        rotation: 5,
        y: 20,
        duration: 5,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
    });
});
