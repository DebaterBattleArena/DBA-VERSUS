document.addEventListener('DOMContentLoaded', async () => {
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

    // Dapatkan ID fighter dari URL parameter
    const urlParams = new URLSearchParams(window.location.search);
    const fighterId = urlParams.get('fighter');

    if (!fighterId) {
        document.getElementById('fighter-profile-page').innerHTML = '<p style="text-align: center; padding-top: 50px;">Fighter not found.</p>';
        return;
    }

    try {
        // Ambil data dari file data.json
        const response = await fetch('data.json');
        const data = await response.json();
        const fighter = data.fighters.find(f => f.id === fighterId);

        if (!fighter) {
            document.getElementById('fighter-profile-page').innerHTML = '<p style="text-align: center; padding-top: 50px;">Fighter not found.</p>';
            return;
        }

        // Tampilkan data profil
        const profileContainer = document.getElementById('fighter-profile-page');
        profileContainer.innerHTML = `
            <div class="fighter-profile">
                <div class="profile-header">
                    <img src="${fighter.image_url}" alt="${fighter.name}">
                    <h1>${fighter.name}</h1>
                    <p>${fighter.country}</p>
                </div>
                <div class="profile-details">
                    <div>
                        <span>Height</span>
                        <p>${fighter.height}</p>
                    </div>
                    <div>
                        <span>Weight Limit</span>
                        <p>${fighter.weight_limit}</p>
                    </div>
                    <div>
                        <span>Age</span>
                        <p>${fighter.age}</p>
                    </div>
                    <div>
                        <span>Team</span>
                        <p>${fighter.team}</p>
                    </div>
                </div>
                <div class="fighter-records">
                    <h3>Event Results</h3>
                    <table class="record-table">
                        <thead>
                            <tr>
                                <th>Result</th>
                                <th>Opponent and Event</th>
                                <th>Method</th>
                            </tr>
                        </thead>
                        <tbody id="record-body">
                            </tbody>
                    </table>
                </div>
            </div>
        `;

        // Tampilkan catatan pertandingan
        const recordBody = document.getElementById('record-body');
        fighter.records.forEach(record => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="record-${record.result.toLowerCase()}">${record.result}</td>
                <td>
                    <strong>${record.opponent}</strong><br>
                    ${record.event}<br>
                    <small>${record.date}</small>
                </td>
                <td>
                    ${record.method} (${record.round})
                </td>
            `;
            recordBody.appendChild(row);
        });

    } catch (error) {
        console.error('Error fetching fighter data:', error);
        document.getElementById('fighter-profile-page').innerHTML = '<p style="text-align: center; padding-top: 50px;">Error loading fighter data.</p>';
    }
});
