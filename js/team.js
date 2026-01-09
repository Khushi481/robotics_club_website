/**
 * Team Page Interactivity & Animations
 */

document.addEventListener('DOMContentLoaded', () => {
    // Selectors
    const specTabs = document.querySelectorAll('.spec-tab');
    const specGrid = document.getElementById('spec-grid');

    // Sample data for specializations
    const teamData = {
        hardware: [
            { name: 'Rohan Verma', role: 'Lead Embedded Sys' },
            { name: 'Sanya Malhotra', role: 'PCB Designer' },
            { name: 'Aditya Raj', role: 'Mechanical Lead' },
            { name: 'Megha Kapoor', role: 'Power Management' }
        ],
        software: [
            { name: 'Vikram Singh', role: 'ROS Developer' },
            { name: 'Neha Reddy', role: 'Web Stack' },
            { name: 'Arjun Das', role: 'Backend Lead' },
            { name: 'Priya Sen', role: 'App Developer' }
        ],
        ai: [
            { name: 'Dr. Sameer', role: 'ML Researcher' },
            { name: 'Zaid Khan', role: 'Computer Vision' },
            { name: 'Sonal Jha', role: 'NLP Specialist' },
            { name: 'Ravi Teja', role: 'Control Algorithms' }
        ],
        design: [
            { name: 'Karan Johar', role: 'UI/UX Design' },
            { name: 'Sonia Gandhi', role: '3D Modeler' },
            { name: 'Amit Shah', role: 'Media Lead' }
        ]
    };

    // --- 1. GSAP Animations ---
    gsap.registerPlugin(ScrollTrigger);

    // Header & Section Headings
    gsap.from('.neon-title', { duration: 1, y: 30, opacity: 0, ease: 'power3.out' });

    document.querySelectorAll('.section-heading').forEach(heading => {
        gsap.from(heading, {
            scrollTrigger: { trigger: heading, start: 'top 85%' },
            duration: 1, x: -30, opacity: 0, ease: 'power2.out'
        });
    });

    // Faculty Card Entry
    gsap.from('.faculty-card', {
        scrollTrigger: { trigger: '.faculty-section', start: 'top 80%' },
        duration: 1.2, scale: 0.9, opacity: 0, ease: 'back.out(1.7)'
    });

    // Core & Executive Member Blobs Stagger
    gsap.from('.core-section .member-blob-card', {
        scrollTrigger: { trigger: '.core-section', start: 'top 75%' },
        duration: 1, y: 50, opacity: 0, stagger: 0.1, ease: 'power4.out'
    });

    gsap.from('.leads-section .member-blob-card', {
        scrollTrigger: { trigger: '.leads-section', start: 'top 75%' },
        duration: 1, y: 50, opacity: 0, stagger: 0.1, ease: 'power4.out'
    });

    // --- 2. Specialization Filtering ---
    specTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const spec = tab.getAttribute('data-spec');

            // Update tab active state
            specTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            // Animate grid out
            gsap.to(specGrid, {
                opacity: 0, y: 20, duration: 0.3,
                onComplete: () => {
                    updateSpecGrid(spec);
                    gsap.to(specGrid, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
                }
            });
        });
    });

    function updateSpecGrid(spec) {
        const members = teamData[spec];
        specGrid.innerHTML = members.map(m => `
            <div class="simple-member-card">
                <h4>${m.name}</h4>
                <p>${m.role}</p>
            </div>
        `).join('');
    }
});
