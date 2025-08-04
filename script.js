document.addEventListener('DOMContentLoaded', () => {

    // --- Fungsionalitas Menu Navigasi Mobile ---
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');

    menuToggle.addEventListener('click', () => {
        mobileMenu.classList.add('open');
    });

    closeMenu.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
    });

    // Menutup menu saat mengklik di luar area menu
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileMenu.classList.remove('open');
        }
    });


    // --- Fungsionalitas untuk Menampilkan Kartu Acara Secara Dinamis ---
    const eventData = [
        {
            title: "ONE Friday Fights 119",
            date: "AUG 8 (FRI) 7:30PM WIB",
            location: "Lumpinee Stadium, Bangkok",
            image: "https://via.placeholder.com/600x400/34495e/ffffff?text=ONE+Friday+Fights+119"
        },
        {
            title: "ONE Fight Night 37",
            date: "NOV 8 (SAT) 9:00AM WIB",
            location: "Lumpinee Stadium, Bangkok",
            image: "https://via.placeholder.com/600x400/3498db/ffffff?text=ONE+Fight+Night+37"
        },
        {
            title: "ONE 173: Superbon Vs. Noiri",
            date: "NOV 16 (SUN) 3:00PM WIB",
            location: "Ariake Arena, Tokyo",
            image: "https://via.placeholder.com/600x400/9b59b6/ffffff?text=ONE+173"
        }
    ];

    const eventListContainer = document.querySelector('.event-card-list');

    eventData.forEach(event => {
        const card = document.createElement('div');
        card.classList.add('event-card');

        const cardHTML = `
            <img src="${event.image}" alt="${event.title}">
            <div class="event-details">
                <h3 class="event-title">${event.title}</h3>
                <p class="event-date-location">${event.date}<br>${event.location}</p>
                <a href="#" class="buy-tickets-btn">BUY TICKETS</a>
            </div>
        `;
        
        card.innerHTML = cardHTML;
        eventListContainer.appendChild(card);
    });
});
