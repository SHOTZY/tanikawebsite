// JavaScript code for handling interactions
document.addEventListener("DOMContentLoaded", function() {
    const addEntryBtn = document.getElementById("add-entry-btn");
    const entryForm = document.getElementById("entry-form");
    const saveEntryBtn = document.getElementById("save-entry-btn");
    const entryList = document.getElementById("entry-list");
    const entryDateInput = document.getElementById("entry-date");
    const entryContentInput = document.getElementById("entry-content");

    // Function to load diary entries from local storage
    function loadEntries() {
        const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entries.forEach(function(entry, index) {
            const entryItem = document.createElement("li");
            entryItem.innerHTML = `<strong>${entry.date}:</strong> ${entry.content}
            <button class="delete-btn" data-index="${index}">Delete</button>`;
            entryList.appendChild(entryItem);
        });
    }

    // Show entry form when "Add New Entry" button is clicked
    addEntryBtn.addEventListener("click", function() {
        entryForm.style.display = "block";
        addEntryBtn.classList.add("clicked"); // Add "clicked" class to hide the button
    });

    // Save entry when "Save" button is clicked
    saveEntryBtn.addEventListener("click", function() {
        const entryDate = entryDateInput.value;
        const entryContent = entryContentInput.value;

        // Create a new entry object
        const newEntry = {
            date: entryDate,
            content: entryContent
        };

        // Add the new entry to the diary entries array
        const entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entries.push(newEntry);

        // Update local storage with the new array of diary entries
        localStorage.setItem("diaryEntries", JSON.stringify(entries));

        // Create a new entry element with delete button
        const entryItem = document.createElement("li");
        entryItem.innerHTML = `<strong>${entryDate}:</strong> ${entryContent}
        <button class="delete-btn" data-index="${entries.length - 1}">Delete</button>`;

        // Add the entry to the sidebar
        entryList.appendChild(entryItem);

        // Clear the input fields for the next entry
        entryDateInput.value = "";
        entryContentInput.value = "";

        // For simplicity, let's just hide the form after saving the entry
        entryForm.style.display = "none";
        addEntryBtn.classList.remove("clicked"); // Remove "clicked" class to show the button
    });

    // Function to delete entry
    function deleteEntry(index) {
        let entries = JSON.parse(localStorage.getItem("diaryEntries")) || [];
        entries.splice(index, 1);
        localStorage.setItem("diaryEntries", JSON.stringify(entries));
        location.reload(); // Reload the page to reflect the changes
    }

    // Load entries from local storage when the page loads
    loadEntries();

    // Event delegation for delete buttons
    entryList.addEventListener("click", function(event) {
        if (event.target.classList.contains("delete-btn")) {
            const index = event.target.getAttribute("data-index");
            deleteEntry(index);
        }
    });
});
