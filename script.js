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

    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target) && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
        }
    });

    // --- Data Acara (Simulasi data dari database/API) ---
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
        },
        {
            title: "ONE Friday Fights 120",
            date: "AUG 15 (FRI) 7:30PM WIB",
            location: "Lumpinee Stadium, Bangkok",
            image: "https://via.placeholder.com/600x400/f39c12/ffffff?text=ONE+Friday+Fights+120"
        },
    ];

    const eventListContainer = document.getElementById('event-card-list');

    // Fungsi untuk menampilkan semua acara
    function renderEvents(events) {
        eventListContainer.innerHTML = ''; // Kosongkan container sebelum menampilkan
        if (events.length === 0) {
            eventListContainer.innerHTML = '<p style="text-align: center; color: #aaaaaa;">Tidak ada acara yang cocok.</p>';
            return;
        }

        events.forEach(event => {
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
    }

    // Tampilkan semua acara saat halaman pertama kali dimuat
    renderEvents(eventData);

    // --- Fungsionalitas Pencarian ---
    const searchInput = document.getElementById('search-input');
    
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        
        // Filter data acara berdasarkan input pencarian
        const filteredEvents = eventData.filter(event => {
            return event.title.toLowerCase().includes(searchTerm) || event.location.toLowerCase().includes(searchTerm);
        });
        
        // Tampilkan acara yang telah difilter
        renderEvents(filteredEvents);
    });

    // Fungsionalitas untuk tombol pencarian (jika diperlukan)
    // const searchButton = document.getElementById('search-button');
    // searchButton.addEventListener('click', () => {
    //     // Anda bisa memanggil fungsi pencarian di sini jika ingin tombol juga berfungsi
    //     const searchTerm = searchInput.value.toLowerCase();
    //     const filteredEvents = eventData.filter(event => {
    //         return event.title.toLowerCase().includes(searchTerm) || event.location.toLowerCase().includes(searchTerm);
    //     });
    //     renderEvents(filteredEvents);
    // });
});
