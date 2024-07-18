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

// Function to add a new dream
function addDream() {
    const dreamInput = document.getElementById('new-dream');
    const dreamText = dreamInput.value.trim();
    
    if (dreamText === "") return;

    const dreamRef = push(ref(database, 'dreams'));
    set(dreamRef, {
        text: dreamText,
        completed: false
    }).then(() => {
        dreamInput.value = '';  // Clear input field on success
    }).catch((error) => {
        console.error("Error adding dream: ", error);
    });
}

// Function to add a new goal
function addGoal() {
    const goalInput = document.getElementById('new-goal');
    const goalText = goalInput.value.trim();
    
    if (goalText === "") return;

    const goalRef = push(ref(database, 'goals'));
    set(goalRef, {
        text: goalText,
        completed: false
    }).then(() => {
        goalInput.value = '';  // Clear input field on success
    }).catch((error) => {
        console.error("Error adding goal: ", error);
    });
}

// Function to toggle the completed status of a dream
function toggleDream(id, completed) {
    const dreamRef = ref(database, 'dreams/' + id);
    update(dreamRef, {
        completed: !completed
    }).catch((error) => {
        console.error("Error updating dream: ", error);
    });
}

// Function to toggle the completed status of a goal
function toggleGoal(id, completed) {
    const goalRef = ref(database, 'goals/' + id);
    update(goalRef, {
        completed: !completed
    }).catch((error) => {
        console.error("Error updating goal: ", error);
    });
}

// Function to remove a dream
function removeDream(id) {
    const dreamRef = ref(database, 'dreams/' + id);
    remove(dreamRef).catch((error) => {
        console.error("Error removing dream: ", error);
    });
}

// Function to remove a goal
function removeGoal(id) {
    const goalRef = ref(database, 'goals/' + id);
    remove(goalRef).catch((error) => {
        console.error("Error removing goal: ", error);
    });
}

// Function to render the list of dreams
function renderDreams(dreams) {
    const dreamsList = document.getElementById('dreams-list');
    dreamsList.innerHTML = '';
    
    for (const id in dreams) {
        const dream = dreams[id];
        const dreamItem = document.createElement('li');
        dreamItem.textContent = dream.text;
        
        if (dream.completed) {
            dreamItem.classList.add('completed');
        }
        
        dreamItem.onclick = () => {
            toggleDream(id, dream.completed);
        };

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.onclick = (e) => {
            e.stopPropagation();
            removeDream(id);
        };

        dreamItem.appendChild(removeButton);
        dreamsList.appendChild(dreamItem);
    }
}

// Function to render the list of goals
function renderGoals(goals) {
    const goalsList = document.getElementById('goals-list');
    goalsList.innerHTML = '';
    
    for (const id in goals) {
        const goal = goals[id];
        const goalItem = document.createElement('li');
        goalItem.textContent = goal.text;
        
        if (goal.completed) {
            goalItem.classList.add('completed');
        }
        
        goalItem.onclick = () => {
            toggleGoal(id, goal.completed);
        };

        const removeButton = document.createElement('button');
        removeButton.textContent = 'X';
        removeButton.onclick = (e) => {
            e.stopPropagation();
            removeGoal(id);
        };

        goalItem.appendChild(removeButton);
        goalsList.appendChild(goalItem);
    }
}

// Listen for changes in the dreams list
const dreamsRef = ref(database, 'dreams');
onValue(dreamsRef, (snapshot) => {
    const data = snapshot.val();
    renderDreams(data);
});

// Listen for changes in the goals list
const goalsRef = ref(database, 'goals');
onValue(goalsRef, (snapshot) => {
    const data = snapshot.val();
    renderGoals(data);
});

// Export the addDream and addGoal functions to make them available globally
window.addDream = addDream;
window.addGoal = addGoal;
