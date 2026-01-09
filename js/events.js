/**
 * Events Page Interactivity & Animations
 * Features: Filtering, Sorting, and GSAP Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const filterBtns = document.querySelectorAll('.filter-btn');
    const sortSelect = document.getElementById('event-sort');
    const eventsContainer = document.getElementById('upcoming-events-container');
    const allEvents = Array.from(document.querySelectorAll('.event-card-v2'));

    // --- 1. Initial GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Header Animation
    gsap.from('.neon-title', {
        duration: 1,
        y: 50,
        opacity: 0,
        ease: 'power4.out'
    });

    gsap.from('.subtitle', {
        duration: 1,
        y: 30,
        opacity: 0,
        delay: 0.3,
        ease: 'power4.out'
    });

    // 1a. Staggered Cards Entry with ScrollTrigger (Initial Load)
    const animateCardsScroll = (targets, trigger) => {
        gsap.from(targets, {
            scrollTrigger: {
                trigger: trigger,
                start: 'top 80%',
                toggleActions: 'play none none none'
            },
            duration: 1,
            y: 50,
            opacity: 0,
            stagger: 0.15,
            ease: 'power3.out',
            clearProps: 'all'
        });
    };

    // 1b. Simple Stagger for filter/sort (no ScrollTrigger needed)
    const animateCardsSimple = (targets) => {
        gsap.from(targets, {
            duration: 0.8,
            y: 30,
            opacity: 0,
            stagger: 0.1,
            ease: 'power2.out',
            clearProps: 'all'
        });
    };

    // Initial Trigger
    animateCardsScroll('.event-card-v2', '.upcoming-grid');

    // Scroll Trigger for Section Headings
    document.querySelectorAll('.section-heading').forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: {
                trigger: heading,
                start: 'top 85%',
            },
            duration: 1,
            x: -50,
            opacity: 0,
            ease: 'power3.out'
        });
    });

    // --- 2. Filtering Logic ---
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active State
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            // Filter & Animate
            allEvents.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    gsap.fromTo(card, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out' });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // --- 3. Sorting Logic ---
    sortSelect.addEventListener('change', () => {
        const sortValue = sortSelect.value;
        const visibleEvents = Array.from(document.querySelectorAll('.event-card-v2')).filter(c => c.style.display !== 'none');

        const sorted = visibleEvents.sort((a, b) => {
            const nameA = a.getAttribute('data-name').toLowerCase();
            const nameB = b.getAttribute('data-name').toLowerCase();
            const dateA = new Date(a.getAttribute('data-date'));
            const dateB = new Date(b.getAttribute('data-date'));

            switch (sortValue) {
                case 'name-asc':
                    return nameA.localeCompare(nameB);
                case 'name-desc':
                    return nameB.localeCompare(nameA);
                case 'date-asc':
                    return dateA - dateB;
                case 'date-desc':
                    return dateB - dateA;
                default:
                    return 0;
            }
        });

        // Re-append to container with animation
        eventsContainer.innerHTML = '';
        sorted.forEach(el => eventsContainer.appendChild(el));

        // Re-run simple entry for the sorted view
        animateCardsSimple(sorted);
    });

    // --- 4. Ongoing Projects Animation ---
    gsap.from('.ongoing-project-card', {
        scrollTrigger: {
            trigger: '.ongoing-section',
            start: 'top 70%',
        },
        duration: 1,
        y: 100,
        opacity: 0,
        stagger: 0.3,
        ease: 'power4.out'
    });

    // --- 5. Past Gallery Hover Fix (Ensure smooth reveal) ---
    document.querySelectorAll('.past-event-item').forEach(item => {
        item.addEventListener('mouseenter', () => {
            gsap.to(item.querySelector('.past-info'), { opacity: 1, duration: 0.3 });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(item.querySelector('.past-info'), { opacity: 0, duration: 0.3 });
        });
    });
});
