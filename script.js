document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements Cache ---
    const mainContent = document.getElementById('main-content');
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenu = document.getElementById('close-menu');
    const searchToggle = document.getElementById('search-toggle');
    const searchBar = document.getElementById('search-bar');
    const searchInput = document.getElementById('search-input');
    const logoLink = document.getElementById('logo-link');
    const adBanner = document.getElementById('ad-banner');
    const closeAdBtn = document.getElementById('close-ad');

    // --- State Management ---
    const appState = {
        currentPage: 'homepage',
        currentFilter: ''
    };

    // --- Simulated Data (mimicking a database/API response) ---
    const dataStore = {
        events: [
            { id: 1, title: "ONE Friday Fights 119", date: "AUG 8 (FRI) 7:30PM WIB", location: "Lumpinee Stadium, Bangkok", image: "https://via.placeholder.com/600x400/34495e/ffffff?text=ONE+Friday+Fights+119" },
            { id: 2, title: "ONE Fight Night 37", date: "NOV 8 (SAT) 9:00AM WIB", location: "Lumpinee Stadium, Bangkok", image: "https://via.placeholder.com/600x400/3498db/ffffff?text=ONE+Fight+Night+37" },
            { id: 3, title: "ONE 173: Superbon Vs. Noiri", date: "NOV 16 (SUN) 3:00PM WIB", location: "Ariake Arena, Tokyo", image: "https://via.placeholder.com/600x400/9b59b6/ffffff?text=ONE+173" },
            { id: 4, title: "ONE Friday Fights 120", date: "AUG 15 (FRI) 7:30PM WIB", location: "Lumpinee Stadium, Bangkok", image: "https://via.placeholder.com/600x400/f39c12/ffffff?text=ONE+Friday+Fights+120" },
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

    // --- HTML Template Functions ---
    const templates = {
        homepage: () => `
            <section class="container">
                <h2 class="section-title">Upcoming Events</h2>
                <div class="event-card-list" id="event-list-container"></div>
            </section>
        `,
        events: () => `
            <section class="container">
                <h2 class="section-title">All Events</h2>
                <div class="event-card-list" id="event-list-container"></div>
            </section>
        `,
        athletes: () => `
            <section class="container">
                <h2 class="section-title">Athletes</h2>
                <div class="athletes-list" id="athletes-list-container"></div>
            </section>
        `,
        athleteProfile: (athlete) => `
            <div class="athlete-profile-header">
                <div class="container">
                    <img src="${athlete.image}" alt="${athlete.name}" class="profile-image">
                    <h1 class="profile-name">${athlete.name}</h1>
                    <p class="profile-nickname">${athlete.nickname}</p>
                    <div class="profile-details">
                        <div class="detail-card">
                            <div class="detail-label">Weight Limit</div>
                            <div class="detail-value">${athlete.weight}</div>
                        </div>
                        <div class="detail-card">
                            <div class="detail-label">Height</div>
                            <div class="detail-value">${athlete.height}</div>
                        </div>
                        <div class="detail-card">
                            <div class="detail-label">Country</div>
                            <div class="detail-value">${athlete.country}</div>
                        </div>
                        <div class="detail-card">
                            <div class="detail-label">Age</div>
                            <div class="detail-value">${athlete.age}</div>
                        </div>
                        <div class="detail-card full-width">
                            <div class="detail-label">Team</div>
                            <div class="detail-value">${athlete.team}</div>
                        </div>
                    </div>
                </div>
            </div>
            <section class="container results-section">
                <h3 class="section-title">Event Results</h3>
                <div id="event-results-container"></div>
            </section>
        `,
        // ... Tambahkan template untuk halaman lain di sini
        defaultPage: (pageName) => `<h2 class="section-title text-center">Halaman '${pageName}' sedang dalam pengembangan.</h2>`
    };

    // --- Rendering Functions ---
    const render = {
        events: (events, containerId = 'event-list-container') => {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';
            if (events.length === 0) {
                container.innerHTML = '<p class="text-center">Tidak ada acara yang ditemukan.</p>';
                return;
            }
            events.forEach(event => {
                const card = document.createElement('div');
                card.className = 'event-card';
                card.innerHTML = `
                    <img src="${event.image}" alt="${event.title}" class="event-card-image">
                    <div class="event-card-details">
                        <h3 class="event-card-title">${event.title}</h3>
                        <p class="event-card-info">${event.date}</p>
                        <p class="event-card-info">${event.location}</p>
                    </div>
                `;
                container.appendChild(card);
            });
        },
        athletes: (athletes, containerId = 'athletes-list-container') => {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';
            if (athletes.length === 0) {
                container.innerHTML = '<p class="text-center">Tidak ada atlet yang ditemukan.</p>';
                return;
            }
            athletes.forEach(athlete => {
                const card = document.createElement('div');
                card.className = 'athlete-card';
                card.innerHTML = `
                    <a href="#" class="athlete-card-link" data-id="${athlete.id}">
                        <img src="${athlete.image}" alt="${athlete.name}">
                        <div class="athlete-card-info">
                            <h4 class="athlete-card-name">${athlete.name}</h4>
                            <p class="athlete-card-country">${athlete.country}</p>
                        </div>
                    </a>
                `;
                container.appendChild(card);
            });
            // Add click listener for newly rendered athlete cards
            container.querySelectorAll('.athlete-card-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const athleteId = parseInt(e.currentTarget.dataset.id);
                    const athlete = dataStore.athletes.find(a => a.id === athleteId);
                    if (athlete) {
                        navigateTo('athleteProfile', { athlete: athlete });
                    }
                });
            });
        },
        athleteRecords: (records, containerId = 'event-results-container') => {
            const container = document.getElementById(containerId);
            if (!container) return;
            container.innerHTML = '';
            if (!records || records.length === 0) {
                container.innerHTML = '<p class="text-center">Tidak ada catatan pertandingan.</p>';
                return;
            }
            records.forEach(record => {
                const resultClass = record.result.toLowerCase() === 'win' ? 'result-win' : 'result-loss';
                const resultItem = document.createElement('div');
                resultItem.className = `event-result ${resultClass}`;
                resultItem.innerHTML = `
                    <div class="result-info">
                        <div class="result-status">${record.result}</div>
                        <div>${record.method}</div>
                    </div>
                    <div class="opponent-details">
                        <h3 class="opponent-name">${record.opponent}</h3>
                        <p class="event-name">${record.event}</p>
                        <p class="event-date">${record.date}</p>
                    </div>
                `;
                container.appendChild(resultItem);
            });
        }
    };

    // --- Main Navigation Logic ---
    function navigateTo(page, data = {}) {
        let pageHTML = '';

        if (page === 'athleteProfile' && data.athlete) {
            pageHTML = templates.athleteProfile(data.athlete);
        } else if (templates[page]) {
            pageHTML = templates[page]();
        } else {
            pageHTML = templates.defaultPage(page);
        }

        mainContent.innerHTML = pageHTML;
        appState.currentPage = page;
        
        // Render specific content after the page template is in the DOM
        if (page === 'homepage' || page === 'events') {
            render.events(dataStore.events);
        } else if (page === 'athletes') {
            render.athletes(dataStore.athletes);
        } else if (page === 'athleteProfile' && data.athlete) {
            render.athleteRecords(data.athlete.records);
        }

        // Update active class on nav links
        navLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.nav-link[data-page="${page}"]`) || document.querySelector(`.mobile-nav-link[data-page="${page}"]`);
        if (activeLink) activeLink.classList.add('active');

        // Scroll to the top of the page
        window.scrollTo(0, 0);
    }

    // --- Event Listeners ---
    // Mobile Menu
    menuToggle.addEventListener('click', () => mobileMenu.classList.add('open'));
    closeMenu.addEventListener('click', () => mobileMenu.classList.remove('open'));
    document.addEventListener('click', (event) => {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target) && mobileMenu.classList.contains('open')) {
            mobileMenu.classList.remove('open');
        }
    });

    // Search Bar
    searchToggle.addEventListener('click', () => searchBar.classList.toggle('visible'));
    searchInput.addEventListener('keyup', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        appState.currentFilter = searchTerm;

        let filteredData;
        if (appState.currentPage === 'homepage' || appState.currentPage === 'events') {
            filteredData = dataStore.events.filter(item => 
                item.title.toLowerCase().includes(searchTerm) || item.location.toLowerCase().includes(searchTerm)
            );
            render.events(filteredData);
        } else if (appState.currentPage === 'athletes') {
            filteredData = dataStore.athletes.filter(item =>
                item.name.toLowerCase().includes(searchTerm) || item.nickname.toLowerCase().includes(searchTerm) || item.country.toLowerCase().includes(searchTerm)
            );
            render.athletes(filteredData);
        }
    });

    // Page Navigation
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const pageName = e.currentTarget.dataset.page;
            navigateTo(pageName);
            mobileMenu.classList.remove('open');
            searchBar.classList.remove('visible'); // Hide search bar on navigation
        });
    });

    logoLink.addEventListener('click', (e) => {
        e.preventDefault();
        navigateTo('homepage');
    });

    // Ad Banner
    setTimeout(() => {
        adBanner.classList.add('visible');
    }, 2000); // Tampilkan banner setelah 2 detik

    closeAdBtn.addEventListener('click', () => {
        adBanner.style.display = 'none'; // Sembunyikan banner sepenuhnya
    });

    // Initial load: Render the homepage
    navigateTo('homepage');
});
