document.addEventListener('DOMContentLoaded', () => {
    loadIdeas();
});

function loadIdeas() {
    const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
    ideas.forEach(idea => addIdeaToList(idea.text, idea.completed));
}

function addIdea() {
    const input = document.getElementById('new-idea');
    const ideaText = input.value.trim();

    if (ideaText) {
        addIdeaToList(ideaText, false);
        saveIdea(ideaText, false);
        input.value = '';
    }
}

function addIdeaToList(text, completed) {
    const ideaList = document.getElementById('idea-list');
    const li = document.createElement('li');
    li.className = completed ? 'completed' : '';
    li.innerHTML = `
        <span>${text}</span>
        <div>
            <button onclick="toggleCompleted(this)">✓</button>
            <button onclick="removeIdea(this)">X</button>
        </div>
    `;
    ideaList.appendChild(li);
}

function toggleCompleted(button) {
    const li = button.parentElement.parentElement;
    li.classList.toggle('completed');
    const text = li.querySelector('span').textContent;
    updateIdea(text, li.classList.contains('completed'));
}

function removeIdea(button) {
    const li = button.parentElement.parentElement;
    const text = li.querySelector('span').textContent;
    li.remove();
    deleteIdea(text);
}

function saveIdea(text, completed) {
    const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
    ideas.push({ text, completed });
    localStorage.setItem('ideas', JSON.stringify(ideas));
}

function updateIdea(text, completed) {
    const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
    const updatedIdeas = ideas.map(idea => idea.text === text ? { text, completed } : idea);
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
}

function deleteIdea(text) {
    const ideas = JSON.parse(localStorage.getItem('ideas')) || [];
    const updatedIdeas = ideas.filter(idea => idea.text !== text);
    localStorage.setItem('ideas', JSON.stringify(updatedIdeas));
}
