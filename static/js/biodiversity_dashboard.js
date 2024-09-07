let map, marker;
const municipalityCoords = {
    'Tunja': [5.5444, -73.3622],
    'Duitama': [5.8268, -73.0335],
    'Sogamoso': [5.7158, -72.9289]
};
let biodiversityData = {};

function initMap() {
    map = L.map('map').setView([5.6344, -73.0806], 8);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
}

async function fetchBiodiversityData() {
    try {
        const response = await fetch('/api/biodiversity');
        const data = await response.json();
        biodiversityData = data.reduce((acc, item) => {
            acc[item.municipality] = item;
            return acc;
        }, {});
        updateData('Tunja'); // Inicializar con datos de Tunja
    } catch (error) {
        console.error('Error fetching biodiversity data:', error);
    }
}

function updateData(municipality) {
    const data = biodiversityData[municipality];
    if (data) {
        document.getElementById('total-species').textContent = data.total_species;
        const topSpeciesList = document.getElementById('top-species');
        topSpeciesList.innerHTML = '';
        data.top_species.forEach(([species, count]) => {
            const li = document.createElement('li');
            li.textContent = `${species}: ${count}`;
            topSpeciesList.appendChild(li);
        });
    }

    // Actualizar mapa
    if (marker) {
        map.removeLayer(marker);
    }
    marker = L.marker(municipalityCoords[municipality]).addTo(map);
    map.setView(municipalityCoords[municipality], 12);

    // Actualizar pestaña activa
    document.querySelectorAll('.tab').forEach(tab => {
        tab.classList.toggle('active', tab.textContent === municipality);
    });
}

// Funcionalidad del sidebar
const toggleBtn = document.getElementById('toggle-btn');
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');

function toggleSidebar() {
    sidebar.classList.toggle('collapsed');
    mainContent.classList.toggle('sidebar-collapsed');
}

toggleBtn.addEventListener('click', toggleSidebar);

// Contraer el sidebar por defecto en móviles
function checkWidth() {
    if (window.innerWidth <= 768) {
        sidebar.classList.add('collapsed');
        mainContent.classList.add('sidebar-collapsed');
    } else {
        sidebar.classList.remove('collapsed');
        mainContent.classList.remove('sidebar-collapsed');
    }
}

// Ejecutar al cargar y cuando se cambie el tamaño de la ventana
window.addEventListener('load', checkWidth);
window.addEventListener('resize', checkWidth);