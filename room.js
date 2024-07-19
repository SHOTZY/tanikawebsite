import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyC39tQYFJvbwq7PUCDakDMmb8mome9JdmQ",
    authDomain: "tanikawebsite.firebaseapp.com",
    projectId: "tanikawebsite",
    storageBucket: "tanikawebsite.appspot.com",
    messagingSenderId: "970212156782",
    appId: "1:970212156782:web:ab6ab9ef81fb2465298d7f",
    measurementId: "G-09LXER9N1Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', loadRoomsFromDatabase);

document.getElementById('add-room-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const roomName = document.getElementById('room-name').value;
    const roomDescription = document.getElementById('room-description').value;
    const roomPhotos = document.getElementById('room-photo').files;
    const editIndex = document.getElementById('edit-index').value;

    if (roomName && roomDescription) {
        const reader = new FileReader();
        let images = [];
        let imagesLoaded = 0;

        const addRoom = (roomId = null) => {
            const imgElements = images.length > 0 ? images.map(src => `<img src="${src}" alt="Room Inspiration">`).join('') : '';
            const room = {
                name: roomName,
                description: roomDescription,
                photos: images
            };

            if (roomId) {
                // Update existing room
                update(ref(database, 'rooms/' + roomId), room);
                document.getElementById('edit-index').value = "";
            } else {
                // Add new room
                const newRoomRef = push(ref(database, 'rooms'));
                set(newRoomRef, room);
            }

            loadRoomsFromDatabase();
            document.getElementById('add-room-form').reset();
            document.getElementById('form-heading').innerText = 'Add a Room';
        };

        if (roomPhotos.length > 0) {
            for (let i = 0; i < roomPhotos.length; i++) {
                reader.readAsDataURL(roomPhotos[i]);

                reader.onload = function(e) {
                    images.push(e.target.result);
                    imagesLoaded++;

                    if (imagesLoaded === roomPhotos.length) {
                        addRoom(editIndex);
                    }
                };
            }
        } else {
            addRoom(editIndex);
        }
    }
});

document.getElementById('room-list').addEventListener('click', function(event) {
    if (event.target.classList.contains('delete')) {
        const roomId = event.target.parentElement.getAttribute('data-id');
        if (roomId) {
            remove(ref(database, 'rooms/' + roomId))
                .then(() => {
                    console.log(`Room ${roomId} deleted successfully`);
                    loadRoomsFromDatabase(); // Refresh the room list after deletion
                })
                .catch((error) => {
                    console.error("Error removing room: ", error);
                });
        }
    }

    if (event.target.classList.contains('edit')) {
        const listItem = event.target.parentElement;
        const roomName = listItem.querySelector('h3').innerText;
        const roomDescription = listItem.querySelector('p').innerText;
        const roomPhotos = Array.from(listItem.querySelectorAll('img')).map(img => img.src);

        document.getElementById('form-heading').innerText = 'Edit Room';
        document.getElementById('room-name').value = roomName;
        document.getElementById('room-description').value = roomDescription;
        document.getElementById('edit-index').value = listItem.getAttribute('data-id');

        document.getElementById('room-photo').setAttribute('data-urls', JSON.stringify(roomPhotos));
        document.getElementById('room-photo').value = "";
    }
});

function loadRoomsFromDatabase() {
    const roomList = document.getElementById('room-list');
    roomList.innerHTML = '';

    onValue(ref(database, 'rooms'), (snapshot) => {
        const rooms = snapshot.val() || {};
        
        for (const id in rooms) {
            const room = rooms[id];
            const imgElements = (room.photos && room.photos.length > 0) ? room.photos.map(src => `<img src="${src}" alt="Room Inspiration">`).join('') : '';
            const roomElement = `
                <li data-id="${id}">
                    <h3>${room.name}</h3>
                    <p>${room.description}</p>
                    ${imgElements}
                    <button class="edit">Edit</button>
                    <button class="delete">Delete</button>
                </li>
            `;
            roomList.innerHTML += roomElement;
        }
    });
}
