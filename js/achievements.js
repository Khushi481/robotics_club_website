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

    // Staggered Entry for Competition Cards
    gsap.from('.comp-card', {
        scrollTrigger: {
            trigger: '.competitions-grid',
            start: 'top 95%', // Trigger earlier (closer to bottom of screen)
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out'
    });

    // Timeline Animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    timelineItems.forEach((item, index) => {
        const isEven = index % 2 !== 0;
        gsap.from(item.querySelector('.timeline-content-inner'), {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            },
            x: isEven ? 50 : -50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });

        gsap.from(item.querySelector('.timeline-dot'), {
            scrollTrigger: {
                trigger: item,
                start: 'top 85%',
            },
            scale: 0,
            duration: 0.5,
            delay: 0.5,
            ease: 'back.out(2)'
        });
    });

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
