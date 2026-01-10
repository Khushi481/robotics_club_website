/**
 * About Page GSAP Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // 1. (Hero animations are now handled globally in main.js)

    // 2. Intro Section Stagger
    const introTl = gsap.timeline({
        scrollTrigger: {
            trigger: '.about-intro',
            start: 'top 80%',
        }
    });

    introTl.from('.tag-small', { opacity: 0, x: -20, duration: 0.6 })
        .from('.main-heading', { opacity: 0, y: 30, duration: 0.8 }, '-=0.4')
        .from('.desc-col', { opacity: 0, y: 20, stagger: 0.2, duration: 0.8 }, '-=0.6');

    // 3. Feature Cards Stagger (Ensure immediate visibility if trigger reached)
    gsap.from('.feature-card', {
        scrollTrigger: {
            trigger: '.feature-cards-grid',
            start: 'top 90%',
            toggleActions: 'play none none none'
        },
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power2.out',
        clearProps: 'all' // Crucial to prevent glitching after animation
    });

    // 4. Overlapping Image Animation
    gsap.from('.image-main', {
        scrollTrigger: {
            trigger: '.images-overlap-showcase',
            start: 'top 75%',
        },
        x: -100,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out'
    });

    gsap.from('.image-floating', {
        scrollTrigger: {
            trigger: '.images-overlap-showcase',
            start: 'top 65%',
        },
        x: 100,
        scale: 0.8,
        opacity: 0,
        duration: 1.5,
        ease: 'back.out(1.7)'
    });

    // 5. Timeline Milestones
    gsap.utils.toArray('.milestone').forEach(milestone => {
        gsap.from(milestone, {
            scrollTrigger: {
                trigger: milestone,
                start: 'top 90%',
            },
            x: milestone.classList.contains('left') ? -50 : 50,
            opacity: 0,
            duration: 1,
            ease: 'power2.out'
        });
    });

    // 6. Stats Counter Simulation
    const stats = gsap.utils.toArray('.stat-num');
    stats.forEach(stat => {
        const val = parseInt(stat.innerText);
        if (!isNaN(val)) {
            gsap.from(stat, {
                scrollTrigger: {
                    trigger: '.history-highlights',
                    start: 'top 90%',
                },
                innerText: 0,
                duration: 2,
                snap: { innerText: 1 },
                ease: 'power1.out'
            });
        }
    });
});
