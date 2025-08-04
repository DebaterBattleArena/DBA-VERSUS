document.addEventListener('DOMContentLoaded', () => {
    // Fungsionalitas Menu Hamburger
    const menuToggle = document.getElementById('menu-toggle');
    const sidebarMenu = document.getElementById('sidebar-menu');
    const hasSubmenu = document.querySelector('.has-submenu');

    menuToggle.addEventListener('click', () => {
        sidebarMenu.classList.toggle('active');
    });

    if (hasSubmenu) {
        hasSubmenu.addEventListener('click', (e) => {
            e.preventDefault();
            hasSubmenu.classList.toggle('open');
        });
    }

    // Fungsionalitas Pencarian
    const searchBtn = document.querySelector('.search-btn');
    const searchBox = document.querySelector('.search-box');
    const searchInput = document.querySelector('.search-box input');

    searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        searchBox.classList.toggle('active');
        if (searchBox.classList.contains('active')) {
            searchInput.focus();
        }
    });

    // Sembunyikan kotak pencarian jika user klik di luar
    document.addEventListener('click', (e) => {
        if (!searchBox.contains(e.target) && !searchBtn.contains(e.target) && !sidebarMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            searchBox.classList.remove('active');
            sidebarMenu.classList.remove('active');
        }
    });

    // Dummy data untuk event
    const upcomingEvents = [
        {
            id: 'ff119',
            title: 'ONE Friday Fights 119',
            date: 'AUG 8 (FRI) 7:30PM WIB',
            location: 'Lumpinee Stadium, Bangkok',
            image: 'https://images.onefc.com/one-championship/2023/11/FF119-Key-Art-1920X1280.jpg'
        },
        {
            id: 'one173',
            title: 'ONE 173: Superbon vs. Noiri',
            date: 'NOV 16 (SUN) 3:00PM WIB',
            location: 'Ariake Arena, Tokyo',
            image: 'https://images.onefc.com/one-championship/2023/11/ONE-173-Key-Art-1920x1280.jpg'
        }
    ];

    const upcomingEventsList = document.getElementById('upcoming-events-list');

    if (upcomingEventsList) {
        upcomingEvents.forEach(event => {
            const eventCard = document.createElement('div');
            eventCard.classList.add('event-card');
            eventCard.innerHTML = `
                <img src="${event.image}" alt="${event.title}">
                <div class="event-info">
                    <h3>${event.title}</h3>
                    <p>${event.date}</p>
                    <p>${event.location}</p>
                    <button>BUY TICKETS</button>
                </div>
            `;
            upcomingEventsList.appendChild(eventCard);
        });
    }

    // Dummy data untuk slider
    const heroSliderItems = [
        {
            title: 'The Best Pictures From ONE Fight Night 34: Eersel vs. Jarvis',
            image: 'https://images.onefc.com/one-championship/2023/11/ONE-Fight-Night-17-Main-Event.jpg'
        },
        {
            title: 'Regian Eersel Extends Legendary ONE World Title Reign With First-Round Knockout',
            image: 'https://images.onefc.com/one-championship/2023/11/Eersel-vs-Jarvis_Action_1200x800.jpg'
        }
    ];

    const heroSlider = document.getElementById('hero-slider');
    heroSliderItems.forEach((item, index) => {
        const sliderItem = document.createElement('div');
        sliderItem.classList.add('hero-slider-item');
        if (index === 0) {
            sliderItem.classList.add('active');
        }
        sliderItem.style.backgroundImage = `url(${item.image})`;
        sliderItem.innerHTML = `
            <div class="hero-text">
                <h2>${item.title}</h2>
                <a href="#">READ <i class="fas fa-chevron-right"></i></a>
            </div>
        `;
        heroSlider.appendChild(sliderItem);
    });
});
