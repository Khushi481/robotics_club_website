document.addEventListener('DOMContentLoaded', () => {

    const filterBtns = document.querySelectorAll('.news-filter-btn');
    const newsCards = document.querySelectorAll('.news-item'); // Assuming common class for filtering

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active to clicked
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');
            let visibleCount = 0;

            newsCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'flex';
                    card.classList.remove('hidden');
                    visibleCount++;

                    // Simple animation reset
                    card.style.animation = 'none';
                    card.offsetHeight; /* trigger reflow */
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                    card.style.display = 'none'; // Effective hiding
                }
            });

            // Handle "No Updates" Message
            const container = document.querySelector('.news-container'); // Or specific grid container if preferred
            let noUpdateMsg = document.querySelector('.no-updates-msg');

            if (visibleCount === 0) {
                if (!noUpdateMsg) {
                    noUpdateMsg = document.createElement('div');
                    noUpdateMsg.className = 'no-updates-msg';
                    noUpdateMsg.innerHTML = `
                        <div style="text-align: center; padding: 50px; color: var(--text-dim); width: 100%;">
                            <i class="fas fa-folder-open" style="font-size: 3rem; margin-bottom: 20px; opacity: 0.5;"></i>
                            <h3>No updates till now</h3>
                            <p>Check back later for news in this category.</p>
                        </div>
                    `;
                    // Insert after filters
                    const filters = document.querySelector('.news-filters');
                    if (filters && filters.nextSibling) {
                        filters.parentNode.insertBefore(noUpdateMsg, filters.nextSibling);
                    } else if (container) {
                        container.appendChild(noUpdateMsg);
                    }
                }
                noUpdateMsg.style.display = 'block';

                // Hide section titles if they exist and we are filtering
                document.querySelectorAll('.news-section-title').forEach(el => el.style.display = 'none');

            } else {
                if (noUpdateMsg) {
                    noUpdateMsg.style.display = 'none';
                }
                // Show section titles again if 'all' is selected, or hide them if specific filter is active (usually specific filters flatten the list)
                document.querySelectorAll('.news-section-title').forEach(el => {
                    el.style.display = filterValue === 'all' ? 'block' : 'none';
                });
            }
        });
    });

    // Newsletter simple interaction (Show alert as it's non-functional)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', (e) => {
            e.preventDefault();
            alert('Thanks for your interest! Newsletter subscription is currently disabled for maintenance.');
        });
    }

});

// Add fade in animation to stylesheet dynamically or assume in CSS
// I will ensure CSS has .hidden class
