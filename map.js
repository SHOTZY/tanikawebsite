// Initialize the map and set its view
const map = L.map('map').setView([-30.5595, 22.9375], 5); // Center on South Africa

// Add OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
}).addTo(map);

// Load markers from local storage
loadMarkers();

// Function to add markers to the map
function addMarker(name, lat, lng, type, save = true) {
    let markerColor;
    if (type === 'visited') {
        markerColor = 'green';
    } else {
        markerColor = 'pink';
    }

    const marker = L.circleMarker([lat, lng], {
        color: markerColor,
        radius: 8,
        fillColor: markerColor,
        fillOpacity: 0.8
    }).addTo(map);

    const popupContent = `<b>${name}</b><br><button class="delete-btn" onclick="deleteMarker(${lat}, ${lng})">x</button>`;
    marker.bindPopup(popupContent);

    if (save) {
        saveMarker({ name, lat, lng, type });
    }
}

// Function to save markers to local storage
function saveMarker(marker) {
    let markers = JSON.parse(localStorage.getItem('markers')) || [];
    markers.push(marker);
    localStorage.setItem('markers', JSON.stringify(markers));
}

// Function to load markers from local storage
function loadMarkers() {
    let markers = JSON.parse(localStorage.getItem('markers')) || [];
    markers.forEach(marker => {
        addMarker(marker.name, marker.lat, marker.lng, marker.type, false);
    });
}

// Function to delete markers
function deleteMarker(lat, lng) {
    let markers = JSON.parse(localStorage.getItem('markers')) || [];
    markers = markers.filter(marker => marker.lat !== lat || marker.lng !== lng);
    localStorage.setItem('markers', JSON.stringify(markers));
    location.reload(); // Reload the page to update the markers
}

// Add event listener to the button
document.getElementById('addPlaceBtn').addEventListener('click', function() {
    const placeName = document.getElementById('placeName').value;
    const latitude = parseFloat(document.getElementById('latitude').value);
    const longitude = parseFloat(document.getElementById('longitude').value);
    const placeType = document.getElementById('placeType').value;

    if (placeName && !isNaN(latitude) && !isNaN(longitude)) {
        addMarker(placeName, latitude, longitude, placeType);
        
        // Clear the input fields
        document.getElementById('placeName').value = '';
        document.getElementById('latitude').value = '';
        document.getElementById('longitude').value = '';
    } else {
        alert('Please enter valid place name and coordinates.');
    }
});
