import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getDatabase, ref, set, push, onValue, update, remove } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
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

// Wait for DOM content to be loaded
document.addEventListener('DOMContentLoaded', () => {
    loadIdeas();

    // Add event listener for the Add button
    document.getElementById('add-idea-btn').addEventListener('click', addIdea);
});

function loadIdeas() {
    const ideasRef = ref(database, 'ideas/');
    onValue(ideasRef, (snapshot) => {
        const ideas = snapshot.val();
        const ideaList = document.getElementById('idea-list');
        ideaList.innerHTML = ''; // Clear the current list
        for (const id in ideas) {
            addIdeaToList(id, ideas[id].text, ideas[id].completed);
        }
    });
}

function addIdea() {
    const input = document.getElementById('new-idea');
    const ideaText = input.value.trim();

    if (ideaText) {
        const newIdeaRef = push(ref(database, 'ideas/'));
        set(newIdeaRef, {
            text: ideaText,
            completed: false
        });
        input.value = '';
    }
}

function addIdeaToList(id, text, completed) {
    const ideaList = document.getElementById('idea-list');
    const li = document.createElement('li');
    li.className = completed ? 'completed' : '';
    li.innerHTML = `
        <span>${text}</span>
        <div>
            <button data-id="${id}" class="toggle-btn">✓</button>
            <button data-id="${id}" class="remove-btn">X</button>
        </div>
    `;
    ideaList.appendChild(li);
}

// Use event delegation for dynamic elements
document.getElementById('idea-list').addEventListener('click', (event) => {
    if (event.target.classList.contains('toggle-btn')) {
        const id = event.target.dataset.id;
        const li = event.target.closest('li');
        li.classList.toggle('completed');
        update(ref(database, 'ideas/' + id), { completed: li.classList.contains('completed') });
    } else if (event.target.classList.contains('remove-btn')) {
        const id = event.target.dataset.id;
        const li = event.target.closest('li');
        li.remove();
        remove(ref(database, 'ideas/' + id));
    }
});
