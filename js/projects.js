document.addEventListener('DOMContentLoaded', () => {

    // --- Filtering Logic ---
    const typeFilter = document.getElementById('typeFilter');
    const yearFilter = document.getElementById('yearFilter');
    const projectCards = document.querySelectorAll('.project-showcase-card');

    function filterProjects() {
        const typeValue = typeFilter.value;
        const yearValue = yearFilter.value;

        projectCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            const cardYear = card.getAttribute('data-year');

            const typeMatch = (typeValue === 'all' || cardType === typeValue);
            const yearMatch = (yearValue === 'all' || cardYear === yearValue);

            if (typeMatch && yearMatch) {
                card.style.display = 'flex';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 10);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    }

    if (typeFilter && yearFilter) {
        typeFilter.addEventListener('change', filterProjects);
        yearFilter.addEventListener('change', filterProjects);
    }

    // --- Modal Logic ---
    const modalOverlay = document.getElementById('projectModal');
    const modalClose = document.querySelector('.modal-close');
    const viewButtons = document.querySelectorAll('.view-project-btn');

    // Modal Content Elements
    const modalTitle = document.getElementById('modalTitle');
    const modalImage = document.getElementById('modalImage');
    const modalDesc = document.getElementById('modalDesc');
    const modalYear = document.getElementById('modalYear');
    const modalTech = document.getElementById('modalTech');
    const modalTeam = document.getElementById('modalTeam');

    function openModal(card) {
        // Populate Data
        const title = card.querySelector('.project-title').textContent;
        const img = card.querySelector('.card-image-wrapper img').src;
        const desc = card.getAttribute('data-full-desc');
        const year = card.getAttribute('data-year');
        const tech = card.getAttribute('data-tech');
        const team = card.getAttribute('data-team');

        modalTitle.textContent = title;
        modalImage.src = img;
        modalDesc.textContent = desc;
        modalYear.textContent = year;
        modalTech.textContent = tech;
        modalTeam.textContent = team;

        // Show Modal
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Event Listeners for Cards (Event Delegation or direct)
    viewButtons.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const card = btn.closest('.project-showcase-card');
            openModal(card);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Close on outside click
    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

});
