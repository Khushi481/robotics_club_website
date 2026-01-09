// js/home.js

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    // --- HERO SLIDER LOGIC (Stacked & Staggered) ---
    const slides = document.querySelectorAll('.slide');
    const totalSlides = slides.length;
    let currentIndex = 0;

    // Animation Config
    const durationIn = 1.0;
    const durationOut = 0.8;
    const holdTime = 3.5; // Time slide stays visible

    // Initial Setup: Hide all, Show first slide elements immediately
    slides.forEach((slide, i) => {
        if (i === 0) {
            slide.classList.add('active');
            gsap.set(slide, { opacity: 1, visibility: 'visible', zIndex: 2 });
            // Ensure elements are in "visible" position
            gsap.set(slide.querySelector('.slide-gradient'), { opacity: 0.9 });
            gsap.set(slide.querySelector('.robot-img'), { x: 0, opacity: 1 });
            gsap.set(slide.querySelector('.slide-triangle'), { rotation: 15, opacity: 0.6, scale: 1 });
            gsap.set(slide.querySelector('.slide-content'), { y: 0, opacity: 1 });
        } else {
            gsap.set(slide, { opacity: 0, visibility: 'hidden', zIndex: 1 });
        }
    });

    function nextSlide() {
        const currentSlide = slides[currentIndex];
        const nextIndex = (currentIndex + 1) % totalSlides;
        const nextSlideEl = slides[nextIndex];

        // Timeline for transition
        const tl = gsap.timeline({
            onComplete: () => {
                currentIndex = nextIndex;
                gsap.delayedCall(holdTime, nextSlide);
            }
        });

        // 1. Current Slide Animate OUT
        // Stagger: Text -> Triangle -> Robot -> Gradient
        const currentText = currentSlide.querySelector('.slide-content');
        const currentTriangle = currentSlide.querySelector('.slide-triangle');
        const currentRobot = currentSlide.querySelector('.robot-img');

        tl.to(currentText, { y: -30, opacity: 0, duration: durationOut, ease: "power2.in" })
            .to(currentTriangle, { scale: 0.8, opacity: 0, duration: durationOut }, "<0.1")
            .to(currentRobot, { x: 50, opacity: 0, duration: durationOut }, "<0.1")
            .to(currentSlide, { opacity: 0, visibility: 'hidden', duration: 0.5 }); // Fade out wrapper

        // 2. Next Slide Animate IN
        // Stagger: Gradient -> Robot -> Triangle -> Text
        const nextText = nextSlideEl.querySelector('.slide-content');
        const nextTriangle = nextSlideEl.querySelector('.slide-triangle');
        const nextRobot = nextSlideEl.querySelector('.robot-img');

        // Reset positions for incoming slide
        gsap.set(nextSlideEl, { opacity: 1, visibility: 'visible', zIndex: 2 });
        gsap.set(currentSlide, { zIndex: 1 }); // Demote current

        gsap.set(nextText, { y: 30, opacity: 0 });
        gsap.set(nextTriangle, { scale: 1.2, opacity: 0, rotation: 0 });
        gsap.set(nextRobot, { x: 50, opacity: 0 });

        tl.to(nextRobot, { x: 0, opacity: 1, duration: durationIn, ease: "power2.out" }, "-=0.2")
            .to(nextTriangle, { scale: 1, rotation: 15, opacity: 0.6, duration: durationIn, ease: "back.out(1.7)" }, "<0.2")
            .to(nextText, { y: 0, opacity: 1, duration: durationIn, ease: "power2.out" }, "<0.2");

    }

    // Start the loop
    gsap.delayedCall(holdTime, nextSlide);



    // About Section Animation
    const aboutSection = document.querySelector('.home-about-section');
    if (aboutSection) {
        const title = aboutSection.querySelector('.section-title');
        const textPars = aboutSection.querySelectorAll('.about-text p');

        // Title Reveal
        gsap.fromTo(title,
            { x: -50, opacity: 0 },
            {
                scrollTrigger: { trigger: title, start: "top 85%" },
                x: 0, opacity: 1, duration: 1, ease: "power2.out"
            }
        );

        // Text Reveal (Staggered)
        gsap.fromTo(textPars,
            { y: 30, opacity: 0 },
            {
                scrollTrigger: { trigger: aboutSection, start: "top 75%" },
                y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out"
            }
        );
    }

    // What We Do Section Animation
    const whatSection = document.querySelector('.what-we-do-section');
    if (whatSection) {
        const title = whatSection.querySelector('.section-title');
        const textPars = whatSection.querySelectorAll('.what-text p');

        // Title Reveal
        gsap.fromTo(title,
            { x: -50, opacity: 0 },
            {
                scrollTrigger: { trigger: title, start: "top 85%" },
                x: 0, opacity: 1, duration: 1, ease: "power2.out"
            }
        );

        // Text Reveal (Staggered)
        gsap.fromTo(textPars,
            { y: 30, opacity: 0 },
            {
                scrollTrigger: { trigger: whatSection, start: "top 75%" },
                y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out"
            }
        );
    }

    // Club Highlights Animation
    const highlightsSection = document.querySelector('.highlights-section');
    if (highlightsSection) {
        const title = highlightsSection.querySelector('.section-title');
        const cards = highlightsSection.querySelectorAll('.highlight-card');

        gsap.fromTo(title,
            { y: -30, opacity: 0 },
            {
                scrollTrigger: { trigger: title, start: "top 85%" },
                y: 0, opacity: 1, duration: 0.8, ease: "power2.out"
            }
        );

        gsap.fromTo(cards,
            { y: 50, opacity: 0 },
            {
                scrollTrigger: { trigger: highlightsSection, start: "top 75%" },
                y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power2.out"
            }
        );
    }

    // Upcoming Event Animation
    const eventSection = document.querySelector('.upcoming-event-section');
    if (eventSection) {
        const title = eventSection.querySelector('.section-title');
        const eventCard = eventSection.querySelector('.event-card');

        gsap.fromTo(title,
            { y: -30, opacity: 0 },
            {
                scrollTrigger: { trigger: title, start: "top 85%" },
                y: 0, opacity: 1, duration: 0.8, ease: "power2.out"
            }
        );

        gsap.fromTo(eventCard,
            { scale: 0.9, opacity: 0 },
            {
                scrollTrigger: { trigger: eventCard, start: "top 80%" },
                scale: 1, opacity: 1, duration: 0.8, ease: "back.out(1.2)"
            }
        );
    }

    // Achievements Animation
    const achievementsSection = document.querySelector('.achievements-section');
    if (achievementsSection) {
        const title = achievementsSection.querySelector('.section-title');
        const cards = achievementsSection.querySelectorAll('.achievement-card');

        gsap.fromTo(title,
            { y: -30, opacity: 0 },
            {
                scrollTrigger: { trigger: title, start: "top 85%" },
                y: 0, opacity: 1, duration: 0.8, ease: "power2.out"
            }
        );

        gsap.fromTo(cards,
            { x: -50, opacity: 0 },
            {
                scrollTrigger: { trigger: achievementsSection, start: "top 75%" },
                x: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out"
            }
        );
    }
});
