document.addEventListener('DOMContentLoaded', () => {

    // --- Elemen DOM yang Sering Digunakan ---
    const mainContent = document.getElementById('main-content');
    const searchInput = document.getElementById('search-input');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const logo = document.getElementById('logo');

    // --- Data yang Disimulasikan (seperti dari database) ---
    const allData = {
        events: [
            { id: 1, type: "upcoming", title: "ONE Friday Fights 119", date: "AUG 8 (FRI) 7:30PM WIB", location: "Lumpinee Stadium, Bangkok", image: "https://via.placeholder.com/600x400/34495e/ffffff?text=ONE+Friday+Fights+119" },
            { id: 2, type: "upcoming", title: "ONE Fight Night 37", date: "NOV 8 (SAT) 9:00AM WIB", location: "Lumpinee Stadium, Bangkok", image: "https://via.placeholder.com/600x400/3498db/ffffff?text=ONE+Fight+Night+37" },
            { id: 3, type: "upcoming", title: "ONE 173: Superbon Vs. Noiri", date: "NOV 16 (SUN) 3:00PM WIB", location: "Ariake Arena, Tokyo", image: "https://via.placeholder.com/600x400/9b59b6/ffffff?text=ONE+173" },
            { id: 4, type: "upcoming", title: "ONE Friday Fights 120", date: "AUG 15 (FRI) 7:30PM WIB", location: "Lumpinee Stadium, Bangkok", image: "https://via.placeholder.com/600x400/f39c12/ffffff?text=ONE+Friday+Fights+120" },
        ],
        athletes: [
            { id: 101, name: "Adrian Mattheis", nickname: "Papua Badboy", country: "Indonesia", age: 32, team: "Tigershark Fighting Academy", weight: "125 LBS / 56.7 KG", height: "5'4\" FT / 163 CM", image: "https://via.placeholder.com/200/2c3e50/ffffff?text=Adrian+Mattheis", records: [
                { result: "LOSS", method: "MMA TKO R1", opponent: "Lito Adiwang", event: "ONE Friday Fights 34", date: "Sep 22, 2023" },
                { result: "WIN", method: "MMA TKO R1", opponent: "Zelang Zhaxi", event: "ONE Fight Night 7", date: "Feb 25, 2023" },
                { result: "LOSS", method: "MMA SUB R1", opponent: "Alex Silva", event: "ONE 158", date: "Jun 3, 2022" },
            ]},
            { id: 102, name: "Rodtang Jitmuangnon", nickname: "The Iron Man", country: "Thailand", age: 26, team: "Jitmuangnon Gym", weight: "135 LBS / 61.2 KG", height: "5'7\" FT / 170 CM", image: "https://via.placeholder.com/200/c0392b/ffffff?text=Rodtang" },
            { id: 103, name: "Stamp Fairtex", nickname: "The Fairtex Girl", country: "Thailand", age: 27, team: "Fairtex Training Center", weight: "115 LBS / 52.2 KG", height: "5'5\" FT / 165 CM", image: "https://via.placeholder.com/200/f39c12/ffffff?text=Stamp" },
        ]
    };

    // --- Fungsi untuk Merender Konten Halaman ---
    function renderPage(pageName, data = null) {
        mainContent.innerHTML = ''; // Kosongkan konten utama
        let pageHTML = '';

        switch (pageName) {
            case 'homepage':
                pageHTML = `
                    <section class="upcoming-events-section">
                        <h2>UPCOMING EVENTS</h2>
                        <div class="event-card-list" id="event-card-list"></div>
                    </section>
                `;
                mainContent.innerHTML = pageHTML;
                renderEvents(allData.events); // Tampilkan semua acara
                break;
            case 'events':
                pageHTML = `
                    <section class="events-page">
                        <h2>ALL EVENTS</h2>
                        <div class="event-card-list" id="event-card-list"></div>
                    </section>
                `;
                mainContent.innerHTML = pageHTML;
                renderEvents(allData.events); // Tampilkan semua acara lagi, bisa ditambahkan filter lain di sini
                break;
            case 'athletes':
                pageHTML = `
                    <section class="athletes-page">
                        <h2>ATHLETES</h2>
                        <div class="athletes-list" id="athletes-list"></div>
                    </section>
                `;
                mainContent.innerHTML = pageHTML;
                renderAthletes(allData.athletes); // Tampilkan daftar atlet
                break;
            case 'athleteProfile':
                const athlete = allData.athletes.find(a => a.id === data.athleteId);
                if (athlete) {
                    pageHTML = `
                        <div class="athlete-header">
                            <img src="${athlete.image}" alt="${athlete.name}" class="athlete-image">
                            <h1 class="athlete-name">${athlete.name}</h1>
                            <p class="athlete-nickname">"${athlete.nickname}"</p>
                        </div>
                        <div class="container">
                            <div class="athlete-details">
                                <div class="detail-item"><div class="detail-label">WEIGHT LIMIT</div><div class="detail-value">${athlete.weight}</div></div>
                                <div class="detail-item"><div class="detail-label">HEIGHT</div><div class="detail-value">${athlete.height}</div></div>
                                <div class="detail-item"><div class="detail-label">COUNTRY</div><div class="detail-value">${athlete.country}</div></div>
                                <div class="detail-item"><div class="detail-label">AGE</div><div class="detail-value">${athlete.age}</div></div>
                                <div class="detail-item"><div class="detail-label">TEAM</div><div class="detail-value">${athlete.team}</div></div>
                            </div>
                            <h3>EVENT RESULTS</h3>
                            <div class="event-results-list" id="event-results-list"></div>
                        </div>
                    `;
                    mainContent.innerHTML = pageHTML;
                    renderAthleteRecords(athlete.records);
                } else {
                    mainContent.innerHTML = `<p class="text-center">Atlet tidak ditemukan.</p>`;
                }
                break;
            default:
                mainContent.innerHTML = `<h2 class="text-center">Halaman ${pageName} sedang dalam pengembangan.</h2>`;
        }
    }

    // Fungsi untuk merender daftar acara
    function renderEvents(events) {
        const eventListContainer = document.getElementById('event-card-list');
        if (!eventListContainer) return;
        
        eventListContainer.innerHTML = '';
        if (events.length === 0) {
            eventListContainer.innerHTML = '<p class="text-center">Tidak ada acara yang cocok.</p>';
            return;
        }

        events.forEach(event => {
            const card = document.createElement('div');
            card.classList.add('event-card');
            card.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <div class="event-details">
                    <h3 class="event-title">${event.title}</h3>
                    <p class="event-date-location">${event.date}<br>${event.location}</p>
                    <a href="#" class="buy-tickets-btn">BUY TICKETS</a>
                </div>
            `;
            eventListContainer.appendChild(card);
        });
    }

    // Fungsi untuk merender daftar atlet
    function renderAthletes(athletes) {
        const athletesList = document.getElementById('athletes-list');
        if (!athletesList) return;
        
        athletesList.innerHTML = '';
        if (athletes.length === 0) {
            athletesList.innerHTML = '<p class="text-center">Tidak ada atlet yang cocok.</p>';
            return;
        }

        athletes.forEach(athlete => {
            const card = document.createElement('div');
            card.classList.add('athlete-card');
            card.innerHTML = `
                <a href="#" class="athlete-link" data-id="${athlete.id}">
                    <img src="${athlete.image}" alt="${athlete.name}">
                    <h4>${athlete.name}</h4>
                    <p>${athlete.country}</p>
                </a>
            `;
            athletesList.appendChild(card);
        });
        // Tambahkan event listener ke setiap link atlet yang baru dibuat
        document.querySelectorAll('.athlete-link').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const athleteId = parseInt(e.currentTarget.dataset.id);
                renderPage('athleteProfile', { athleteId: athleteId });
            });
        });
    }

    // Fungsi untuk merender hasil pertandingan atlet
    function renderAthleteRecords(records) {
        const resultsList = document.getElementById('event-results-list');
        if (!resultsList) return;

        resultsList.innerHTML = '';
        if (!records || records.length === 0) {
            resultsList.innerHTML = '<p class="text-center">Tidak ada hasil pertandingan.</p>';
            return;
        }

        records.forEach(record => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('event-result', record.result.toLowerCase() === 'win' ? 'result-win' : 'result-loss');
            resultItem.innerHTML = `
                <div class="result-info">
                    <div class="status">${record.result}</div>
                    <div>${record.method}</div>
                </div>
                <div class="opponent-details">
                    <h3 class="opponent-name">${record.opponent}</h3>
                    <p class="event-name">${record.event}</p>
                    <p class="event-date">${record.date}</p>
                </div>
            `;
            resultsList.appendChild(resultItem);
        });
    }

    // --- Pendaftaran Event Listeners ---
    // Menu Navigasi
    if (menuToggle && mobileMenu && closeMenu) {
        menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
        closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
        document.addEventListener('click', (event) => {
            if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target) && mobileMenu.classList.contains('open')) {
                mobileMenu.classList.remove('open');
            }
        });
    }

    // Navigasi Antar Halaman
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = e.currentTarget.dataset.page;
            renderPage(pageName);
            mobileMenu.classList.remove('open'); // Tutup menu setelah navigasi
        });
    });

    // Logo kembali ke halaman utama
    logo.addEventListener('click', () => renderPage('homepage'));

    // Pencarian
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            const currentPage = mainContent.dataset.currentPage; // Perlu menambahkan data-currentPage ke mainContent
            let filteredResults;

            // Logika pencarian yang disesuaikan untuk setiap halaman
            if (currentPage === 'homepage' || currentPage === 'events') {
                filteredResults = allData.events.filter(event => 
                    event.title.toLowerCase().includes(searchTerm) || event.location.toLowerCase().includes(searchTerm)
                );
                renderEvents(filteredResults);
            } else if (currentPage === 'athletes') {
                filteredResults = allData.athletes.filter(athlete =>
                    athlete.name.toLowerCase().includes(searchTerm) || athlete.nickname.toLowerCase().includes(searchTerm) || athlete.country.toLowerCase().includes(searchTerm)
                );
                renderAthletes(filteredResults);
            }
        });
    }

    // --- Inisialisasi: Tampilkan halaman beranda saat pertama kali dimuat ---
    renderPage('homepage');
});
