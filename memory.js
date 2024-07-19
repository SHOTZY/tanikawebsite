import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set, push, onValue, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-analytics.js";

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
const analytics = getAnalytics(app);
const database = getDatabase(app);

document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('memoryForm');
    const memoryList = document.getElementById('memoryList');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const date = document.getElementById('memoryDate').value;
        const description = document.getElementById('memoryDescription').value;

        if (date && description) {
            saveMemory(date, description);
            form.reset();
        }
    });

    function saveMemory(date, description) {
        const memoryRef = ref(database, 'memories');
        const newMemoryRef = push(memoryRef);

        set(newMemoryRef, {
            date: date,
            description: description
        }).then(() => {
            console.log('Memory saved successfully.');
        }).catch((error) => {
            console.error('Error saving memory: ', error);
        });
    }

    function displayMemory(id, date, description) {
        const memoryItem = document.createElement('li');
        memoryItem.innerHTML = `
            <strong>${date}</strong>
            <p>${description}</p>
            <button class="delete-btn" data-id="${id}">Delete</button>
        `;
        memoryList.appendChild(memoryItem);
    }

    function deleteMemory(id) {
        const memoryRef = ref(database, `memories/${id}`);
        remove(memoryRef).then(() => {
            console.log('Memory deleted successfully.');
        }).catch((error) => {
            console.error('Error deleting memory: ', error);
        });
    }

    // Fetch existing memories
    const memoryRef = ref(database, 'memories');
    onValue(memoryRef, (snapshot) => {
        memoryList.innerHTML = ''; // Clear existing list items
        snapshot.forEach((childSnapshot) => {
            const id = childSnapshot.key; // Get the unique ID of the memory
            const memory = childSnapshot.val();
            displayMemory(id, memory.date, memory.description);
        });
    });

    // Event delegation for delete button clicks
    memoryList.addEventListener('click', function(event) {
        if (event.target && event.target.classList.contains('delete-btn')) {
            const id = event.target.getAttribute('data-id');
            deleteMemory(id);
        }
    });
});
